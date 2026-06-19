import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { ROUTES, routeSlug } from "@/lib/routes";
import { airport } from "@/lib/airports";
import { formatBRL, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Voos baratos pelo Brasil - todas as rotas",
  description:
    "Veja todas as rotas de voos domésticos e internacionais com saída do Brasil. Compare preços da GOL, LATAM e Azul e ache passagens baratas para os principais destinos.",
  alternates: { canonical: `${SITE.url}/voos` },
  openGraph: {
    type: "website",
    title: "Voos baratos pelo Brasil - todas as rotas",
    description:
      "Veja todas as rotas de voos domésticos e internacionais com saída do Brasil. Compare preços da GOL, LATAM e Azul e ache passagens baratas para os principais destinos.",
    url: `${SITE.url}/voos`,
    siteName: SITE.name,
    locale: "pt_BR",
  },
};

const FAQ = [
  {
    q: "Como encontrar voos baratos pelo Brasil?",
    a: "Seja flexível com as datas, compre com 1 a 3 meses de antecedência, voe no meio da semana e compare várias companhias de uma vez. O AchaBrasil reúne os preços da GOL, LATAM, Azul e mais de 20 companhias para você ver o melhor valor em reais.",
  },
  {
    q: "Qual a antecedência ideal para comprar passagem?",
    a: "Para voos domésticos, de 1 a 3 meses antes da viagem costuma ser o melhor momento. Para internacionais, de 2 a 6 meses. Em alta temporada e feriados, compre com ainda mais antecedência.",
  },
  {
    q: "O AchaBrasil vende as passagens?",
    a: "Não. O AchaBrasil é um comparador: mostramos os melhores preços e você conclui a compra diretamente no site do parceiro, em ambiente seguro.",
  },
];

export default function VoosIndex() {
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
        Voos baratos pelo Brasil
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted">
        Compare passagens aéreas das principais rotas do país e do exterior, com
        preços em reais atualizados a partir das buscas mais recentes. Escolha uma
        rota para ver as ofertas, a melhor época para viajar e dicas para
        economizar.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ROUTES.map((r) => {
          const o = airport(r.origin)!;
          const d = airport(r.destination)!;
          return (
            <Link
              key={routeSlug(r)}
              href={`/voos/${routeSlug(r)}`}
              className="flex items-center gap-4 rounded-[18px] border border-line bg-surface px-5 py-4 transition-shadow hover:shadow-md"
            >
              <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-[13px] bg-teal-soft">
                <Icon name="planeUp" size={20} color="var(--teal)" style={{ transform: "rotate(45deg)" }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-base font-bold">
                  {o.city} &rarr; {d.city}
                </div>
                <div className="mt-0.5 text-[13px] text-muted-2">
                  {r.airline ? `${r.airline} · ` : ""}ida e volta
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-semibold text-muted-2">a partir de</div>
                <div className="whitespace-nowrap font-display text-xl font-extrabold text-teal-dark">
                  {formatBRL(r.fromPrice)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* SEO content */}
      <section className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          Passagens aéreas baratas em reais
        </h2>
        <p className="mt-2 leading-relaxed text-muted">
          O AchaBrasil compara em segundos os preços da GOL, LATAM, Azul e mais de
          20 companhias para as rotas mais buscadas do Brasil — de São Paulo,
          Rio de Janeiro, Brasília e outras capitais para destinos no país inteiro
          e no exterior. Em vez de abrir o site de cada companhia, você vê o melhor
          preço de uma vez e reserva direto com o parceiro, sem taxas escondidas.
        </p>
        <p className="mt-3 leading-relaxed text-muted">
          Os valores são "a partir de", coletados das buscas mais recentes, e mudam
          o tempo todo. Para pagar menos, vale combinar três coisas: flexibilidade
          de datas, antecedência na compra e um alerta de preço para ser avisado
          quando a tarifa cair.
        </p>
      </section>

      {/* FAQ */}
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
