import type { Metadata } from "next";
import { airport } from "@/lib/airports";

export const metadata: Metadata = {
  title: "Resultados da busca",
  robots: { index: false },
};

type Props = {
  searchParams: Promise<{ origin?: string; destination?: string; date?: string }>;
};

export default async function BuscarPage({ searchParams }: Props) {
  const { origin, destination, date } = await searchParams;
  const o = origin ? airport(origin) : undefined;
  const d = destination ? airport(destination) : undefined;

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        {o && d ? `${o.city} → ${d.city}` : "Buscar voos"}
        {date ? ` · ${date}` : ""}
      </h1>
      <div className="mt-6 rounded-[20px] border border-dashed border-divider bg-surface p-10 text-center">
        <p className="font-display font-bold text-ink">Resultados da Travelpayouts</p>
        <p className="mt-1 text-sm text-muted">
          O widget de resultados (White Label) e renderizado aqui com origem
          {o ? ` ${o.iata}` : ""} e destino{d ? ` ${d.iata}` : ""}.
        </p>
      </div>
    </div>
  );
}
