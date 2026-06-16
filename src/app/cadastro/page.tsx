import type { Metadata } from "next";
import AuthCard from "@/components/AuthCard";

export const metadata: Metadata = {
  title: "Criar conta",
  robots: { index: false },
};

export default function CadastroPage() {
  return <AuthCard mode="signup" />;
}
