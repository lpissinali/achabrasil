import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} - Passagens aéreas baratas`,
    short_name: SITE.name,
    description:
      "Compare voos da GOL, LATAM e Azul e ache as passagens mais baratas do Brasil.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfaf7",
    theme_color: "#0e9b8e",
    lang: "pt-BR",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  };
}
