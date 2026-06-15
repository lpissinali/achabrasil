import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { ROUTES, routeSlug } from "@/lib/routes";
import { AIRPORTS } from "@/lib/airports";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["", "/voos", "/destinos", "/alertas"].map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const routePages = ROUTES.map((r) => ({
    url: `${SITE.url}/voos/${routeSlug(r)}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const destinationPages = Object.keys(AIRPORTS).map((iata) => ({
    url: `${SITE.url}/destinos/${iata.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...routePages, ...destinationPages];
}
