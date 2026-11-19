import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/brand/Logo";
import { site } from "@/lib/site";

export function Contact() {
  const { email, phone, location } = site.contact;
  const details = [
    email ? { icon: Mail, label: "Email", value: email, href: `mailto:${email}` } : null,
    phone ? { icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` } : null,
    location ? { icon: MapPin, label: "Location", value: location } : null,
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href?: string }[];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="noise relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-ink-850">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 -left-20 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(61,123,255,0.28),transparent_60%)] lg:blur-2xl" />
            <div className="absolute -right-32 -bottom-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(109,91,255,0.26),transparent_60%)] lg:blur-2xl" />
            <div className="grid-bg absolute inset-0 opacity-70" />
          </div>

          <div className="relative grid gap-12 p-6 sm:p-10 lg:grid-cols-12 lg:gap-16 lg:p-16">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">
                <span aria-hidden className="h-px w-6 bg-gradient-to-r from-transparent to-electric-soft" />
                Contact
              </p>
              <h2 id="contact-title" className="mt-4 text-[2.3rem] leading-[1.05] font-semibold sm:text-5xl">
                Have an Idea? <span className="text-gradient">Let&apos;s Build Something Great.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-fg-muted">
                Tell us about your product, platform or project. We&apos;ll review it and get back to you to discuss scope, approach
                and next steps.
              </p>

              {details.length ? (
                <ul className="mt-10 space-y-4">
                  {details.map((d) => (
                    <li key={d.label} className="flex items-center gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                        <d.icon className="h-5 w-5 text-electric-soft" aria-hidden />
                      </span>
                      <span>
                        <span className="block text-xs tracking-wider text-fg-subtle uppercase">{d.label}</span>
                        {d.href ? (
                          <a href={d.href} className="text-fg hover:text-electric-soft">
                            {d.value}
                          </a>
                        ) : (
                          <span className="text-fg">{d.value}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {site.socials.length ? (
                <ul className="mt-8 flex flex-wrap gap-2" aria-label="Social media">
                  {site.socials.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-fg-muted hover:border-white/30 hover:text-white"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div aria-hidden className="mt-14 hidden items-center gap-4 lg:flex">
                <LogoMark className="h-12 w-12" animate="inView" />
                <span className="text-sm text-fg-subtle">Replies come from the Celestiq Technologies team directly.</span>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-7">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
