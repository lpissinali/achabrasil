/**
 * Travelpayouts / Aviasales affiliate deep links.
 *
 * Instead of embedding an iframe widget, we send the user to Aviasales
 * search results with our marker appended, so every search is tracked for
 * commission while keeping our own custom UI.
 *
 * Aviasales search path format:
 *   {ORIGIN}{DDMM-out}{DEST}{DDMM-back?}{ADULTS}
 * e.g. GRU2007SSA1 (one-way) or GRU2007SSA27071 (round trip).
 */
export const TP_MARKER = process.env.NEXT_PUBLIC_TP_MARKER || "739432";

function ddmm(d: Date): string {
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${day}${month}`;
}

function parseISO(iso?: string): Date | null {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function plusDays(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

export function aviasalesSearchUrl(p: {
  origin: string;
  destination: string;
  date?: string;
  ret?: string;
  adults?: number;
}): string {
  const o = p.origin.toUpperCase();
  const d = p.destination.toUpperCase();
  // Departure is required by Aviasales; default to ~2 weeks out if missing.
  const out = parseISO(p.date) ?? plusDays(14);
  const back = parseISO(p.ret);
  const adults = p.adults && p.adults > 0 ? p.adults : 1;

  const path = `${o}${ddmm(out)}${d}${back ? ddmm(back) : ""}${adults}`;
  const params = new URLSearchParams({
    marker: TP_MARKER,
    currency: "brl",
    locale: "pt",
  });
  return `https://www.aviasales.com/search/${path}?${params.toString()}`;
}

/** Hotellook (Travelpayouts) hotel-search deep link, marker-tracked, PT-BR/BRL. */
export function hotellookUrl(city: string): string {
  const params = new URLSearchParams({
    destination: city,
    marker: TP_MARKER,
    locale: "pt",
    currency: "brl",
  });
  return `https://search.hotellook.com/?${params.toString()}`;
}
