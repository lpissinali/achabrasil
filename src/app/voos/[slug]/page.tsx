import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/Icon";
import Results from "@/components/Results";
import { ROUTES, parseRouteSlug, routeSlug, routeTitle } from "@/lib/routes";
import { airport } from "@/lib/airports";
import { cheapestForRoute } from "@/lib/tp-data";
import { formatBRL, SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// Pages are pre-rendered for SEO; fares refresh via ISR (30 min).
export const revalidate = 1800;

export function generateStaticParams() {
  return ROUTES.map((r) => ({ slug: routeSlug(r) }));
}

function targetMonth(): string {
  const dt = new Date();
  dt.setDate(dt.getDate() + 45);
  return dt.toISOString().slice(0, 7);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = parseRouteSlug(slug);
  if (!route) return {};
  const title = routeTitle(route);
  const o = airport(route.origin)!;
  const d = airport(route.destination)!;
  const description = `${title}. Compare preços da GOL, LATAM e Azul, veja o melhor dia para voar e ${
    route.fromPrice ? `passagens a partir de ${formatBRL(route.fromPrice)}.` : "encontre a melhor oferta."
  }`;
  const url = `${SITE.url}/voos/${slug}`;
  return {
    title,
    description,
    keywords: [`voos ${o.city} ${d.city}`, `passagens ${o.city} para ${d.city}`, `voos baratos ${route.origin} ${route.destination}`],
    alternates: { canonical: url },
    openGraph: { type: "website", title, description, url, siteName: SITE.name, locale: "pt_BR" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function RoutePage({ params }: Props) {
  const { slug } = await params;
  const route = parseRouteSlug(slug);
  if (!route) notFound();

  const o = airport(route.origin)!;
  const d = airport(route.destination)!;
  const title = routeTitle(route);
  const month = targetMonth();

  const fares = await cheapestForRoute(route.origin, route.destination, {
    month,
    retMonth: month,
    oneWay: false,
    limit: 20,
  });

  const cheapest = fares.length ? Math.min(...fares.map((f) => f.price)) : route.fromPrice;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Qual o preço das passagens de ${o.city} para ${d.city}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: cheapest
            ? `As passagens de ${o.city} (${route.origin}) para ${d.city} (${route.destination}) começam em torno de ${formatBRL(cheapest)}, variando conforme a data e a antecedência da compra.`
            : `Os preços variam conforme a data e a antecedência. Use a busca para ver as ofertas atuais.`,
        },
      },
      {
        "@type": "Question",
        name: `Quais companhias voam de ${o.city} para ${d.city}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `O trecho ${route.origin}-${route.destination} costuma ser operado por GOL, LATAM e Azul${
            route.airline ? `, com boas ofertas da ${route.airline}` : ""
          }.`,
        },
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="flex items-center gap-1 text-sm text-muted">
        <Link href="/voos" className="hover:text-ink">Voos</Link>
        <Icon name="chevR" size={14} color="var(--muted-2)" />
        <span>{route.origin} &rarr; {route.destination}</span>
      </nav>

      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-[40px]">
        {title}
      </h1>
      {cheapest > 0 && (
        <p className="mt-3 text-lg text-muted">
          Passagens a partir de{" "}
          <strong className="text-teal-dark">{formatBRL(cheapest)}</strong>
        </p>
      )}

      {/* Live fares from the Data API, rendered as our own cards. */}
      {fares.length > 0 ? (
        <div className="mt-7">
          <h2 className="mb-1 font-display text-xl font-bold tracking-tight">
            Ofertas para {route.origin} &rarr; {route.destination}
          </h2>
          <p className="mb-4 text-sm text-muted-2">
            Menores preços coletados nas buscas recentes (ida e volta). Escolha um
            dia ou veja a busca completa.
          </p>
          <Results fares={fares} roundTrip />
          <div className="mt-6 text-center">
            <Link
              href={`/buscar?origin=${route.origin}&destination=${route.destination}&date=${month}-15&ret=${month}-22`}
              className="inline-flex items-center gap-2 text-[15px] font-bold text-teal-dark hover:underline"
            >
              Ver busca completa e outras datas
              <Icon name="chevR" size={16} stroke={2.4} color="var(--teal-dark)" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-7 rounded-[20px] border border-line bg-surface p-8 text-center">
          <p className="font-display font-bold text-ink">
            Vamos buscar os preços atuais dessa rota
          </p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted">
            Clique abaixo para ver as ofertas mais recentes de {o.city} para {d.city},
            com datas flexíveis.
          </p>
          <Link
            href={`/buscar?origin=${route.origin}&destination=${route.destination}&date=${month}-15&ret=${month}-22`}
            className="btn-coral mt-5 inline-flex items-center gap-2 rounded-[15px] px-6 py-3 text-sm font-bold text-white"
          >
            <Icon name="search" size={18} stroke={2.4} color="#fff" /> Buscar voos {route.origin} &rarr; {route.destination}
          </Link>
        </div>
      )}

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold tracking-tight">
          Melhor época para voar de {o.city} para {d.city}
        </h2>
        <p className="mt-2 leading-relaxed text-muted">
          As passagens de {o.city} para {d.city} costumam ficar mais baratas fora
          dos períodos de alta temporada — janeiro, julho e feriados prolongados
          puxam os preços para cima. Comprar com 1 a 3 meses de antecedência e ser
          flexível com os dias (terças e quartas tendem a ser mais baratas que
          finais de semana) faz bastante diferença no valor final.
        </p>
        <p className="mt-3 leading-relaxed text-muted">
          O trecho {route.origin}-{route.destination} é operado por companhias como
          GOL, LATAM e Azul. Vale comparar voos diretos e com conexão: às vezes uma
          escala curta reduz bastante o preço. Use a busca acima para ver o melhor
          dia para voar e ative um alerta de preço para ser avisado quando cair.
        </p>
      </section>
    </article>
  );
}
