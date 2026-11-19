"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Plus, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Stagger, staggerItem } from "@/components/ui/Reveal";
import { services, type Service } from "@/lib/content";
import { serviceIcons } from "@/components/ui/serviceIcons";
import { selectProjectType } from "@/lib/events";

export function Services() {
  return (
    <Section id="services" labelledBy="services-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Our services"
            title={
              <>
                Everything you need to <span className="text-gradient">launch and scale</span> digital products.
              </>
            }
          />
          <p className="max-w-sm text-fg-muted lg:pb-2">
            Six disciplines, one team. We combine strategy, design and engineering to deliver software that performs in the real
            world.
          </p>
        </div>

        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = serviceIcons[service.icon];
  const panelId = `svc-${service.slug}`;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      variants={staggerItem}
      onPointerMove={onMove}
      className="group ring-gradient relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-ink-850/70 p-7 transition-transform duration-500 hover:-translate-y-1"
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--mx,50%) var(--my,0%), rgba(109,91,255,0.16), transparent 45%)" }}
      />

      <div className="relative flex items-start justify-between">
        <IconTile Icon={Icon} />
        <span className="font-display text-sm text-fg-subtle tabular-nums">0{index + 1}</span>
      </div>

      <h3 className="relative mt-8 text-xl font-semibold">{service.title}</h3>
      <p className="relative mt-3 text-[0.95rem] leading-relaxed text-fg-muted">{service.summary}</p>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
          >
            <p className="mt-5 text-sm leading-relaxed text-fg-muted">{service.details}</p>
            <ul className="mt-4 space-y-2">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-center gap-2.5 text-sm text-fg">
                  <Check className="h-4 w-4 shrink-0 text-signal" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-electric-soft"
              >
                Explore {service.title} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href="#contact"
                onClick={() => selectProjectType(service.title)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-electric-soft hover:text-white"
              >
                Discuss this service <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="relative mt-auto pt-7">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pr-4 pl-1.5 text-sm font-medium text-fg transition hover:border-white/25 hover:bg-white/[0.07]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.08]">
            <Plus className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-45" : ""}`} aria-hidden />
          </span>
          {open ? "Show less" : "Learn more"}
          <span className="sr-only"> about {service.title}</span>
        </button>
      </div>
    </motion.article>
  );
}

/** Layered glass tile that gives each icon a subtle 3D presence. */
function IconTile({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="relative h-14 w-14 [perspective:400px]">
      <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl bg-gradient-to-br from-electric/50 to-violet/50 opacity-60 lg:opacity-100 lg:blur-md transition-transform duration-500 group-hover:translate-x-2.5 group-hover:translate-y-2.5" />
      <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.14] to-white/[0.03] lg:backdrop-blur transition-transform duration-500 group-hover:[transform:rotateX(12deg)_rotateY(-14deg)]">
        <Icon className="h-6 w-6 text-white" strokeWidth={1.6} aria-hidden />
      </div>
    </div>
  );
}
