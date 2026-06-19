import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Termos e condições de uso do AchaBrasil, buscador de passagens aéreas.",
  alternates: { canonical: `${SITE.url}/termos` },
  robots: { index: true, follow: true },
};

export default function TermosPage() {
  return (
    <LegalShell
      title="Termos de uso"
      updated="18 de junho de 2026"
      intro="Ao acessar e usar o AchaBrasil, você concorda com estes Termos de uso. Leia com atenção."
    >
      <h2>1. Sobre o serviço</h2>
      <p>
        O AchaBrasil (achabrasil.com.br) é um <strong>buscador e comparador de passagens
        aéreas</strong>. Reunimos preços e ofertas coletados de companhias aéreas e de
        parceiros de reserva e exibimos os resultados em reais. O AchaBrasil
        <strong> não vende passagens</strong> nem processa pagamentos: a compra é sempre
        concluída diretamente no site do parceiro (companhia aérea ou agência),
        sob os termos do próprio parceiro.
      </p>

      <h2>2. Preços e disponibilidade</h2>
      <p>
        Os preços exibidos são <strong>indicativos</strong> ("a partir de"), coletados das
        buscas mais recentes e sujeitos a alteração a qualquer momento sem aviso
        prévio. A disponibilidade, as regras de tarifa, bagagem, remarcação e o
        valor final só são confirmados no momento da compra, no site do parceiro.
        Não garantimos que um preço exibido continuará disponível.
      </p>

      <h2>3. Links de afiliados</h2>
      <p>
        O AchaBrasil participa de programas de afiliados (incluindo a Travelpayouts /
        Aviasales). Quando você é direcionado a um parceiro e realiza uma compra,
        podemos receber uma comissão, <strong>sem custo adicional para você</strong>. Isso
        não influencia a ordem dos resultados, que priorizam o melhor preço. Veja
        mais na nossa <a href="/privacidade">Política de Privacidade</a>.
      </p>

      <h2>4. Uso aceitável</h2>
      <p>Ao usar o site, você concorda em não:</p>
      <ul>
        <li>copiar, raspar (scraping) ou reutilizar nosso conteúdo e dados sem autorização;</li>
        <li>tentar comprometer a segurança, a integridade ou a disponibilidade do serviço;</li>
        <li>usar o site para fins ilícitos ou que violem direitos de terceiros.</li>
      </ul>

      <h2>5. Contas e alertas</h2>
      <p>
        Para criar alertas de preço você pode informar um e-mail. Você é responsável
        pelos dados fornecidos e pode cancelar os alertas a qualquer momento. O
        tratamento desses dados segue a nossa <a href="/privacidade">Política de Privacidade</a>.
      </p>

      <h2>6. Propriedade intelectual</h2>
      <p>
        A marca, o logotipo, o layout e os textos do AchaBrasil são protegidos. Marcas
        de terceiros (GOL, LATAM, Azul e demais) pertencem aos seus respectivos
        titulares e são citadas apenas para fins de identificação das ofertas.
      </p>

      <h2>7. Limitação de responsabilidade</h2>
      <p>
        O AchaBrasil é um intermediário de informação. Não nos responsabilizamos por
        cancelamentos, atrasos, alterações de tarifa, falhas de reserva ou qualquer
        relação de consumo estabelecida entre você e o parceiro de reserva ou a
        companhia aérea. Eventuais problemas com a compra devem ser tratados
        diretamente com o parceiro.
      </p>

      <h2>8. Alterações</h2>
      <p>
        Podemos atualizar estes Termos a qualquer momento. A versão vigente é sempre
        a publicada nesta página, com a data de atualização no topo.
      </p>

      <h2>9. Contato</h2>
      <p>
        Dúvidas sobre estes Termos? Fale com a gente em{" "}
        <a href="mailto:contato@achabrasil.com.br">contato@achabrasil.com.br</a>.
      </p>
    </LegalShell>
  );
}
