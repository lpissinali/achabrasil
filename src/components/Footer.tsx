import Link from "next/link";
import Logo from "./Logo";

type LinkItem = { label: string; href: string };

const COLS: [string, LinkItem[]][] = [
  ["Explorar", [
    { label: "Rotas populares", href: "/voos" },
    { label: "Ofertas do dia", href: "/ofertas" },
    { label: "Me surpreenda", href: "/me-surpreenda" },
    { label: "Todos os destinos", href: "/destinos" },
  ]],
  ["Destinos", [
    { label: "Rio de Janeiro", href: "/destinos/gig" },
    { label: "Salvador", href: "/destinos/ssa" },
    { label: "Recife", href: "/destinos/rec" },
    { label: "Buenos Aires", href: "/destinos/eze" },
    { label: "Lisboa", href: "/destinos/lis" },
  ]],
  ["AchaBrasil", [
    { label: "Blog", href: "/blog" },
    { label: "Alertas de preço", href: "/alertas" },
  ]],
  ["Legal", [
    { label: "Termos de uso", href: "/termos" },
    { label: "Privacidade", href: "/privacidade" },
    { label: "Cookies", href: "/cookies" },
  ]],
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-[1232px] grid-cols-2 gap-8 px-5 pt-12 pb-9 sm:px-14 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          <Logo size={26} />
          <p className="mt-3.5 max-w-[280px] text-sm leading-relaxed text-[#6A7B77]">
            Busca de voos baratos pelo Brasil. Comparamos GOL, LATAM, Azul e +20
            companhias - você escolhe o melhor preço.
          </p>
        </div>
        {COLS.map(([h, items]) => (
          <div key={h}>
            <div className="mb-3.5 font-display text-sm font-bold">{h}</div>
            <div className="flex flex-col gap-2.5">
              {items.map((it) => (
                <Link key={it.label} href={it.href} className="text-sm text-[#6A7B77] hover:text-ink">
                  {it.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1232px] flex-col gap-2 px-5 pt-5 pb-7 text-[13px] text-muted-2 sm:flex-row sm:items-center sm:justify-between sm:px-14">
          <span className="flex flex-wrap items-center gap-x-1.5">
            © {new Date().getFullYear()} AchaBrasil · achabrasil.com.br ·
            <Link href="/termos" className="hover:text-ink">Termos</Link>·
            <Link href="/privacidade" className="hover:text-ink">Privacidade</Link>
          </span>
          <span>Preços em BRL · Feito no Brasil</span>
        </div>
      </div>
    </footer>
  );
}
