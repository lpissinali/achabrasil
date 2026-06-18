import Link from "next/link";
import Icon from "./Icon";
import { formatBRL } from "@/lib/site";
import { GRADIENT, type Tone } from "@/lib/destinations";

export default function DestinationCard({
  iata,
  name,
  where,
  tone,
  price,
}: {
  iata: string;
  name: string;
  where: string;
  tone: Tone;
  price?: number;
}) {
  // Optional real photo at /public/destinos/{iata}.jpg, gradient fallback.
  const bg = `linear-gradient(180deg, rgba(0,0,0,0) 38%, rgba(0,0,0,0.55)), url('/destinos/${iata.toLowerCase()}.jpg'), ${GRADIENT[tone]}`;
  return (
    <Link
      href={`/destinos/${iata.toLowerCase()}`}
      className="group overflow-hidden rounded-[22px] border border-line bg-surface transition-shadow hover:shadow-lg"
    >
      <div
        className="relative flex h-[168px] flex-col justify-end p-4"
        style={{ backgroundImage: bg, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90">
          <Icon name="pin" size={16} color="var(--teal)" />
        </span>
        <div className="font-display text-[22px] font-extrabold leading-tight text-white drop-shadow-sm">
          {name}
        </div>
        {where && <div className="text-[13px] font-semibold text-white/85">{where}</div>}
      </div>
      <div className="flex items-center justify-between px-4 py-3.5">
        <div>
          {price ? (
            <>
              <div className="text-[11px] font-semibold text-muted-2">a partir de</div>
              <div className="font-display text-xl font-extrabold text-teal-dark">{formatBRL(price)}</div>
            </>
          ) : (
            <div className="text-[13.5px] font-semibold text-muted">Ver voos e dicas</div>
          )}
        </div>
        <span className="flex items-center gap-1 text-[14px] font-bold text-teal transition-transform group-hover:translate-x-0.5">
          Explorar <Icon name="chevR" size={15} stroke={2.4} color="var(--teal)" />
        </span>
      </div>
    </Link>
  );
}
