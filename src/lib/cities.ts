/** Origin cities offered for discovery pages (metropolitan codes for the
 *  Travelpayouts city-directions API). Pure - safe to import anywhere. */
export const ORIGIN_CITIES: { code: string; name: string }[] = [
  { code: "SAO", name: "São Paulo" },
  { code: "RIO", name: "Rio de Janeiro" },
  { code: "BSB", name: "Brasília" },
  { code: "BHZ", name: "Belo Horizonte" },
  { code: "SSA", name: "Salvador" },
  { code: "REC", name: "Recife" },
  { code: "FOR", name: "Fortaleza" },
  { code: "POA", name: "Porto Alegre" },
  { code: "CWB", name: "Curitiba" },
  { code: "VIX", name: "Vitória" },
];

export function cityName(code: string): string {
  return ORIGIN_CITIES.find((c) => c.code === code)?.name ?? code;
}
