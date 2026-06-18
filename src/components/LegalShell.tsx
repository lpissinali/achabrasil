import Link from "next/link";
import Icon from "./Icon";

export default function LegalShell({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <nav className="flex items-center gap-1 text-sm text-muted">
        <Link href="/" className="hover:text-ink">Início</Link>
        <Icon name="chevR" size={14} color="var(--muted-2)" />
        <span>{title}</span>
      </nav>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-[40px]">
        {title}
      </h1>
      <p className="mt-2 text-sm text-muted-2">Última atualização: {updated}</p>
      {intro && <p className="mt-4 text-[15px] leading-relaxed text-muted">{intro}</p>}
      <div className="prose-doc mt-6">{children}</div>
    </article>
  );
}
