"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";

/**
 * Shared auth UI for /entrar and /cadastro.
 * NOTE: this is the front-end only. Hook it up to Firebase Authentication
 * (email/password + Google provider) to make sign-in actually work.
 */
export default function AuthCard({ mode }: { mode: "login" | "signup" }) {
  const isLogin = mode === "login";
  const [done, setDone] = useState(false);

  const field =
    "w-full rounded-[14px] border border-line bg-surface px-4 py-3.5 text-[15px] font-semibold text-ink outline-none focus:border-teal";
  const lbl = "mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted-2";

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-5 py-16">
      <Link href="/" aria-label="AchaBrasil - inicio">
        <Logo size={28} />
      </Link>
      <h1 className="mt-8 font-display text-2xl font-extrabold tracking-tight">
        {isLogin ? "Entrar na sua conta" : "Criar sua conta"}
      </h1>
      <p className="mt-1 text-sm text-muted">
        {isLogin
          ? "Acompanhe seus alertas e voos favoritos."
          : "Salve buscas, favoritos e receba alertas de preco."}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
        className="mt-7 w-full grid gap-4 rounded-[20px] border border-line bg-surface p-6"
      >
        {!isLogin && (
          <label className="block">
            <span className={lbl}>Nome</span>
            <input type="text" required placeholder="Seu nome" className={field} />
          </label>
        )}
        <label className="block">
          <span className={lbl}>E-mail</span>
          <input type="email" required placeholder="voce@email.com" className={field} />
        </label>
        <label className="block">
          <span className={lbl}>Senha</span>
          <input type="password" required placeholder="••••••••" className={field} />
        </label>

        {done && (
          <p className="rounded-xl bg-teal-soft px-4 py-3 text-sm font-semibold text-teal-dark">
            Login ainda nao esta ativo. Conecte o Firebase Authentication para
            habilitar.
          </p>
        )}

        <button
          type="submit"
          className="btn-coral flex items-center justify-center gap-2 rounded-[15px] px-6 py-4 font-display text-base font-bold text-white"
        >
          {isLogin ? "Entrar" : "Criar conta"}
        </button>

        <div className="flex items-center gap-3 text-xs font-semibold text-muted-2">
          <div className="h-px flex-1 bg-line" /> ou <div className="h-px flex-1 bg-line" />
        </div>

        <button
          type="button"
          onClick={() => setDone(true)}
          className="flex items-center justify-center gap-2 rounded-[15px] border border-line bg-surface px-6 py-3.5 text-[15px] font-bold text-ink hover:bg-line"
        >
          <Icon name="user" size={18} color="var(--teal)" /> Continuar com Google
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">
        {isLogin ? "Nao tem conta? " : "Ja tem conta? "}
        <Link
          href={isLogin ? "/cadastro" : "/entrar"}
          className="font-bold text-teal-dark hover:underline"
        >
          {isLogin ? "Criar conta" : "Entrar"}
        </Link>
      </p>
    </div>
  );
}
