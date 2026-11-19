"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "./ThemeToggle";
import { MobileProductLinks, ProductsMenu } from "./ProductsMenu";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view (home page only)
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  // Lock scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (id: string) => (pathname === "/" ? active === id : pathname === `/${id}` || pathname.startsWith(`/${id}/`));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        open
          ? "border-b border-white/[0.06] bg-ink-900 lg:bg-ink-900/75 lg:backdrop-blur-xl"
          : scrolled
            ? "border-b border-white/[0.06] bg-ink-900/95 lg:bg-ink-900/75 lg:backdrop-blur-xl"
            : "border-b border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-ink-900"
      >
        Skip to content
      </a>
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" aria-label="Celestiq Technologies — home" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo animate="mount" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.03] p-1 backdrop-blur">
            {nav.map((item) =>
              item.id === "products" ? (
                <ProductsMenu key={item.id} active={isActive(item.id)} />
              ) : (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.id) ? "true" : undefined}
                  className={`relative block rounded-full px-2.5 py-1.5 text-[0.85rem] whitespace-nowrap transition-colors xl:px-3.5 ${
                    isActive(item.id) ? "text-white" : "text-fg-muted hover:text-white"
                  }`}
                >
                  {isActive(item.id) ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.09]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  {item.label}
                </Link>
              </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            className="group hidden items-center gap-1.5 rounded-full bg-white px-5 py-2.5 whitespace-nowrap text-sm font-semibold text-ink-900 shadow-[0_8px_30px_-8px_rgba(109,91,255,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-6px_rgba(109,91,255,0.95)] sm:inline-flex"
          >
            Let&apos;s Talk
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - var(--header-h))" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-y-auto lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 pt-4 pb-10">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between border-b border-white/[0.06] py-4 font-display text-2xl ${
                      isActive(item.id) ? "text-white" : "text-fg-muted"
                    }`}
                  >
                    {item.label}
                    <ArrowUpRight className="h-5 w-5 opacity-40" aria-hidden />
                  </Link>
                  {item.id === "products" ? <MobileProductLinks onNavigate={() => setOpen(false)} /> : null}
                </motion.li>
              ))}
              <li className="pt-6">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex h-13 items-center justify-center rounded-full bg-gradient-to-r from-electric to-violet font-semibold text-snow"
                >
                  Let&apos;s Talk
                </Link>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
