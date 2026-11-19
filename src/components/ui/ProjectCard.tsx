import Link from "next/link";
import { AppWindow, ArrowRight, ArrowUpRight, Globe } from "lucide-react";
import { Chip } from "@/components/ui/primitives";
import { ProjectThumb } from "@/components/ui/ProjectShowcase";
import type { Project, ProjectCategory } from "@/lib/content";

export const categoryIcon: Record<ProjectCategory, typeof Globe> = { Website: Globe, "Web App": AppWindow };

/** Client-project card used on the landing page and /projects. */
export function ProjectCard({ project: p, sizes }: { project: Project; sizes: string }) {
  const Icon = categoryIcon[p.category];
  return (
    <article
      aria-labelledby={`project-${p.slug}`}
      className="group ring-gradient relative flex w-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-ink-850/80 transition-transform duration-500 hover:-translate-y-1"
    >
      <Link href={`/projects/${p.slug}`} tabIndex={-1} aria-hidden className="relative block p-3 pb-0">
        <ProjectThumb project={p} sizes={sizes} />
        <span className="absolute top-6 left-6 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-electric to-violet px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-snow uppercase shadow-lg">
          <Icon className="h-3 w-3" aria-hidden /> {p.category}
        </span>
      </Link>

      <div className="relative flex flex-1 flex-col p-6">
        <p className="text-sm text-electric-soft">
          <span className="sr-only">{p.category} · </span>
          {p.industry}
        </p>
        <h3 id={`project-${p.slug}`} className="mt-1.5 text-xl font-semibold">
          <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0">
            {p.name}
          </Link>
        </h3>
        <p className="mt-3 text-fg-muted">{p.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {p.services.slice(0, 3).map((s) => (
            <li key={s}>
              <Chip>{s}</Chip>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm font-medium">
          <span className="inline-flex items-center gap-1.5 text-white">
            Case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
          {p.website ? (
            <a href={p.website} target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-1 text-fg-muted hover:text-white">
              Live site <ArrowUpRight className="h-4 w-4" aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
