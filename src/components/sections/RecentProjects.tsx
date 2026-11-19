import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/lib/content";

/** Landing-page strip of recent client work. Renders nothing until `projects` has entries. */
export function RecentProjects() {
  if (!projects.length) return null;

  return (
    <Section id="projects" labelledBy="projects-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="projects-title"
            eyebrow="Recent projects"
            title={
              <>
                Work we have <span className="text-gradient">delivered for clients.</span>
              </>
            }
          />
          <div className="max-w-sm lg:pb-2">
            <p className="text-fg-muted">Websites and applications we have designed and built for businesses we work with.</p>
            <Link href="/projects" className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-electric-soft hover:text-white">
              View all projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <li key={p.slug} className="flex">
              <Reveal delay={i * 0.08} className="flex w-full">
                <ProjectCard project={p} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
