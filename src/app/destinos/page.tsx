import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { AIRPORTS } from "@/lib/airports";

export const metadata: Metadata = {
  title: "Destinos no Brasil",
  description:
    "Descubra destinos incriveis pelo Brasil e encontre voos e hoteis baratos para sua proxima viagem.",
};

export default function DestinosIndex() {
  const cities = Object.values(AIRPORTS);
  return (
    <div className="mx-auto max-w-[1232px] px-5 py-12 sm:px-14">
      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-[40px]">
        Destinos pelo Brasil
      </h1>
      <p className="mt-2 max-w-xl text-muted">
        Voos, hoteis e dicas para os principais destinos do pais.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((a) => (
          <Link
            key={a.iata}
            href={`/destinos/${a.iata.toLowerCase()}`}
            className="flex items-center gap-4 rounded-[18px] border border-line bg-surface px-5 py-4 transition-shadow hover:shadow-md"
          >
            <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-[13px] bg-teal-soft">
              <Icon name="pin" size={20} color="var(--teal)" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-base font-bold">{a.city}</div>
              <div className="mt-0.5 text-[13px] text-muted-2">
                {a.state} · {a.iata}
              </div>
            </div>
            <Icon name="chevR" size={18} color="var(--muted-2)" />
          </Link>
        ))}
      </div>
    </div>
  );
}
