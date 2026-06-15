import type { Metadata } from "next";
import AlertForm from "@/components/AlertForm";

export const metadata: Metadata = {
  title: "Alertas de preço — avisamos quando o voo baixar",
  description:
    "Cadastre uma rota e seu e-mail. Avisamos quando o preço da passagem cair. Sem cadastro, sem complicação.",
};

export default function AlertasPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">
        Alertas de preço 🔔
      </h1>
      <p className="mt-2 text-muted">
        Escolha uma rota e deixe seu e-mail. Quando o preço baixar, a gente
        avisa. Sem precisar criar conta.
      </p>
      <div className="mt-8">
        <AlertForm />
      </div>
    </div>
  );
}
