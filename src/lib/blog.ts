/** Blog content (pure data). Each post renders at /blog/[slug]. */
export type Block = { h2?: string; p?: string; ul?: string[] };
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readMins: number;
  tone: "coral" | "sun" | "teal" | "ink";
  blocks: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "gru-cgh-vcp-qual-aeroporto-de-sao-paulo",
    title: "GRU, CGH ou VCP? Qual aeroporto de São Paulo escolher",
    excerpt:
      "São Paulo tem três aeroportos. Entenda as diferenças entre Guarulhos, Congonhas e Viracopos e escolha o melhor para a sua viagem.",
    date: "2026-06-22",
    readMins: 6,
    tone: "teal",
    blocks: [
      { p: "Comprou uma passagem de São Paulo e apareceram três aeroportos diferentes? É normal: a região metropolitana é servida por Guarulhos (GRU), Congonhas (CGH) e Viracopos (VCP), cada um com um perfil. Escolher o certo economiza tempo e, às vezes, bastante dinheiro." },
      { h2: "Guarulhos (GRU) - o hub internacional" },
      { p: "É o maior aeroporto do país e o principal para voos internacionais e de longa distância. Opera praticamente todas as companhias e oferece o maior número de destinos. Fica a cerca de 25 a 30 km do centro de São Paulo, então programe o deslocamento com folga." },
      { h2: "Congonhas (CGH) - o mais central" },
      { p: "A poucos quilômetros do centro, Congonhas é o aeroporto da famosa ponte aérea com o Rio e concentra voos domésticos de curta e média distância. É o mais prático para quem vai a trabalho ou quer chegar rápido à cidade, mas não opera voos internacionais de longa distância." },
      { h2: "Viracopos (VCP) - tarifas baratas, em Campinas" },
      { p: "Viracopos fica em Campinas, a cerca de 100 km de São Paulo, e é um importante hub da Azul. Costuma ter tarifas competitivas, mas vale somar o custo e o tempo do deslocamento. Pode compensar muito se você mora na região de Campinas ou se a diferença de preço justificar a viagem." },
      { h2: "Qual escolher?" },
      { ul: [
        "Voo internacional ou de longa distância: Guarulhos (GRU).",
        "Voo doméstico rápido e perto do centro: Congonhas (CGH).",
        "Melhor tarifa ou saindo da região de Campinas: Viracopos (VCP).",
      ] },
      { h2: "A dica para pagar menos" },
      { p: "Na hora de buscar, compare os três aeroportos: às vezes a mesma rota sai bem mais barata por Viracopos ou Guarulhos. No AchaBrasil você pesquisa por cada um e vê qual tem o melhor preço para a sua data." },
    ],
  },
  {
    slug: "voar-pela-primeira-vez-guia-do-aeroporto",
    title: "Vai voar pela primeira vez? Guia do check-in ao desembarque",
    excerpt:
      "Check-in, bagagem, raio-x, embarque e desembarque: o passo a passo para pegar um avião pela primeira vez sem estresse.",
    date: "2026-06-19",
    readMins: 7,
    tone: "coral",
    blocks: [
      { p: "A primeira vez de avião dá um frio na barriga, mas o processo é mais simples do que parece. Veja o passo a passo, do momento em que você sai de casa até pegar a mala no destino." },
      { h2: "Antes de ir ao aeroporto" },
      { p: "Separe um documento de identidade com foto (RG para voos domésticos; passaporte para internacionais). Faça o check-in online pelo site ou app da companhia, normalmente liberado de 24 a 48 horas antes - assim você já escolhe o assento e ganha tempo." },
      { h2: "Com quanta antecedência chegar" },
      { p: "Como regra geral, chegue ao aeroporto cerca de 2 horas antes de um voo doméstico e 3 horas antes de um internacional. Em feriados e horários de pico, vá com mais folga." },
      { h2: "Check-in e bagagem" },
      { p: "No balcão ou totem da companhia você confirma o voo e despacha a mala (se tiver franquia). A bagagem de mão vai com você na cabine. Confira os limites de peso e tamanho da sua tarifa para não pagar excesso no balcão." },
      { h2: "Segurança (raio-x)" },
      { p: "Na inspeção, coloque mochila, eletrônicos e objetos de metal nas bandejas. Em voos internacionais, líquidos na bagagem de mão são limitados a frascos de até 100 ml. Tire casaco e cinto se pedirem - é rápido." },
      { h2: "Sala de embarque e portão" },
      { p: "Confira no painel (ou no app) o portão de embarque e o horário. Esteja no portão antes da hora indicada no cartão de embarque: o embarque costuma começar de 30 a 40 minutos antes da decolagem e fecha pontualmente." },
      { h2: "No avião e no desembarque" },
      { p: "Guarde a bagagem de mão no compartimento acima, afivele o cinto e ponha o celular em modo avião. Ao pousar, siga as placas até a esteira para retirar a mala despachada. Se tiver conexão, procure os painéis com o número do próximo voo." },
      { h2: "Dicas para a primeira viagem" },
      { ul: [
        "Chegue cedo: a pressa é o que mais causa estresse em quem voa pela primeira vez.",
        "Instale o app da companhia para receber avisos de portão e atrasos.",
        "Deixe o documento sempre à mão - você vai precisar dele algumas vezes.",
        "Confirme as regras de bagagem antes de ir, pois mudam por tarifa e companhia.",
      ] },
    ],
  },
  {
    slug: "como-achar-passagens-aereas-baratas",
    title: "Como achar passagens aéreas baratas: 10 dicas que funcionam",
    excerpt:
      "Da flexibilidade de datas aos alertas de preço, veja o passo a passo para pagar menos na próxima viagem.",
    date: "2026-06-10",
    readMins: 6,
    tone: "teal",
    blocks: [
      { p: "Passagem aérea é, quase sempre, o maior gasto de uma viagem — e também onde dá para economizar mais. A boa notícia: não existe segredo, existe método. Reunimos as dicas que mais funcionam na prática para você achar voos baratos no Brasil e no exterior." },
      { h2: "1. Seja flexível com as datas" },
      { p: "Voar numa terça ou quarta costuma ser bem mais barato do que numa sexta ou domingo. Se você consegue mover a viagem em um ou dois dias, a diferença de preço pode passar de 30%. Use a busca por mês inteiro para enxergar os dias mais baratos de uma vez." },
      { h2: "2. Compre na hora certa" },
      { p: "Para voos domésticos, a faixa ideal costuma ser de 1 a 3 meses de antecedência. Para internacionais, de 2 a 6 meses. Comprar de última hora ou com muita antecedência raramente é o melhor negócio." },
      { h2: "3. Crie alertas de preço" },
      { p: "Você não precisa ficar olhando o preço todo dia. Configure um alerta para a sua rota e seja avisado quando o valor cair para o patamar que você quer pagar." },
      { h2: "4. Considere aeroportos alternativos" },
      { p: "Em São Paulo, compare Guarulhos (GRU), Congonhas (CGH) e Viracopos (VCP). No Rio, Galeão (GIG) e Santos Dumont (SDU). Um aeroporto vizinho pode sair bem mais em conta." },
      { h2: "5. Olhe voos com conexão" },
      { p: "Voo direto é mais confortável, mas uma escala curta às vezes derruba o preço de forma significativa. Vale o cálculo: quanto custa o seu tempo?" },
      { h2: "6. Pesquise em aba anônima" },
      { p: "Abrir a busca em uma janela anônima evita que preferências salvas e cookies influenciem o que você vê — uma forma simples de comparar com a cabeça fria." },
      { h2: "7. Viaje na baixa temporada" },
      { p: "Janeiro, julho, feriados prolongados e datas comemorativas puxam os preços para cima. Fora desses períodos, as mesmas rotas ficam bem mais baratas." },
      { h2: "8. Compare o preço total" },
      { p: "Uma tarifa baixa pode não incluir bagagem despachada. Some bagagem, marcação de assento e taxas antes de decidir — às vezes a passagem 'mais cara' sai mais barata no fim." },
      { h2: "9. Acompanhe promoções" },
      { p: "GOL, LATAM e Azul fazem campanhas relâmpago com frequência. Estar de olho nas ofertas do dia ajuda a pegar essas janelas." },
      { h2: "10. Use um comparador" },
      { p: "Em vez de abrir o site de cada companhia, deixe um buscador comparar tudo de uma vez. É exatamente para isso que o AchaBrasil existe: você vê o melhor preço e reserva direto com o parceiro." },
    ],
  },
  {
    slug: "melhor-dia-e-mes-para-comprar-passagem",
    title: "Qual o melhor dia e mês para comprar passagem aérea?",
    excerpt:
      "A antecedência ideal, os meses mais baratos e por que o 'dia mágico' da compra é um mito.",
    date: "2026-06-05",
    readMins: 8,
    tone: "sun",
    blocks: [
      { p: "Existe um dia certo para comprar passagem? E um mês mais barato para viajar? Separamos o que é mito do que realmente influencia o preço." },
      { h2: "O 'dia mágico' da compra é mito" },
      { p: "Você já deve ter ouvido que comprar na terça à meia-noite garante o melhor preço. Não há evidência consistente disso. Os preços mudam o tempo todo, com base em demanda e disponibilidade — o que importa muito mais é a antecedência e a data do voo, não o dia em que você compra." },
      { h2: "Antecedência ideal" },
      { ul: [
        "Voos domésticos: de 1 a 3 meses antes da viagem.",
        "Voos internacionais: de 2 a 6 meses antes.",
        "Alta temporada e feriados: compre com ainda mais antecedência, pois os assentos baratos esgotam primeiro.",
      ] },
      { h2: "Os dias mais baratos para voar" },
      { p: "Aqui sim há um padrão: voar no meio da semana (terça, quarta e quinta) costuma ser mais barato do que sexta, domingo e segunda, quando a procura é maior. Voos bem cedo ou tarde da noite também tendem a custar menos." },
      { h2: "Os meses mais baratos" },
      { p: "Evite janeiro, julho e dezembro, os picos das férias. Os melhores preços costumam aparecer fora desses períodos — por exemplo, de fevereiro a maio (depois do Carnaval) e de agosto a novembro, sempre fugindo dos feriados prolongados." },
      { h2: "A estratégia que funciona" },
      { p: "Em vez de tentar adivinhar o dia perfeito, faça o contrário: defina a rota, ative um alerta de preço e seja flexível com as datas. Quando o valor cair para o que você quer pagar, é a hora de comprar." },
      { h2: "Use as ferramentas a seu favor" },
      { p: "Você não precisa acompanhar o preço manualmente. Duas ferramentas fazem o trabalho por você: a busca por mês inteiro, que mostra de uma vez os dias mais baratos, e o alerta de preço, que avisa por e-mail quando a tarifa da sua rota cai. Juntas, elas eliminam o eterno 'será que compro agora?'." },
      { h2: "Um exemplo na prática" },
      { p: "Pense num voo São Paulo–Salvador. Saindo numa sexta e voltando no domingo, no meio das férias, você pode pagar quase o dobro do que pagaria saindo numa terça e voltando numa quarta, fora da alta temporada. Mesma rota, mesma companhia — só mudando os dias. É exatamente aí que mora a economia." },
      { h2: "Erros comuns que fazem você pagar mais" },
      { ul: [
        "Comprar em cima da hora, quando os assentos mais baratos já acabaram.",
        "Viajar sempre em datas 'redondas' (sexta a domingo), as mais disputadas.",
        "Ignorar aeroportos alternativos na mesma cidade ou região.",
        "Esquecer de somar bagagem e taxas ao comparar tarifas.",
      ] },
      { h2: "E as passagens internacionais?" },
      { p: "Para o exterior a lógica é a mesma, com prazos maiores: comece a procurar de 2 a 6 meses antes e fique de olho na estação do destino. Viajar na baixa temporada de lá, mesmo que seja alta por aqui, costuma render passagens e hotéis bem mais baratos." },
      { h2: "Perguntas frequentes" },
      { p: "Existe um dia certo da semana para comprar? Não de forma confiável — o que pesa é a antecedência e o dia do voo, não o dia em que você compra." },
      { p: "Qual o mês mais barato para viajar? Depende da rota, mas fora de janeiro, julho, dezembro e feriados você quase sempre encontra preços melhores." },
      { p: "Comprar de madrugada é mais barato? Não. Os preços são automáticos e variam por demanda, não pelo horário em que você acessa o site." },
    ],
  },
  {
    slug: "regras-de-bagagem-gol-latam-azul",
    title: "Bagagem GOL, LATAM e Azul: o que você pode levar",
    excerpt:
      "Bagagem de mão, item pessoal e bagagem despachada — entenda as regras e evite surpresas no embarque.",
    date: "2026-05-28",
    readMins: 5,
    tone: "coral",
    blocks: [
      { p: "Quase toda surpresa no aeroporto vem da bagagem. Entender as regras antes de comprar evita pagar caro na hora do embarque. Veja o panorama geral das três maiores companhias do Brasil — e confirme sempre no site da companhia, pois as regras podem mudar." },
      { h2: "Bagagem de mão" },
      { p: "Em geral, as tarifas incluem uma bagagem de mão de até 10 kg (medidas aproximadas de 55 x 35 x 25 cm) mais um item pessoal, como mochila pequena ou bolsa, que cabe embaixo do assento. Tarifas promocionais mais baratas podem limitar a bagagem de mão — atenção a isso." },
      { h2: "Bagagem despachada" },
      { p: "Em rotas domésticas, a bagagem despachada normalmente é paga à parte nas tarifas mais baratas e incluída nas tarifas superiores. O peso padrão por volta costuma ser de 23 kg. Despachar antecipado, no site, quase sempre sai mais barato do que no balcão do aeroporto." },
      { h2: "Por tipo de tarifa" },
      { p: "GOL, LATAM e Azul vendem famílias de tarifa (das mais básicas às mais flexíveis). Quanto mais barata a tarifa, menos itens incluídos — e mais caras as franquias adicionais. Por isso o preço da passagem nem sempre conta a história toda." },
      { h2: "Dicas para não pagar a mais" },
      { ul: [
        "Compre a franquia de bagagem junto com a passagem, não no aeroporto.",
        "Pese a mala em casa: excesso de peso é caro e cobrado por quilo.",
        "Se viaja leve, uma tarifa só com bagagem de mão pode ser o melhor negócio.",
        "Compare o preço total (passagem + bagagem) entre as companhias antes de decidir.",
      ] },
      { h2: "Confirme antes de comprar" },
      { p: "As regras e franquias mudam com frequência e variam por rota e tarifa. Use o AchaBrasil para comparar os preços e, ao escolher, confira a franquia de bagagem na tela de compra do parceiro antes de finalizar." },
    ],
  },
];

export function postBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}
