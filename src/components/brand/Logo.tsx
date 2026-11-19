"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

type MarkProps = {
  className?: string;
  /**
   * Background the mark sits on: "dark" (white star), "light" (navy star) or
   * "auto" (follows the site theme).
   */
  tone?: "light" | "dark" | "auto";
  /** Draw the strokes in on mount / when in view */
  animate?: "mount" | "inView" | false;
  title?: string;
};

const C_PATH = "M47.6 16.4A22 22 0 1 0 47.6 47.6";
const STAR_PATH = "M32 20.5C33.1 28.2 35.8 30.9 43.5 32C35.8 33.1 33.1 35.8 32 43.5C30.9 35.8 28.2 33.1 20.5 32C28.2 30.9 30.9 28.2 32 20.5Z";

/** The Celestiq monogram: a "C" orbit around a four-point star, with an orbiting "spark" node. */
export function LogoMark({ className, tone = "auto", animate = false, title = "Celestiq Technologies" }: MarkProps) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const shouldAnimate = animate && !reduce;
  const starColor = tone === "auto" ? "var(--color-white)" : tone === "dark" ? "#FFFFFF" : "#0A0F1F";

  const trigger =
    animate === "inView" ? { whileInView: "show", viewport: { once: true, amount: 0.6 } } : { animate: "show" };

  const draw = (delay: number) => ({
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { pathLength: { duration: 1.1, delay, ease: [0.65, 0, 0.35, 1] as const }, opacity: { duration: 0.2, delay } } },
  });

  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={title}
      initial={shouldAnimate ? "hidden" : false}
      {...(shouldAnimate ? trigger : {})}
    >
      <defs>
        <linearGradient id={`cq-g-${id}`} x1="8" y1="58" x2="58" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2F6BFF" />
          <stop offset="0.55" stopColor="#6D5BFF" />
          <stop offset="1" stopColor="#B49CFF" />
        </linearGradient>
      </defs>
      <motion.path
        d={C_PATH}
        fill="none"
        stroke={`url(#cq-g-${id})`}
        strokeWidth={6.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw(0)}
      />
      <motion.path
        d={STAR_PATH}
        style={{ fill: starColor, transformOrigin: "32px 32px" }}
        variants={{
          hidden: { scale: 0, rotate: -45, opacity: 0 },
          show: { scale: 1, rotate: 0, opacity: 1, transition: { delay: 0.55, type: "spring", stiffness: 260, damping: 16 } },
        }}
      />
      <motion.circle
        cx={53.4}
        cy={10.6}
        r={3.6}
        fill="#B49CFF"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          show: { scale: 1, opacity: 1, transition: { delay: 1.05, type: "spring", stiffness: 380, damping: 14 } },
        }}
        style={{ transformOrigin: "53.4px 10.6px" }}
      />
    </motion.svg>
  );
}

/** Horizontal lockup: monogram + "Celestiq" wordmark + "Technologies" descriptor. */
export function Logo({
  className = "",
  tone = "auto",
  animate = false,
  descriptor = true,
}: {
  className?: string;
  tone?: MarkProps["tone"];
  animate?: MarkProps["animate"];
  /** Show the small "Technologies" line under the wordmark */
  descriptor?: boolean;
}) {
  const ink = tone === "auto" ? "text-white" : tone === "dark" ? "text-[#fff]" : "text-[#0a1022]";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" tone={tone} animate={animate} title="" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.35rem] font-semibold tracking-[-0.03em] ${ink}`}>
          Celest<span className="text-gradient">iq</span>
        </span>
        {descriptor ? (
          <span className="mt-1 pl-px font-sans text-[0.56rem] font-semibold tracking-[0.34em] text-fg-subtle uppercase">Technologies</span>
        ) : null}
      </span>
    </span>
  );
}
