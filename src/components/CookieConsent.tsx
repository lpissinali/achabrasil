"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "ab_consent_v1";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      // storage blocked - default to not nagging
    }
  }, []);

  function choose(value: "all" | "essential") {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ value, at: new Date().toISOString() }),
      );
    } catch {
      /* ignore */
    }
    // Analytics stays on for everyone; the banner only governs ad personalization.
    (window as unknown as { __abConsent?: string }).__abConsent = value;
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag === "function") {
      w.gtag("consent", "update", {
        ad_storage: value === "all" ? "granted" : "denied",
        ad_user_data: value === "all" ? "granted" : "denied",
        ad_personalization: value === "all" ? "granted" : "denied",
      });
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[120] p-3 sm:p-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-[18px] border border-line bg-surface p-4 shadow-[0_12px_40px_rgba(20,40,36,0.18)] sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <p className="flex-1 text-[13.5px] leading-relaxed text-muted">
          Usamos cookies para melhorar sua experiência, lembrar preferências e
          medir o uso do site. Você pode aceitar todos ou manter só os
          essenciais. Saiba mais na{" "}
          <Link href="/cookies" className="font-semibold text-teal-dark underline">
            Política de Cookies
          </Link>
          .
        </p>
        <div className="flex flex-shrink-0 gap-2.5">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="rounded-[12px] border border-line bg-surface px-4 py-2.5 text-[13.5px] font-bold text-ink hover:bg-line"
          >
            Só essenciais
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="btn-coral rounded-[12px] px-4 py-2.5 text-[13.5px] font-bold text-white"
          >
            Aceitar todos
          </button>
        </div>
      </div>
    </div>
  );
}
