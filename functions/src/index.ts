import { onSchedule } from "firebase-functions/v2/scheduler";
import { logger } from "firebase-functions/v2";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { Resend } from "resend";

initializeApp();
const db = getFirestore();

const MARKER = process.env.TP_MARKER_ID || "739432";
const SITE_URL = process.env.SITE_URL || "https://achabrasil.com.br";
const FROM_EMAIL = process.env.ALERT_FROM_EMAIL || "AchaBrasil <alertas@achabrasil.com.br>";

type Alert = {
  origin: string;
  destination: string;
  email: string;
  targetPrice: number | null;
  unsubToken?: string;
  baselinePrice?: number | null;
  lastNotifiedPrice?: number | null;
  lastNotifiedAt?: string | null;
};

type Cheapest = {
  price: number;
  departureAt: string;
  returnAt?: string;
  bookingUrl: string;
};

/**
 * Daily price-alert check (09:00 America/Sao_Paulo). For each active alert:
 *   1. queries the Travelpayouts Data API for the cheapest round-trip fare,
 *   2. decides whether the price is "good" (<= target, or a 10% drop vs the
 *      baseline when no target was set), with dedupe so we don't email daily,
 *   3. emails the user via Resend with a booking link and an unsubscribe link.
 *
 * Set the secrets before deploying:
 *   firebase functions:secrets:set TP_API_TOKEN
 *   firebase functions:secrets:set RESEND_API_KEY
 */
export const checkPriceAlerts = onSchedule(
  {
    schedule: "0 9 * * *",
    timeZone: "America/Sao_Paulo",
    secrets: ["TP_API_TOKEN", "RESEND_API_KEY"],
    memory: "256MiB",
    timeoutSeconds: 540,
  },
  async () => {
    const token = process.env.TP_API_TOKEN;
    const resendKey = process.env.RESEND_API_KEY;
    if (!token || !resendKey) {
      logger.error("Missing TP_API_TOKEN or RESEND_API_KEY secret; aborting.");
      return;
    }
    const resend = new Resend(resendKey);

    const snap = await db.collection("priceAlerts").where("active", "==", true).get();
    logger.info(`Checking ${snap.size} active price alerts`);

    let emailed = 0;
    for (const doc of snap.docs) {
      const alert = doc.data() as Alert;
      try {
        const cheapest = await fetchCheapest(alert.origin, alert.destination, token);
        if (!cheapest) continue;
        const price = cheapest.price;

        // Establish a baseline the first time we see an alert without a target.
        if (alert.targetPrice == null && alert.baselinePrice == null) {
          await doc.ref.update({ baselinePrice: price });
          alert.baselinePrice = price;
        }

        const isGoodPrice =
          alert.targetPrice != null
            ? price <= alert.targetPrice
            : alert.baselinePrice != null && price <= alert.baselinePrice * 0.9;

        if (!isGoodPrice) {
          // Track the lowest baseline seen so future drops are measured fairly.
          if (alert.targetPrice == null && alert.baselinePrice != null && price < alert.baselinePrice) {
            await doc.ref.update({ baselinePrice: price });
          }
          continue;
        }

        // Dedupe: skip if we already notified at this price or lower in the last 7 days.
        if (alreadyNotified(alert, price)) continue;

        await sendAlertEmail(resend, doc.id, alert, cheapest);
        await doc.ref.update({
          lastNotifiedPrice: price,
          lastNotifiedAt: new Date().toISOString(),
          ...(alert.targetPrice == null ? { baselinePrice: price } : {}),
        });
        emailed++;
      } catch (err) {
        logger.error(`Alert ${doc.id} failed`, err);
      }
    }

    logger.info(`Price-alert run complete. Emails sent: ${emailed}`);
  },
);

/** Don't re-email if we already notified at <= this price within 7 days. */
function alreadyNotified(alert: Alert, price: number): boolean {
  if (alert.lastNotifiedPrice == null || !alert.lastNotifiedAt) return false;
  const days = (Date.now() - new Date(alert.lastNotifiedAt).getTime()) / 86_400_000;
  return alert.lastNotifiedPrice <= price && days < 7;
}

/** Near-future month (today + 45 days) as YYYY-MM, to widen cached coverage. */
function targetMonth(): string {
  const d = new Date();
  d.setDate(d.getDate() + 45);
  return d.toISOString().slice(0, 7);
}

function bookingUrl(link: string): string {
  if (!link) return `${SITE_URL}/voos`;
  const sep = link.includes("?") ? "&" : "?";
  return `https://www.aviasales.com${link}${sep}marker=${MARKER}&locale=pt_br&currency=brl`;
}

/** Cheapest round-trip fare via Travelpayouts Data API (prices_for_dates v3). */
async function fetchCheapest(
  origin: string,
  destination: string,
  token: string,
): Promise<Cheapest | null> {
  const month = targetMonth();
  const params = new URLSearchParams({
    origin: origin.toUpperCase(),
    destination: destination.toUpperCase(),
    currency: "brl",
    sorting: "price",
    limit: "1",
    one_way: "false",
    departure_at: month,
    return_at: month,
    token,
  });
  const url = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const json = (await res.json()) as { data?: Array<Record<string, unknown>> };
  const f = json?.data?.[0];
  if (!f || !f.price) return null;
  return {
    price: Number(f.price),
    departureAt: String(f.departure_at ?? ""),
    returnAt: f.return_at ? String(f.return_at) : undefined,
    bookingUrl: bookingUrl(String(f.link ?? "")),
  };
}

function fmtBRL(v: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);
}
function fmtDate(iso: string): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

async function sendAlertEmail(
  resend: Resend,
  docId: string,
  alert: Alert,
  fare: Cheapest,
): Promise<void> {
  const route = `${alert.origin} → ${alert.destination}`;
  const unsubUrl = `${SITE_URL}/api/alertas/unsubscribe?id=${docId}&token=${encodeURIComponent(alert.unsubToken ?? "")}`;
  const dates = fare.returnAt
    ? `${fmtDate(fare.departureAt)} - ${fmtDate(fare.returnAt)}`
    : fmtDate(fare.departureAt);

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#fbfaf7;padding:24px;color:#16201e">
    <div style="max-width:480px;margin:0 auto;background:#ffffff;border:1px solid #f0ece3;border-radius:18px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#0e9b8e,#0a6f66);padding:22px 24px;color:#fff">
        <div style="font-size:13px;opacity:.85">AchaBrasil · alerta de preço</div>
        <div style="font-size:22px;font-weight:800;margin-top:4px">Achamos um preço bom! ✈️</div>
      </div>
      <div style="padding:24px">
        <div style="font-size:15px;color:#5a6864">Sua rota</div>
        <div style="font-size:20px;font-weight:800;margin:2px 0 14px">${route}</div>
        <div style="background:#e6f4f1;border-radius:14px;padding:16px 18px;margin-bottom:18px">
          <div style="font-size:12px;color:#0a6f66;font-weight:700">A PARTIR DE</div>
          <div style="font-size:30px;font-weight:800;color:#0a6f66;line-height:1.1">${fmtBRL(fare.price)}</div>
          ${dates ? `<div style="font-size:13px;color:#5a6864;margin-top:4px">${dates} · ida e volta</div>` : ""}
        </div>
        <a href="${fare.bookingUrl}" style="display:block;text-align:center;background:#ff6b57;color:#fff;text-decoration:none;font-weight:800;padding:14px;border-radius:14px;font-size:15px">Ver oferta e reservar</a>
        <p style="font-size:12px;color:#9aa8a4;line-height:1.6;margin-top:18px">
          Preço coletado das buscas mais recentes e sujeito a alteração. A compra é
          concluída no site do parceiro. Você recebeu este e-mail porque criou um
          alerta no AchaBrasil.
          <br><a href="${unsubUrl}" style="color:#9aa8a4">Cancelar este alerta</a>
        </p>
      </div>
    </div>
  </div>`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: alert.email,
    subject: `Baixou! ${route} por ${fmtBRL(fare.price)}`,
    html,
  });
}
