import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { ROUTES, routeSlug } from "@/lib/routes";
import { airport } from "@/lib/airports";
import { formatBRL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Voos baratos pelo Brasil - todas as rotas",
  description:
    "Veja todas as rotas de voos domesticos no Brasil. Encontre passagens baratas para os principais destinos do pais.",
};

export default function VoosIndex() {
  return (
    <div className="mx-auto max-w-[1232px] px-5 py-12 sm:px-14">
      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-[40px]">
        Voos baratos pelo Brasil
      </h1>
      <p className="mt-2 max-w-xl text-muted">
        Escolha uma rota para ver precos, melhor epoca para viajar e dicas.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ROUTES.map((r) => {
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
                <div className="mt-0.5 text-[13px] text-muted-2">
                  {r.airline ? `${r.airline} · ` : ""}ida e volta
                </div>
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
    </div>
  );
}
