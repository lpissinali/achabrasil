import { AIRPORTS, airport } from "./airports";

/**
 * Route definitions that power the SEO landing pages and the homepage
 * "Rotas mais buscadas" grid. Each route renders at /voos/[slug] e.g.
 * /voos/cgh-sdu. `fromPrice` (BRL) is an indicative "a partir de" anchor;
 * real-time prices come from the Travelpayouts widget/Data API at runtime.
 */
export type Route = {
  origin: string;
  destination: string;
  fromPrice: number;
  airline?: string;
  popular?: boolean;
};

export const ROUTES: Route[] = [
  { origin: "CGH", destination: "SDU", fromPrice: 98, airline: "GOL", popular: true },
  { origin: "GRU", destination: "SSA", fromPrice: 189, airline: "Azul", popular: true },
  { origin: "BSB", destination: "REC", fromPrice: 214, airline: "LATAM", popular: true },
  { origin: "CNF", destination: "FOR", fromPrice: 247, airline: "GOL", popular: true },
  { origin: "GIG", destination: "POA", fromPrice: 229, airline: "Azul", popular: true },
  { origin: "CWB", destination: "REC", fromPrice: 268, airline: "LATAM", popular: true },
  { origin: "GRU", destination: "FOR", fromPrice: 229, airline: "GOL" },
  { origin: "GRU", destination: "FLN", fromPrice: 149, airline: "Azul" },
  { origin: "GRU", destination: "REC", fromPrice: 239, airline: "LATAM" },
  { origin: "BSB", destination: "SSA", fromPrice: 159, airline: "GOL" },
  { origin: "GRU", destination: "NAT", fromPrice: 259, airline: "Azul" },
  { origin: "GRU", destination: "MCZ", fromPrice: 249, airline: "LATAM" },
];

/** Build a URL slug like "cgh-sdu" from a route. */
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

/** Human title: "Voos baratos de Sao Paulo (CGH) para Rio de Janeiro (SDU)". */
export function routeTitle(r: Route): string {
  const o = airport(r.origin)!;
  const d = airport(r.destination)!;
  return `Voos baratos de ${o.city} (${r.origin}) para ${d.city} (${r.destination})`;
}
