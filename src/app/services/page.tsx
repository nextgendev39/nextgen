import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Faqs } from "@/components/ui/Faqs";
import { serviceIcons } from "@/components/ui/serviceIcons";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Process } from "@/components/sections/Process";
import { services, type Faq } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { pageSchema, serviceList, type Crumb } from "@/lib/schema";

const seo = {
  title: "Software Development Services | Celestiq Technologies",
  description:
    "Software development services from one team: websites, custom web applications, mobile apps, APIs, UI/UX design and legacy code modernization.",
};

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

const faqs: Faq[] = [
  {
    q: "What kind of software does Celestiq Technologies build?",
    a: "Websites, custom web applications and SaaS platforms, Android and iOS apps, APIs and integrations. We also design products and modernize existing codebases.",
  },
  {
    q: "Can one team handle design and development?",
    a: "Yes. Strategy, UI/UX design and engineering sit in the same team, which keeps decisions fast and avoids gaps between design and the shipped product.",
  },
  {
    q: "Do you support the software after launch?",
    a: "Yes. We stay on after go-live to monitor, maintain and keep improving what we have built together.",
  },
];

export const metadata = pageMetadata({
  ...seo,
  path: "/services",
  keywords: ["software development services", "IT solutions company", "custom software development", "technology consulting"],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={pageSchema({ type: "CollectionPage", path: "/services", ...seo, crumbs, itemList: serviceList(), faqs })} />

      <PageHero
        eyebrow="Our services"
        crumbs={crumbs}
        title={
          <>
            Software development services, <span className="text-gradient">from idea to scale.</span>
          </>
        }
        intro="Six disciplines, one team. We combine strategy, design and engineering to plan, build and run websites, applications and integrations that hold up in the real world."
        count={`${String(services.length).padStart(2, "0")} services`}
      />

      <section aria-label="All services" className="pb-12">
        <ul className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            return (
              <li key={s.slug}>
                <Reveal delay={(i % 3) * 0.05} className="h-full">
                <Link
                  href={`/services/${s.slug}`}
                  className="group ring-gradient flex h-full flex-col rounded-[var(--radius-card)] bg-ink-850/70 p-7 transition-transform duration-500 hover:-translate-y-1"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-electric/25 to-violet/25">
                    <Icon className="h-5 w-5 text-white" strokeWidth={1.7} aria-hidden />
                  </span>
                  <h2 className="mt-7 text-xl font-semibold">{s.title}</h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">{s.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-medium text-electric-soft group-hover:text-white">
                    Explore {s.title}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      <Process />
      <Faqs faqs={faqs} />
      <CtaBanner title="Not sure which service you need?" text="Tell us what you are trying to achieve. We'll recommend the right approach and scope." />
    </>
  );
}
