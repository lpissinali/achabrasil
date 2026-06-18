"use client";

import { useState } from "react";
import FareCard, { type Badge } from "./FareCard";
import { formatBRL } from "@/lib/site";
import type { Fare } from "@/lib/tp-data";

function dayKey(iso: string): string {
  return iso ? iso.slice(0, 10) : "";
}
function fmtDay(key: string): { d: string; m: string } {
  if (!key) return { d: "", m: "" };
  const [y, mo, da] = key.split("-").map(Number);
  const dt = new Date(y, mo - 1, da);
  return {
    d: String(da),
    m: new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(dt).replace(".", ""),
  };
}

export default function Results({
  fares,
  roundTrip,
}: {
  fares: Fare[];
  roundTrip: boolean;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  // Cheapest per departure day (for the "preços por dia" strip).
  const byDay = new Map<string, number>();
  for (const f of fares) {
    const k = dayKey(f.departureAt);
    if (!k) continue;
    byDay.set(k, Math.min(byDay.get(k) ?? Infinity, f.price));
  }
  const days = [...byDay.entries()]
    .map(([date, price]) => ({ date, price }))
    .sort((a, b) => a.date.localeCompare(b.date));
  const minPrice = days.length ? Math.min(...days.map((d) => d.price)) : 0;

  // Global badges (over all fares).
  const cheapestIdx = fares.reduce((best, f, i) => (f.price < fares[best].price ? i : best), 0);
  const fastestIdx = fares.reduce((best, f, i) => {
    const dur = f.durationMin ?? f.durationTo ?? Infinity;
    const bestDur = fares[best].durationMin ?? fares[best].durationTo ?? Infinity;
    return dur < bestDur ? i : best;
  }, 0);
  function badgeFor(i: number): Badge {
    if (i === cheapestIdx && i === fastestIdx) return "best";
    if (i === cheapestIdx) return "cheapest";
    if (i === fastestIdx) return "fastest";
    return null;
  }

  const visible = fares
    .map((f, i) => ({ f, i }))
    .filter(({ f }) => !selected || dayKey(f.departureAt) === selected);

  return (
    <>
      {days.length > 1 && (
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-[13px] font-bold uppercase tracking-wide text-muted-2">
              Melhores preços por dia
            </h2>
            {selected && (
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-[13px] font-semibold text-teal"
              >
                Limpar filtro
              </button>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {days.map(({ date, price }) => {
              const { d, m } = fmtDay(date);
              const isMin = price === minPrice;
              const active = selected === date;
              return (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelected(active ? null : date)}
                  className={`flex min-w-[84px] flex-shrink-0 flex-col items-center rounded-2xl border px-3 py-2 transition-colors ${
                    active
                      ? "border-teal bg-teal-soft"
                      : isMin
                        ? "border-teal/40 bg-surface"
                        : "border-line bg-surface hover:border-teal/40"
                  }`}
                >
                  <span className="text-[12px] font-bold text-ink">
                    {d} {m}
                  </span>
                  <span className={`font-display text-[14px] font-extrabold ${isMin ? "text-teal-dark" : "text-muted"}`}>
                    {formatBRL(price)}
                  </span>
                  {isMin && (
                    <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-teal">
                      menor
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-4">
        {visible.map(({ f, i }) => (
          <FareCard key={i} f={f} roundTrip={roundTrip} badge={badgeFor(i)} />
        ))}
      </div>
    </>
  );
}
