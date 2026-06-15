import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Logo size={22} />
            <p className="mt-2 max-w-sm text-sm text-muted">
              Acha as passagens aéreas mais baratas do Brasil. Comparamos voos
              da GOL, LATAM e Azul para você economizar.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <Link href="/voos" className="hover:text-ink">Voos</Link>
            <Link href="/destinos" className="hover:text-ink">Destinos</Link>
            <Link href="/alertas" className="hover:text-ink">Alertas</Link>
          </nav>
        </div>
        <p className="mt-8 text-xs text-muted">
          © {new Date().getFullYear()} AchaBrasil. Preços meramente indicativos
          e sujeitos a alteração. Ao reservar você é redirecionado para o site
          parceiro. Podemos receber comissão de afiliado.
        </p>
      </div>
    </footer>
  );
}
