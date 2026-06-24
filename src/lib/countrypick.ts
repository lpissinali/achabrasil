/** Cross-links to our sister travel site Country Pick (countrypick.com).
 *  Country Pick publishes Portuguese (/pt) destination guides that complement
 *  AchaBrasil's flight pages: where to go and what to do vs. how to get there.
 *  Pure data - safe to import anywhere. All paths verified against the
 *  Country Pick /pt sitemap. */
import type { Airport } from "./airports";

const CP_BASE = "https://www.countrypick.com";

/** Country name (as stored in Airport.state for international airports) ->
 *  Country Pick country slug. */
const COUNTRY_SLUG: Record<string, string> = {
  Argentina: "argentina",
  Chile: "chile",
  Peru: "peru",
  Uruguai: "uruguay",
  Paraguai: "paraguay",
  "Colômbia": "colombia",
  "Panamá": "panama",
  "México": "mexico",
  "Estados Unidos": "united-states-of-america",
  Portugal: "portugal",
  Espanha: "spain",
  "França": "france",
  "Reino Unido": "united-kingdom",
  "Itália": "italy",
};

/** IATA -> specific Country Pick city guide (path verified to exist). Where a
 *  city guide is missing we fall back to the country guide (see below). */
const CITY_PATH: Record<string, string> = {
  // Brasil
  GIG: "/pt/brazil/rio-de-janeiro",
  SDU: "/pt/brazil/rio-de-janeiro",
  BSB: "/pt/brazil/brasilia",
  FOR: "/pt/brazil/fortaleza",
  MAO: "/pt/brazil/amazonas",
  IGU: "/pt/brazil/iguazu-falls",
  // Internacional
  EZE: "/pt/argentina/buenos-aires",
  SCL: "/pt/chile/santiago",
  LIM: "/pt/peru/lima",
  MVD: "/pt/uruguay/montevideo",
  ASU: "/pt/paraguay/asuncion",
  BOG: "/pt/colombia/bogota",
  PTY: "/pt/panama/panama-city",
  MIA: "/pt/united-states-of-america/miami",
  JFK: "/pt/united-states-of-america/new-york",
  LIS: "/pt/portugal/lisbon",
  MAD: "/pt/spain/madrid",
  CDG: "/pt/france/paris",
  LHR: "/pt/united-kingdom/london",
  FCO: "/pt/italy/rome",
};

export type CountryPickGuide = {
  url: string;
  /** "city" = links to a city guide; "country" = a country guide. */
  level: "city" | "country";
  /** What the guide is about (city name for city level, country for country). */
  place: string;
};

/** Best matching Country Pick guide for a destination airport, or null. */
export function countrypickGuide(a: Airport): CountryPickGuide | null {
  const city = CITY_PATH[a.iata];
  if (city) return { url: CP_BASE + city, level: "city", place: a.city };
  if (a.intl) {
    const slug = COUNTRY_SLUG[a.state];
    if (slug) return { url: CP_BASE + "/pt/" + slug, level: "country", place: a.state };
    return null;
  }
  // Domestic fallback: the Brazil country guide.
  return { url: CP_BASE + "/pt/brazil", level: "country", place: "Brasil" };
}
