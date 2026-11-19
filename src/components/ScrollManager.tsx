"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Predictable scrolling for link navigation:
 *
 * - Going to another page opens it at the top. By default Next.js keeps the
 *   previous scroll position whenever the new page is already in view, which
 *   lands visitors halfway down long pages.
 * - A link with a #hash (e.g. "/#process") lands on that section instead, also
 *   when it is clicked from another page.
 * - Clicking a link to the page you are already on scrolls back to the top.
 * - Back/forward keeps the browser's own scroll restoration.
 */
export function ScrollManager() {
  const pathname = usePathname();
  const firstRender = useRef(true);
  const historyNav = useRef(false);

  // Back/forward: let the browser restore the previous position.
  useEffect(() => {
    const onPop = () => {
      historyNav.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // After every client-side page change: section (if #hash) or top of page.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false; // initial load: the browser handles #hash and reload position
      return;
    }
    if (historyNav.current) {
      historyNav.current = false;
      return;
    }
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  // Links to the page you are already on don't change the pathname, so the
  // effect above never runs: scroll here instead (to the #section, or the top).
  // Capture phase, because next/link calls preventDefault() on its own click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      const id = decodeURIComponent(url.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (!id) window.scrollTo({ top: 0, behavior: "smooth" });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
