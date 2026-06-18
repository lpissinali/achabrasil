import type { Metadata } from "next";
import Icon from "@/components/Icon";
import DiscoverControls from "@/components/DiscoverControls";
import OfferList from "@/components/OfferList";
import { offersFromCity } from "@/lib/tp-data";
import { cityName } from "@/lib/cities";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Me surpreenda - para onde dá pra voar com seu orçamento",
  description:
    "Diz teu orçamento e a gente acha o destino. Veja para onde dá pra viajar gastando pouco, saindo da sua cidade.",
  alternates: { canonical: `${SITE.url}/me-surpreenda` },
};

type Props = {
  searchParams: Promise<{ origin?: string; budget?: string }>;
};

export default async function MeSurpreendaPage({ searchParams }: Props) {
  const sp = await searchParams;
  const origin = (sp.origin || "SAO").toUpperCase();
  const budget = sp.budget || "";
  const max = budget ? Number(budget) : Infinity;

  const all = await offersFromCity(origin);
  const offers = all.filter((o) => o.price <= max).slice(0, 18);

  return (
    <div className="mx-auto max-w-[1232px] px-5 py-12 sm:px-14">
      <div className="btn-coral relative overflow-hidden rounded-[26px] p-8 text-white">
        <Icon name="sparkle" size={180} color="rgba(255,255,255,0.15)" style={{ position: "absolute", right: -28, top: -34 }} />
        <div className="relative">
          <span className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-extrabold uppercase tracking-widest">
            Me surpreenda
          </span>
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-[40px]">
            Diz teu orçamento.
            <br />A gente acha o destino.
          </h1>
          <p className="mt-2 max-w-xl text-[15.5px] text-white/90">
            Escolha de onde quer sair e quanto quer gastar — mostramos os
            destinos mais baratos que cabem no bolso.
          </p>
        </div>
      </div>

      <DiscoverControls basePath="/me-surpreenda" origin={origin} budget={budget} showBudget />
      <OfferList offers={offers} originCode={origin} originName={cityName(origin)} />
    </div>
  );
}
