import type { Metadata } from "next";
import AlertForm from "@/components/AlertForm";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Alertas de preco - avisamos quando o voo baixar",
  description:
    "Cadastre uma rota e seu e-mail. Avisamos quando o preco da passagem cair. Sem cadastro, sem complicacao.",
};

export default function AlertasPage() {
  return (
    <div className="mx-auto max-w-xl px-5 py-14 sm:px-8">
      <div className="mb-5 grid h-14 w-14 place-items-center rounded-[17px] bg-ink">
        <Icon name="bell" size={26} color="#fff" />
      </div>
      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-[40px]">
        Alertas de preco
      </h1>
      <p className="mt-2 text-muted">
        Escolha uma rota e deixe seu e-mail. Quando o preco baixar, a gente
        avisa. Sem precisar criar conta.
      </p>
      <div className="mt-8">
        <AlertForm />
      </div>
    </div>
  );
}
