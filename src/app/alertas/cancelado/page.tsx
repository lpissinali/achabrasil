import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Alerta cancelado",
  robots: { index: false },
};

export default async function CanceladoPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;
  const isError = erro === "1";

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-5 py-20 text-center">
      <div className={`mb-4 grid h-14 w-14 place-items-center rounded-full ${isError ? "bg-[#fde7e2]" : "bg-teal-soft"}`}>
        <Icon name={isError ? "close" : "check"} size={26} stroke={2.6} color={isError ? "var(--coral)" : "var(--teal-dark)"} />
      </div>
      <h1 className="font-display text-2xl font-extrabold tracking-tight">
        {isError ? "Link inválido ou expirado" : "Alerta cancelado"}
      </h1>
      <p className="mt-2 text-muted">
        {isError
          ? "Não encontramos esse alerta. Ele pode já ter sido cancelado. Se precisar, fale com a gente."
          : "Pronto! Você não receberá mais e-mails sobre esse alerta de preço. Pode criar um novo quando quiser."}
      </p>
      <div className="mt-7 flex gap-3">
        <Link href="/alertas" className="rounded-[14px] border border-line bg-surface px-5 py-3 text-sm font-bold text-ink hover:bg-line">
          Criar outro alerta
        </Link>
        <Link href="/" className="btn-coral rounded-[14px] px-5 py-3 text-sm font-bold text-white">
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
