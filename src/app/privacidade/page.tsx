import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como o AchaBrasil coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.",
  alternates: { canonical: `${SITE.url}/privacidade` },
  robots: { index: true, follow: true },
};

export default function PrivacidadePage() {
  return (
    <LegalShell
      title="Política de Privacidade"
      updated="18 de junho de 2026"
      intro="Esta Política explica como o AchaBrasil trata seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD)."
    >
      <h2>1. Quem é o controlador</h2>
      <p>
        O AchaBrasil (achabrasil.com.br) é o controlador dos dados pessoais tratados
        neste site. Contato do encarregado/DPO:{" "}
        <a href="mailto:privacidade@achabrasil.com.br">privacidade@achabrasil.com.br</a>.
      </p>

      <h2>2. Dados que coletamos</h2>
      <ul>
        <li><strong>Dados que você fornece:</strong> e-mail e preferências, quando você cria um alerta de preço ou uma conta.</li>
        <li><strong>Dados de navegação:</strong> páginas visitadas, buscas realizadas, tipo de dispositivo, navegador e endereço IP aproximado.</li>
        <li><strong>Cookies e identificadores:</strong> usados para lembrar preferências, medir uso e atribuir comissões de afiliados. Veja a <a href="/cookies">Política de Cookies</a>.</li>
      </ul>

      <h2>3. Para que usamos</h2>
      <ul>
        <li>operar a busca e exibir resultados relevantes em reais;</li>
        <li>enviar alertas de preço que você solicitou;</li>
        <li>medir e melhorar o desempenho do site;</li>
        <li>atribuir corretamente as comissões de programas de afiliados;</li>
        <li>prevenir fraude e garantir a segurança.</li>
      </ul>

      <h2>4. Bases legais (LGPD)</h2>
      <p>
        Tratamos dados com base no <strong>consentimento</strong> (ex.: cookies não essenciais e
        alertas), no <strong>legítimo interesse</strong> (ex.: segurança e melhoria do serviço) e no
        <strong> cumprimento de obrigação legal</strong>, quando aplicável.
      </p>

      <h2>5. Compartilhamento</h2>
      <p>
        Podemos compartilhar dados com provedores que nos ajudam a operar o site
        (hospedagem, analytics) e com <strong>parceiros de afiliados</strong> (como a
        Travelpayouts/Aviasales) para atribuição de comissões. Não vendemos seus
        dados pessoais. Ao clicar em uma oferta, você é direcionado ao parceiro, que
        passa a tratar seus dados conforme a política dele.
      </p>

      <h2>6. Seus direitos</h2>
      <p>
        Você pode, a qualquer momento, solicitar acesso, correção, exclusão,
        portabilidade, informação sobre compartilhamentos e a revogação do
        consentimento. Basta escrever para{" "}
        <a href="mailto:privacidade@achabrasil.com.br">privacidade@achabrasil.com.br</a>.
      </p>

      <h2>7. Retenção e segurança</h2>
      <p>
        Guardamos os dados apenas pelo tempo necessário às finalidades acima ou ao
        cumprimento de obrigações legais. Adotamos medidas técnicas e organizacionais
        para proteger seus dados contra acesso não autorizado.
      </p>

      <h2>8. Crianças</h2>
      <p>O serviço não se destina a menores de 18 anos e não coletamos intencionalmente seus dados.</p>

      <h2>9. Alterações</h2>
      <p>Esta Política pode ser atualizada; a versão vigente é sempre a desta página.</p>
    </LegalShell>
  );
}
