import type { Metadata } from "next";
import { airport } from "@/lib/airports";

export const metadata: Metadata = {
  title: "Resultados da busca",
  robots: { index: false }, // search-result pages shouldn't be indexed
};

type Props = {
  searchParams: Promise<{ origin?: string; destination?: string; date?: string }>;
};

export default async function BuscarPage({ searchParams }: Props) {
  const { origin, destination, date } = await searchParams;
  const o = origin ? airport(origin) : undefined;
  const d = destination ? airport(destination) : undefined;

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="font-display text-2xl font-extrabold tracking-tight">
        {o && d ? `${o.city} → ${d.city}` : "Buscar voos"}
        {date ? ` · ${date}` : ""}
      </h1>

      {/* In production: Travelpayouts White Label results widget renders here,
          prefilled from the query params above. */}
      <div className="mt-6 rounded-2xl border border-dashed border-line bg-surface p-10 text-center text-muted">
        <p className="font-semibold text-ink">Resultados da Travelpayouts</p>
        <p className="mt-1 text-sm">
          O widget de resultados (White Label) é renderizado aqui com origem
          {o ? ` ${o.iata}` : ""} e destino{d ? ` ${d.iata}` : ""}.
        </p>
      </div>
    </div>
  );
}
