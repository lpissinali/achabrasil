"use client";

import { useState } from "react";
import { AIRPORTS } from "@/lib/airports";
import Icon from "./Icon";
import DatePicker from "./DatePicker";
import Select, { type Option } from "./Select";

const TRIPS = ["Ida e volta", "So ida", "Varios trechos"];

const AIRPORT_OPTIONS: Option[] = Object.values(AIRPORTS).map((a) => ({
  value: a.iata,
  label: `${a.city} (${a.iata})`,
}));

const PAX_OPTIONS: Option[] = [1, 2, 3, 4, 5, 6].map((n) => ({
  value: String(n),
  label: `${n} ${n === 1 ? "adulto" : "adultos"}`,
}));

export default function SearchForm() {
  const [trip, setTrip] = useState(0);
  const [origin, setOrigin] = useState("GRU");
  const [destination, setDestination] = useState("SSA");
  const [date, setDate] = useState("");
  const [ret, setRet] = useState("");
  const [pax, setPax] = useState("1");

  function swap() {
    setOrigin(destination);
    setDestination(origin);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      origin,
      destination,
      date,
      ret: trip === 0 ? ret : "",
      pax,
    });
    window.location.href = `/buscar?${params.toString()}`;
  }

  const Divider = () => <div className="my-3 hidden w-px self-stretch bg-divider lg:block" />;

  return (
    <form onSubmit={handleSubmit} className="text-left">
      {/* trip pills */}
      <div className="mb-3 flex flex-wrap gap-1.5">
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

      {/* bar */}
      <div className="flex flex-col gap-1 rounded-[20px] bg-surface p-2 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_24px_50px_rgba(20,40,36,0.10)] lg:flex-row lg:items-center lg:gap-0">
        {/* origin + swap + destination */}
        <div className="flex flex-[2.2] flex-col items-stretch lg:flex-row lg:items-center">
          <Select icon="planeUp" label="Origem" value={origin} options={AIRPORT_OPTIONS} onChange={setOrigin} />
          <button
            type="button"
            onClick={swap}
            aria-label="Inverter origem e destino"
            className="mx-3 my-1 grid h-9 w-9 flex-shrink-0 place-items-center self-center rounded-full border border-[#e0efea] bg-[#f4faf8] lg:mx-0 lg:my-0"
          >
            <Icon name="swap" size={16} color="var(--teal)" />
          </button>
          <Select icon="pin" label="Destino" value={destination} options={AIRPORT_OPTIONS} onChange={setDestination} />
        </div>

        <Divider />
        <div className="flex flex-[1.7] flex-col lg:flex-row">
          <DatePicker label="Ida" value={date} onChange={setDate} />
          {trip === 0 && (
            <>
              <Divider />
              <DatePicker label="Volta" value={ret} onChange={setRet} min={date || undefined} align="right" />
            </>
          )}
        </div>

        <Divider />
        <div className="lg:w-[160px]">
          <Select icon="user" label="Passageiros" value={pax} options={PAX_OPTIONS} onChange={setPax} align="right" />
        </div>

        <button
          type="submit"
          className="btn-coral m-1 flex h-14 flex-shrink-0 items-center justify-center gap-2 rounded-[15px] px-6 font-display text-[16px] font-bold text-white lg:h-16"
        >
          <Icon name="search" size={20} stroke={2.4} color="#fff" /> Buscar voos
        </button>
      </div>
    </form>
  );
}
