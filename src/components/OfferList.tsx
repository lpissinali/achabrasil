import LeaveNotice from "./LeaveNotice";
import { aviasalesSearchUrl } from "@/lib/travelpayouts";
import { airlineName } from "@/lib/airlines";
import { formatBRL } from "@/lib/site";
import type { Offer } from "@/lib/tp-data";

function fmtShort(iso: string): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short" }).format(new Date(iso));
}

export default function OfferList({
  offers,
  originCode,
  originName,
}: {
  offers: Offer[];
  originCode: string;
  originName: string;
}) {
  if (offers.length === 0) {
    return (
      <div className="mt-8 rounded-[20px] border border-line bg-surface p-8 text-center text-muted">
        Nenhum destino encontrado para esse filtro agora. Tente outra cidade ou
        outro orçamento.
      </div>
    );
  }
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {offers.map((o) => {
        const url = aviasalesSearchUrl({
          origin: originCode,
          destination: o.cityCode,
          date: o.departureAt ? o.departureAt.slice(0, 10) : undefined,
          ret: o.returnAt ? o.returnAt.slice(0, 10) : undefined,
        });
        return (
          <div key={o.cityCode} className="flex flex-col rounded-[20px] border border-line bg-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {o.airline && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={`https://pics.avs.io/100/100/${o.airline}.png`}
                    alt={airlineName(o.airline)}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-lg object-contain"
                    loading="lazy"
                  />
                )}
                <div>
                  <div className="font-display text-lg font-bold">{o.name}</div>
                  <div className="mt-0.5 text-[13px] text-muted-2">
                    de {originName} · {o.transfers === 0 ? "voo direto" : `${o.transfers} parada${o.transfers > 1 ? "s" : ""}`}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-[11px] font-semibold text-muted-2">a partir de</span>
              <span className="font-display text-2xl font-extrabold text-teal-dark">{formatBRL(o.price)}</span>
            </div>
            {o.departureAt && (
              <div className="mt-1 text-[13px] text-muted-2">
                {fmtShort(o.departureAt)}
                {o.returnAt ? ` - ${fmtShort(o.returnAt)}` : ""}
              </div>
            )}
            <div className="mt-4">
              <LeaveNotice href={url} label="Ver oferta" partner="Aviasales (parceiro Travelpayouts)" className="w-full px-4 py-2.5 text-sm" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
