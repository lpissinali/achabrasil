/** Airline IATA -> display name (pure, safe to import anywhere). */
export const AIRLINE_NAMES: Record<string, string> = {
  G3: "GOL", AD: "Azul", LA: "LATAM", JJ: "LATAM", O6: "Avianca", "2Z": "Voepass",
};
export function airlineName(code: string): string {
  return AIRLINE_NAMES[code] ?? code;
}
