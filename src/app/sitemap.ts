import type { MetadataRoute } from "next";
import { products, projects, services } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

/**
 * Every public, indexable URL. Generated from the same content arrays as the
 * pages, so new products, services or projects appear here automatically.
 * Product entries carry their screenshots as image sitemap entries.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.contentUpdated);
  const entry = (path: string, priority: number, images?: string[]): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority,
    ...(images?.length ? { images: images.map(absoluteUrl) } : {}),
  });

  return [
    entry("/", 1),
    entry("/services", 0.9),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.8)),
    entry("/products", 0.9),
    ...products.map((p) => entry(`/products/${p.slug}`, 0.8, p.media.map((m) => m.src))),
    ...(projects.length
      ? [entry("/projects", 0.7), ...projects.map((p) => entry(`/projects/${p.slug}`, 0.6, p.cover ? [p.cover.src] : undefined))]
      : []),
    entry("/about", 0.7),
    entry("/contact", 0.7),
  ];
}
