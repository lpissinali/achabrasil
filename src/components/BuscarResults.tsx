"use client";

import { aviasalesSearchUrl, buildWidgetSrc } from "@/lib/travelpayouts";
import TravelpayoutsWidget from "./TravelpayoutsWidget";
import LeaveNotice from "./LeaveNotice";

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
  const widgetSrc = buildWidgetSrc({ origin, destination, date, ret, adults });

  return (
    <div className="mt-6">
      <div className="rounded-[22px] border border-line bg-surface p-3 sm:p-5">
        <TravelpayoutsWidget key={widgetSrc} src={widgetSrc} />
      </div>

      <div className="mt-4 flex flex-col items-center gap-3 text-center">
        <p className="text-xs text-muted-2">
          Resultados fornecidos pela Travelpayouts. Ao escolher um voo voce sera
          redirecionado para o site do parceiro para concluir a reserva.
        </p>
        <LeaveNotice
          href={url}
          label="Ver mais opcoes no parceiro"
          partner="Aviasales (parceiro Travelpayouts)"
          className="px-5 py-3 text-sm"
        />
      </div>
    </div>
  );
}
