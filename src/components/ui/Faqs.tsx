import { Plus } from "lucide-react";
import type { Faq } from "@/lib/content";

/**
 * Accessible FAQ list built on <details>, so answers are in the HTML (and
 * readable by search engines) without any client JavaScript. Pair with the
 * FAQPage JSON-LD from `@/lib/schema` using the same `faqs` array.
 */
export function Faqs({ faqs, title = "Frequently asked questions", id = "faq-title" }: { faqs: Faq[]; title?: string; id?: string }) {
  return (
    <section aria-labelledby={id} className="py-20">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <h2 id={id} className="text-3xl font-semibold sm:text-4xl lg:col-span-4">
          {title}
        </h2>
        <div className="space-y-3 lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="group glass rounded-2xl p-5 open:border-white/20 sm:p-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                <h3 className="text-[1.05rem] leading-snug font-semibold sm:text-lg">{f.q}</h3>
                <Plus className="mt-1 h-5 w-5 shrink-0 text-electric-soft transition-transform duration-300 group-open:rotate-45" aria-hidden />
              </summary>
              <p className="mt-4 leading-relaxed text-fg-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
