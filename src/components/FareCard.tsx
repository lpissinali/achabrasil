"use client";

import { useState } from "react";
import Icon from "./Icon";
import LeaveNotice from "./LeaveNotice";
import { airlineName } from "@/lib/airlines";
import { formatBRL } from "@/lib/site";
import type { Fare } from "@/lib/tp-data";

export type Badge = "best" | "cheapest" | "fastest" | null;

const BADGES: Record<Exclude<Badge, null>, { label: string; cls: string }> = {
  best: { label: "Melhor escolha", cls: "bg-teal text-white" },
  cheapest: { label: "Mais barato", cls: "bg-sun text-[#5a4a0a]" },
  fastest: { label: "Mais rápido", cls: "bg-teal-soft text-teal-dark" },
};

function fmtTime(iso: string): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}
function fmtDate(iso: string): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(new Date(iso));
}
function fmtDuration(min?: number): string {
  if (!min) return "";
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}h${m.toString().padStart(2, "0")}` : `${h}h`;
}
function addMin(iso: string, min?: number): string {
  if (!iso || !min) return "";
  return new Date(new Date(iso).getTime() + min * 60000).toISOString();
}
function stops(n?: number): string {
  if (n == null) return "";
  return n === 0 ? "direto" : `${n} parada${n > 1 ? "s" : ""}`;
}

function Segment({
  label, date, from, to, depIso, duration, transfers,
}: {
  label: string; date: string; from: string; to: string;
  depIso: string; duration?: number; transfers?: number;
}) {
  const arrIso = addMin(depIso, duration);
  return (
    <div>
      <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-muted-2">
        {label} · {date}
      </div>
      <div className="flex items-center gap-3">
        <div className="text-center">
          <div className="font-display text-[19px] font-extrabold leading-none">{fmtTime(depIso)}</div>
          <div className="mt-1 text-[12px] font-semibold text-muted-2">{from}</div>
        </div>
        <div className="flex-1">
          <div className="text-center text-[11px] font-semibold text-muted-2">
            {fmtDuration(duration)} {transfers != null ? `· ${stops(transfers)}` : ""}
          </div>
          <div className="relative mt-2 h-[2px] rounded bg-line">
            <span className="absolute -left-0.5 -top-[3px] h-2 w-2 rounded-full bg-muted-2" />
            <span className="absolute right-0 -top-[7px]">
              <Icon name="planeUp" size={14} color="var(--teal)" style={{ transform: "rotate(90deg)" }} />
            </span>
          </div>
        </div>
        <div className="text-center">
          <div className="font-display text-[19px] font-extrabold leading-none">{fmtTime(arrIso)}</div>
          <div className="mt-1 text-[12px] font-semibold text-muted-2">{to}</div>
        </div>
      </div>
    </div>
  );
}

export default function FareCard({
  f, roundTrip, badge = null,
}: {
  f: Fare; roundTrip: boolean; badge?: Badge;
}) {
  const [open, setOpen] = useState(false);
  const hasStops = f.transfers > 0 || (roundTrip && (f.returnTransfers ?? 0) > 0);
  const b = badge ? BADGES[badge] : null;

  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-surface transition-shadow hover:shadow-md">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 p-5">
          <div className="mb-4 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://pics.avs.io/120/120/${f.airline}.png`}
              alt={airlineName(f.airline)}
              width={56}
              height={56}
              className="h-14 w-14 rounded-xl object-contain"
              loading="lazy"
            />
            {b && (
              <span className={`rounded-full px-3 py-1 text-[11px] font-extrabold ${b.cls}`}>
                {b.label}
              </span>
            )}
            {f.gate && (
              <span className="ml-auto rounded-full border border-line bg-background px-3 py-1 text-[11px] font-semibold text-muted">
                via {f.gate}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Segment
              label="Ida" date={fmtDate(f.departureAt)} from={f.origin} to={f.destination}
              depIso={f.departureAt} duration={f.durationTo} transfers={f.transfers}
            />
            {roundTrip && f.returnAt && (
              <Segment
                label="Volta" date={fmtDate(f.returnAt)} from={f.destination} to={f.origin}
                depIso={f.returnAt} duration={f.durationBack} transfers={f.returnTransfers}
              />
            )}
          </div>

          {hasStops && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1 text-[13px] font-semibold text-teal"
              >
                {open ? "Ocultar detalhes" : "Ver detalhes"}
                <Icon name="chevD" size={15} color="var(--teal)" style={{ transform: open ? "rotate(180deg)" : "none" }} />
              </button>
              {open && (
                <div className="mt-3 rounded-[14px] bg-[#fbfaf7] p-4 text-[13px] text-muted">
                  <div className="flex justify-between">
                    <span className="font-semibold text-ink">Ida</span>
                    <span>{fmtDuration(f.durationTo)} · {stops(f.transfers)}</span>
                  </div>
                  {roundTrip && f.returnAt && (
                    <div className="mt-2 flex justify-between border-t border-line pt-2">
                      <span className="font-semibold text-ink">Volta</span>
                      <span>{fmtDuration(f.durationBack)} · {stops(f.returnTransfers)}</span>
                    </div>
                  )}
                  <p className="mt-3 text-[12px] text-muted-2">
                    Os aeroportos de conexão e o tempo de espera aparecem ao
                    reservar no site do parceiro.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* right: price + cta */}
        <div className="flex flex-row items-center justify-between gap-3 border-t border-line bg-[#fbfaf7] p-5 lg:w-52 lg:flex-col lg:items-stretch lg:justify-center lg:border-l lg:border-t-0">
          <div className="lg:text-center">
            <div className="text-[11px] font-semibold text-muted-2">a partir de</div>
            <div className="font-display text-2xl font-extrabold text-teal-dark">{formatBRL(f.price)}</div>
            <div className="text-[11px] text-muted-2">{roundTrip ? "ida e volta" : "só ida"}</div>
          </div>
          <LeaveNotice
            href={f.bookingUrl}
            label="Reservar"
            partner="Aviasales (parceiro Travelpayouts)"
            className="w-full justify-center px-5 py-3 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
