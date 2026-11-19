"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { products, type Product } from "@/lib/content";

/** Where a product link goes: its live app, or its page on this site if it has none. */
export function productScreenHref(p: Product) {
  return p.website ?? `/products/${p.slug}`;
}

/** Small square icon for menu rows: the app icon, or the first letter on the brand accent. */
function ProductIcon({ product: p }: { product: Product }) {
  if (p.mark) {
    const square = p.mark.width === p.mark.height;
    return square ? (
      <Image src={p.mark.src} alt="" width={36} height={36} className="h-9 w-9 shrink-0 rounded-[0.6rem]" />
    ) : (
      <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.6rem] border border-white/10 bg-[#0b0f1c] p-1">
        <Image src={p.mark.src} alt="" width={p.mark.width} height={p.mark.height} className="h-auto w-full object-contain" />
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.6rem] font-display text-sm font-semibold text-snow"
      style={{ background: `linear-gradient(135deg, ${p.accent.from}, ${p.accent.to})` }}
    >
      {p.name[0]}
    </span>
  );
}

/**
 * Desktop "Products" nav item with a dropdown. Opens on hover or click,
 * closes on Escape, outside click or focus leaving. Each product opens its
 * live app in a new tab.
 */
export function ProductsMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLLIElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  // Set when hover opened the menu, so the click that usually follows doesn't close it again
  const hoverOpened = useRef(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openNow = () => {
    window.clearTimeout(closeTimer.current);
    if (!open) hoverOpened.current = true;
    setOpen(true);
  };
  const onButtonClick = () => {
    if (hoverOpened.current) {
      hoverOpened.current = false;
      setOpen(true);
      return;
    }
    setOpen((v) => !v);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      hoverOpened.current = false;
      setOpen(false);
    }, 140);
  };

  return (
    <li
      ref={root}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && openNow()}
      onPointerLeave={(e) => e.pointerType === "mouse" && closeSoon()}
      onBlur={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-current={active ? "true" : undefined}
        onClick={onButtonClick}
        className={`relative flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[0.85rem] whitespace-nowrap transition-colors xl:px-3.5 ${
          active || open ? "text-white" : "text-fg-muted hover:text-white"
        }`}
      >
        {active ? (
          <motion.span
            layoutId="nav-pill"
            className="absolute inset-0 -z-10 rounded-full bg-white/[0.09]"
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          />
        ) : null}
        Products
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 z-50 w-[22rem] -translate-x-1/2 pt-3"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-850/95 p-2 shadow-[0_24px_60px_-16px_var(--shade)] backdrop-blur-xl">
              <p className="px-3 pt-2 pb-1 text-[0.68rem] font-semibold tracking-[0.16em] text-fg-subtle uppercase">Our products</p>
              <ul>
                {products.map((p) => (
                  <li key={p.slug}>
                    <a
                      href={productScreenHref(p)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/[0.06] focus-visible:bg-white/[0.06]"
                    >
                      <ProductIcon product={p} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-white">{p.name}</span>
                        <span className="block truncate text-xs text-fg-muted">{p.category}</span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                        aria-hidden
                      />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
              <Link
                href="/products"
                onClick={() => setOpen(false)}
                className="group mt-1 flex items-center justify-between rounded-xl border-t border-white/[0.06] px-3 py-2.5 text-sm font-medium text-electric-soft hover:text-white"
              >
                View all products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

/** Product rows for the mobile menu (each opens the live app in a new tab). */
export function MobileProductLinks({ onNavigate }: { onNavigate: () => void }) {
  return (
    <ul className="grid gap-1 pb-3" aria-label="Products">
      {products.map((p) => (
        <li key={p.slug}>
          <a
            href={productScreenHref(p)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-white/[0.05]"
          >
            <ProductIcon product={p} />
            <span className="min-w-0 flex-1">
              <span className="block text-base font-semibold text-white">{p.name}</span>
              <span className="block truncate text-xs text-fg-muted">{p.category}</span>
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-subtle" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
