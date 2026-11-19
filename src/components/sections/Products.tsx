import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Boxes } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { ProductLogo, TagList } from "@/components/ui/Portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { DeviceThumb } from "@/components/ui/ProjectShowcase";
import { products, type Product } from "@/lib/content";

export function Products() {
  return (
    <Section id="products" labelledBy="products-title" className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--color-ink-800)_65%,transparent)_18%,color-mix(in_oklab,var(--color-ink-800)_65%,transparent)_82%,transparent)]" />
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="products-title"
            eyebrow="Our products"
            title={
              <>
                Software we <span className="text-gradient">build, own and run.</span>
              </>
            }
          />
          <div className="max-w-sm lg:pb-2">
            <p className="text-fg-muted">
              Beyond client work, Celestiq Technologies designs and operates its own SaaS platforms.
            </p>
            <Link href="/products" className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-electric-soft hover:text-white">
              View all products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <li key={p.slug} className="flex">
              <Reveal delay={i * 0.08} className="flex w-full">
                <ProductCard product={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function ProductCard({ product: p }: { product: Product }) {
  const cover = p.media[0];
  const raw = cover.frame === "raw";
  return (
    <article
      aria-labelledby={`product-${p.slug}`}
      className="group ring-gradient relative flex w-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-ink-850/80 transition-transform duration-500 hover:-translate-y-1"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-20 lg:blur-3xl transition-opacity duration-700 group-hover:opacity-40"
        style={{ background: `radial-gradient(closest-side, ${p.accent.from}, transparent)` }}
      />

      <Link href={`/products/${p.slug}`} tabIndex={-1} aria-hidden className="relative block p-3 pb-0">
        {p.showcase ? (
          <DeviceThumb desktop={p.showcase.desktop} mobile={p.showcase.mobile} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" />
        ) : (
          <div className={`relative aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.08] ${raw ? "bg-[#fbf3ea]" : "bg-ink-900"}`}>
            <Image
              src={cover.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
              className={`transition-transform duration-700 group-hover:scale-[1.04] ${raw ? "object-contain p-2" : "object-cover object-top"}`}
            />
          </div>
          )}
      </Link>

      <div className="relative flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 id={`product-${p.slug}`}>
            <span className="sr-only">{p.name}</span>
            <ProductLogo product={p} size="sm" />
          </h3>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-electric to-violet px-2.5 py-0.5 text-[0.62rem] font-semibold tracking-wide text-snow uppercase">
            <Boxes className="h-3 w-3" aria-hidden /> Product
          </span>
        </div>
        <p className="mt-3 text-sm font-medium text-electric-soft">{p.category}</p>
        <TagList tags={p.tags} className="mt-3" />
        <p className="mt-4 text-[0.95rem] leading-relaxed text-fg-muted">{p.description}</p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <Link
            href={`/products/${p.slug}`}
            className="group/cta inline-flex h-10 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-ink-900 transition hover:-translate-y-0.5"
          >
            Explore {p.name}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" aria-hidden />
          </Link>
          {p.website ? (
            <a
              href={p.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1 rounded-full border border-white/15 px-4 text-sm font-medium text-fg transition hover:border-white/30"
            >
              Live app <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              <span className="sr-only">(opens {p.name} in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
