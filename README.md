# AchaBrasil

Agregador de passagens aereas domesticas do Brasil, em portugues. Compara voos
da GOL, LATAM e Azul via Travelpayouts e ganha comissao de afiliado.

**Site:** https://achabrasil.com.br

## Stack

| Camada          | Tecnologia                             |
| --------------- | -------------------------------------- |
| Framework       | Next.js 16 (App Router) + TypeScript   |
| Estilo          | Tailwind CSS v4                        |
| Hospedagem      | Firebase App Hosting (SSR/SSG)         |
| Banco de dados  | Firestore (alertas de preco)           |
| Cron / jobs     | Cloud Functions (agendada) + Scheduler |
| E-mail          | Resend                                 |
| Dados de voo    | Travelpayouts / Aviasales (afiliado)   |

Custo mensal no lancamento: ~R$0 (so o dominio, ~R$40/ano).

## Rodando localmente

    npm install
    cp .env.example .env.local   # preencha os valores
    npm run dev                  # http://localhost:3000

## Arquitetura de paginas (SEO-first)

O crescimento vem de SEO, entao quase tudo e renderizado no servidor (SSG):

- `/` - homepage com busca de voos e rotas populares
- `/voos` - indice de todas as rotas
- `/voos/[slug]` - pagina SEO por rota (ex.: `/voos/gru-ssa`), pre-renderizada
  via `generateStaticParams`, com metadata e JSON-LD
- `/destinos` e `/destinos/[slug]` - paginas de destino (hoteis, eSIM)
- `/alertas` - cadastro de alerta de preco
- `/buscar` - resultados (widget Travelpayouts), noindex
- `/sitemap.xml` e `/robots.txt` - gerados automaticamente

Para adicionar rotas, edite `src/lib/routes.ts` - o sitemap e as paginas se
geram sozinhos.

## Deploy no Firebase App Hosting

1. Instale a CLI: `npm install -g firebase-tools` e `firebase login`.
2. Crie o projeto `achabrasil` no console do Firebase (ou ajuste `.firebaserc`).
3. Conecte o repositorio GitHub `lpissinali/achabrasil` ao App Hosting pelo
   console; cada push na branch `main` faz deploy automatico.
4. Configure os secrets:

       firebase functions:secrets:set RESEND_API_KEY
       firebase functions:secrets:set TP_API_TOKEN

5. Aponte o dominio `achabrasil.com.br` (registro.br) para o App Hosting:
   adicione o dominio customizado no console e crie os registros DNS indicados
   no painel do registro.br.

## Firestore + alertas de preco

- O formulario em `/alertas` faz POST para `/api/alertas`, que grava na colecao
  `priceAlerts` via Admin SDK.
- A funcao agendada em `functions/src/index.ts` roda diariamente, consulta o
  preco na Travelpayouts e envia e-mail via Resend quando o preco cai.

      cd functions && npm install && npm run deploy

## Proximos passos

- [ ] Embutir o widget White Label da Travelpayouts em `/buscar` e `/voos/[slug]`
- [ ] Conectar a Travelpayouts Data API (calendario de precos, "me surpreenda")
- [ ] Implementar o e-mail real em `functions/src/index.ts`
- [ ] Escrever conteudo unico nas paginas de rota (chave para ranquear)
- [ ] Widget de hoteis (Booking.com) nas paginas de destino
