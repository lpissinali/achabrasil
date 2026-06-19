import type { Metadata } from "next";
import DiscoverControls from "@/components/DiscoverControls";
import OfferList from "@/components/OfferList";
import { offersFromCity } from "@/lib/tp-data";
import { cityName } from "@/lib/cities";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ofertas de voos - passagens baratas saindo da sua cidade",
  description:
    "As passagens mais baratas saindo da sua cidade agora. Ofertas de voos para Salvador, Recife, Fortaleza, Florianópolis e mais destinos do Brasil, em reais.",
  alternates: { canonical: `${SITE.url}/ofertas` },
  openGraph: {
    type: "website",
    title: "Ofertas de voos - passagens baratas saindo da sua cidade",
    description:
      "As passagens mais baratas saindo da sua cidade agora. Ofertas de voos para Salvador, Recife, Fortaleza, Florianópolis e mais destinos do Brasil, em reais.",
    url: `${SITE.url}/ofertas`,
    siteName: SITE.name,
    locale: "pt_BR",
  },
};

const FAQ = [
  {
    q: "Com que frequência as ofertas mudam?",
    a: "O tempo todo. Os preços são coletados das buscas mais recentes e podem mudar em minutos. Por isso, quando encontrar um bom valor, vale garantir.",
  },
  {
    q: "As ofertas valem para ida e volta?",
    a: "Os preços exibidos são 'a partir de' e podem ser de ida e volta ou só ida, dependendo da rota. O valor e as regras finais são confirmados no site do parceiro, antes do pagamento.",
  },
];

export default async function OfertasPage({
  searchParams,
}: {
  searchParams: Promise<{ origin?: string }>;
}) {
  const sp = await searchParams;
  const origin = (sp.origin || "SAO").toUpperCase();

  const all = await offersFromCity(origin);
  const offers = all.filter((o) => o.domestic).slice(0, 12);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="mx-auto max-w-[1232px] px-5 py-12 sm:px-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-[40px]">
        Ofertas de voos
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted">
        Reunimos as passagens aéreas mais baratas saindo da sua cidade para os
        principais destinos do Brasil, com preços em reais atualizados a partir
        das buscas mais recentes. Os valores mudam o tempo todo — encontrou um
        bom preço, vale garantir.
      </p>

      <DiscoverControls basePath="/ofertas" origin={origin} />
      <OfferList offers={offers} originCode={origin} originName={cityName(origin)} />

      {/* SEO content */}
      <section className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          Como funcionam as ofertas do AchaBrasil
        </h2>
        <p className="mt-2 leading-relaxed text-muted">
          Em vez de você abrir o site de cada companhia, o AchaBrasil reúne as
          tarifas mais baixas encontradas nas buscas recentes e mostra para onde dá
          pra voar pagando menos, saindo da cidade que você escolher. É só selecionar
          a origem para ver os destinos com as melhores ofertas do momento.
        </p>
        <p className="mt-3 leading-relaxed text-muted">
          Ao clicar em uma oferta, você é levado ao site do parceiro para concluir a
          compra em ambiente seguro. O AchaBrasil não cobra nada por isso: ganhamos
          uma pequena comissão do parceiro quando a reserva acontece, sem custo
          adicional para você e sem influenciar a ordem dos preços.
        </p>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-display text-2xl font-bold tracking-tight">Perguntas frequentes</h2>
        <div className="mt-4 flex flex-col gap-3">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-[18px] border border-line bg-surface p-5">
              <div className="font-display text-[16px] font-bold">{f.q}</div>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
