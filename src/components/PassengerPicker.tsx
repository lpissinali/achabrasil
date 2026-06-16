"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

export type Pax = { adults: number; children: number; infants: number };

const ROWS: { key: keyof Pax; label: string; sub: string; min: number }[] = [
  { key: "adults", label: "Adultos", sub: "12+ anos", min: 1 },
  { key: "children", label: "Criancas", sub: "2-11 anos", min: 0 },
  { key: "infants", label: "Bebes", sub: "ate 2 anos", min: 0 },
];

export function paxSummary(p: Pax): string {
  const parts = [`${p.adults} ${p.adults === 1 ? "adulto" : "adultos"}`];
  if (p.children) parts.push(`${p.children} ${p.children === 1 ? "crianca" : "criancas"}`);
  if (p.infants) parts.push(`${p.infants} ${p.infants === 1 ? "bebe" : "bebes"}`);
  return parts.join(", ");
}

export default function PassengerPicker({
  value,
  onChange,
}: {
  value: Pax;
  onChange: (p: Pax) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  function step(key: keyof Pax, delta: number, min: number) {
    const next = Math.max(min, Math.min(9, value[key] + delta));
    onChange({ ...value, [key]: next });
  }

  return (
    <div ref={ref} className="relative flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2.5 lg:px-4">
      <Icon name="user" size={20} color="var(--teal)" />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex min-w-0 flex-1 items-center justify-between gap-1 text-left"
      >
        <span className="min-w-0">
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted-2">
            Passageiros
          </span>
          <span className="block truncate text-[16px] font-bold text-ink">
            {paxSummary(value)}
          </span>
        </span>
        <Icon name="chevD" size={16} color="var(--muted-2)" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[280px] rounded-2xl border border-line bg-surface p-2 shadow-[0_12px_40px_rgba(20,40,36,0.18)]">
          {ROWS.map((r) => (
            <div key={r.key} className="flex items-center justify-between gap-3 px-2 py-2.5">
              <div>
                <div className="text-[14px] font-bold text-ink">{r.label}</div>
                <div className="text-[12px] text-muted-2">{r.sub}</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => step(r.key, -1, r.min)}
                  disabled={value[r.key] <= r.min}
                  aria-label={`Menos ${r.label}`}
                  className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink transition-colors hover:border-teal hover:text-teal disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Icon name="minus" size={16} stroke={2.4} />
                </button>
                <span className="w-4 text-center text-[15px] font-bold tabular-nums">
                  {value[r.key]}
                </span>
                <button
                  type="button"
                  onClick={() => step(r.key, 1, r.min)}
                  disabled={value[r.key] >= 9}
                  aria-label={`Mais ${r.label}`}
                  className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink transition-colors hover:border-teal hover:text-teal disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Icon name="plus" size={16} stroke={2.4} />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-1 w-full rounded-xl bg-teal-soft py-2.5 text-[14px] font-bold text-teal-dark"
          >
            Aplicar
          </button>
        </div>
      )}
    </div>
  );
}
