/** Global site configuration. */
export const SITE = {
  name: "AchaBrasil",
  url: "https://achabrasil.com.br",
  locale: "pt-BR",
  currency: "BRL",
  // Travelpayouts / affiliate identifiers — fill these from your dashboard.
  // Read at build/runtime from env so they never get committed.
  travelpayoutsMarker: process.env.NEXT_PUBLIC_TP_MARKER ?? "",
} as const;

/** Format a number as Brazilian Real. */
export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}
