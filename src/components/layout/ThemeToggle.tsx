"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/** Switches between light and dark. The choice is saved; until then the OS preference applies. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const read = () => setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    read();
    // Follow OS changes while the visitor hasn't picked a theme themselves
    const mq = matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("theme");
      } catch {}
      if (saved) return;
      document.documentElement.dataset.theme = mq.matches ? "light" : "dark";
      read();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-fg-muted transition hover:border-white/25 hover:text-white ${className}`}
    >
      {/* Both icons render server-side; CSS picks the right one before hydration */}
      <Sun className="h-[1.1rem] w-[1.1rem] light:hidden" aria-hidden />
      <Moon className="hidden h-[1.1rem] w-[1.1rem] light:block" aria-hidden />
    </button>
  );
}
