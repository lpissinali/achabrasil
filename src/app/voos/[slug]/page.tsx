import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/Icon";
import { ROUTES, parseRouteSlug, routeSlug, routeTitle } from "@/lib/routes";
import { airport } from "@/lib/airports";
import { formatBRL, SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

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
    description: `${title}. Compare precos da GOL, LATAM e Azul, veja o melhor dia para voar e ${
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Qual o preco das passagens de ${o.city} para ${d.city}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: route.fromPrice
            ? `As passagens de ${o.city} (${route.origin}) para ${d.city} (${route.destination}) comecam em torno de ${formatBRL(route.fromPrice)}, variando conforme a data e a antecedencia da compra.`
            : `Os precos variam conforme a data e a antecedencia. Use a busca para ver as ofertas atuais.`,
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

      {route.fromPrice > 0 && (
        <p className="mt-3 text-lg text-muted">
          Passagens a partir de{" "}
          <strong className="text-teal-dark">{formatBRL(route.fromPrice)}</strong>
        </p>
      )}

      {/* Travelpayouts White Label widget mounts here, prefilled. */}
      <div className="mt-6 rounded-[20px] border border-dashed border-divider bg-surface p-8 text-center">
        <p className="font-display font-bold text-ink">Widget de busca da Travelpayouts</p>
        <p className="mt-1 text-sm text-muted">
          Embute aqui o White Label pre-preenchido para {route.origin} &rarr; {route.destination}.
        </p>
        <Link
          href={`/buscar?origin=${route.origin}&destination=${route.destination}`}
          className="btn-coral mt-5 inline-flex items-center gap-2 rounded-[15px] px-6 py-3 text-sm font-bold text-white"
        >
          <Icon name="search" size={18} stroke={2.4} color="#fff" /> Buscar voos {route.origin} &rarr; {route.destination}
        </Link>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold tracking-tight">
          Melhor epoca para voar de {o.city} para {d.city}
        </h2>
        <p className="mt-2 leading-relaxed text-muted">
          Escreva aqui conteudo unico e util sobre a rota: melhores meses,
          companhias que operam o trecho, duracao media do voo e dicas para
          economizar. Esse conteudo e o que faz a pagina ranquear no Google para
          buscas como &quot;voos baratos {route.origin} {route.destination}&quot;.
        </p>
      </section>
    </article>
  );
}
