import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Faqs } from "@/components/ui/Faqs";
import { ProductLogo } from "@/components/ui/Portfolio";
import { serviceIcons } from "@/components/ui/serviceIcons";
import { Chip } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { processSteps, products, services } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema, type Crumb } from "@/lib/schema";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return pageMetadata({ ...s.seo, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: s.title, path: `/services/${s.slug}` },
  ];
  const Icon = serviceIcons[s.icon];
  const proof = products.filter((p) => s.relatedProducts.includes(p.slug));
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <JsonLd data={serviceSchema(s, crumbs)} />

      <PageHero eyebrow={s.title} crumbs={crumbs} title={s.headline} intro={s.intro[0]}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-ink-900 transition hover:-translate-y-0.5"
          >
            Discuss your project <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/services"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-medium text-fg hover:border-white/30"
          >
            All services
          </Link>
        </div>
      </PageHero>

      <section aria-labelledby="overview-title" className="py-12">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-electric/25 to-violet/25">
              <Icon className="h-6 w-6 text-white" strokeWidth={1.6} aria-hidden />
            </span>
            <h2 id="overview-title" className="mt-6 text-3xl font-semibold sm:text-4xl">
              Our approach to {s.title}
            </h2>
            {s.intro.slice(1).map((para) => (
              <p key={para} className="mt-5 text-lg leading-relaxed text-fg-muted">
                {para}
              </p>
            ))}
            <h3 className="mt-8 text-sm font-semibold tracking-[0.16em] text-fg-subtle uppercase">A good fit for</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.idealFor.map((x) => (
                <li key={x}>
                  <Chip>{x}</Chip>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="lg:col-span-7">
            <h2 className="sr-only">What we deliver</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {s.offerings.map((o, i) => (
                <li key={o.title}>
                  <Reveal delay={(i % 2) * 0.06} className="ring-gradient h-full rounded-[var(--radius-card)] bg-ink-850/70 p-6">
                    <Check className="h-5 w-5 text-signal" aria-hidden />
                    <h3 className="mt-4 text-lg font-semibold">{o.title}</h3>
                    <p className="mt-2 leading-relaxed text-fg-muted">{o.text}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="process-title" className="py-16">
        <div className="container-x">
          <h2 id="process-title" className="text-3xl font-semibold sm:text-4xl">
            How a project runs
          </h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <li key={step.title} className="glass rounded-[var(--radius-card)] p-6">
                <span className="font-display text-sm text-fg-subtle tabular-nums">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-fg-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {proof.length ? (
        <section aria-labelledby="proof-title" className="py-16">
          <div className="container-x">
            <h2 id="proof-title" className="text-3xl font-semibold sm:text-4xl">
              See it in our own products
            </h2>
            <p className="mt-3 max-w-2xl text-fg-muted">We build and run our own SaaS platforms with the same team and standards we bring to client work.</p>
            <ul className="mt-8 grid gap-3 md:grid-cols-3">
              {proof.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="group glass flex h-full flex-col gap-4 rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-white/20"
                  >
                    <span className="flex">
                      <span className="sr-only">{p.name}</span>
                      <ProductLogo product={p} size="sm" />
                    </span>
                    <span className="text-sm text-fg-muted">{p.category}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-electric-soft group-hover:text-white">
                      Explore {p.name} <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <Faqs faqs={s.faqs} />

      <section aria-labelledby="more-title" className="py-12">
        <div className="container-x">
          <h2 id="more-title" className="text-2xl font-semibold sm:text-3xl">
            Related services
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/services/${o.slug}`}
                  className="inline-flex h-11 items-center rounded-full border border-white/15 bg-white/[0.03] px-5 text-sm font-medium text-fg transition hover:border-white/30"
                >
                  {o.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner
        title={`Let's talk about your ${s.title} project`}
        text="Tell us about your goals and timeline. We'll review it and get back to you to discuss scope, approach and next steps."
      />
    </>
  );
}
