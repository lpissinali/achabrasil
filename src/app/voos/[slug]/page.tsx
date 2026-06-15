import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ROUTES,
  parseRouteSlug,
  routeSlug,
  routeTitle,
} from "@/lib/routes";
import { airport } from "@/lib/airports";
import { formatBRL, SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

/** Pre-render every known route at build time (SSG) for fast, crawlable pages. */
export function generateStaticParams() {
  return ROUTES.map((r) => ({ slug: routeSlug(r) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = parseRouteSlug(slug);
  if (!route) return {};
  const title = routeTitle(route);
  return {
    title,
    description: `${title}. Compare preços da GOL, LATAM e Azul, veja o melhor dia para voar e ${
      route.fromPrice ? `passagens a partir de ${formatBRL(route.fromPrice)}.` : "encontre a melhor oferta."
    }`,
    alternates: { canonical: `${SITE.url}/voos/${slug}` },
  };
}

export default async function RoutePage({ params }: Props) {
  const { slug } = await params;
  const route = parseRouteSlug(slug);
  if (!route) notFound();

  const o = airport(route.origin)!;
  const d = airport(route.destination)!;
  const title = routeTitle(route);

  // JSON-LD structured data helps Google understand the page.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Qual o preço das passagens de ${o.city} para ${d.city}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: route.fromPrice
            ? `As passagens de ${o.city} (${route.origin}) para ${d.city} (${route.destination}) começam em torno de ${formatBRL(
                route.fromPrice,
              )}, variando conforme a data e a antecedência da compra.`
            : `Os preços variam conforme a data e a antecedência. Use a busca para ver as ofertas atuais.`,
        },
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-sm text-muted">
        <Link href="/voos" className="hover:text-ink">
          Voos
        </Link>{" "}
        / {route.origin} → {route.destination}
      </nav>

      <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight">
        {title}
      </h1>

      {route.fromPrice > 0 && (
        <p className="mt-3 text-lg text-muted">
          Passagens a partir de{" "}
          <strong className="text-ink">{formatBRL(route.fromPrice)}</strong>
        </p>
      )}

      {/* Travelpayouts White Label search widget goes here in production,
          prefilled with origin={route.origin} destination={route.destination}. */}
      <div className="mt-6 rounded-2xl border border-dashed border-line bg-surface p-8 text-center text-muted">
        <p className="font-semibold text-ink">Widget de busca da Travelpayouts</p>
        <p className="mt-1 text-sm">
          Embute aqui o White Label widget pré-preenchido para {route.origin} →{" "}
          {route.destination}.
        </p>
        <Link
          href={`/buscar?origin=${route.origin}&destination=${route.destination}`}
          className="mt-4 inline-block rounded-xl bg-coral px-5 py-2.5 text-sm font-bold text-white"
        >
          Buscar voos {route.origin} → {route.destination}
        </Link>
      </div>

      <section className="prose mt-10 max-w-none">
        <h2 className="font-display text-xl font-bold">
          Melhor época para voar de {o.city} para {d.city}
        </h2>
        <p className="mt-2 text-muted">
          Escreva aqui conteúdo único e útil sobre a rota: melhores meses,
          companhias que operam o trecho, duração média do voo e dicas para
          economizar. Esse conteúdo é o que faz a página ranquear no Google para
          buscas como “voos baratos {route.origin} {route.destination}”.
        </p>
      </section>
    </article>
  );
}
