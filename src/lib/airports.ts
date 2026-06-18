/** Airports used across the site. For international airports, `state` holds
 *  the country name (so listings render "Argentina · EZE"). */
export type Airport = {
  iata: string;
  city: string;
  state: string;
  name: string;
  intl?: boolean;
};

export const AIRPORTS: Record<string, Airport> = {
  // ---- Brasil ----
  GRU: { iata: "GRU", city: "São Paulo", state: "SP", name: "Guarulhos" },
  CGH: { iata: "CGH", city: "São Paulo", state: "SP", name: "Congonhas" },
  VCP: { iata: "VCP", city: "Campinas", state: "SP", name: "Viracopos" },
  GIG: { iata: "GIG", city: "Rio de Janeiro", state: "RJ", name: "Galeão" },
  SDU: { iata: "SDU", city: "Rio de Janeiro", state: "RJ", name: "Santos Dumont" },
  BSB: { iata: "BSB", city: "Brasília", state: "DF", name: "Brasília" },
  CNF: { iata: "CNF", city: "Belo Horizonte", state: "MG", name: "Confins" },
  SSA: { iata: "SSA", city: "Salvador", state: "BA", name: "Salvador" },
  REC: { iata: "REC", city: "Recife", state: "PE", name: "Recife" },
  FOR: { iata: "FOR", city: "Fortaleza", state: "CE", name: "Fortaleza" },
  NAT: { iata: "NAT", city: "Natal", state: "RN", name: "São Gonçalo do Amarante" },
  MCZ: { iata: "MCZ", city: "Maceió", state: "AL", name: "Zumbi dos Palmares" },
  JPA: { iata: "JPA", city: "João Pessoa", state: "PB", name: "Castro Pinto" },
  AJU: { iata: "AJU", city: "Aracaju", state: "SE", name: "Santa Maria" },
  THE: { iata: "THE", city: "Teresina", state: "PI", name: "Senador Petrônio Portella" },
  SLZ: { iata: "SLZ", city: "São Luís", state: "MA", name: "Marechal Cunha Machado" },
  BEL: { iata: "BEL", city: "Belém", state: "PA", name: "Val de Cans" },
  MAO: { iata: "MAO", city: "Manaus", state: "AM", name: "Eduardo Gomes" },
  PVH: { iata: "PVH", city: "Porto Velho", state: "RO", name: "Governador Jorge Teixeira" },
  RBR: { iata: "RBR", city: "Rio Branco", state: "AC", name: "Plácido de Castro" },
  BVB: { iata: "BVB", city: "Boa Vista", state: "RR", name: "Atlas Brasil Cantanhede" },
  MCP: { iata: "MCP", city: "Macapá", state: "AP", name: "Macapá" },
  PMW: { iata: "PMW", city: "Palmas", state: "TO", name: "Palmas" },
  CGB: { iata: "CGB", city: "Cuiabá", state: "MT", name: "Marechal Rondon" },
  CGR: { iata: "CGR", city: "Campo Grande", state: "MS", name: "Campo Grande" },
  GYN: { iata: "GYN", city: "Goiânia", state: "GO", name: "Santa Genoveva" },
  UDI: { iata: "UDI", city: "Uberlândia", state: "MG", name: "Uberlândia" },
  VIX: { iata: "VIX", city: "Vitória", state: "ES", name: "Eurico de Aguiar Salles" },
  CWB: { iata: "CWB", city: "Curitiba", state: "PR", name: "Afonso Pena" },
  FLN: { iata: "FLN", city: "Florianópolis", state: "SC", name: "Hercílio Luz" },
  NVT: { iata: "NVT", city: "Navegantes", state: "SC", name: "Ministro Victor Konder" },
  JOI: { iata: "JOI", city: "Joinville", state: "SC", name: "Lauro Carneiro de Loyola" },
  POA: { iata: "POA", city: "Porto Alegre", state: "RS", name: "Salgado Filho" },
  IGU: { iata: "IGU", city: "Foz do Iguaçu", state: "PR", name: "Cataratas" },
  IOS: { iata: "IOS", city: "Ilhéus", state: "BA", name: "Jorge Amado" },
  POG: { iata: "POG", city: "Porto Seguro", state: "BA", name: "Porto Seguro" },

  // ---- Internacional ----
  EZE: { iata: "EZE", city: "Buenos Aires", state: "Argentina", name: "Ezeiza", intl: true },
  SCL: { iata: "SCL", city: "Santiago", state: "Chile", name: "Arturo Merino Benítez", intl: true },
  LIM: { iata: "LIM", city: "Lima", state: "Peru", name: "Jorge Chávez", intl: true },
  MVD: { iata: "MVD", city: "Montevidéu", state: "Uruguai", name: "Carrasco", intl: true },
  ASU: { iata: "ASU", city: "Assunção", state: "Paraguai", name: "Silvio Pettirossi", intl: true },
  BOG: { iata: "BOG", city: "Bogotá", state: "Colômbia", name: "El Dorado", intl: true },
  PTY: { iata: "PTY", city: "Cidade do Panamá", state: "Panamá", name: "Tocumen", intl: true },
  CUN: { iata: "CUN", city: "Cancún", state: "México", name: "Cancún", intl: true },
  MIA: { iata: "MIA", city: "Miami", state: "Estados Unidos", name: "Miami", intl: true },
  MCO: { iata: "MCO", city: "Orlando", state: "Estados Unidos", name: "Orlando", intl: true },
  JFK: { iata: "JFK", city: "Nova York", state: "Estados Unidos", name: "John F. Kennedy", intl: true },
  LIS: { iata: "LIS", city: "Lisboa", state: "Portugal", name: "Humberto Delgado", intl: true },
  OPO: { iata: "OPO", city: "Porto", state: "Portugal", name: "Francisco Sá Carneiro", intl: true },
  MAD: { iata: "MAD", city: "Madri", state: "Espanha", name: "Barajas", intl: true },
  CDG: { iata: "CDG", city: "Paris", state: "França", name: "Charles de Gaulle", intl: true },
  LHR: { iata: "LHR", city: "Londres", state: "Reino Unido", name: "Heathrow", intl: true },
  FCO: { iata: "FCO", city: "Roma", state: "Itália", name: "Fiumicino", intl: true },
};

export function airport(iata: string): Airport | undefined {
  return AIRPORTS[iata.toUpperCase()];
}
