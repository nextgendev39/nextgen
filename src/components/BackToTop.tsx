"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const SHOW_AFTER = 600; // px scrolled before the button appears
const R = 22;
const C = 2 * Math.PI * R;

/** Ring offset for the current scroll position (C = empty, 0 = full) */
function offset() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return C * (1 - (max > 0 ? Math.min(window.scrollY / max, 1) : 0));
}

/**
 * Floating "back to top" button. Appears after the visitor scrolls down,
 * with a ring that fills as they progress through the page. The ring is
 * updated through a ref, so scrolling never re-renders React.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ring = useRef<SVGCircleElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > SHOW_AFTER);
      if (ring.current) ring.current.style.strokeDashoffset = String(offset());
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    // Send keyboard focus back to the top too, without a second jump
    document.querySelector<HTMLElement>("header a")?.focus({ preventScroll: true });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed right-4 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 grid h-13 w-13 place-items-center rounded-full border border-white/10 bg-ink-850/90 text-white shadow-[0_12px_40px_-12px_rgba(109,91,255,0.7)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_44px_-10px_rgba(109,91,255,0.95)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric sm:right-6 sm:bottom-6 lg:backdrop-blur"
        >
          <svg aria-hidden viewBox="0 0 52 52" className="absolute inset-0 h-full w-full -rotate-90">
            <defs>
              <linearGradient id="btt-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-electric)" />
                <stop offset="100%" stopColor="var(--color-violet)" />
              </linearGradient>
            </defs>
            <circle cx="26" cy="26" r={R} fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="2.5" />
            <circle
              ref={(el) => {
                ring.current = el;
                if (el) el.style.strokeDashoffset = String(offset());
              }}
              cx="26"
              cy="26"
              r={R}
              fill="none"
              stroke="url(#btt-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={C}
            />
          </svg>
          <ArrowUp className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
