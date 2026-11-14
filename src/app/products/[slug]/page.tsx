import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Boxes, Check, Layers, Stethoscope } from "lucide-react";
import { BrowserFrame, Chip, PhoneFrame } from "@/components/ui/primitives";
import { ProductLogo, TagList } from "@/components/ui/Portfolio";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { products } from "@/lib/content";
import { productSchema } from "@/lib/schema";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  const title = `${p.name} — ${p.category}`;
  return {
    title,
    description: p.description,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      title: `${title} · ${site.name}`,
      description: p.description,
      url: `/products/${p.slug}`,
      images: [{ url: p.media[0].src, width: p.media[0].width, height: p.media[0].height, alt: p.media[0].alt }],
    },
    twitter: { card: "summary_large_image", title: `${title} · ${site.name}`, description: p.description, images: [p.media[0].src] },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  const [lead, ...rest] = p.media;
  const others = products.filter((x) => x.slug !== p.slug);

  return (
    <>
      <JsonLd data={productSchema(p.slug)!} />

      <section className="relative overflow-hidden pt-[calc(var(--header-h)+3.5rem)] pb-16 sm:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="grid-bg absolute inset-0" />
          <div
            className="absolute -top-56 left-1/2 h-[44rem] w-[60rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
            style={{ background: `radial-gradient(closest-side, ${p.accent.from}, transparent)` }}
          />
        </div>

        <div className="container-x">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden /> All products
          </Link>

          <div className="mt-10 grid items-end gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-electric to-violet px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-snow uppercase">
                <Boxes className="h-3.5 w-3.5" aria-hidden /> NextGen Product · {p.category}
              </span>
              <h1 className="mt-8">
                <span className="sr-only">{p.name}</span>
                <ProductLogo product={p} size="xl" priority />
              </h1>
              <TagList tags={p.tags} className="mt-6" />
              <p className="mt-7 text-2xl leading-snug text-fg sm:text-[1.7rem]">{p.description}</p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="text-lg leading-relaxed text-fg-muted">{p.longDescription}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built for">
                {p.industries.map((i) => (
                  <li key={i}>
                    <Chip>{i}</Chip>
                  </li>
                ))}
              </ul>
              {p.website ? (
                <a
                  href={p.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/30"
                >
                  Open {p.name} <ArrowUpRight className="h-4 w-4" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : null}
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-14">
            {lead.frame === "raw" ? (
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#fbf3ea] p-3 sm:p-6">
                <Image src={lead.src} alt={lead.alt} width={lead.width} height={lead.height} priority sizes="100vw" className="mx-auto h-auto w-full max-w-4xl" />
              </div>
            ) : (
              <BrowserFrame media={lead} priority sizes="(min-width: 1280px) 1200px, 100vw" />
            )}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="features-title" className="py-20">
        <div className="container-x">
          <h2 id="features-title" className="text-3xl font-semibold sm:text-4xl">
            What {p.name} does
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.features.map((f) => (
              <li key={f.title} className="ring-gradient rounded-[var(--radius-card)] bg-ink-850/70 p-6">
                <Check className="h-5 w-5 text-signal" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-fg-muted">{f.text}</p>
              </li>
            ))}
          </ul>

          {p.modules?.map((m) => (
            <div key={m.title} className="glass mt-6 flex flex-col gap-4 rounded-[var(--radius-card)] p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 font-semibold">
                {m.icon === "clinic" ? <Stethoscope className="h-5 w-5 text-signal" aria-hidden /> : <Layers className="h-5 w-5 text-signal" aria-hidden />}{" "}
                {m.title}
              </p>
              <ul className="flex flex-wrap gap-2">
                {m.items.map((it) => (
                  <li key={it}>
                    <Chip>{it}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="screens-title" className="py-20">
        <div className="container-x">
          <h2 id="screens-title" className="text-3xl font-semibold sm:text-4xl">
            Inside {p.name}
          </h2>
          <div className={`mt-10 grid gap-6 ${p.mobile ? "md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_0.42fr]" : "md:grid-cols-2"}`}>
            {rest.map((m, i) => (
              <Reveal key={m.src} delay={(i % 2) * 0.08}>
                <figure>
                  {m.frame === "raw" ? (
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#fbf3ea] p-3">
                      <Image src={m.src} alt={m.alt} width={m.width} height={m.height} sizes="(min-width: 768px) 45vw, 100vw" className="h-auto w-full" />
                    </div>
                  ) : (
                    <BrowserFrame media={m} sizes="(min-width: 768px) 45vw, 100vw" />
                  )}
                  <figcaption className="mt-3 text-sm text-fg-muted">{m.label}</figcaption>
                </figure>
              </Reveal>
            ))}
            {p.mobile ? (
              <Reveal delay={0.1} className="mx-auto w-full max-w-[15rem] md:col-span-2 lg:col-span-1 lg:row-span-2 lg:row-start-1 lg:col-start-3">
                <figure>
                  <PhoneFrame media={p.mobile} sizes="240px" />
                  <figcaption className="mt-3 text-sm text-fg-muted">{p.mobile.label}</figcaption>
                </figure>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <div className="ring-gradient flex flex-col items-start gap-8 rounded-[2rem] bg-ink-850 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">Interested in {p.name}?</h2>
              <p className="mt-3 max-w-xl text-fg-muted">Talk to the NextGen Technologies team about a demo, pricing or a tailored rollout for your business.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-ink-900 transition hover:-translate-y-0.5"
              >
                Talk to us <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/products/${o.slug}`}
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-medium text-fg hover:border-white/30"
                >
                  See {o.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
