"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "./Icon";

const BUDGETS: { label: string; value: string }[] = [
  { label: "ate R$ 200", value: "200" },
  { label: "R$ 400", value: "400" },
  { label: "R$ 600", value: "600" },
  { label: "Tanto faz", value: "" },
];

export default function MeSurpreenda() {
  const router = useRouter();
  const [budget, setBudget] = useState("200");

  function descobrir() {
    const params = new URLSearchParams({ origin: "GRU", surpreenda: "1" });
    if (budget) params.set("budget", budget);
    router.push(`/buscar?${params.toString()}`);
  }

  return (
    <div className="btn-coral relative overflow-hidden rounded-[26px] p-8 text-white">
      <Icon
        name="sparkle"
        size={180}
        color="rgba(255,255,255,0.15)"
        style={{ position: "absolute", right: -28, top: -34 }}
      />
      <div className="relative">
        <span className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-extrabold uppercase tracking-widest">
          Me surpreenda
        </span>
        <h3 className="mb-2 mt-4 font-display text-[26px] font-extrabold leading-tight tracking-tight sm:text-[30px]">
          Diz teu orcamento.
          <br />A gente acha o destino.
        </h3>
        <p className="mb-5 max-w-[420px] text-[15.5px] leading-snug text-white/90">
          Escolha de onde quer sair e quanto quer gastar - mostramos pra onde da
          pra voar agora.
        </p>
        <div className="flex flex-wrap gap-2.5">
          {BUDGETS.map((b) => {
            const active = b.value === budget;
            return (
              <button
                key={b.label}
                type="button"
                onClick={() => setBudget(b.value)}
                className={`rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                  active ? "bg-white text-[#b5432f]" : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {b.label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={descobrir}
          className="mt-5 inline-flex items-center gap-2 rounded-[14px] bg-ink px-5 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
        >
          Descobrir destinos <Icon name="arrow" size={17} stroke={2.4} color="#fff" />
        </button>
      </div>
    </div>
  );
}
