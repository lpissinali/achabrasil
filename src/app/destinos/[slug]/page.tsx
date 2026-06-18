import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/Icon";
import LeaveNotice from "@/components/LeaveNotice";
import { AIRPORTS, airport } from "@/lib/airports";
import { cityGuide } from "@/lib/city-content";
import { GRADIENT, DEST_META } from "@/lib/destinations";
import { hotellookUrl } from "@/lib/travelpayouts";
import { lowestPrice } from "@/lib/tp-data";
import { formatBRL, SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// Pre-render all destination pages; refresh "a partir de" via ISR.
export const revalidate = 1800;

export function generateStaticParams() {
  return Object.keys(AIRPORTS).map((iata) => ({ slug: iata.toLowerCase() }));
}

// Pick a tone for the hero from shared metadata, else by intl/domestic.
function toneFor(iata: string, intl?: boolean): keyof typeof GRADIENT {
  const hit = Object.values(DEST_META).find((m) => m.iata === iata);
  if (hit) return hit.tone;
  return intl ? "ink" : "teal";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = airport(slug);
  if (!a) return {};
  const g = cityGuide(a);
  return {
    title: `${a.city} - voos baratos, o que fazer e quando ir`,
    description: `${g.tagline}. ${g.about.slice(0, 120)}... Veja voos baratos para ${a.city} e dicas de viagem.`,
    alternates: { canonical: `${SITE.url}/destinos/${slug}` },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const a = airport(slug);
  if (!a) notFound();

  const g = cityGuide(a);
  const tone = toneFor(a.iata, a.intl);
  const heroBg = `linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.6)), url('/destinos/${a.iata.toLowerCase()}.jpg'), ${GRADIENT[tone]}`;

  // "a partir de" from São Paulo (best-effort; null if no cached fare).
  const from = a.iata === "GRU" || a.iata === "CGH" ? null : await lowestPrice("SAO", a.iata);
  const searchUrl = `/buscar?origin=GRU&destination=${a.iata}`;
  const hotelUrl = hotellookUrl(a.city);

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <nav className="flex items-center gap-1 text-sm text-muted">
        <Link href="/destinos" className="hover:text-ink">Destinos</Link>
        <Icon name="chevR" size={14} color="var(--muted-2)" />
        <span>{a.city}</span>
      </nav>

      {/* HERO */}
      <div
        className="relative mt-3 flex min-h-[220px] flex-col justify-end overflow-hidden rounded-[24px] p-6 sm:min-h-[260px] sm:p-8"
        style={{ backgroundImage: heroBg, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
          {a.intl ? a.state : `${a.state} · Brasil`}
        </span>
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-none tracking-tight text-white drop-shadow sm:text-5xl">
          {a.city}
        </h1>
        <p className="mt-1.5 text-[15px] font-semibold text-white/90">{g.tagline}</p>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link
          href={searchUrl}
          className="flex items-center justify-between rounded-[18px] border border-line bg-surface px-5 py-4 transition-shadow hover:shadow-md"
        >
          <span className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-teal-soft">
              <Icon name="planeUp" size={20} color="var(--teal)" style={{ transform: "rotate(45deg)" }} />
            </span>
            <span>
              <span className="block font-bold text-ink">Voos para {a.city}</span>
              <span className="block text-[13px] text-muted-2">
                {from ? `a partir de ${formatBRL(from)} de São Paulo` : "ver preços e datas"}
              </span>
            </span>
          </span>
          <Icon name="chevR" size={18} stroke={2.4} color="var(--teal)" />
        </Link>

        <a
          href={hotelUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex items-center justify-between rounded-[18px] border border-line bg-surface px-5 py-4 transition-shadow hover:shadow-md"
        >
          <span className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[#fff3c9]">
              <Icon name="bed" size={20} color="#d99b00" />
            </span>
            <span>
              <span className="block font-bold text-ink">Hotéis em {a.city}</span>
              <span className="block text-[13px] text-muted-2">comparar preços e ofertas</span>
            </span>
          </span>
          <Icon name="chevR" size={18} stroke={2.4} color="#d99b00" />
        </a>
      </div>

      {/* ABOUT */}
      <section className="mt-9">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          Sobre {a.city}
        </h2>
        <p className="mt-2 leading-relaxed text-muted">{g.about}</p>
      </section>

      {/* HIGHLIGHTS */}
      <section className="mt-8">
        <h2 className="font-display text-2xl font-bold tracking-tight">O que fazer</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {g.highlights.map((h) => (
            <div key={h.title} className="rounded-[18px] border border-line bg-surface p-5">
              <div className="mb-2 grid h-9 w-9 place-items-center rounded-[11px] bg-teal-soft">
                <Icon name="pin" size={17} color="var(--teal)" />
              </div>
              <div className="font-display text-[15px] font-bold leading-tight">{h.title}</div>
              <p className="mt-1.5 text-[13.5px] leading-snug text-muted">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BEST TIME */}
      <section className="mt-8 rounded-[20px] bg-teal-soft p-6">
        <div className="flex items-center gap-2">
          <Icon name="sun" size={20} color="var(--teal-dark)" />
          <h2 className="font-display text-lg font-bold tracking-tight text-teal-dark">
            Melhor época para visitar
          </h2>
        </div>
        <p className="mt-2 leading-relaxed text-teal-dark/90">{g.bestTime}</p>
      </section>

      {/* CTA */}
      <section className="mt-8 flex flex-col items-center gap-3 rounded-[22px] border border-line bg-surface p-7 text-center">
        <h2 className="font-display text-xl font-bold tracking-tight">
          Pronto para conhecer {a.city}?
        </h2>
        <p className="max-w-md text-sm text-muted">
          Compare voos da GOL, LATAM e Azul e ache a melhor data para viajar
          {from ? ` — passagens a partir de ${formatBRL(from)}.` : "."}
        </p>
        <Link
          href={searchUrl}
          className="btn-coral mt-1 inline-flex items-center gap-2 rounded-[15px] px-6 py-3 text-sm font-bold text-white"
        >
          <Icon name="search" size={18} stroke={2.4} color="#fff" /> Buscar voos para {a.city}
        </Link>
      </section>
    </article>
  );
}
