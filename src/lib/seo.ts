import type { Metadata } from "next";
import { indexable, site } from "./site";

/** Share image size, type and alt (rendered by `logoOgImage()` in ./og). */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = "Celestiq Technologies logo";

/**
 * The site-wide share image (the Celestiq logo, from app/opengraph-image.tsx).
 * Set explicitly because a page's `openGraph` replaces the inherited one
 * rather than merging with it.
 */
const shareImage = { url: "/opengraph-image", ...ogSize, alt: ogAlt, type: "image/png" };

type PageSeo = {
  /** Full <title>, used as-is (no template). Aim for 50–60 characters. */
  title: string;
  /** Meta description. Aim for 140–160 characters. */
  description: string;
  /** Root-relative path, e.g. "/services/website-development". Becomes the canonical URL. */
  path: string;
  /** Shorter title for social cards; defaults to `title`. */
  socialTitle?: string;
  keywords?: string[];
  /** Keep the page out of search results (it is still crawlable). */
  noindex?: boolean;
  ogType?: "website" | "article";
};

/**
 * One place that builds a page's metadata so every route gets the same
 * complete set: title, description, canonical, robots, Open Graph and X card.
 * Every page shares the logo image (`shareImage`).
 */
export function pageMetadata({ title, description, path, socialTitle, keywords, noindex, ogType = "website" }: PageSeo): Metadata {
  const index = indexable && !noindex;
  const social = socialTitle ?? title;
  return {
    title: { absolute: title },
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: path },
    robots: index
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
      : { index: false, follow: true },
    openGraph: {
      type: ogType,
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: social,
      description,
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title: social, description, images: [shareImage] },
  };
}

/** Absolute URL for a root-relative path. */
export function absoluteUrl(path: string) {
  return `${site.url}${path === "/" ? "" : path}`;
}
