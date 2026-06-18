import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import MeSurpreenda from "@/components/MeSurpreenda";
import Icon from "@/components/Icon";
import DestinationCard from "@/components/DestinationCard";
import { ROUTES, routeSlug } from "@/lib/routes";
import { airport } from "@/lib/airports";
import { offersFromCity } from "@/lib/tp-data";
import { destMeta, GRADIENT } from "@/lib/destinations";
import { POSTS, formatPostDate } from "@/lib/blog";
import { formatBRL } from "@/lib/site";

export const revalidate = 1800;

const AIRLINES: [string, string][] = [
  ["GOL", "#FF6B57"],
  ["LATAM", "#0A6F66"],
  ["Azul", "#0E9B8E"],
];

const STEPS: { icon: string; title: string; text: string }[] = [
  { icon: "search", title: "1. Busque", text: "Informe origem, destino e datas (ou o mês inteiro, se for flexível)." },
  { icon: "swap", title: "2. Compare", text: "Mostramos os preços da GOL, LATAM, Azul e +20 companhias, em reais." },
  { icon: "check", title: "3. Reserve", text: "Você é levado ao parceiro para concluir a compra em ambiente seguro." },
];

const WHY: { icon: string; title: string; text: string }[] = [
  { icon: "bolt", title: "Melhor preço, rápido", text: "Comparamos dezenas de companhias em segundos — você vê logo o mais barato." },
  { icon: "check", title: "Sem taxas escondidas", text: "O preço que você vê é o que importa. Nada de surpresa no checkout." },
  { icon: "bell", title: "Alertas grátis", text: "Avisamos por e-mail quando o preço da sua rota cair. Sem custo." },
  { icon: "heart", title: "Feito pro Brasil", text: "Tudo em português e em reais, pensado para quem viaja pelo país." },
];

const FAQ = [
  { q: "O AchaBrasil é grátis?", a: "Sim. Buscar e comparar voos é 100% gratuito. Ganhamos uma pequena comissão do parceiro quando você reserva, sem custo adicional para você." },
  { q: "Vocês vendem as passagens?", a: "Não. Somos um comparador: mostramos o melhor preço e você finaliza a compra diretamente no site do parceiro, em ambiente seguro." },
  { q: "Os preços estão em reais?", a: "Sim, todos os valores são exibidos em reais (BRL). São preços 'a partir de', coletados das buscas mais recentes e sujeitos a alteração." },
  { q: "Como consigo o melhor preço?", a: "Seja flexível com as datas, compre com antecedência, voe no meio da semana e crie um alerta de preço para ser avisado quando a tarifa cair." },
];

const SECTION = "mx-auto max-w-[1232px] px-5 sm:px-14";

function SecHead({ title, link, href }: { title: string; link: string; href: string }) {
  return (
    <div className="mb-5 flex items-baseline justify-between">
      <h2 className="font-display text-2xl font-bold tracking-tight sm:text-[28px]">{title}</h2>
      <Link href={href} className="flex items-center gap-1 text-[15px] font-semibold text-teal">
        {link} <Icon name="chevR" size={16} stroke={2.4} color="var(--teal)" />
      </Link>
    </div>
  );
}

export default async function Home() {
  const popular = ROUTES.filter((r) => r.popular);
  const allOffers = await offersFromCity("SAO");
  const deals = allOffers.filter((o) => o.domestic).slice(0, 4);
  const posts = POSTS.slice(0, 3);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(14,155,142,0.10),rgba(14,155,142,0)_70%)]" />
          <div className="absolute -left-24 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,107,87,0.09),rgba(255,107,87,0)_70%)]" />
        </div>
        <div className={`${SECTION} relative pt-12 text-center sm:pt-16`}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-3.5 py-1.5 text-[13px] font-bold text-teal-dark">
            <Icon name="bolt" size={14} stroke={2.4} color="var(--teal-dark)" /> Voos domesticos a partir de R$ 98
          </span>
          <h1 className="mx-auto mt-5 max-w-[820px] font-display text-[38px] font-extrabold leading-[1.03] tracking-tight sm:text-[58px]">
            Passagens baratas, <span className="text-teal">sem complicacao.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[580px] text-[17px] text-muted sm:text-[19px]">
            Comparamos GOL, LATAM, Azul e +20 companhias em segundos. Voce so escolhe o melhor preco.
          </p>

          <div className="mt-9">
            <SearchForm />
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 pl-1 text-left">
              <div className="flex items-center gap-2.5">
                <span className="text-[13.5px] font-semibold text-[#6A7B77]">Comparamos</span>
                <div className="flex flex-wrap gap-1.5">
                  {AIRLINES.map(([n, c]) => (
                    <span key={n} className="rounded-lg bg-surface px-2.5 py-1 font-display text-[12.5px] font-extrabold shadow-sm" style={{ color: c }}>
                      {n}
                    </span>
                  ))}
                  <span className="self-center text-[12.5px] font-bold text-muted-2">+ 20</span>
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-muted">
                <Icon name="check" size={16} stroke={2.6} color="var(--teal)" /> Sem taxas escondidas
              </span>
              <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-muted">
                <Icon name="check" size={16} stroke={2.6} color="var(--teal)" /> Alerta de preco gratis
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className={`${SECTION} mt-14 grid gap-5 lg:grid-cols-[1.25fr_1fr]`}>
        <MeSurpreenda />
        <div className="flex flex-col justify-center rounded-[26px] border border-line bg-surface p-8">
          <div className="mb-4 grid h-14 w-14 place-items-center rounded-[17px] bg-[#fff3c9]">
            <Icon name="sun" size={30} color="#d99b00" />
          </div>
          <h3 className="font-display text-[22px] font-bold tracking-tight sm:text-2xl">
            Bora no fim de semana?
          </h3>
          <p className="mb-5 mt-2 text-[15px] leading-snug text-muted">
            Sai sexta, volta domingo. Achamos o destino mais barato saindo da sua cidade.
          </p>
          <Link href="/ofertas" className="flex w-fit items-center gap-2 rounded-xl border-[1.5px] border-teal px-5 py-3 text-[15px] font-bold text-teal-dark transition-colors hover:bg-teal-soft">
            Achar escapada <Icon name="arrow" size={17} stroke={2.4} color="var(--teal-dark)" />
          </Link>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className={`${SECTION} mt-16`}>
        <h2 className="text-center font-display text-2xl font-bold tracking-tight sm:text-[28px]">
          Como funciona
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-muted">
          Achar passagem barata em três passos — sem cadastro e sem complicação.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.title} className="rounded-[20px] border border-line bg-surface p-6">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-[14px] bg-teal-soft">
                <Icon name={s.icon} size={22} color="var(--teal)" />
              </div>
              <div className="font-display text-lg font-bold">{s.title}</div>
              <p className="mt-1.5 text-[14.5px] leading-snug text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ROTAS MAIS BUSCADAS */}
      <section className={`${SECTION} mt-16`}>
        <SecHead title="Rotas mais buscadas" link="Todas as rotas" href="/voos" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((r) => {
            const o = airport(r.origin)!;
            const d = airport(r.destination)!;
            return (
              <Link key={routeSlug(r)} href={`/voos/${routeSlug(r)}`} className="flex items-center gap-4 rounded-[18px] border border-line bg-surface px-5 py-4 transition-shadow hover:shadow-md">
                <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-[13px] bg-teal-soft">
                  <Icon name="planeUp" size={20} color="var(--teal)" style={{ transform: "rotate(45deg)" }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-base font-bold">{o.city} &rarr; {d.city}</div>
                  <div className="mt-0.5 text-[13px] text-muted-2">{r.airline} · ida e volta</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-semibold text-muted-2">a partir de</div>
                  <div className="whitespace-nowrap font-display text-xl font-extrabold text-teal-dark">{formatBRL(r.fromPrice)}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* OFERTAS DO DIA */}
      {deals.length > 0 && (
        <section className={`${SECTION} mt-16`}>
          <SecHead title="Ofertas do dia" link="Ver todas as ofertas" href="/ofertas" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {deals.map((o, i) => {
              const m = destMeta(o.cityCode, i);
              return <DestinationCard key={o.cityCode} iata={m.iata} name={o.name} where={m.where} tone={m.tone} price={o.price} />;
            })}
          </div>
        </section>
      )}

      {/* POR QUE ACHABRASIL */}
      <section className={`${SECTION} mt-16`}>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-[28px]">
          Por que usar o AchaBrasil?
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div key={w.title} className="rounded-[20px] border border-line bg-surface p-6">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-[14px] bg-teal-soft">
                <Icon name={w.icon} size={22} color="var(--teal)" />
              </div>
              <div className="font-display text-[16px] font-bold leading-tight">{w.title}</div>
              <p className="mt-1.5 text-[14px] leading-snug text-muted">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DO BLOG */}
      <section className={`${SECTION} mt-16`}>
        <SecHead title="Dicas pra viajar pagando menos" link="Ver o blog" href="/blog" />
        <div className="grid gap-5 sm:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col overflow-hidden rounded-[22px] border border-line bg-surface transition-shadow hover:shadow-lg">
              <div className="flex h-[120px] items-end p-4" style={{ background: GRADIENT[p.tone] }}>
                <span className="rounded-full bg-white/90 px-3 py-1 text-[12px] font-bold text-ink">{p.readMins} min</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="text-[12.5px] font-semibold text-muted-2">{formatPostDate(p.date)}</div>
                <h3 className="mt-1.5 font-display text-[17px] font-bold leading-tight tracking-tight">{p.title}</h3>
                <span className="mt-3 flex items-center gap-1 text-[14px] font-bold text-teal transition-transform group-hover:translate-x-0.5">
                  Ler artigo <Icon name="chevR" size={15} stroke={2.4} color="var(--teal)" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className={`${SECTION} mt-16`}>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-[28px]">Perguntas frequentes</h2>
        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-[18px] border border-line bg-surface p-5">
              <div className="font-display text-[16px] font-bold">{f.q}</div>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICE ALERT BANNER */}
      <section className={`${SECTION} mb-4 mt-16`}>
        <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[26px] bg-ink p-8 sm:p-12 lg:flex-row lg:items-center">
          <Icon name="bell" size={200} color="rgba(255,255,255,0.05)" style={{ position: "absolute", right: 40, top: -30 }} />
          <div className="relative">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-[28px]">
              Te avisamos quando o preco cair.
            </h2>
            <p className="mt-2 text-base text-white/60">
              Escolha sua rota e o valor que quer pagar. Sem cadastro - so o seu e-mail.
            </p>
          </div>
          <Link href="/alertas" className="relative flex flex-shrink-0 gap-2.5">
            <span className="hidden h-14 items-center rounded-[14px] bg-white/10 px-5 text-[15.5px] font-medium text-white/60 sm:flex">
              seu@email.com
            </span>
            <span className="flex h-14 items-center gap-2 whitespace-nowrap rounded-[14px] bg-sun px-6 font-display text-base font-extrabold text-[#5a4a0a]">
              <Icon name="bell" size={18} stroke={2.4} color="#5a4a0a" /> Criar alerta
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
