import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import BuscarResults from "@/components/BuscarResults";
import { airport } from "@/lib/airports";

export const metadata: Metadata = {
  title: "Resultados da busca",
  robots: { index: false },
};

type Props = {
  searchParams: Promise<{
    origin?: string;
    destination?: string;
    date?: string;
    ret?: string;
    adults?: string;
  }>;
};

function fmtDate(iso?: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short" }).format(
    new Date(y, m - 1, d),
  );
}

export default async function BuscarPage({ searchParams }: Props) {
  const sp = await searchParams;
  const o = sp.origin ? airport(sp.origin) : undefined;
  const d = sp.destination ? airport(sp.destination) : undefined;
  const adults = Number(sp.adults) || 1;

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <nav className="flex items-center gap-1 text-sm text-muted">
        <Link href="/" className="hover:text-ink">Inicio</Link>
        <Icon name="chevR" size={14} color="var(--muted-2)" />
        <span>Resultados</span>
      </nav>

      <h1 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        {o && d ? `${o.city} - ${d.city}` : "Buscar voos"}
      </h1>
      {o && d && (
        <p className="mt-1 text-sm text-muted">
          {o.iata} &rarr; {d.iata}
          {sp.date ? ` · ${fmtDate(sp.date)}` : ""}
          {sp.ret ? ` - ${fmtDate(sp.ret)}` : ""}
          {` · ${adults} ${adults === 1 ? "adulto" : "adultos"}`}
        </p>
      )}

      {o && d ? (
        <BuscarResults
          origin={o.iata}
          destination={d.iata}
          date={sp.date}
          ret={sp.ret}
          adults={adults}
        />
      ) : (
        <p className="mt-6 text-muted">Informe origem e destino na busca.</p>
      )}
    </div>
  );
}
