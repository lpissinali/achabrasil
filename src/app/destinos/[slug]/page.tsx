import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/Icon";
import { AIRPORTS, airport } from "@/lib/airports";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(AIRPORTS).map((iata) => ({ slug: iata.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = airport(slug);
  if (!a) return {};
  return {
    title: `O que fazer em ${a.city} - voos e hoteis`,
    description: `Guia de ${a.city} (${a.state}): voos baratos, hoteis e dicas de viagem.`,
    alternates: { canonical: `${SITE.url}/destinos/${slug}` },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const a = airport(slug);
  if (!a) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <nav className="flex items-center gap-1 text-sm text-muted">
        <Link href="/destinos" className="hover:text-ink">Destinos</Link>
        <Icon name="chevR" size={14} color="var(--muted-2)" />
        <span>{a.city}</span>
      </nav>

      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-[40px]">
        {a.city}, {a.state}
      </h1>
      <p className="mt-2 text-muted">
        Conteudo de destino: o que fazer, melhor epoca para visitar e como chegar
        a {a.city}.
      </p>

      {/* Booking.com hotel affiliate widget (Phase 1/2). */}
      <div className="mt-8 rounded-[20px] border border-dashed border-divider bg-surface p-8 text-center">
        <p className="font-display font-bold text-ink">Widget de hoteis (Booking.com)</p>
        <p className="mt-1 text-sm text-muted">Comissao de 4-5% - embute o widget aqui.</p>
      </div>
    </article>
  );
}
