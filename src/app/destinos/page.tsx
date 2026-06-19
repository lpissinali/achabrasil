import type { Metadata } from "next";
import DestinationCard from "@/components/DestinationCard";
import { offersFromCity } from "@/lib/tp-data";
import { destMeta, FEATURED_NACIONAIS, FEATURED_INTL } from "@/lib/destinations";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Destinos - voos baratos pelo Brasil e exterior",
  description:
    "Os destinos mais procurados saindo de São Paulo, com preços a partir de. Rio de Janeiro, Salvador, Recife, Buenos Aires, Lisboa, Miami e mais.",
  alternates: { canonical: `${SITE.url}/destinos` },
  openGraph: {
    type: "website",
    title: "Destinos - voos baratos pelo Brasil e exterior",
    description:
      "Os destinos mais procurados saindo de São Paulo, com preços a partir de. Rio de Janeiro, Salvador, Recife, Buenos Aires, Lisboa, Miami e mais.",
    url: `${SITE.url}/destinos`,
    siteName: SITE.name,
    locale: "pt_BR",
  },
};

export default async function DestinosIndex() {
  const offers = await offersFromCity("SAO");
  const priceOf = (code: string) => offers.find((o) => o.cityCode === code)?.price;

  return (
    <div className="mx-auto max-w-[1232px] px-5 py-12 sm:px-14">
      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-[40px]">
        Para onde você quer ir?
      </h1>
      <p className="mt-2 max-w-xl text-muted">
        Os destinos mais procurados pelo Brasil e pelo mundo, com preços a partir
        de saindo de São Paulo. Clique para ver voos e dicas.
      </p>

      <h2 className="mb-4 mt-9 font-display text-xl font-bold tracking-tight">No Brasil</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURED_NACIONAIS.map((code, i) => {
          const m = destMeta(code, i);
          return <DestinationCard key={code} {...m} price={priceOf(code)} />;
        })}
      </div>

      <h2 className="mb-4 mt-12 font-display text-xl font-bold tracking-tight">Pelo mundo</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURED_INTL.map((code, i) => {
          const m = destMeta(code, i);
          return <DestinationCard key={code} {...m} price={priceOf(code)} />;
        })}
      </div>
    </div>
  );
}
