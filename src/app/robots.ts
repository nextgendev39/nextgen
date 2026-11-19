import type { MetadataRoute } from "next";
import { indexable, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview / staging builds: block everything so duplicates never get indexed.
  if (!indexable) return { rules: [{ userAgent: "*", disallow: "/" }] };

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
