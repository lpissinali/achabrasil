"use client";

import { useState } from "react";
import { AIRPORTS } from "@/lib/airports";

export default function AlertForm() {
  const options = Object.values(AIRPORTS);
  const [origin, setOrigin] = useState("GRU");
  const [destination, setDestination] = useState("SSA");
  const [email, setEmail] = useState("");
  const [target, setTarget] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/alertas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin,
          destination,
          email,
          targetPrice: target ? Number(target) : null,
        }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-ink outline-none focus:border-teal";

  if (status === "ok") {
    return (
      <div className="rounded-2xl bg-teal/10 p-6 text-center">
        <p className="font-display text-lg font-bold text-teal-dark">
          Alerta criado! ✈️
        </p>
        <p className="mt-1 text-sm text-muted">
          Vamos te avisar em <strong>{email}</strong> quando o preço baixar.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
            Origem
          </span>
          <select value={origin} onChange={(e) => setOrigin(e.target.value)} className={fieldClass}>
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
          <select value={destination} onChange={(e) => setDestination(e.target.value)} className={fieldClass}>
            {options.map((a) => (
              <option key={a.iata} value={a.iata}>
                {a.city} ({a.iata})
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
          Seu e-mail
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
          className={fieldClass}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
          Me avise abaixo de (R$) — opcional
        </span>
        <input
          type="number"
          inputMode="numeric"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="300"
          className={fieldClass}
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-xl bg-coral px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
      >
        {status === "loading" ? "Criando..." : "Criar alerta"}
      </button>
      {status === "error" && (
        <p className="text-sm text-coral">
          Algo deu errado. Tente novamente em instantes.
        </p>
      )}
    </form>
  );
}
