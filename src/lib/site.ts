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
  contact: {
    email: "",
    phone: "",
    location: "",
  } as { email: string; phone: string; location: string },
  socials: [] as SocialLink[],
} as const;

export const nav = [
  { label: "Home", href: "/#home", id: "home" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Products", href: "/products", id: "products" },
  { label: "Our Process", href: "/#process", id: "process" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;
