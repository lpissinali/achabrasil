import type { Metadata } from "next";
import Link from "next/link";
import { AIRPORTS } from "@/lib/airports";

export const metadata: Metadata = {
  title: "Destinos no Brasil",
  description:
    "Descubra destinos incríveis pelo Brasil e encontre voos e hotéis baratos para sua próxima viagem.",
};

export default function DestinosIndex() {
  const cities = Object.values(AIRPORTS);
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">
        Destinos pelo Brasil
      </h1>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((a) => (
          <Link
            key={a.iata}
            href={`/destinos/${a.iata.toLowerCase()}`}
            className="rounded-2xl border border-line bg-white p-5 hover:shadow-md"
          >
            <span className="font-display text-lg font-bold">{a.city}</span>
            <p className="mt-1 text-sm text-muted">
              {a.state} · {a.iata}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
