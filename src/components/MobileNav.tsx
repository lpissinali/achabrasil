"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "./Icon";

const NAV = [
  { href: "/voos", label: "Voos" },
  { href: "/voos", label: "Rotas populares" },
  { href: "/destinos", label: "Ofertas" },
  { href: "/alertas", label: "Alertas de preco" },
  { href: "/blog", label: "Blog" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        className="grid h-10 w-10 place-items-center rounded-xl border border-divider bg-surface"
      >
        <Icon name={open ? "close" : "menu"} size={20} color="var(--ink)" />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-[76px] z-40 bg-ink/20"
          />
          <nav className="absolute left-0 right-0 top-full z-50 border-b border-line bg-surface px-5 py-3 shadow-lg">
            {NAV.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-3 text-[15px] font-semibold text-ink last:border-0"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/entrar"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center gap-2 py-3 text-[15px] font-bold text-teal-dark"
            >
              <Icon name="user" size={18} color="var(--teal-dark)" /> Entrar
            </Link>
          </nav>
        </>
      )}
    </div>
  );
}
