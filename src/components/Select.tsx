"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

export type Option = { value: string; label: string; sub?: string };

/**
 * Custom styled dropdown (replaces native <select>) so it matches the
 * brand. Trigger shows icon + label + selected value; popover lists options.
 */
export default function Select({
  icon,
  label,
  value,
  options,
  onChange,
  align = "left",
}: {
  icon: string;
  label: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={ref} className="relative flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2.5 lg:px-4">
      <Icon name={icon} size={20} color="var(--teal)" />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex min-w-0 flex-1 items-center justify-between gap-1 text-left"
      >
        <span className="min-w-0">
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted-2">
            {label}
          </span>
          <span className="block truncate text-[16px] font-bold text-ink">
            {selected?.label ?? "Selecionar"}
          </span>
        </span>
        <Icon name="chevD" size={16} color="var(--muted-2)" />
      </button>

      {open && (
        <div
          className={`absolute top-full z-50 mt-2 max-h-72 w-[260px] overflow-y-auto rounded-2xl border border-line bg-surface p-1.5 shadow-[0_12px_40px_rgba(20,40,36,0.18)] ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {options.map((o) => {
            const sel = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-[14px] transition-colors ${
                  sel ? "bg-teal-soft font-bold text-teal-dark" : "font-semibold text-ink hover:bg-line"
                }`}
              >
                <span className="min-w-0 truncate">
                  {o.label}
                  {o.sub && <span className="ml-1 text-[12px] font-medium text-muted-2">{o.sub}</span>}
                </span>
                {sel && <Icon name="check" size={16} stroke={2.6} color="var(--teal)" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
