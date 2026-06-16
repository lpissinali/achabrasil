"use client";

import { useState } from "react";
import { AIRPORTS } from "@/lib/airports";
import Icon from "./Icon";

export default function AlertForm() {
  const options = Object.values(AIRPORTS);
  const [origin, setOrigin] = useState("GRU");
  const [destination, setDestination] = useState("SSA");
  const [email, setEmail] = useState("");
  const [target, setTarget] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

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

  const field =
    "w-full rounded-[14px] border border-line bg-surface px-4 py-3.5 text-[15px] font-semibold text-ink outline-none focus:border-teal";
  const lbl = "mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted-2";

  if (status === "ok") {
    return (
      <div className="rounded-[20px] bg-teal-soft p-8 text-center">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-teal">
          <Icon name="check" size={24} stroke={3} color="#fff" />
        </div>
        <p className="font-display text-lg font-bold text-teal-dark">Alerta criado!</p>
        <p className="mt-1 text-sm text-muted">
          Vamos te avisar em <strong className="text-ink">{email}</strong> quando o preco baixar.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-[20px] border border-line bg-surface p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={lbl}>Origem</span>
          <select value={origin} onChange={(e) => setOrigin(e.target.value)} className={field}>
            {options.map((a) => (
              <option key={a.iata} value={a.iata}>{a.city} ({a.iata})</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={lbl}>Destino</span>
          <select value={destination} onChange={(e) => setDestination(e.target.value)} className={field}>
            {options.map((a) => (
              <option key={a.iata} value={a.iata}>{a.city} ({a.iata})</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className={lbl}>Seu e-mail</span>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" className={field} />
      </label>
      <label className="block">
        <span className={lbl}>Me avise abaixo de (R$) - opcional</span>
        <input type="number" inputMode="numeric" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="300" className={field} />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-coral flex items-center justify-center gap-2 rounded-[15px] px-6 py-4 font-display text-base font-bold text-white disabled:opacity-60"
      >
        <Icon name="bell" size={18} stroke={2.4} color="#fff" />
        {status === "loading" ? "Criando..." : "Criar alerta"}
      </button>
      {status === "error" && (
        <p className="text-sm text-coral">Algo deu errado. Tente novamente em instantes.</p>
      )}
    </form>
  );
}
