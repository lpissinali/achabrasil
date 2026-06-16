import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";
import MobileNav from "./MobileNav";

const NAV = [
  { href: "/voos", label: "Voos" },
  { href: "/voos", label: "Rotas populares" },
  { href: "/destinos", label: "Ofertas" },
  { href: "/alertas", label: "Alertas de preco" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/90 backdrop-blur">
      <div className="relative mx-auto flex h-[76px] max-w-[1232px] items-center justify-between px-5 sm:px-14">
        <div className="flex items-center gap-6 lg:gap-11">
          <Link href="/" aria-label="AchaBrasil - inicio">
            <Logo size={26} />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((n, i) => (
              <Link
                key={n.label}
                href={n.href}
                className={`text-[15px] transition-colors hover:text-ink ${
                  i === 0 ? "font-bold text-ink" : "font-medium text-muted"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/voos"
            className="hidden items-center gap-2 rounded-full border border-divider bg-surface px-4 py-2.5 text-sm font-semibold text-muted sm:flex"
          >
            <Icon name="search" size={16} stroke={2.2} color="var(--teal)" /> Buscar
          </Link>
          <Link
            href="/entrar"
            className="hidden items-center gap-1.5 text-[14.5px] font-bold text-ink hover:text-teal-dark lg:flex"
          >
            <Icon name="user" size={18} /> Entrar
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
