"use client";

import { motion } from "framer-motion";
import { LogoMark } from "@/components/brand/Logo";

/** Oversized animated NextGen wordmark that rises and draws in as the footer scrolls into view. */
export function FooterWordmark() {
  return (
    <div aria-hidden className="container-x relative mt-16 overflow-hidden select-none">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-end justify-center gap-[2.5vw] pb-6"
      >
        <LogoMark animate="inView" className="h-[13vw] max-h-48 w-[13vw] max-w-48 shrink-0" title="" />
        <span className="text-gradient text-gradient-animated pb-[0.06em] font-display text-[17vw] leading-[0.9] font-semibold tracking-[-0.06em] xl:text-[15rem]">
          NextGen
        </span>
      </motion.div>
    </div>
  );
}
