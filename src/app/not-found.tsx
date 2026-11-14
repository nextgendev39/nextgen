import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-center justify-center pt-[var(--header-h)] text-center">
      <LogoMark className="h-16 w-16" animate="mount" />
      <h1 className="mt-8 text-4xl font-semibold sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-fg-muted">The page you are looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="mt-8 inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-ink-900">
        Back to home
      </Link>
    </section>
  );
}
