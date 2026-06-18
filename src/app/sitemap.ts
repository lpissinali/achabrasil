import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { ROUTES, routeSlug } from "@/lib/routes";
import { AIRPORTS } from "@/lib/airports";
import { POSTS } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "daily" as const, priority: 1 },
    { url: `${SITE.url}/voos`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${SITE.url}/ofertas`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${SITE.url}/me-surpreenda`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${SITE.url}/destinos`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${SITE.url}/blog`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${SITE.url}/alertas`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${SITE.url}/termos`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${SITE.url}/privacidade`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${SITE.url}/cookies`, changeFrequency: "yearly" as const, priority: 0.3 },
  ].map((p) => ({ ...p, lastModified: now }));

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

  const blogPages = POSTS.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...routePages, ...destinationPages, ...blogPages];
}
