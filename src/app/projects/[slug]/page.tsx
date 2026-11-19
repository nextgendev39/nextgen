import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectHeroShots } from "@/components/ui/ProjectShowcase";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Chip } from "@/components/ui/primitives";
import { JsonLd } from "@/components/JsonLd";
import { projects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { projectSchema, type Crumb } from "@/lib/schema";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMetadata({ ...p.seo, path: `/projects/${p.slug}` });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: p.name, path: `/projects/${p.slug}` },
  ];

  return (
    <>
      <JsonLd data={projectSchema(p, crumbs)} />
      <PageHero eyebrow={`${p.industry} · Client project`} crumbs={crumbs} title={p.name} intro={p.summary}>
        {p.website ? (
          <a
            href={p.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-white hover:border-white/30"
          >
            Visit the live site <ArrowUpRight className="h-4 w-4" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : null}
      </PageHero>

      {p.cover ? (
        <div className="container-x">
          <ProjectHeroShots project={p} />
        </div>
      ) : null}

      <section aria-labelledby="case-title" className="py-16">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 text-lg leading-relaxed text-fg-muted lg:col-span-8">
            <h2 id="case-title" className="text-3xl font-semibold text-fg sm:text-4xl">
              About the project
            </h2>
            {p.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <aside className="space-y-8 lg:col-span-4">
            <div>
              <h2 className="text-sm font-semibold tracking-[0.16em] text-fg-subtle uppercase">Services</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.services.map((s) => (
                  <li key={s}>
                    <Chip>{s}</Chip>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-[0.16em] text-fg-subtle uppercase">Technology</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <li key={t}>
                    <Chip>{t}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBanner title="Have a similar project in mind?" text="Tell us what you are building and we'll get back to you to discuss scope and approach." />
    </>
  );
}
