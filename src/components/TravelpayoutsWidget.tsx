"use client";

import { useEffect, useRef } from "react";

/**
 * Mounts a Travelpayouts widget by injecting its script into a container.
 * Pass the widget's script URL (from the TP dashboard) via `src`.
 * Configure once via NEXT_PUBLIC_TP_WIDGET_SRC and it renders on /buscar.
 */
export default function TravelpayoutsWidget({ src }: { src?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;
    el.innerHTML = "";
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.charset = "utf-8";
    el.appendChild(s);
  }, [src]);

  if (!src) return null;
  return <div ref={ref} className="tp-widget min-h-[200px]" />;
}
