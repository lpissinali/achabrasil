import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/90 backdrop-blur">
      <div className="relative mx-auto flex h-[76px] max-w-[1232px] items-center justify-between px-5 sm:px-14">
        <div className="flex items-center gap-6 lg:gap-11">
          <Link href="/" aria-label="AchaBrasil - inicio">
            <Logo size={26} />
          </Link>
          <NavLinks />
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/voos"
            className="hidden items-center gap-2 rounded-full border border-divider bg-surface px-4 py-2.5 text-sm font-semibold text-muted sm:flex"
          >
            <Icon name="search" size={16} stroke={2.2} color="var(--teal)" /> Buscar
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
