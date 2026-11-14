import Link from "next/link";
import { ProductLogo } from "@/components/ui/Portfolio";
import { ArrowRight, Code2, Compass, PenTool, TrendingUp } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/brand/Logo";
import { products } from "@/lib/content";

const pillars = [
  {
    icon: Code2,
    title: "Engineering",
    text: "Typed, tested and well-structured code. We favour proven, modern stacks and architectures that stay maintainable as products grow.",
  },
  {
    icon: PenTool,
    title: "Design",
    text: "Interfaces designed around real workflows — clear hierarchy, considered motion and accessibility built in from the start.",
  },
  {
    icon: TrendingUp,
    title: "Business transformation",
    text: "We replace manual processes and disconnected tools with software that saves time, reduces errors and opens new revenue.",
  },
];

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <div className="container-x grid items-start gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="about-title"
            eyebrow="About NextGen Technologies"
            title={
              <>
                Technology company. <span className="text-gradient">Product builders.</span>
              </>
            }
          />
          <Reveal delay={0.1} className="mt-6 space-y-5 text-lg leading-relaxed text-fg-muted">
            <p>
              NextGen Technologies is a software development and product company. We partner with businesses to design and build
              websites, applications and integrations — software that works hard every day.
            </p>
            <p>
              We also build and run our own platforms. Operating Autonexa, Flowza and BuildPilot keeps us close to what really
              matters: reliability, usability and outcomes for the people who use them.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 grid gap-3">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group glass flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-white/20"
              >
                <span className="flex">
                  <span className="sr-only">{p.name}</span>
                  <ProductLogo product={p} size="sm" />
                </span>
                <span className="flex items-center gap-3 text-sm text-fg-muted">
                  {p.category}
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            ))}
          </Reveal>
        </div>

        <div className="relative">
          <div aria-hidden className="absolute -top-10 right-0 hidden opacity-[0.07] lg:block">
            <LogoMark className="h-80 w-80" />
          </div>
          <Reveal className="relative">
            <p className="flex items-center gap-2 text-sm font-semibold text-white">
              <Compass className="h-4 w-4 text-electric-soft" aria-hidden /> Our approach
            </p>
          </Reveal>
          <div role="list" className="relative mt-6 space-y-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={0.08 * i} role="listitem">
                <div className="ring-gradient flex gap-5 rounded-[var(--radius-card)] bg-ink-850/80 p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-electric/25 to-violet/25">
                    <p.icon className="h-5 w-5 text-white" strokeWidth={1.7} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-fg-muted">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
