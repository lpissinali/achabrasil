/** Shared destination metadata (pure - safe anywhere). Keyed by the
 *  city-directions / metro code returned by the Data API. */
export type Tone = "coral" | "sun" | "teal" | "ink";

export const DEST_META: Record<string, { iata: string; name: string; where: string; tone: Tone }> = {
  RIO: { iata: "GIG", name: "Rio de Janeiro", where: "Rio de Janeiro", tone: "coral" },
  SAO: { iata: "GRU", name: "São Paulo", where: "São Paulo", tone: "ink" },
  SSA: { iata: "SSA", name: "Salvador", where: "Bahia", tone: "sun" },
  REC: { iata: "REC", name: "Recife", where: "Pernambuco", tone: "teal" },
  FOR: { iata: "FOR", name: "Fortaleza", where: "Ceará", tone: "coral" },
  FLN: { iata: "FLN", name: "Florianópolis", where: "Santa Catarina", tone: "teal" },
  NAT: { iata: "NAT", name: "Natal", where: "Rio Grande do Norte", tone: "sun" },
  MAO: { iata: "MAO", name: "Manaus", where: "Amazonas", tone: "teal" },
  IGU: { iata: "IGU", name: "Foz do Iguaçu", where: "Paraná", tone: "ink" },
  POA: { iata: "POA", name: "Porto Alegre", where: "Rio Grande do Sul", tone: "ink" },
  CWB: { iata: "CWB", name: "Curitiba", where: "Paraná", tone: "teal" },
  BSB: { iata: "BSB", name: "Brasília", where: "Distrito Federal", tone: "coral" },
  BHZ: { iata: "CNF", name: "Belo Horizonte", where: "Minas Gerais", tone: "sun" },
  MCZ: { iata: "MCZ", name: "Maceió", where: "Alagoas", tone: "sun" },
  BEL: { iata: "BEL", name: "Belém", where: "Pará", tone: "teal" },
  SLZ: { iata: "SLZ", name: "São Luís", where: "Maranhão", tone: "sun" },
  VIX: { iata: "VIX", name: "Vitória", where: "Espírito Santo", tone: "teal" },
  BUE: { iata: "EZE", name: "Buenos Aires", where: "Argentina", tone: "ink" },
  SCL: { iata: "SCL", name: "Santiago", where: "Chile", tone: "coral" },
  LIS: { iata: "LIS", name: "Lisboa", where: "Portugal", tone: "sun" },
  MIA: { iata: "MIA", name: "Miami", where: "Estados Unidos", tone: "teal" },
  MCO: { iata: "MCO", name: "Orlando", where: "Estados Unidos", tone: "teal" },
  LIM: { iata: "LIM", name: "Lima", where: "Peru", tone: "coral" },
  MVD: { iata: "MVD", name: "Montevidéu", where: "Uruguai", tone: "teal" },
  BOG: { iata: "BOG", name: "Bogotá", where: "Colômbia", tone: "sun" },
  CUN: { iata: "CUN", name: "Cancún", where: "México", tone: "coral" },
};

const TONES: Tone[] = ["coral", "sun", "teal", "ink"];

export function destMeta(code: string, i = 0): { iata: string; name: string; where: string; tone: Tone } {
  return DEST_META[code] ?? { iata: code, name: code, where: "", tone: TONES[i % TONES.length] };
}

export const FEATURED_NACIONAIS = ["RIO", "BSB", "FOR", "MAO", "IGU", "SSA", "REC", "FLN"];
export const FEATURED_INTL = ["BUE", "SCL", "LIS", "MIA"];

export const GRADIENT: Record<Tone, string> = {
  coral: "linear-gradient(135deg,#ff8a73,#b5432f)",
  sun: "linear-gradient(135deg,#ffce6e,#d99b00)",
  teal: "linear-gradient(135deg,#2bbcaa,#0a6f66)",
  ink: "linear-gradient(135deg,#5b6b67,#28332f)",
};
