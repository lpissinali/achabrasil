/**
 * Travelpayouts / Aviasales affiliate deep links.
 *
 * Instead of embedding an iframe widget, we send the user to Aviasales
 * search results with our marker appended, so every search is tracked for
 * commission while keeping our own custom UI. This matches the project plan
 * ("results redirect to booking sites with affiliate tracking").
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

/**
 * Travelpayouts flight search-results widget (AchaBrasil project).
 * Renders a form + live results in PT-BR / BRL with our teal accent.
 * Override with NEXT_PUBLIC_TP_WIDGET_SRC if you regenerate the widget.
 */
export const TP_WIDGET_SRC =
  process.env.NEXT_PUBLIC_TP_WIDGET_SRC ||
  "https://tpemd.com/content?currency=brl&trs=540331&shmarker=739432&powered_by=true&locale=pt&show_header=true&limit=3&primary_color=00AE98&results_background_color=FFFFFF&form_background_color=FFFFFF&campaign_id=111&promo_id=4478";

/**
 * Append the user's selected route/dates to the widget script URL so the
 * Travelpayouts widget can open pre-filled. These params are best-effort:
 * if the widget/promo supports them it loads prefilled (with_request also
 * auto-runs the search); if not, they're harmlessly ignored.
 */
export function buildWidgetSrc(p: {
  origin: string;
  destination: string;
  date?: string;
  ret?: string;
  adults?: number;
}): string {
  const u = new URL(TP_WIDGET_SRC);
  u.searchParams.set("origin", p.origin.toUpperCase());
  u.searchParams.set("destination", p.destination.toUpperCase());
  if (p.date) u.searchParams.set("depart_date", p.date);
  if (p.ret) u.searchParams.set("return_date", p.ret);
  if (p.adults && p.adults > 1) u.searchParams.set("adults", String(p.adults));
  if (!p.ret) u.searchParams.set("one_way", "true");
  u.searchParams.set("with_request", "true");
  return u.toString();
}

/**
 * Localized Aviasales flight-search link (Portuguese + BRL + marker).
 * Uses the documented search.aviasales.com/flights/ format, which honors
 * the `locale` param (unlike the Data API's /search/<path> links).
 */
export function aviasalesFlightsUrl(p: {
  origin: string;
  destination: string;
  departDate?: string;
  returnDate?: string;
  adults?: number;
}): string {
  const params = new URLSearchParams({
    origin_iata: p.origin.toUpperCase(),
    destination_iata: p.destination.toUpperCase(),
    trip_class: "0",
    adults: String(p.adults && p.adults > 0 ? p.adults : 1),
    children: "0",
    infants: "0",
    locale: "pt",
    marker: TP_MARKER,
    one_way: p.returnDate ? "false" : "true",
    with_request: "true",
  });
  if (p.departDate) params.set("depart_date", p.departDate.slice(0, 10));
  if (p.returnDate) params.set("return_date", p.returnDate.slice(0, 10));
  return `https://search.aviasales.com/flights/?${params.toString()}`;
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
