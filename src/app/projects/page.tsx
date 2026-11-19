import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Chip } from "@/components/ui/primitives";
import { JsonLd } from "@/components/JsonLd";
import { projects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { pageSchema, type Crumb } from "@/lib/schema";

/*
 * Client case studies. Returns 404 (and stays out of the sitemap) until
 * `projects` in @/lib/content has at least one entry.
 */

const seo = {
  title: "Client Projects & Case Studies | Celestiq Technologies",
  description:
    "Selected client projects by Celestiq Technologies: websites, web applications and integrations, with the goals, approach and technology behind each one.",
};

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
];

export const metadata = pageMetadata({ ...seo, path: "/projects" });

export default function ProjectsPage() {
  if (!projects.length) notFound();

  return (
    <>
      <JsonLd
        data={pageSchema({
          type: "CollectionPage",
          path: "/projects",
          ...seo,
          crumbs,
          itemList: projects.map((p) => ({ name: p.name, path: `/projects/${p.slug}` })),
        })}
      />
      <PageHero
        eyebrow="Client work"
        crumbs={crumbs}
        title="Projects we have delivered"
        intro="A selection of websites and applications we have designed and built for clients."
        count={`${String(projects.length).padStart(2, "0")} projects`}
      />
      <section aria-label="All projects" className="pb-12">
        <ul className="container-x grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`} className="group ring-gradient flex h-full flex-col overflow-hidden rounded-[2rem] bg-ink-850/70">
                {p.cover ? (
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
                    <Image src={p.cover.src} alt={p.cover.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover object-top" />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-sm text-electric-soft">{p.industry}</p>
                  <h2 className="mt-2 text-2xl font-semibold">{p.name}</h2>
                  <p className="mt-3 text-fg-muted">{p.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.services.map((s) => (
                      <li key={s}>
                        <Chip>{s}</Chip>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-white">
                    Read the case study <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBanner title="Have a similar project in mind?" text="Tell us what you are building and we'll get back to you to discuss scope and approach." />
    </>
  );
}
