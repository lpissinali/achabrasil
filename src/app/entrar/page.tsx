import type { Metadata } from "next";
import AuthCard from "@/components/AuthCard";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false },
};

export default function EntrarPage() {
  return <AuthCard mode="login" />;
}
