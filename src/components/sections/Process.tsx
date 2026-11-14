"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { processSteps } from "@/lib/content";

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [reached, setReached] = useState(reduce ? processSteps.length : 0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    setReached(Math.min(processSteps.length, Math.floor(v * processSteps.length + 0.35)));
  });

  return (
    <Section id="process" labelledBy="process-title" className="overflow-hidden">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div className="container-x">
        <SectionHeading
          id="process-title"
          eyebrow="Our process"
          align="center"
          title={
            <>
              From first idea to <span className="text-gradient">measurable impact.</span>
            </>
          }
          intro="A clear, collaborative four-step process — so you always know what is happening, what is next and why."
        />

        <ol ref={ref} className="relative mt-20 grid gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Connecting rail — horizontal on desktop, vertical on mobile */}
          <div aria-hidden className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-white/10 lg:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-electric via-violet to-lilac shadow-[0_0_16px_rgba(109,91,255,0.8)]"
              style={{ scaleX: reduce ? 1 : progress }}
            />
          </div>
          <div aria-hidden className="absolute top-2 bottom-2 left-7 w-px bg-white/10 lg:hidden">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-electric via-violet to-lilac"
              style={{ scaleY: reduce ? 1 : progress }}
            />
          </div>

          {processSteps.map((step, i) => {
            const on = i < reached;
            return (
              <li key={step.title} className="relative grid grid-cols-[3.5rem_1fr] gap-5 lg:block lg:text-center">
                <div className="relative z-10 flex justify-center lg:mb-8">
                  <motion.div
                    animate={{ scale: on ? 1 : 0.88 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border font-display text-lg font-semibold transition-colors duration-500 ${
                      on
                        ? "border-transparent bg-gradient-to-br from-electric to-violet text-snow shadow-[0_10px_40px_-6px_rgba(109,91,255,0.9)]"
                        : "border-white/15 bg-ink-850 text-fg-subtle"
                    }`}
                  >
                    0{i + 1}
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                  className="glass rounded-[var(--radius-card)] p-6 lg:min-h-[17rem]"
                >
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">{step.text}</p>
                  <ul className="mt-5 space-y-1.5 text-sm text-fg lg:text-left">
                    {step.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 lg:justify-start">
                        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-electric-soft" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
