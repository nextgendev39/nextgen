/**
 * Schema.org JSON-LD builders.
 *
 * The root layout emits Organization + WebSite once. Each page emits a single
 * `@graph` with its WebPage (or AboutPage / ContactPage / CollectionPage),
 * BreadcrumbList and main entity, all linked by `@id` so nothing is declared
 * twice. Only verified facts are used: no ratings, reviews, prices,
 * addresses or social profiles unless they exist in `site`.
 */
import type { Faq, Product, Project, Service } from "./content";
import { products, services } from "./content";
import { absoluteUrl } from "./seo";
import { site } from "./site";

const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;
const ctx = "https://schema.org";

export type Crumb = { name: string; path: string };

export function organizationSchema() {
  const { email, phone } = site.contact;
  return {
    "@context": ctx,
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    alternateName: site.shortName,
    legalName: site.legalName,
    url: site.url,
    logo: { "@type": "ImageObject", url: `${site.url}/celestiq/icon-512.png`, width: 512, height: 512 },
    slogan: site.tagline,
    description: site.description,
    ...(email ? { email } : {}),
    ...(phone ? { telephone: phone } : {}),
    ...(email || phone
      ? { contactPoint: { "@type": "ContactPoint", contactType: "sales", ...(email ? { email } : {}), ...(phone ? { telephone: phone } : {}) } }
      : {}),
    ...(site.socials.length ? { sameAs: site.socials.map((s) => s.href) } : {}),
    knowsAbout: [
      "Custom software development",
      "Web application development",
      "Website development",
      "Mobile app development",
      "SaaS product development",
      "API development",
      "UI/UX design",
      "Legacy application modernization",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": ctx,
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    publisher: { "@id": orgId },
    inLanguage: "en",
  };
}

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";

function webPage({ type = "WebPage", path, name, description, mainEntity }: { type?: PageType; path: string; name: string; description: string; mainEntity?: string }) {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
    inLanguage: "en",
    breadcrumb: { "@id": `${url}#breadcrumb` },
    ...(mainEntity ? { mainEntity: { "@id": mainEntity } } : {}),
  };
}

function breadcrumbList(path: string, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.path) })),
  };
}

function faqPage(path: string, faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

const graph = (...nodes: (object | null | undefined | false)[]) => ({ "@context": ctx, "@graph": nodes.filter(Boolean) });

/* ─────────────── Pages ─────────────── */

export function homeSchema({ title, description }: { title: string; description: string }) {
  return graph(
    webPage({ path: "/", name: title, description }),
    breadcrumbList("/", [{ name: "Home", path: "/" }]),
  );
}

/** Generic page: About, Contact, listings. */
export function pageSchema({
  type,
  path,
  title,
  description,
  crumbs,
  faqs,
  itemList,
}: {
  type?: PageType;
  path: string;
  title: string;
  description: string;
  crumbs: Crumb[];
  faqs?: Faq[];
  itemList?: { name: string; path: string }[];
}) {
  const url = absoluteUrl(path);
  return graph(
    webPage({ type, path, name: title, description, mainEntity: itemList ? `${url}#list` : undefined }),
    breadcrumbList(path, crumbs),
    itemList && {
      "@type": "ItemList",
      "@id": `${url}#list`,
      itemListElement: itemList.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
    },
    faqs?.length ? faqPage(path, faqs) : null,
  );
}

export function serviceSchema(s: Service, crumbs: Crumb[]) {
  const path = `/services/${s.slug}`;
  const url = absoluteUrl(path);
  return graph(
    webPage({ path, name: s.seo.title, description: s.seo.description, mainEntity: `${url}#service` }),
    breadcrumbList(path, crumbs),
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: s.title,
      serviceType: s.title,
      description: s.seo.description,
      url,
      provider: { "@id": orgId },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: s.title,
        itemListElement: s.offerings.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o.title, description: o.text } })),
      },
    },
    s.faqs.length ? faqPage(path, s.faqs) : null,
  );
}

export function productSchema(p: Product, crumbs: Crumb[]) {
  const path = `/products/${p.slug}`;
  const url = absoluteUrl(path);
  return graph(
    webPage({ path, name: p.seo.title, description: p.seo.description, mainEntity: `${url}#software` }),
    breadcrumbList(path, crumbs),
    {
      "@type": "SoftwareApplication",
      "@id": `${url}#software`,
      name: p.name,
      description: p.longDescription,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: p.category,
      operatingSystem: "Web browser",
      url,
      ...(p.website ? { sameAs: p.website } : {}),
      image: p.media.map((m) => absoluteUrl(m.src)),
      screenshot: p.media.map((m) => ({ "@type": "ImageObject", url: absoluteUrl(m.src), caption: m.alt })),
      featureList: p.features.map((f) => f.title),
      audience: { "@type": "BusinessAudience", audienceType: p.industries.join(", ") },
      publisher: { "@id": orgId },
      creator: { "@id": orgId },
    },
  );
}

export function projectSchema(p: Project, crumbs: Crumb[]) {
  const path = `/projects/${p.slug}`;
  const url = absoluteUrl(path);
  return graph(
    webPage({ path, name: p.seo.title, description: p.seo.description, mainEntity: `${url}#work` }),
    breadcrumbList(path, crumbs),
    {
      "@type": "CreativeWork",
      "@id": `${url}#work`,
      name: p.name,
      description: p.summary,
      url,
      creator: { "@id": orgId },
      ...(p.website ? { sameAs: p.website } : {}),
      ...(p.cover ? { image: absoluteUrl(p.cover.src) } : {}),
      keywords: [...p.services, ...p.tech].join(", "),
    },
  );
}

/** Lists for the products and services index pages. */
export const productList = () => products.map((p) => ({ name: p.name, path: `/products/${p.slug}` }));
export const serviceList = () => services.map((s) => ({ name: s.title, path: `/services/${s.slug}` }));
