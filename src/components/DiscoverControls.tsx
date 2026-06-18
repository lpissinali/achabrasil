"use client";

import { useRouter } from "next/navigation";
import Select from "./Select";
import { ORIGIN_CITIES } from "@/lib/cities";

const BUDGETS = [
  { value: "", label: "Tanto faz" },
  { value: "200", label: "até R$ 200" },
  { value: "400", label: "R$ 400" },
  { value: "600", label: "R$ 600" },
];

const CITY_OPTIONS = ORIGIN_CITIES.map((c) => ({ value: c.code, label: c.name }));

export default function DiscoverControls({
  basePath,
  origin,
  budget,
  showBudget = false,
}: {
  basePath: string;
  origin: string;
  budget?: string;
  showBudget?: boolean;
}) {
  const router = useRouter();

  function go(nextOrigin: string, nextBudget?: string) {
    const params = new URLSearchParams({ origin: nextOrigin });
    if (showBudget && nextBudget) params.set("budget", nextBudget);
    router.push(`${basePath}?${params.toString()}`);
  }

  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex w-full rounded-[14px] border border-line bg-surface sm:w-72">
        <Select
          icon="planeUp"
          label="Saindo de"
          value={origin}
          options={CITY_OPTIONS}
          onChange={(v) => go(v, budget)}
        />
      </div>

      {showBudget && (
        <div className="flex flex-wrap gap-2">
          {BUDGETS.map((b) => {
            const active = (budget ?? "") === b.value;
            return (
              <button
                key={b.label}
                type="button"
                onClick={() => go(origin, b.value)}
                className={`rounded-full px-4 py-2 text-[13.5px] font-bold transition-colors ${
                  active ? "bg-ink text-white" : "border border-divider bg-surface text-muted"
                }`}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
