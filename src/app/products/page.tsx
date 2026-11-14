import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Boxes } from "lucide-react";
import { Chip } from "@/components/ui/primitives";
import { ProductLogo, TagList } from "@/components/ui/Portfolio";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { products, type Product } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Software products built, owned and operated by NextGen Technologies — Autonexa for automotive businesses, Flowza for queue management and BuildPilot for construction teams.",
  alternates: { canonical: "/products" },
  openGraph: { title: `Products · ${site.name}`, url: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${site.name} products`,
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${site.url}/products/${p.slug}`,
            name: p.name,
          })),
        }}
      />

      <PageHero
        eyebrow="Our products"
        title={
          <>
            Software we <span className="text-gradient">build, own and run.</span>
          </>
        }
        intro="NextGen Technologies designs, engineers and operates its own SaaS platforms. Each one solves a real operational problem for a specific industry."
        count={`${String(products.length).padStart(2, "0")} products`}
      />

      <section aria-label="All products" className="pb-24 sm:pb-32">
        <div className="container-x space-y-8">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>

        <div className="container-x mt-16">
          <div className="ring-gradient flex flex-col items-start gap-6 rounded-[2rem] bg-ink-850 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">Want a product like these for your business?</h2>
              <p className="mt-2 text-fg-muted">We build custom platforms with the same team and standards.</p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-ink-900 transition hover:-translate-y-0.5"
            >
              Let&apos;s talk <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductCard({ product: p, index }: { product: Product; index: number }) {
  const cover = p.media[0];
  const thumbs = p.media.slice(1, 4);
  const raw = cover.frame === "raw";

  return (
    <article
      aria-labelledby={`p-${p.slug}`}
      className="group ring-gradient relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-ink-800/80 to-ink-850/60"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-20 lg:blur-3xl transition-opacity duration-700 group-hover:opacity-35"
        style={{ background: `radial-gradient(closest-side, ${p.accent.from}, transparent)` }}
      />
      <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
        <div className="flex flex-col lg:col-span-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-electric to-violet px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-snow uppercase">
              <Boxes className="h-3.5 w-3.5" aria-hidden /> NextGen Product
            </span>
            <span className="font-display text-sm text-fg-subtle tabular-nums">0{index + 1}</span>
          </div>

          <h2 id={`p-${p.slug}`} className="mt-7">
            <span className="sr-only">{p.name}</span>
            <ProductLogo product={p} size="md" />
          </h2>
          <p className="mt-3 text-sm font-medium text-electric-soft">{p.category}</p>
          <TagList tags={p.tags} className="mt-4" />
          <p className="mt-5 text-lg leading-relaxed text-fg">{p.description}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built for">
            {p.industries.map((ind) => (
              <li key={ind}>
                <Chip>{ind}</Chip>
              </li>
            ))}
          </ul>

          <ul className="mt-7 grid gap-2.5 text-sm text-fg-muted sm:grid-cols-2">
            {p.features.map((f) => (
              <li key={f.title} className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-electric-soft" />
                {f.title}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-9">
            <Link
              href={`/products/${p.slug}`}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-ink-900 transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_var(--shade)]"
            >
              Explore {p.name}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Link href={`/products/${p.slug}`} tabIndex={-1} aria-hidden className="block">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_-25px_var(--shade)]">
              <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.07] bg-ink-800 px-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-2 text-xs text-fg-subtle">
                  {p.name} — {cover.label}
                </span>
              </div>
              <div className={`relative aspect-[16/10] overflow-hidden ${raw ? "bg-[#fbf3ea]" : "bg-ink-900"}`}>
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className={`transition-transform duration-700 group-hover:scale-[1.02] ${raw ? "object-contain p-3" : "object-cover object-top"}`}
                />
              </div>
            </div>
          </Link>

          <ul className="mt-4 grid grid-cols-3 gap-3" aria-label={`More ${p.name} screens`}>
            {thumbs.map((m) => (
              <li key={m.src}>
                <figure className="overflow-hidden rounded-xl border border-white/[0.08]">
                  <div className={`relative aspect-[16/10] ${m.frame === "raw" ? "bg-[#fbf3ea]" : "bg-ink-900"}`}>
                    <Image
                      src={m.src}
                      alt={m.alt}
                      fill
                      sizes="(min-width: 1024px) 18vw, 30vw"
                      className={m.frame === "raw" ? "object-contain p-1" : "object-cover object-top"}
                    />
                  </div>
                  <figcaption className="truncate bg-ink-850 px-2.5 py-1.5 text-[0.7rem] text-fg-muted">{m.label}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
