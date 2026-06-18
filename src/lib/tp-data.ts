// NOTE: server-only module. Only import from Server Components / route handlers.
import { TP_MARKER } from "./travelpayouts";

/**
 * Travelpayouts Data API client (server-side only).
 * Returns cached lowest fares we render as our own indexable HTML.
 * Token is read from TP_API_TOKEN and never exposed to the browser.
 */
const TOKEN = process.env.TP_API_TOKEN ?? "";
const BASE = "https://api.travelpayouts.com";
const REVALIDATE = 1800; // 30 min cache

export type Fare = {
  origin: string;
  destination: string;
  price: number;
  airline: string;
  gate?: string;
  departureAt: string;
  returnAt?: string;
  transfers: number;
  returnTransfers?: number;
  durationMin?: number;
  durationTo?: number;
  durationBack?: number;
  bookingUrl: string;
};

export const AIRPORT_CITY: Record<string, string> = {
  GRU: "SAO", CGH: "SAO", VCP: "SAO",
  GIG: "RIO", SDU: "RIO",
  CNF: "BHZ",
  BSB: "BSB", SSA: "SSA", REC: "REC", FOR: "FOR", FLN: "FLN",
  POA: "POA", CWB: "CWB", NAT: "NAT", MCZ: "MCZ", BEL: "BEL", MAO: "MAO",
};

export const CITY_NAMES: Record<string, { name: string; domestic: boolean }> = {
  SAO: { name: "São Paulo", domestic: true },
  RIO: { name: "Rio de Janeiro", domestic: true },
  SSA: { name: "Salvador", domestic: true },
  REC: { name: "Recife", domestic: true },
  FOR: { name: "Fortaleza", domestic: true },
  FLN: { name: "Florianópolis", domestic: true },
  BHZ: { name: "Belo Horizonte", domestic: true },
  NAT: { name: "Natal", domestic: true },
  MCZ: { name: "Maceió", domestic: true },
  MAO: { name: "Manaus", domestic: true },
  AJU: { name: "Aracaju", domestic: true },
  JPA: { name: "João Pessoa", domestic: true },
  THE: { name: "Teresina", domestic: true },
  PNZ: { name: "Petrolina", domestic: true },
  IGU: { name: "Foz do Iguaçu", domestic: true },
  POA: { name: "Porto Alegre", domestic: true },
  CWB: { name: "Curitiba", domestic: true },
  BSB: { name: "Brasília", domestic: true },
  BEL: { name: "Belém", domestic: true },
  PMW: { name: "Palmas", domestic: true },
  BUE: { name: "Buenos Aires", domestic: false },
  SCL: { name: "Santiago", domestic: false },
  LIM: { name: "Lima", domestic: false },
  MVD: { name: "Montevidéu", domestic: false },
  ASU: { name: "Assunção", domestic: false },
  LIS: { name: "Lisboa", domestic: false },
};

export { AIRLINE_NAMES, airlineName } from "./airlines";

/** Build an affiliate booking link, forced to Portuguese + BRL. */
export function bookingUrl(link: string): string {
  const sep = link.includes("?") ? "&" : "?";
  return `https://www.aviasales.com${link}${sep}marker=${TP_MARKER}&locale=pt_br&currency=brl`;
}

/** Cheapest fares for a route (prices_for_dates v3). Pass `month` (YYYY-MM)
 *  to widen coverage; cached data per exact day is often sparse. */
export async function cheapestForRoute(
  origin: string,
  destination: string,
  opts: { month?: string; retMonth?: string; oneWay?: boolean; limit?: number } = {},
): Promise<Fare[]> {
  if (!TOKEN) return [];
  const params = new URLSearchParams({
    origin: origin.toUpperCase(),
    destination: destination.toUpperCase(),
    currency: "brl",
    sorting: "price",
    limit: String(opts.limit ?? 30),
    one_way: String(Boolean(opts.oneWay)),
    token: TOKEN,
  });
  if (opts.month) params.set("departure_at", opts.month);
  if (!opts.oneWay && opts.retMonth) params.set("return_at", opts.retMonth);
  try {
    const res = await fetch(
      `${BASE}/aviasales/v3/prices_for_dates?${params.toString()}`,
      { next: { revalidate: REVALIDATE } },
    );
    if (!res.ok) return [];
    const json = await res.json();
    const data: Array<Record<string, unknown>> = json?.data ?? [];
    return data.map((f) => ({
      origin: String(f.origin_airport ?? origin),
      destination: String(f.destination_airport ?? destination),
      price: Number(f.price),
      airline: String(f.airline ?? ""),
      gate: f.gate ? String(f.gate) : undefined,
      departureAt: String(f.departure_at ?? ""),
      returnAt: f.return_at ? String(f.return_at) : undefined,
      transfers: Number(f.transfers ?? 0),
      returnTransfers: f.return_transfers != null ? Number(f.return_transfers) : undefined,
      durationMin: f.duration ? Number(f.duration) : undefined,
      durationTo: f.duration_to ? Number(f.duration_to) : undefined,
      durationBack: f.duration_back ? Number(f.duration_back) : undefined,
      bookingUrl: bookingUrl(String(f.link ?? "")),
    }));
  } catch {
    return [];
  }
}

/** Lowest price for a route (single number) - for "a partir de" labels. */
export async function lowestPrice(
  origin: string,
  destination: string,
): Promise<number | null> {
  const fares = await cheapestForRoute(origin, destination, { limit: 1 });
  return fares.length ? fares[0].price : null;
}

export type Offer = {
  cityCode: string;
  name: string;
  domestic: boolean;
  price: number;
  airline: string;
  departureAt: string;
  returnAt?: string;
  transfers: number;
};

/** Cheapest destinations from a city (city-directions v1). */
export async function offersFromCity(originCity = "SAO"): Promise<Offer[]> {
  if (!TOKEN) return [];
  const params = new URLSearchParams({
    origin: originCity.toUpperCase(),
    currency: "brl",
    token: TOKEN,
  });
  try {
    const res = await fetch(`${BASE}/v1/city-directions?${params.toString()}`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const data: Record<string, Record<string, unknown>> = json?.data ?? {};
    return Object.entries(data)
      .map(([cityCode, v]) => {
        const meta = CITY_NAMES[cityCode];
        return {
          cityCode,
          name: meta?.name ?? cityCode,
          domestic: meta?.domestic ?? false,
          price: Number(v.price),
          airline: String(v.airline ?? ""),
          departureAt: String(v.departure_at ?? ""),
          returnAt: v.return_at ? String(v.return_at) : undefined,
          transfers: Number(v.transfers ?? 0),
        };
      })
      .filter((o) => o.price > 0)
      .sort((a, b) => a.price - b.price);
  } catch {
    return [];
  }
}
