"use client";

import { useState } from "react";
import { AIRPORTS } from "@/lib/airports";

/**
 * Flight search form.
 *
 * Phase 1: in production this is where you embed the Travelpayouts
 * White Label search widget (a <script> + container div). This native
 * form is the SEO-friendly fallback / placeholder and submits to the
 * /buscar results page where the widget renders prefilled results.
 */
export default function SearchForm() {
  const options = Object.values(AIRPORTS);
  const [origin, setOrigin] = useState("GRU");
  const [destination, setDestination] = useState("SSA");
  const [date, setDate] = useState("");
  const [pax, setPax] = useState(1);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      origin,
      destination,
      date,
      pax: String(pax),
    });
    window.location.href = `/buscar?${params.toString()}`;
  }

  const fieldClass =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-ink outline-none focus:border-teal";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-2xl bg-white p-4 shadow-lg shadow-ink/5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto_auto]"
    >
      <label className="block">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
          Origem
        </span>
        <select
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className={fieldClass}
        >
          {options.map((a) => (
            <option key={a.iata} value={a.iata}>
              {a.city} ({a.iata})
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
          Destino
        </span>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className={fieldClass}
        >
          {options.map((a) => (
            <option key={a.iata} value={a.iata}>
              {a.city} ({a.iata})
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
          Ida
        </span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={fieldClass}
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
          Passageiros
        </span>
        <select
          value={pax}
          onChange={(e) => setPax(Number(e.target.value))}
          className={fieldClass}
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="self-end rounded-xl bg-coral px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-95"
      >
        Buscar voos
      </button>
    </form>
  );
}
