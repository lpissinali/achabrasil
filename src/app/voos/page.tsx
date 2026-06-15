import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES, routeSlug } from "@/lib/routes";
import { airport } from "@/lib/airports";
import { formatBRL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Voos baratos pelo Brasil — todas as rotas",
  description:
    "Veja todas as rotas de voos domésticos no Brasil. Encontre passagens baratas para os principais destinos do país.",
};

export default function VoosIndex() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">
        Voos baratos pelo Brasil
      </h1>
      <p className="mt-2 max-w-xl text-muted">
        Escolha uma rota para ver preços, melhor época para viajar e dicas.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ROUTES.map((r) => {
          const o = airport(r.origin)!;
          const d = airport(r.destination)!;
          return (
            <Link
              key={routeSlug(r)}
              href={`/voos/${routeSlug(r)}`}
              className="rounded-2xl border border-line bg-white p-5 hover:shadow-md"
            >
              <span className="font-display text-lg font-bold">
                {r.origin} → {r.destination}
              </span>
              <p className="mt-1 text-sm text-muted">
                {o.city} → {d.city} · a partir de {formatBRL(r.fromPrice)}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
