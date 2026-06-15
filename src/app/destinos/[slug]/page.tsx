import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    title: `O que fazer em ${a.city} — voos e hotéis`,
    description: `Guia de ${a.city} (${a.state}): voos baratos, hotéis e dicas de viagem.`,
    alternates: { canonical: `${SITE.url}/destinos/${slug}` },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const a = airport(slug);
  if (!a) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">
        {a.city}, {a.state}
      </h1>
      <p className="mt-2 text-muted">
        Conteúdo de destino: o que fazer, melhor época para visitar e como
        chegar a {a.city}.
      </p>

      {/* Booking.com hotel affiliate widget goes here (Phase 1/2). */}
      <div className="mt-8 rounded-2xl border border-dashed border-line bg-surface p-8 text-center text-muted">
        <p className="font-semibold text-ink">Widget de hotéis (Booking.com)</p>
        <p className="mt-1 text-sm">Comissão de 4–5% — embute o widget aqui.</p>
      </div>

      {/* eSIM affiliate (Airalo/Holafly) — only on international destinations. */}
    </article>
  );
}
