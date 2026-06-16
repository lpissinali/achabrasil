"use client";

import { useState } from "react";
import Icon from "./Icon";

/**
 * Renders a CTA that, before sending the user to an affiliate partner,
 * shows a confirmation explaining they are leaving AchaBrasil.
 */
export default function LeaveNotice({
  href,
  label,
  partner = "nosso parceiro de reservas",
  className = "",
}: {
  href: string;
  label: string;
  partner?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  function proceed() {
    window.open(href, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`btn-coral inline-flex items-center justify-center gap-2 rounded-[15px] px-6 py-3.5 font-display text-[15px] font-bold text-white ${className}`}
      >
        {label}
        <Icon name="arrow" size={18} stroke={2.4} color="#fff" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-5">
          <div className="w-full max-w-md rounded-[22px] bg-surface p-7 shadow-xl">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-[14px] bg-teal-soft">
              <Icon name="planeUp" size={24} color="var(--teal)" style={{ transform: "rotate(45deg)" }} />
            </div>
            <h3 className="font-display text-xl font-bold tracking-tight">
              Voce esta saindo do AchaBrasil
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Para concluir a reserva voce sera levado para o site de {partner}.
              A compra e feita diretamente com o parceiro, em ambiente seguro.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-[14px] border border-line bg-surface py-3 text-sm font-bold text-ink hover:bg-line"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={proceed}
                className="btn-coral flex-1 rounded-[14px] py-3 text-sm font-bold text-white"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
