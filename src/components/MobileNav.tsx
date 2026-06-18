"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { NAV, isActive } from "./NavLinks";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";

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
            {NAV.map((n) => {
              const active = isActive(pathname, n.href);
              return (
                <Link
                  key={n.label}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`block border-b border-line py-3 text-[15px] last:border-0 ${
                    active ? "font-extrabold text-teal-dark" : "font-semibold text-ink"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </>
      )}
    </div>
  );
}
