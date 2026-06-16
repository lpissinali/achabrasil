"use client";

import { aviasalesSearchUrl } from "@/lib/travelpayouts";
import TravelpayoutsWidget from "./TravelpayoutsWidget";
import LeaveNotice from "./LeaveNotice";
import Icon from "./Icon";

const WIDGET_SRC = process.env.NEXT_PUBLIC_TP_WIDGET_SRC;

export default function BuscarResults({
  origin,
  destination,
  date,
  ret,
  adults,
}: {
  origin: string;
  destination: string;
  date?: string;
  ret?: string;
  adults: number;
}) {
  const url = aviasalesSearchUrl({ origin, destination, date, ret, adults });

  return (
    <div className="mt-6">
      {WIDGET_SRC ? (
        <>
          <TravelpayoutsWidget src={WIDGET_SRC} />
          <p className="mt-4 text-center text-xs text-muted-2">
            Ao escolher um voo voce sera redirecionado para o site do parceiro
            para concluir a reserva.
          </p>
        </>
      ) : (
        <div className="rounded-[22px] border border-line bg-surface p-8 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-[16px] bg-teal-soft">
            <Icon name="planeUp" size={28} color="var(--teal)" style={{ transform: "rotate(45deg)" }} />
          </div>
          <h2 className="font-display text-xl font-bold tracking-tight">
            Encontramos voos para essa rota
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            Veja os precos e horarios atualizados no nosso parceiro de busca,
            em portugues e em reais. Voce sera avisado antes de sair do site.
          </p>
          <div className="mt-6 flex justify-center">
            <LeaveNotice href={url} label="Ver voos disponiveis" partner="Aviasales (parceiro Travelpayouts)" />
          </div>
        </div>
      )}
    </div>
  );
}
