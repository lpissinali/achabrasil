/** Editorial guides per destination. Pure data - safe to import anywhere.
 *  Keyed by city name (matches Airport.city). Cities without an entry use a
 *  sensible generated fallback so every page still has unique, useful copy. */
export type Highlight = { title: string; text: string };
export type CityGuide = {
  tagline: string;
  about: string;
  highlights: Highlight[];
  bestTime: string;
};

export const CITY_GUIDES: Record<string, CityGuide> = {
  "São Paulo": {
    tagline: "A capital que não dorme",
    about:
      "Maior cidade do Brasil, São Paulo é o destino da gastronomia, da cultura e dos negócios. Tem de tudo: museus de classe mundial, uma cena de restaurantes sem fim e uma vida noturna que vai até o amanhecer.",
    highlights: [
      { title: "Avenida Paulista e MASP", text: "O cartão-postal da cidade, com museu, feiras e ciclovia aos domingos." },
      { title: "Beco do Batman e Vila Madalena", text: "Grafites, bares e a melhor noite paulistana." },
      { title: "Mercadão e gastronomia", text: "Do sanduíche de mortadela à alta cozinha premiada." },
    ],
    bestTime: "O ano todo. Abril a junho e setembro a outubro trazem clima ameno e menos chuva.",
  },
  "Rio de Janeiro": {
    tagline: "Cidade Maravilhosa",
    about:
      "Praias icônicas, montanhas e o melhor do astral carioca. Do Cristo Redentor ao calçadão de Copacabana, o Rio é parada obrigatória para quem visita o Brasil.",
    highlights: [
      { title: "Cristo Redentor e Pão de Açúcar", text: "As duas vistas mais famosas do país, melhores no fim de tarde." },
      { title: "Copacabana e Ipanema", text: "Praias urbanas, quiosques e o pôr do sol no Arpoador." },
      { title: "Santa Teresa e Lapa", text: "Bondinho, ateliês e a noite boêmia dos Arcos." },
    ],
    bestTime: "Maio a outubro é mais seco. Réveillon e Carnaval lotam a cidade e os preços sobem.",
  },
  Salvador: {
    tagline: "O coração afro-brasileiro",
    about:
      "Primeira capital do Brasil, Salvador pulsa com história, axé e praias. O centro histórico do Pelourinho é Patrimônio da Humanidade e a culinária baiana é uma das mais ricas do país.",
    highlights: [
      { title: "Pelourinho", text: "Ladeiras coloridas, igrejas barrocas e roda de capoeira." },
      { title: "Elevador Lacerda e Mercado Modelo", text: "Vista da Baía de Todos-os-Santos e artesanato." },
      { title: "Praias e acarajé", text: "Do Porto da Barra a Itapuã, com comida de tabuleiro." },
    ],
    bestTime: "Setembro a março é mais ensolarado. O verão e o Carnaval são imperdíveis (e cheios).",
  },
  Recife: {
    tagline: "A Veneza brasileira",
    about:
      "Cortada por rios e pontes, Recife mistura história, frevo e praias urbanas. Ao lado fica Olinda, com seu centro histórico colorido e ladeiras de tirar o fôlego.",
    highlights: [
      { title: "Recife Antigo", text: "Marco Zero, Rua do Bom Jesus e a cena cultural à beira-mar." },
      { title: "Olinda", text: "Casario colonial, ateliês e a melhor vista do litoral." },
      { title: "Praia de Boa Viagem", text: "Calçadão movimentado e quiosques (atenção às placas de banho)." },
    ],
    bestTime: "Setembro a fevereiro tem menos chuva. O Carnaval do frevo e do maracatu é único.",
  },
  Fortaleza: {
    tagline: "Sol o ano inteiro",
    about:
      "Capital do Ceará e porta de entrada para algumas das praias mais bonitas do Nordeste, como Jericoacoara e Canoa Quebrada. Vida noturna animada e forró todo dia.",
    highlights: [
      { title: "Beira-Mar", text: "Calçadão, feirinha de artesanato e barracas de praia." },
      { title: "Bate-volta para Cumbuco", text: "Dunas, kitesurfe e passeio de buggy." },
      { title: "Jericoacoara", text: "A poucas horas, uma das praias mais famosas do mundo." },
    ],
    bestTime: "Julho a dezembro é a estação seca, perfeita para praia e ventos para kitesurfe.",
  },
  Natal: {
    tagline: "A cidade do sol",
    about:
      "Natal é dunas, lagoas e praias de água morna. A capital potiguar é base para passeios a Pipa, Genipabu e ao maior cajueiro do mundo.",
    highlights: [
      { title: "Dunas de Genipabu", text: "Passeio de buggy 'com ou sem emoção' e aladeltismo." },
      { title: "Praia de Pipa", text: "Falésias, golfinhos e vida noturna a 1h30 da capital." },
      { title: "Forte dos Reis Magos", text: "História à beira-mar, no encontro do rio com o oceano." },
    ],
    bestTime: "Setembro a março, com sol firme. Chove mais entre março e julho.",
  },
  Maceió: {
    tagline: "O Caribe brasileiro",
    about:
      "Águas verdes e calmas, piscinas naturais e coqueirais. Maceió e o litoral alagoano (Maragogi, São Miguel dos Milagres) têm algumas das praias mais bonitas do Brasil.",
    highlights: [
      { title: "Praia do Francês e Pajuçara", text: "Piscinas naturais a poucos metros da areia." },
      { title: "Maragogi", text: "As 'Galés', piscinas no meio do mar, a 2h da capital." },
      { title: "Rota Ecológica dos Milagres", text: "Praias desertas e pousadas charmosas." },
    ],
    bestTime: "Outubro a março traz mar calmo e transparente, ideal para as piscinas naturais.",
  },
  Manaus: {
    tagline: "Portal da Amazônia",
    about:
      "No coração da floresta, Manaus une opulência histórica e natureza exuberante. É a base para conhecer o Encontro das Águas e lodges de selva pelos rios.",
    highlights: [
      { title: "Teatro Amazonas", text: "Joia da Belle Époque, erguida na era da borracha." },
      { title: "Encontro das Águas", text: "Rios Negro e Solimões correndo lado a lado sem se misturar." },
      { title: "Passeios de selva", text: "Lodges, trilhas, observação de botos e pesca de piranha." },
    ],
    bestTime: "Junho a novembro (vazante) facilita trilhas e praias de rio. A cheia mostra a floresta alagada.",
  },
  Belém: {
    tagline: "Sabores da Amazônia",
    about:
      "Belém é a capital da gastronomia amazônica: tucupi, jambu e açaí de verdade. Cidade histórica às margens da baía do Guajará, viveu o auge da borracha.",
    highlights: [
      { title: "Mercado Ver-o-Peso", text: "O maior mercado a céu aberto da América Latina." },
      { title: "Estação das Docas", text: "Antigos armazéns que viraram restaurantes à beira-rio." },
      { title: "Ilha do Combu", text: "Açaí e chocolate em meio à floresta, a poucos minutos de barco." },
    ],
    bestTime: "Junho a novembro é mais seco. Em outubro acontece o Círio de Nazaré, maior festa religiosa do país.",
  },
  Florianópolis: {
    tagline: "A ilha da magia",
    about:
      "Mais de 40 praias para todos os gostos: surfe no norte, sossego no sul, lagoa e trilhas no leste. Floripa combina natureza, boa comida e vida noturna.",
    highlights: [
      { title: "Praia da Joaquina e Mole", text: "Surfe, dunas e o point jovem da ilha." },
      { title: "Lagoa da Conceição", text: "Bares, esportes aquáticos e o pôr do sol mais bonito." },
      { title: "Costa da Lagoa e Ribeirão", text: "Trilhas, vilas de pescadores e ostras frescas." },
    ],
    bestTime: "Dezembro a março para praia. Fora do verão, fica tranquila e mais barata.",
  },
  Curitiba: {
    tagline: "Inovação e parques",
    about:
      "Referência em urbanismo e qualidade de vida, Curitiba tem parques arborizados, museus e uma cena gastronômica em alta. É também a porta de entrada para o passeio de trem à Serra do Mar.",
    highlights: [
      { title: "Jardim Botânico", text: "A estufa de vidro é o cartão-postal da cidade." },
      { title: "Museu Oscar Niemeyer", text: "O 'Museu do Olho', ícone da arquitetura." },
      { title: "Trem da Serra do Mar", text: "Uma das ferrovias mais bonitas do mundo, rumo a Morretes." },
    ],
    bestTime: "Setembro a novembro e março a maio têm clima ameno. Faz frio de verdade no inverno.",
  },
  "Porto Alegre": {
    tagline: "Capital gaúcha",
    about:
      "Às margens do Guaíba, Porto Alegre é tradição, parrilla e um pôr do sol famoso. Base para conhecer a Serra Gaúcha, Gramado e os vinhedos do Vale dos Vinhedos.",
    highlights: [
      { title: "Pôr do sol no Guaíba", text: "Visto do Gasômetro ou de um barco, é tradição local." },
      { title: "Mercado Público", text: "Bancas históricas, cafés e a cultura do chimarrão." },
      { title: "Bate-volta à Serra", text: "Gramado, Canela e vinícolas a poucas horas." },
    ],
    bestTime: "Outubro a abril é mais quente. O inverno é frio e combina com a Serra.",
  },
  "Foz do Iguaçu": {
    tagline: "As Cataratas",
    about:
      "Uma das Sete Maravilhas Naturais do Mundo. Foz reúne as quedas d'água gigantes, a usina de Itaipu e a tríplice fronteira entre Brasil, Argentina e Paraguai.",
    highlights: [
      { title: "Cataratas do Iguaçu", text: "Veja dos dois lados: a vista panorâmica do Brasil e a Garganta do Diabo na Argentina." },
      { title: "Parque das Aves", text: "Tucanos e araras de pertinho, ao lado das cataratas." },
      { title: "Itaipu e Marco das Três Fronteiras", text: "Engenharia gigante e o encontro de três países." },
    ],
    bestTime: "Agosto a novembro e março a maio evitam o calor extremo e as cheias do verão.",
  },
  "Porto Seguro": {
    tagline: "Onde o Brasil começou",
    about:
      "Berço do descobrimento, Porto Seguro mistura história e praias paradisíacas. Daqui se chega a Trancoso, Arraial d'Ajuda e às barracas badaladas da Costa do Descobrimento.",
    highlights: [
      { title: "Centro Histórico", text: "A cidade alta, com as primeiras igrejas do Brasil." },
      { title: "Trancoso e seu Quadrado", text: "Vilarejo charmoso e praias de tirar o fôlego." },
      { title: "Arraial d'Ajuda", text: "Vida noturna, eco-parque e a Praia do Mucugê." },
    ],
    bestTime: "Outubro a abril tem sol e mar quente. Alta temporada no verão e feriados.",
  },
  "Brasília": {
    tagline: "Modernismo a céu aberto",
    about:
      "A capital projetada por Niemeyer e Lúcio Costa é um museu de arquitetura modernista ao ar livre, Patrimônio da Humanidade, com céu amplo e pôr do sol famoso.",
    highlights: [
      { title: "Praça dos Três Poderes", text: "Congresso, Catedral e os palácios de Niemeyer." },
      { title: "Catedral Metropolitana", text: "A obra de vitrais mais fotografada da cidade." },
      { title: "Pôr do sol no Pontão", text: "Bares e restaurantes à beira do Lago Paranoá." },
    ],
    bestTime: "Maio a setembro é seco (e seco mesmo). Chove forte de novembro a março.",
  },
  "Belo Horizonte": {
    tagline: "Capital dos botecos",
    about:
      "BH é a cidade do pão de queijo, dos bares e da hospitalidade mineira. Base perfeita para explorar as cidades históricas e a arte de Inhotim.",
    highlights: [
      { title: "Mercado Central", text: "Templo do queijo, da cachaça e do fígado com jiló." },
      { title: "Pampulha", text: "Conjunto modernista de Niemeyer, Patrimônio da Humanidade." },
      { title: "Inhotim e Ouro Preto", text: "O maior museu a céu aberto e o barroco mineiro, a um bate-volta." },
    ],
    bestTime: "Abril a setembro tem clima seco e agradável. Festas juninas animam o interior.",
  },
  "Vitória": {
    tagline: "Ilha capixaba",
    about:
      "Capital do Espírito Santo, Vitória é uma ilha cercada de baías e morros, com moqueca capixaba, praias urbanas e o santuário do Convento da Penha logo ao lado.",
    highlights: [
      { title: "Convento da Penha", text: "Vista panorâmica da baía, em Vila Velha." },
      { title: "Praia de Camburi", text: "O calçadão à beira-mar mais movimentado da cidade." },
      { title: "Moqueca capixaba", text: "Feita na panela de barro, sem dendê - a rival da baiana." },
    ],
    bestTime: "O ano todo é quente. Setembro a março é mais ensolarado.",
  },
  "Buenos Aires": {
    tagline: "A Paris da América do Sul",
    about:
      "Tango, parrilla e arquitetura europeia. Buenos Aires é o destino internacional preferido dos brasileiros: perto, barato e cheio de cultura, cafés e compras.",
    highlights: [
      { title: "Caminito e La Boca", text: "Ruas coloridas, tango na calçada e o estádio do Boca." },
      { title: "Recoleta e Palermo", text: "Cemitério histórico, cafés e os bares mais badalados." },
      { title: "Parrillas e vinhos", text: "Bife de chorizo e Malbec - a melhor relação custo-benefício." },
    ],
    bestTime: "Março a maio e setembro a novembro têm clima ameno. Verão é quente e inverno frio.",
  },
  Santiago: {
    tagline: "Cordilheira e vinhedos",
    about:
      "Aos pés dos Andes, Santiago combina cidade moderna, esqui no inverno e vinícolas no entorno. É a porta de entrada para Valparaíso e o Valle Nevado.",
    highlights: [
      { title: "Cerro San Cristóbal", text: "Vista da cidade com os Andes ao fundo." },
      { title: "Valparaíso", text: "Cidade portuária colorida, a 1h30, Patrimônio da Humanidade." },
      { title: "Vinícolas e esqui", text: "Vales do vinho no verão; Valle Nevado de junho a setembro." },
    ],
    bestTime: "Setembro a novembro e março a maio. Junho a agosto para esqui.",
  },
  "Montevidéu": {
    tagline: "Charme à beira-rio",
    about:
      "Capital tranquila do Uruguai, Montevidéu tem a maior rambla à beira d'água da região, cidade velha histórica e o melhor do chivito e do mate. Perto fica Punta del Este.",
    highlights: [
      { title: "Ciudad Vieja", text: "Mercado del Puerto, praças e teatros históricos." },
      { title: "Rambla", text: "Mais de 20 km de orla para caminhar e ver o pôr do sol." },
      { title: "Punta del Este", text: "O balneário mais badalado do Uruguai, a 2h de carro." },
    ],
    bestTime: "Dezembro a março é verão e alta temporada nas praias.",
  },
  Lima: {
    tagline: "Capital gastronômica",
    about:
      "Lima tem alguns dos melhores restaurantes do mundo e é a porta de entrada para Cusco e Machu Picchu. Ceviche, pisco e história colonial à beira do Pacífico.",
    highlights: [
      { title: "Miraflores e Barranco", text: "Bairros à beira-mar, com bares, arte e vista do oceano." },
      { title: "Centro histórico", text: "Praça de Armas e conventos coloniais." },
      { title: "Gastronomia", text: "Ceviche, causa e os templos da alta cozinha peruana." },
    ],
    bestTime: "Dezembro a abril tem sol. O resto do ano fica nublado (a 'garúa').",
  },
  "Bogotá": {
    tagline: "Altitude e cultura",
    about:
      "A 2.600 m, a capital colombiana é fria, vibrante e cheia de história. Museus de ouro, o bairro La Candelaria e a vista do Monserrate marcam a visita.",
    highlights: [
      { title: "La Candelaria", text: "Centro colonial com grafites, igrejas e o Museu do Ouro." },
      { title: "Monserrate", text: "Subida de teleférico para a melhor vista da cidade." },
      { title: "Café e Zona G", text: "Café colombiano de verdade e a melhor gastronomia." },
    ],
    bestTime: "Dezembro a março e julho a agosto são mais secos. Leve casaco o ano todo.",
  },
  Lisboa: {
    tagline: "Luz, fado e azulejos",
    about:
      "Capital portuguesa de colinas, bondinhos e miradouros. Lisboa encanta pela proximidade da língua, pelos pastéis de nata e por ser base para Sintra e Cascais.",
    highlights: [
      { title: "Alfama e Belém", text: "Fado nas vielas, a Torre de Belém e os pastéis originais." },
      { title: "Miradouros e elétrico 28", text: "As melhores vistas da cidade num bonde histórico." },
      { title: "Sintra", text: "Palácios de conto de fadas a 40 minutos de trem." },
    ],
    bestTime: "Abril a junho e setembro a outubro: clima ameno e menos turistas.",
  },
  Porto: {
    tagline: "Vinho e ribeira",
    about:
      "Cidade-berço do vinho do Porto, com a Ribeira à beira do Douro, livrarias históricas e azulejos por toda parte. Mais intimista (e barata) que Lisboa.",
    highlights: [
      { title: "Ribeira e Ponte Dom Luís I", text: "O cartão-postal do Porto, à beira do rio Douro." },
      { title: "Caves de vinho do Porto", text: "Degustações em Vila Nova de Gaia." },
      { title: "Livraria Lello", text: "Uma das livrarias mais bonitas do mundo." },
    ],
    bestTime: "Maio a setembro tem clima agradável. Vindima e festas no início do outono.",
  },
  Madri: {
    tagline: "Energia espanhola",
    about:
      "Capital da Espanha, Madri tem grandes museus, tapas até tarde e praças animadas. Base para bate-voltas a Toledo e Segóvia.",
    highlights: [
      { title: "Museu do Prado", text: "Uma das maiores pinacotecas do mundo." },
      { title: "Plaza Mayor e La Latina", text: "Tapas, vermute e a vida de bairro." },
      { title: "Parque do Retiro", text: "O pulmão verde da cidade, com o Palácio de Cristal." },
    ],
    bestTime: "Abril a junho e setembro a outubro. O verão é muito quente.",
  },
  Paris: {
    tagline: "A cidade-luz",
    about:
      "Romance, arte e gastronomia no destino mais visitado da Europa. Da Torre Eiffel ao Louvre, Paris é cafés, museus e caminhadas à beira do Sena.",
    highlights: [
      { title: "Torre Eiffel e Sena", text: "Suba ao topo ou veja das margens ao anoitecer." },
      { title: "Louvre e Montmartre", text: "Da Mona Lisa aos ateliês da Sacré-Cœur." },
      { title: "Bistrôs e patisseries", text: "Croissants, queijos e o melhor da cozinha francesa." },
    ],
    bestTime: "Abril a junho e setembro a outubro: clima bom e jardins floridos.",
  },
  Londres: {
    tagline: "Tradição e modernidade",
    about:
      "Museus gratuitos de classe mundial, parques imensos, teatros e bairros com personalidade. Londres é cara, mas tem muito o que fazer sem gastar.",
    highlights: [
      { title: "Westminster e London Eye", text: "Big Ben, o Parlamento e a roda-gigante à beira do Tâmisa." },
      { title: "Museus gratuitos", text: "British Museum, Tate Modern e National Gallery sem pagar entrada." },
      { title: "Camden e mercados", text: "Borough Market, pubs e a cena alternativa." },
    ],
    bestTime: "Maio a setembro tem dias longos e mais sol. Leve guarda-chuva sempre.",
  },
  Roma: {
    tagline: "A cidade eterna",
    about:
      "Um museu a céu aberto: Coliseu, Fórum e o Vaticano dividem espaço com fontes barrocas e a melhor massa do mundo. Roma é história a cada esquina.",
    highlights: [
      { title: "Coliseu e Fórum Romano", text: "O coração do império, melhor visitado cedo." },
      { title: "Vaticano", text: "Basílica de São Pedro e a Capela Sistina." },
      { title: "Fontana di Trevi e Trastevere", text: "Jogue a moeda e jante nas vielas mais charmosas." },
    ],
    bestTime: "Abril a junho e setembro a outubro. Julho e agosto são quentes e lotados.",
  },
  Miami: {
    tagline: "Praia, compras e agito",
    about:
      "Sol o ano todo, praias de areia branca, outlets e vida noturna latina. Miami é o destino favorito para compras e base para cruzeiros pelo Caribe.",
    highlights: [
      { title: "South Beach e Ocean Drive", text: "Art déco, praia e a noite mais famosa da Flórida." },
      { title: "Wynwood", text: "Murais gigantes, galerias e cervejarias." },
      { title: "Outlets e compras", text: "Dolphin, Sawgrass e o Aventura Mall." },
    ],
    bestTime: "Novembro a abril tem clima seco e ameno. Verão é quente e úmido, com furacões a partir de agosto.",
  },
  Orlando: {
    tagline: "A capital dos parques",
    about:
      "Disney, Universal e compras infinitas fazem de Orlando o destino de família número um. Programe-se: são dias inteiros de parques e outlets.",
    highlights: [
      { title: "Walt Disney World", text: "Quatro parques temáticos, do Magic Kingdom ao Epcot." },
      { title: "Universal Orlando", text: "Harry Potter, montanhas-russas e o novo Epic Universe." },
      { title: "Outlets", text: "Premium Outlets e o Mall at Millenia para as compras." },
    ],
    bestTime: "Setembro a meados de dezembro e maio têm menos filas. Evite as férias americanas.",
  },
  "Nova York": {
    tagline: "A cidade que nunca dorme",
    about:
      "Arranha-céus, Broadway, museus e bairros para o mundo todo. Nova York é intensa em qualquer época e oferece de tudo: arte, compras e gastronomia.",
    highlights: [
      { title: "Times Square e Central Park", text: "O caos iluminado e o respiro verde no meio de Manhattan." },
      { title: "Estátua da Liberdade e Brooklyn Bridge", text: "Os símbolos da cidade, melhores ao amanhecer." },
      { title: "Museus e Broadway", text: "MET, MoMA e um musical à noite." },
    ],
    bestTime: "Abril a junho e setembro a novembro. O Natal é mágico (e gelado).",
  },
  "Cancún": {
    tagline: "Caribe mexicano",
    about:
      "Praias de areia branca e mar azul-turquesa, resorts all-inclusive e ruínas maias por perto. Cancún e a Riviera Maya são sinônimo de férias caribenhas.",
    highlights: [
      { title: "Zona Hoteleira", text: "Praias paradisíacas e resorts à beira-mar." },
      { title: "Chichén Itzá e cenotes", text: "Ruínas maias e poços de água cristalina para mergulhar." },
      { title: "Playa del Carmen e Tulum", text: "Vilas charmosas e praias com ruínas à beira-mar." },
    ],
    bestTime: "Dezembro a abril tem clima seco. Temporada de furacões vai de junho a novembro.",
  },
};

function fallback(a: { city: string; state: string; intl?: boolean }): CityGuide {
  const local = a.intl ? a.state : `${a.state}, no Brasil`;
  return {
    tagline: a.intl ? "Destino internacional" : "Descubra a cidade",
    about: `${a.city}, em ${local}, é um destino que vale a viagem. Reunimos voos baratos e dicas para você aproveitar o melhor da cidade, com passagens em reais atualizadas a partir das buscas mais recentes.`,
    highlights: [
      { title: "Centro e história", text: `Explore o centro de ${a.city}, seus pontos históricos e a cultura local.` },
      { title: "Gastronomia", text: "Prove a comida típica da região nos mercados e restaurantes." },
      { title: "Arredores", text: `Use ${a.city} como base para conhecer as atrações da redondeza.` },
    ],
    bestTime: "Pesquise a alta e a baixa temporada: viajar fora dos feriados costuma sair bem mais barato.",
  };
}

export function cityGuide(a: { city: string; state: string; intl?: boolean }): CityGuide {
  return CITY_GUIDES[a.city] ?? fallback(a);
}
