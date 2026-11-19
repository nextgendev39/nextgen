import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/** Closing call-to-action panel used at the end of inner pages. */
export function CtaBanner({
  title,
  text,
  href = "/contact",
  label = "Start a project",
  children,
}: {
  title: string;
  text: string;
  href?: string;
  label?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="py-20">
      <div className="container-x">
        <div className="ring-gradient flex flex-col items-start gap-8 rounded-[2rem] bg-ink-850 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
            <p className="mt-3 max-w-xl text-fg-muted">{text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={href}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-ink-900 transition hover:-translate-y-0.5"
            >
              {label} <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
