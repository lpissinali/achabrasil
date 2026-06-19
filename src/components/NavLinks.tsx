"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV = [
  { href: "/voos", label: "Voos" },
  { href: "/ofertas", label: "Ofertas" },
  { href: "/destinos", label: "Destinos" },
  { href: "/alertas", label: "Alertas de preço" },
  { href: "/blog", label: "Blog" },
];

export function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function NavLinks() {
  const pathname = usePathname() || "/";
  return (
    <nav className="hidden items-center gap-7 lg:flex">
      {NAV.map((n) => {
        const active = isActive(pathname, n.href);
        return (
          <Link
            key={n.label}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`text-[15px] transition-colors hover:text-ink ${
              active ? "font-bold text-ink" : "font-medium text-muted"
            }`}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
