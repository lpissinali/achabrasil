import Link from "next/link";
import Logo from "./Logo";

const COLS: [string, string[]][] = [
  ["Explorar", ["Rotas populares", "Ofertas do dia", "Me surpreenda", "Fim de semana"]],
  ["Destinos", ["Rio de Janeiro", "Salvador", "Recife", "Fortaleza", "Florianopolis"]],
  ["AchaBrasil", ["Sobre nos", "Blog", "Alertas de preco", "Contato"]],
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-[1232px] grid-cols-2 gap-8 px-5 pt-12 pb-9 sm:px-14 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          <Logo size={26} />
          <p className="mt-3.5 max-w-[280px] text-sm leading-relaxed text-[#6A7B77]">
            Busca de voos baratos pelo Brasil. Comparamos GOL, LATAM, Azul e +20
            companhias - voce escolhe o melhor preco.
          </p>
        </div>
        {COLS.map(([h, items]) => (
          <div key={h}>
            <div className="mb-3.5 font-display text-sm font-bold">{h}</div>
            <div className="flex flex-col gap-2.5">
              {items.map((it) => (
                <span key={it} className="cursor-pointer text-sm text-[#6A7B77] hover:text-ink">
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1232px] flex-col gap-2 px-5 pt-5 pb-7 text-[13px] text-muted-2 sm:flex-row sm:items-center sm:justify-between sm:px-14">
          <span>© {new Date().getFullYear()} AchaBrasil · achabrasil.com.br · Termos · Privacidade</span>
          <span>Precos em BRL · Feito no Brasil</span>
        </div>
      </div>
    </footer>
  );
}
