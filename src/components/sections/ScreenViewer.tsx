"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import type { Media } from "@/lib/content";

/**
 * Tabbed, auto-advancing viewer for real product screenshots.
 * Pauses on hover/focus, when off-screen, and for reduced-motion users.
 */
export function ScreenViewer({
  media,
  productName,
  accent,
  interval = 5200,
}: {
  media: Media[];
  productName: string;
  accent: { from: string; to: string };
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || reduce || !visible || media.length < 2) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % media.length), interval);
    return () => window.clearTimeout(t);
  }, [index, paused, reduce, visible, media.length, interval]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + media.length) % media.length;
    setIndex(next);
    tabRefs.current[next]?.focus();
  };

  const current = media[index];
  const isRaw = current.frame === "raw";

  return (
    <div
      ref={root}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="relative"
    >
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[3rem] opacity-40 lg:blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${accent.from}, transparent), radial-gradient(closest-side at 80% 80%, ${accent.to}, transparent)` }}
      />

      <div className="ring-gradient overflow-hidden rounded-2xl bg-ink-850 shadow-[0_40px_100px_-30px_var(--shade)]">
        <div className="flex h-9 items-center gap-1.5 border-b border-white/[0.07] bg-ink-800/90 px-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          <span className="ml-3 truncate text-xs text-fg-subtle">
            {productName} — {current.label}
          </span>
        </div>

        <div
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${index}`}
          className={`relative aspect-[16/10.5] ${isRaw ? "bg-[#fbf3ea]" : "bg-ink-900"}`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={isRaw ? "object-contain p-2 sm:p-4" : "object-cover object-top"}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div role="tablist" aria-label={`${productName} screens`} onKeyDown={onKeyDown} className="mt-5 flex flex-wrap gap-2">
        {media.map((m, i) => {
          const selected = i === index;
          return (
            <button
              key={m.src}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${uid}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setIndex(i)}
              className={`relative overflow-hidden rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                selected ? "border-white/25 bg-white/[0.08] text-white" : "border-white/[0.08] text-fg-muted hover:border-white/20 hover:text-white"
              }`}
            >
              {m.label}
              {selected && !paused && !reduce && visible ? (
                <motion.span
                  key={`p-${index}`}
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: interval / 1000, ease: "linear" }}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
