import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import { ROUTES, routeSlug } from "@/lib/routes";
import { airport } from "@/lib/airports";
import { formatBRL } from "@/lib/site";

export default function Home() {
  const popular = ROUTES.filter((r) => r.popular);

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-b from-teal/10 to-background">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-12 sm:pt-16">
          <h1 className="max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Acha as passagens mais baratas do Brasil.
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted sm:text-lg">
            Compare voos da GOL, LATAM e Azul, descubra o melhor dia para voar e
            economize de verdade. Tudo em portugues, em reais.
          </p>
          <div className="mt-8">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* POPULAR ROUTES */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Rotas mais buscadas
          </h2>
          <Link href="/voos" className="text-sm font-semibold text-teal hover:underline">
            Ver todas
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((r) => {
            const o = airport(r.origin)!;
            const d = airport(r.destination)!;
            return (
              <Link
                key={routeSlug(r)}
                href={`/voos/${routeSlug(r)}`}
                className="group rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold">
                    {r.origin} &rarr; {r.destination}
                  </span>
                  <span className="text-coral transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {o.city} para {d.city}
                </p>
                <p className="mt-3 text-sm text-muted">
                  a partir de{" "}
                  <strong className="text-ink">{formatBRL(r.fromPrice)}</strong>
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* DISCOVERY CTAS */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-ink p-7 text-white">
            <h3 className="font-display text-xl font-bold">Me surpreenda</h3>
            <p className="mt-2 text-sm text-white/70">
              Escolha sua cidade e seu orcamento e a gente mostra todos os
              destinos que cabem no bolso.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-sun">
              Em breve
            </span>
          </div>
          <div className="rounded-2xl bg-teal p-7 text-white">
            <h3 className="font-display text-xl font-bold">
              Escapada de fim de semana
            </h3>
            <p className="mt-2 text-sm text-white/80">
              Sai sexta, volta domingo. Achamos os voos mais baratos para curtir
              o fim de semana fora.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-white">
              Em breve
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
