"use client";

import { motion } from "framer-motion";
import { Cpu, Layers, LifeBuoy, ShieldCheck, Sparkles, Target, type LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { Stagger, staggerItem } from "@/components/ui/Reveal";
import { reasons, type WhyIcon } from "@/lib/content";

const icons: Record<WhyIcon, LucideIcon> = {
  target: Target,
  cpu: Cpu,
  layers: Layers,
  sparkles: Sparkles,
  shield: ShieldCheck,
  lifebuoy: LifeBuoy,
};

export function WhyUs() {
  return (
    <Section id="why" labelledBy="why-title">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="why-title"
              eyebrow="Why Celestiq"
              title={
                <>
                  A product company <span className="text-gradient">that builds for you.</span>
                </>
              }
              intro="We run our own SaaS products, so we know what it takes to design, ship and support software that people rely on every day."
            />
          </div>
        </div>

        <Stagger className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:col-span-8">
          {reasons.map((r) => {
            const Icon = icons[r.icon];
            return (
              <motion.div key={r.title} variants={staggerItem} className="group relative bg-ink-900 p-8 transition-colors duration-500 hover:bg-ink-850">
                <span
                  aria-hidden
                  className="absolute inset-x-8 top-0 h-px scale-x-0 bg-gradient-to-r from-electric via-violet to-lilac transition-transform duration-700 group-hover:scale-x-100"
                />
                <Icon className="h-6 w-6 text-electric-soft transition-colors group-hover:text-lilac" strokeWidth={1.6} aria-hidden />
                <h3 className="mt-6 text-lg font-semibold">{r.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-fg-muted">{r.text}</p>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
