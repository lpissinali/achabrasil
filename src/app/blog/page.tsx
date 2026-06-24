import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { POSTS, formatPostDate } from "@/lib/blog";
import { GRADIENT } from "@/lib/destinations";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog - dicas de viagem e passagens baratas",
  description:
    "Dicas práticas para economizar em passagens aéreas: melhor época para comprar, regras de bagagem da GOL, LATAM e Azul, e como achar voos baratos.",
  alternates: { canonical: `${SITE.url}/blog` },
  openGraph: {
    type: "website",
    title: "Blog - dicas de viagem e passagens baratas",
    description:
      "Dicas práticas para economizar em passagens aéreas: melhor época para comprar, regras de bagagem da GOL, LATAM e Azul, e como achar voos baratos.",
    url: `${SITE.url}/blog`,
    siteName: SITE.name,
    locale: "pt_BR",
  },
};

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 py-12 sm:px-14">
      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-[40px]">
        Blog do AchaBrasil
      </h1>
      <p className="mt-2 max-w-2xl text-muted">
        Dicas práticas para viajar pagando menos: quando comprar, como achar
        ofertas e o que você precisa saber antes de embarcar.
      </p>

      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group flex flex-col overflow-hidden rounded-[22px] border border-line bg-surface transition-shadow hover:shadow-lg"
          >
            <div
              className="flex h-[150px] items-end p-4"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.45)), url('/blog/${p.slug}.jpg'), ${GRADIENT[p.tone]}`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span className="rounded-full bg-white/90 px-3 py-1 text-[12px] font-bold text-ink">
                {p.readMins} min de leitura
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="text-[12.5px] font-semibold text-muted-2">{formatPostDate(p.date)}</div>
              <h2 className="mt-1.5 font-display text-[19px] font-bold leading-tight tracking-tight">
                {p.title}
              </h2>
              <p className="mt-2 flex-1 text-[14px] leading-snug text-muted">{p.excerpt}</p>
              <span className="mt-3 flex items-center gap-1 text-[14px] font-bold text-teal transition-transform group-hover:translate-x-0.5">
                Ler artigo <Icon name="chevR" size={15} stroke={2.4} color="var(--teal)" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
