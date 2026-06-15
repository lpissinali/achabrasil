/** Major Brazilian airports used across the site. */
export type Airport = {
  iata: string;
  city: string;
  state: string;
  name: string;
};

export const AIRPORTS: Record<string, Airport> = {
  GRU: { iata: "GRU", city: "São Paulo", state: "SP", name: "Guarulhos" },
  CGH: { iata: "CGH", city: "São Paulo", state: "SP", name: "Congonhas" },
  GIG: { iata: "GIG", city: "Rio de Janeiro", state: "RJ", name: "Galeão" },
  SDU: { iata: "SDU", city: "Rio de Janeiro", state: "RJ", name: "Santos Dumont" },
  BSB: { iata: "BSB", city: "Brasília", state: "DF", name: "Brasília" },
  SSA: { iata: "SSA", city: "Salvador", state: "BA", name: "Salvador" },
  REC: { iata: "REC", city: "Recife", state: "PE", name: "Recife" },
  FOR: { iata: "FOR", city: "Fortaleza", state: "CE", name: "Fortaleza" },
  FLN: { iata: "FLN", city: "Florianópolis", state: "SC", name: "Florianópolis" },
  POA: { iata: "POA", city: "Porto Alegre", state: "RS", name: "Salgado Filho" },
  CWB: { iata: "CWB", city: "Curitiba", state: "PR", name: "Afonso Pena" },
  CNF: { iata: "CNF", city: "Belo Horizonte", state: "MG", name: "Confins" },
  VCP: { iata: "VCP", city: "Campinas", state: "SP", name: "Viracopos" },
  NAT: { iata: "NAT", city: "Natal", state: "RN", name: "São Gonçalo do Amarante" },
  MCZ: { iata: "MCZ", city: "Maceió", state: "AL", name: "Zumbi dos Palmares" },
  BEL: { iata: "BEL", city: "Belém", state: "PA", name: "Val de Cans" },
  MAO: { iata: "MAO", city: "Manaus", state: "AM", name: "Eduardo Gomes" },
  POG: { iata: "POG", city: "Porto Seguro", state: "BA", name: "Porto Seguro" },
};

export function airport(iata: string): Airport | undefined {
  return AIRPORTS[iata.toUpperCase()];
}
