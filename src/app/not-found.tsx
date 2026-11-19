import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Celestiq Technologies" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-center justify-center pt-[var(--header-h)] text-center">
      <LogoMark className="h-16 w-16" animate="mount" />
      <h1 className="mt-8 text-4xl font-semibold sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-fg-muted">The page you are looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="mt-8 inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-ink-900">
        Back to home
      </Link>
      <nav aria-label="Popular pages" className="mt-8">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-fg-muted">
          {[
            ["Services", "/services"],
            ["Products", "/products"],
            ["About", "/about"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="hover:text-white">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
