import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import MeSurpreenda from "@/components/MeSurpreenda";
import Icon from "@/components/Icon";
import Placeholder from "@/components/Placeholder";
import { ROUTES, routeSlug } from "@/lib/routes";
import { airport } from "@/lib/airports";
import { formatBRL } from "@/lib/site";

const AIRLINES: [string, string][] = [
  ["GOL", "#FF6B57"],
  ["LATAM", "#0A6F66"],
  ["Azul", "#0E9B8E"],
];

const OFERTAS: [string, "coral" | "sun" | "teal" | "ink", number, number][] = [
  ["Salvador", "coral", 189, 38],
  ["Porto Seguro", "sun", 229, 31],
  ["Recife", "teal", 214, 27],
  ["Fernando de Noronha", "ink", 612, 22],
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

export default function Home() {
  const popular = ROUTES.filter((r) => r.popular);

  return (
    <>
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

          {/* SEARCH */}
          <div className="mx-auto mt-9 max-w-[1060px]">
            <SearchForm />
            {/* trust row */}
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 pl-1 text-left">
              <div className="flex items-center gap-2.5">
                <span className="text-[13.5px] font-semibold text-[#6A7B77]">Comparamos</span>
                <div className="flex flex-wrap gap-1.5">
                  {AIRLINES.map(([n, c]) => (
                    <span
                      key={n}
                      className="rounded-lg bg-surface px-2.5 py-1 font-display text-[12.5px] font-extrabold shadow-sm"
                      style={{ color: c }}
                    >
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
          <Link
            href="/buscar?weekend=1"
            className="flex w-fit items-center gap-2 rounded-xl border-[1.5px] border-teal px-5 py-3 text-[15px] font-bold text-teal-dark transition-colors hover:bg-teal-soft"
          >
            Achar escapada <Icon name="arrow" size={17} stroke={2.4} color="var(--teal-dark)" />
          </Link>
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
                  <div className="mt-0.5 text-[13px] text-muted-2">{r.airline} · ida e volta</div>
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
      </section>

      {/* OFERTAS DO DIA */}
      <section className={`${SECTION} mt-16`}>
        <SecHead title="Ofertas do dia" link="Ver todas as ofertas" href="/destinos" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OFERTAS.map(([city, tone, price, off]) => (
            <div key={city} className="overflow-hidden rounded-[20px] border border-line bg-surface">
              <div className="relative">
                <Placeholder label={`foto ${city.toLowerCase()}`} tone={tone} />
                <span className="absolute left-3 top-3 rounded-full bg-sun px-2.5 py-1 text-[12.5px] font-extrabold text-[#5a4a0a]">
                  -{off}%
                </span>
                <span className="absolute right-3 top-3 grid h-[34px] w-[34px] place-items-center rounded-full bg-white/90">
                  <Icon name="heart" size={17} color="var(--coral)" />
                </span>
              </div>
              <div className="px-[18px] pb-[18px] pt-4">
                <div className="font-display text-[17px] font-bold">{city}</div>
                <div className="mt-0.5 text-[13px] text-muted-2">de Sao Paulo · julho</div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-display text-[22px] font-extrabold text-teal-dark">
                    {formatBRL(price)}
                  </span>
                  <span className="text-[12.5px] text-muted-2">ida e volta</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICE ALERT BANNER */}
      <section className={`${SECTION} mb-4 mt-16`}>
        <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[26px] bg-ink p-8 sm:p-12 lg:flex-row lg:items-center">
          <Icon name="bell" size={200} color="rgba(255,255,255,0.05)" style={{ position: "absolute", right: 40, top: -30 }} />
          <div className="relative">
            <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-[28px]">
              Te avisamos quando o preco cair.
            </h3>
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
