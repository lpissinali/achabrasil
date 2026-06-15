import { onSchedule } from "firebase-functions/v2/scheduler";
import { logger } from "firebase-functions/v2";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();
const db = getFirestore();

/**
 * Daily price-alert check.
 * Runs every day at 09:00 (America/Sao_Paulo). For each active alert it:
 *   1. queries the Travelpayouts Data API for the cheapest price on the route,
 *   2. if the price is at/below the user's target, emails them via Resend.
 *
 * The API/email calls are stubbed below — wire them up once you have the
 * Travelpayouts token (TP_API_TOKEN) and Resend key (RESEND_API_KEY) set as
 * function secrets: `firebase functions:secrets:set TP_API_TOKEN`.
 */
export const checkPriceAlerts = onSchedule(
  {
    schedule: "0 9 * * *",
    timeZone: "America/Sao_Paulo",
    // secrets: ["TP_API_TOKEN", "RESEND_API_KEY"],
  },
  async () => {
    const snap = await db
      .collection("priceAlerts")
      .where("active", "==", true)
      .get();

    logger.info(`Checking ${snap.size} active price alerts`);

    for (const doc of snap.docs) {
      const alert = doc.data() as {
        origin: string;
        destination: string;
        email: string;
        targetPrice: number | null;
      };

      // TODO: const price = await fetchCheapestPrice(alert.origin, alert.destination);
      const price = await fetchCheapestPrice(alert.origin, alert.destination);
      if (price == null) continue;

      const shouldNotify =
        alert.targetPrice == null ? false : price <= alert.targetPrice;

      if (shouldNotify) {
        // TODO: await sendAlertEmail(alert.email, alert, price);
        logger.info(
          `Would email ${alert.email}: ${alert.origin}->${alert.destination} at R$${price}`,
        );
      }
    }
  },
);

/** Stub — replace with a real Travelpayouts Data API call. */
async function fetchCheapestPrice(
  _origin: string,
  _destination: string,
): Promise<number | null> {
  // Example endpoint:
  // https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=...&destination=...&token=TP_API_TOKEN
  return null;
}
