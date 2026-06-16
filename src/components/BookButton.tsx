"use client";

import { aviasalesSearchUrl } from "@/lib/travelpayouts";
import Icon from "./Icon";

/** Opens Aviasales search results (with affiliate marker) for a route. */
export default function BookButton({
  origin,
  destination,
  label,
  className = "",
}: {
  origin: string;
  destination: string;
  label: string;
  className?: string;
}) {
  function go() {
    const url = aviasalesSearchUrl({ origin, destination });
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <button
      type="button"
      onClick={go}
      className={`btn-coral inline-flex items-center gap-2 rounded-[15px] px-6 py-3 text-sm font-bold text-white ${className}`}
    >
      <Icon name="search" size={18} stroke={2.4} color="#fff" /> {label}
    </button>
  );
}
