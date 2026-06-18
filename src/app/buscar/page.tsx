import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Results from "@/components/Results";
import { airport } from "@/lib/airports";
import { cheapestForRoute } from "@/lib/tp-data";

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
    flex?: string;
  }>;
};

export default async function BuscarPage({ searchParams }: Props) {
  const sp = await searchParams;
  const o = sp.origin ? airport(sp.origin) : undefined;
  const d = sp.destination ? airport(sp.destination) : undefined;
  const adults = Number(sp.adults) || 1;
  const roundTrip = Boolean(sp.ret);
  const flex = sp.flex === "1";

  const fares =
    o && d
      ? await cheapestForRoute(o.iata, d.iata, {
          month: sp.date ? sp.date.slice(0, 7) : undefined,
          retMonth: sp.ret ? sp.ret.slice(0, 7) : undefined,
          oneWay: !roundTrip,
          limit: 30,
        })
      : [];

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <nav className="flex items-center gap-1 text-sm text-muted">
        <Link href="/" className="hover:text-ink">Inicio</Link>
        <Icon name="chevR" size={14} color="var(--muted-2)" />
        <span>Resultados</span>
      </nav>

      <h1 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        {o && d ? `${o.city} para ${d.city}` : "Buscar voos"}
      </h1>
      {o && d && (
        <p className="mt-1 text-sm text-muted">
          {o.iata} &rarr; {d.iata} · {roundTrip ? "ida e volta" : "só ida"} · {adults}{" "}
          {adults === 1 ? "adulto" : "adultos"}
          {flex ? " · datas flexíveis (mês inteiro)" : ""}
        </p>
      )}

      {!o || !d ? (
        <p className="mt-6 text-muted">Informe origem e destino na busca.</p>
      ) : fares.length === 0 ? (
        <div className="mt-6 rounded-[20px] border border-line bg-surface p-8 text-center">
          <p className="font-display font-bold text-ink">
            Não encontramos preços para essa rota agora
          </p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted">
            Os preços são coletados das buscas mais recentes. Tente outra data,
            outra rota, ou volte mais tarde.
          </p>
        </div>
      ) : (
        <>
          <Results fares={fares} roundTrip={roundTrip} />
          <p className="mt-5 text-center text-xs text-muted-2">
            Preços a partir de, coletados nas buscas mais recentes e sujeitos a
            alteração. Ao reservar você é levado ao site do parceiro.
          </p>
        </>
      )}
    </div>
  );
}
