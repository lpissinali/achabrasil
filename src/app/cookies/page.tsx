import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Quais cookies o AchaBrasil utiliza, para quê e como você pode gerenciá-los.",
  alternates: { canonical: `${SITE.url}/cookies` },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalShell
      title="Política de Cookies"
      updated="18 de junho de 2026"
      intro="Esta página explica o que são cookies, quais usamos no AchaBrasil e como você pode controlá-los."
    >
      <h2>O que são cookies</h2>
      <p>
        Cookies são pequenos arquivos guardados no seu navegador que permitem que o
        site funcione corretamente, lembre suas preferências e meça como o serviço é
        usado.
      </p>

      <h2>Tipos de cookies que usamos</h2>
      <h3>Essenciais</h3>
      <p>
        Necessários para o funcionamento básico do site (por exemplo, lembrar sua
        escolha de consentimento). Não podem ser desativados.
      </p>
      <h3>Preferências</h3>
      <p>Lembram opções como cidade de origem e filtros de busca para facilitar sua próxima visita.</p>
      <h3>Analíticos</h3>
      <p>Ajudam a entender, de forma agregada, quais páginas são mais úteis, para melhorarmos o site.</p>
      <h3>Afiliados / marketing</h3>
      <p>
        Usados por parceiros como a Travelpayouts/Aviasales para atribuir corretamente
        as comissões quando você reserva por um link nosso. Não exibimos anúncios de
        terceiros.
      </p>

      <h2>Como gerenciar</h2>
      <p>
        Ao acessar o site pela primeira vez, você escolhe entre <strong>"Aceitar todos"</strong> ou
        <strong> "Só essenciais"</strong> no banner de consentimento. Você também pode apagar os
        cookies a qualquer momento nas configurações do seu navegador. Bloquear
        cookies de preferências e analíticos não impede o uso do site, mas pode
        reduzir alguns recursos.
      </p>

      <h2>Dúvidas</h2>
      <p>
        Fale com a gente em{" "}
        <a href="mailto:privacidade@achabrasil.com.br">privacidade@achabrasil.com.br</a>.
        Veja também a <a href="/privacidade">Política de Privacidade</a>.
      </p>
    </LegalShell>
  );
}
