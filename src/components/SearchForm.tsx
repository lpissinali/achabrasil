"use client";

import { useState } from "react";
import { AIRPORTS } from "@/lib/airports";
import Icon from "./Icon";
import DatePicker from "./DatePicker";
import Select, { type Option } from "./Select";
import PassengerPicker, { type Pax } from "./PassengerPicker";

const TRIPS = ["Ida e volta", "Só ida"];

const AIRPORT_OPTIONS: Option[] = Object.values(AIRPORTS).map((a) => ({
  value: a.iata,
  label: `${a.city} (${a.iata})`,
}));

export default function SearchForm() {
  const [trip, setTrip] = useState(0); // 0 = round trip, 1 = one-way
  const [origin, setOrigin] = useState("GRU");
  const [destination, setDestination] = useState("SSA");
  const [date, setDate] = useState("");
  const [ret, setRet] = useState("");
  const [pax, setPax] = useState<Pax>({ adults: 1, children: 0, infants: 0 });
  const [flex, setFlex] = useState(false);
  const [error, setError] = useState("");

  const roundTrip = trip === 0;

  function swap() {
    setOrigin(destination);
    setDestination(origin);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (origin === destination) {
      setError("Origem e destino devem ser diferentes.");
      return;
    }
    if (!date) {
      setError("Selecione a data de ida (ou o mês desejado).");
      return;
    }
    if (roundTrip && !ret && !flex) {
      setError("Selecione a data de volta.");
      return;
    }
    setError("");
    const params = new URLSearchParams({
      origin,
      destination,
      date,
      ret: roundTrip && ret ? ret : "",
      adults: String(pax.adults),
      children: String(pax.children),
      infants: String(pax.infants),
      flex: flex ? "1" : "",
    });
    window.location.href = `/buscar?${params.toString()}`;
  }

  const VDivider = () => (
    <div className="my-2 hidden w-px self-stretch bg-divider sm:block" />
  );

  return (
    <form onSubmit={handleSubmit} className="w-full text-left">
      {/* trip pills + flexible toggle */}
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex flex-wrap gap-1.5">
          {TRIPS.map((t, i) => (
            <button
              type="button"
              key={t}
              onClick={() => setTrip(i)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-bold transition-colors ${
                i === trip ? "bg-ink text-white" : "border border-divider bg-surface text-muted"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setFlex((v) => !v)}
          className="flex items-center gap-2 text-[13.5px] font-semibold text-muted"
        >
          <span
            className={`grid h-5 w-5 place-items-center rounded-md border transition-colors ${
              flex ? "border-teal bg-teal" : "border-divider bg-surface"
            }`}
          >
            {flex && <Icon name="check" size={13} stroke={3} color="#fff" />}
          </span>
          Datas flexíveis (mês inteiro)
        </button>
      </div>

      {/* bar - 2 rows */}
      <div className="rounded-[20px] bg-surface p-2 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_24px_50px_rgba(20,40,36,0.10)]">
        {/* row 1: origin - swap - destination */}
        <div className="flex flex-col items-stretch sm:flex-row sm:items-center">
          <Select icon="planeUp" label="Origem" value={origin} options={AIRPORT_OPTIONS} onChange={setOrigin} />
          <button
            type="button"
            onClick={swap}
            aria-label="Inverter origem e destino"
            className="mx-3 my-1 grid h-9 w-9 flex-shrink-0 place-items-center self-center rounded-full border border-[#e0efea] bg-[#f4faf8] sm:mx-0 sm:my-0"
          >
            <Icon name="swap" size={16} color="var(--teal)" />
          </button>
          <Select icon="pin" label="Destino" value={destination} options={AIRPORT_OPTIONS} onChange={setDestination} />
        </div>

        <div className="mx-2 my-1 h-px bg-divider" />

        {/* row 2: ida | volta | passageiros | buscar */}
        <div className="flex flex-col items-stretch gap-1 sm:flex-row sm:items-center sm:gap-0">
          <DatePicker label={flex ? "Mês" : "Ida"} value={date} onChange={setDate} />
          {roundTrip && (
            <>
              <VDivider />
              <DatePicker label={flex ? "Volta (opcional)" : "Volta"} value={ret} onChange={setRet} min={date || undefined} />
            </>
          )}
          <VDivider />
          <div className="flex min-w-0 flex-1 sm:max-w-[220px]">
            <PassengerPicker value={pax} onChange={setPax} />
          </div>
          <button
            type="submit"
            className="btn-coral m-1 flex h-14 flex-shrink-0 items-center justify-center gap-2 rounded-[15px] px-7 font-display text-[16px] font-bold text-white"
          >
            <Icon name="search" size={20} stroke={2.4} color="#fff" /> Buscar voos
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-2 pl-1 text-[13px] font-semibold text-coral">{error}</p>
      )}
    </form>
  );
}
