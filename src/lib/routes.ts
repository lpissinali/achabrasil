import { AIRPORTS, airport } from "./airports";

/**
 * Route definitions that power the SEO landing pages.
 * Each route renders at /voos/[slug] e.g. /voos/gru-ssa
 *
 * `fromPrice` is a static "a partir de" anchor used for SEO copy and JSON-LD.
 * Real-time prices come from the Travelpayouts widget/Data API at runtime.
 */
export type Route = {
  origin: string;
  destination: string;
  fromPrice: number; // BRL, indicative
  popular?: boolean;
};

export const ROUTES: Route[] = [
  { origin: "GRU", destination: "SSA", fromPrice: 189, popular: true },
  { origin: "CGH", destination: "REC", fromPrice: 219, popular: true },
  { origin: "GRU", destination: "FOR", fromPrice: 229, popular: true },
  { origin: "GRU", destination: "FLN", fromPrice: 149, popular: true },
  { origin: "CGH", destination: "SDU", fromPrice: 129, popular: true },
  { origin: "GRU", destination: "REC", fromPrice: 239 },
  { origin: "BSB", destination: "SSA", fromPrice: 159 },
  { origin: "GRU", destination: "POA", fromPrice: 159 },
  { origin: "GRU", destination: "CWB", fromPrice: 119 },
  { origin: "CGH", destination: "CNF", fromPrice: 139 },
  { origin: "GRU", destination: "NAT", fromPrice: 259 },
  { origin: "GRU", destination: "MCZ", fromPrice: 249 },
];

/** Build a URL slug like "gru-ssa" from a route. */
export function routeSlug(r: Pick<Route, "origin" | "destination">): string {
  return `${r.origin}-${r.destination}`.toLowerCase();
}

/** Parse a slug back into a route, or undefined if invalid. */
export function parseRouteSlug(slug: string): Route | undefined {
  const [o, d] = slug.toUpperCase().split("-");
  if (!o || !d || !AIRPORTS[o] || !AIRPORTS[d]) return undefined;
  return (
    ROUTES.find((r) => r.origin === o && r.destination === d) ?? {
      origin: o,
      destination: d,
      fromPrice: 0,
    }
  );
}

/** Human title: "Voos baratos de São Paulo (GRU) para Salvador (SSA)". */
export function routeTitle(r: Route): string {
  const o = airport(r.origin)!;
  const d = airport(r.destination)!;
  return `Voos baratos de ${o.city} (${r.origin}) para ${d.city} (${r.destination})`;
}
