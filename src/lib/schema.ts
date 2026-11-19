import { products, services } from "./content";
import { site } from "./site";

const orgId = `${site.url}/#organization`;

export function organizationSchema() {
  const { email, phone } = site.contact;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    alternateName: site.shortName,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/celestiq/icon-512.png`,
    slogan: site.tagline,
    description: site.description,
    ...(email ? { email } : {}),
    ...(phone ? { telephone: phone } : {}),
    ...(site.socials.length ? { sameAs: site.socials.map((s) => s.href) } : {}),
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.summary },
    })),
    owns: products.map((p) => ({ "@type": "SoftwareApplication", name: p.name, url: `${site.url}/products/${p.slug}` })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": orgId },
    inLanguage: "en",
  };
}

export function productSchema(slug: string) {
  const p = products.find((x) => x.slug === slug);
  if (!p) return null;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: p.category,
    operatingSystem: "Web",
    description: p.description,
    url: `${site.url}/products/${p.slug}`,
    ...(p.website ? { sameAs: p.website } : {}),
    image: p.media.map((m) => `${site.url}${m.src}`),
    publisher: { "@id": orgId },
  };
}

