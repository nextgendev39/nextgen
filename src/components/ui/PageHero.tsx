import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "./Reveal";

/** Header block for inner listing pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
  count,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  count: string;
}) {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-h)+3.5rem)] pb-14 sm:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -top-56 left-1/2 h-[40rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(61,123,255,0.22),transparent)] blur-2xl" />
        <div className="absolute top-10 -right-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(109,91,255,0.2),transparent)] blur-2xl" />
      </div>
      <div className="container-x">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-white">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Home
        </Link>
        <Reveal className="mt-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">
              <span aria-hidden className="h-px w-6 bg-gradient-to-r from-transparent to-electric-soft" />
              {eyebrow}
            </p>
            <h1 className="mt-4 text-[2.6rem] leading-[1.04] font-semibold sm:text-6xl">{title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-fg-muted">{intro}</p>
          </div>
          <p className="font-display text-sm tracking-wide text-fg-subtle">{count}</p>
        </Reveal>
      </div>
    </section>
  );
}
