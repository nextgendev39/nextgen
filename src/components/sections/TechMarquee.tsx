/** Technologies used across NextGen's own products and client work. */
const tech = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Tailwind CSS",
  "Drizzle ORM",
  "Framer Motion",
  "Three.js",
  "Progressive Web Apps",
  "Playwright",
];

export function TechMarquee() {
  return (
    <div className="relative border-y border-white/[0.06] bg-ink-950/40 py-6" aria-label="Technologies we work with">
      <p className="sr-only">Technologies we work with: {tech.join(", ")}.</p>
      <div aria-hidden className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0 animate-[marquee_42s_linear_infinite] items-center gap-12 pr-12 motion-reduce:animate-none">
            {tech.map((t) => (
              <li key={t} className="flex items-center gap-3 font-display text-lg whitespace-nowrap text-fg-subtle">
                <span className="h-1.5 w-1.5 rotate-45 bg-gradient-to-br from-electric to-violet" />
                {t}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
