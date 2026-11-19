"use client";

import { useState } from "react";
import { LayoutGrid } from "lucide-react";
import { ProjectCard, categoryIcon } from "@/components/ui/ProjectCard";
import { projectCategories, type Project, type ProjectCategory } from "@/lib/content";

type Filter = "All" | ProjectCategory;

/** /projects grid with All / Web Apps / Websites filter tabs. */
export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  type Tab = { id: Filter; label: string; count: number; Icon: typeof LayoutGrid };
  const allTabs: Tab[] = [
    { id: "All", label: "All projects", count: projects.length, Icon: LayoutGrid },
    ...projectCategories.map((c): Tab => ({
      id: c,
      label: `${c}s`,
      count: projects.filter((p) => p.category === c).length,
      Icon: categoryIcon[c],
    })),
  ];
  const tabs = allTabs.filter((t) => t.count > 0);
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="container-x">
      <div role="group" aria-label="Filter projects by type" className="flex flex-wrap gap-2">
        {tabs.map(({ id, label, count, Icon }) => {
          const active = filter === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(id)}
              className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
                active
                  ? "border-transparent bg-gradient-to-r from-electric to-violet text-snow"
                  : "border-white/10 bg-white/[0.03] text-fg-muted hover:border-white/25 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
              <span className={`rounded-full px-1.5 text-xs ${active ? "bg-white/20" : "bg-white/[0.06]"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>

      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.slug} className="flex">
            <ProjectCard project={p} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" />
          </li>
        ))}
      </ul>
    </div>
  );
}
