import Link from "next/link";
import Logo from "./Logo";

const NAV = [
  { href: "/voos", label: "Voos" },
  { href: "/destinos", label: "Destinos" },
  { href: "/alertas", label: "Alertas de preço" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" aria-label="AchaBrasil — início">
          <Logo size={26} />
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-muted">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="transition-colors hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
