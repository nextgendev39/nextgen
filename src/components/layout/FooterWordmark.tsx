"use client";

import { motion, type Variants } from "framer-motion";

const WORD = "CELESTIQ";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const letter: Variants = {
  hidden: { opacity: 0, y: "60%" },
  show: { opacity: 1, y: "0%", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

function Letters() {
  return WORD.split("").map((ch, i) => (
    <motion.span key={i} variants={letter} className="inline-block">
      {ch}
    </motion.span>
  ));
}

/**
 * Oversized outlined Celestiq wordmark. Letters rise in on scroll, then a solid
 * brand-coloured fill sweeps across them on a loop. Avoids background-clip:text,
 * which iOS Safari fails to paint inside transformed parents.
 */
export function FooterWordmark() {
  return (
    <div aria-hidden className="container-x relative mt-16 overflow-hidden select-none">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative mx-auto w-fit pb-6 font-display text-[14.5vw] leading-[0.9] font-bold tracking-[-0.02em] whitespace-nowrap xl:text-[12rem]"
      >
        <span className="wordmark-outline block">
          <Letters />
        </span>
        {/* Static text on purpose: background-clip:text over transformed children fails on iOS Safari. */}
        <span className="wordmark-fill pointer-events-none absolute inset-0 block">{WORD}</span>
      </motion.div>
    </div>
  );
}
