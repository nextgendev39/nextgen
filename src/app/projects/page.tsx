import { notFound } from "next/navigation";
import { ProjectsGrid } from "@/components/ui/ProjectsGrid";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBanner } from "@/components/ui/CtaBanner";
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
        <ProjectsGrid projects={projects} />
      </section>
      <CtaBanner title="Have a similar project in mind?" text="Tell us what you are building and we'll get back to you to discuss scope and approach." />
    </>
  );
}
