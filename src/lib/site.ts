/**
 * Global site configuration.
 *
 * Contact details and social profiles are intentionally empty: only add
 * values that are verified and publicly shareable. Every UI that renders
 * them (contact section, footer, structured data) hides itself when empty.
 */
export type SocialLink = {
  label: "LinkedIn" | "GitHub" | "X" | "Instagram" | "Facebook" | "YouTube" | "Dribbble" | "Behance";
  href: string;
};

export const site = {
  /** Full company name, used in titles, metadata and structured data */
  name: "Celestiq Technologies",
  /** Short brand name for tight UI spots (logo wordmark, badges) */
  shortName: "Celestiq",
  legalName: "Celestiq Technologies",
  tagline: "Building Digital Products. Empowering Businesses.",
  description:
    "Celestiq Technologies is a software development and product company. We design and build websites, web and mobile applications and APIs for clients, and run our own SaaS products: Autonexa, Flowza and BuildPilot.",
  /** Canonical origin. Override with NEXT_PUBLIC_SITE_URL for previews. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://celestiqtech.com").replace(/\/$/, ""),
  locale: "en_US",
  /**
   * Date the public content last changed meaningfully. Used as <lastmod> in
   * sitemap.xml — bump it when you edit copy, products or services, so search
   * engines get an accurate signal instead of "changed on every deploy".
   */
  contentUpdated: "2026-11-19",
  contact: {
    email: "",
    phone: "",
    location: "",
  } as { email: string; phone: string; location: string },
  socials: [] as SocialLink[],
} as const;

/**
 * Only the production deployment may be indexed. Vercel previews (and any
 * host that sets VERCEL_ENV to something other than "production") get
 * `noindex` and a blocking robots.txt so duplicate copies never reach Google.
 * Elsewhere, set SITE_NOINDEX=1 on staging builds.
 */
export const indexable =
  process.env.SITE_NOINDEX !== "1" && (process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true);

/**
 * Search-engine verification and analytics IDs. All optional and read from
 * the environment at build time; nothing loads or renders while a value is empty.
 */
export const integrations = {
  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION?.trim() || "",
  bingSiteVerification: process.env.BING_SITE_VERIFICATION?.trim() || "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID?.trim() || "",
  gaId: process.env.NEXT_PUBLIC_GA_ID?.trim() || "",
};

export const nav = [
  { label: "Home", href: "/", id: "home" },
  { label: "Services", href: "/services", id: "services" },
  { label: "Products", href: "/products", id: "products" },
  { label: "Projects", href: "/projects", id: "projects" },
  // No dedicated page: scrolls to the process section on the home page
  { label: "Our Process", href: "/#process", id: "process" },
  { label: "About", href: "/about", id: "about" },
  { label: "Contact", href: "/contact", id: "contact" },
] as const;
