"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];
const MONTHS = [
  "janeiro", "fevereiro", "marco", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

function fmt(iso: string): string {
  if (!iso) return "Selecionar";
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short" })
    .format(new Date(y, m - 1, d))
    .replace(".", "");
}

function toISO(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export default function DatePicker({
  label,
  value,
  onChange,
  min,
  align = "left",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  min?: string;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const init = value ? new Date(value + "T00:00:00") : today;
  const [view, setView] = useState({ y: init.getFullYear(), m: init.getMonth() });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const firstDay = new Date(view.y, view.m, 1).getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const minISO = min ?? toISO(today.getFullYear(), today.getMonth(), today.getDate());

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function move(delta: number) {
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  }

  return (
    <div ref={ref} className="relative flex flex-1 items-center gap-3 px-3 py-2.5 lg:px-5">
      <Icon name="cal" size={20} color="var(--teal)" />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="min-w-0 flex-1 text-left"
      >
        <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-2">
          {label}
        </div>
        <div className={`truncate text-[16px] font-bold ${value ? "text-ink" : "text-muted-2"}`}>
          {fmt(value)}
        </div>
      </button>

      {open && (
        <div className={`absolute top-full z-50 mt-2 w-[280px] rounded-2xl border border-line bg-surface p-3 shadow-[0_12px_40px_rgba(20,40,36,0.18)] ${align === "right" ? "right-0" : "left-0"}`}>
          <div className="mb-2 flex items-center justify-between px-1">
            <button
              type="button"
              onClick={() => move(-1)}
              className="grid h-8 w-8 place-items-center rounded-lg hover:bg-teal-soft"
              aria-label="Mes anterior"
            >
              <Icon name="chevR" size={16} color="var(--ink)" style={{ transform: "rotate(180deg)" }} />
            </button>
            <span className="font-display text-sm font-bold capitalize">
              {MONTHS[view.m]} {view.y}
            </span>
            <button
              type="button"
              onClick={() => move(1)}
              className="grid h-8 w-8 place-items-center rounded-lg hover:bg-teal-soft"
              aria-label="Proximo mes"
            >
              <Icon name="chevR" size={16} color="var(--ink)" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {WEEKDAYS.map((w, i) => (
              <div key={i} className="grid h-8 place-items-center text-[11px] font-bold text-muted-2">
                {w}
              </div>
            ))}
            {cells.map((d, i) => {
              if (d === null) return <div key={i} />;
              const iso = toISO(view.y, view.m, d);
              const selected = iso === value;
              const disabled = iso < minISO;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={`grid h-9 place-items-center rounded-lg text-[13px] font-semibold transition-colors ${
                    selected
                      ? "bg-coral text-white"
                      : disabled
                        ? "text-muted-2/40"
                        : "hover:bg-teal-soft text-ink"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
