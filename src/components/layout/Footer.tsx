import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { FooterWordmark } from "./FooterWordmark";
import { products, services } from "@/lib/content";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  const { email, phone, location } = site.contact;
  const hasContact = Boolean(email || phone || location);

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink-950 pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(ellipse_at_center,rgba(109,91,255,0.18),transparent_65%)]" />
      <div className="container-x relative grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link href="/#home" className="inline-flex" aria-label="NextGen Technologies — home">
            <Logo />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-muted">
            {site.tagline} We design and engineer websites, applications and APIs for clients — and run our own platforms,{" "}
            {products.map((p) => p.name).join(", ").replace(/, ([^,]*)$/, " and $1")}.
          </p>
          <Link href="/#contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-electric-soft">
            Start a project <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <FooterCol title="Services" className="md:col-span-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href="/#services" className="hover:text-white">
                {s.title}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Products" className="md:col-span-2">
          {products.map((p) => (
            <li key={p.slug}>
              <Link href={`/products/${p.slug}`} className="hover:text-white">
                {p.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/products" className="text-fg-subtle hover:text-white">
              All products →
            </Link>
          </li>
        </FooterCol>

        <FooterCol title="Contact" className="md:col-span-3">
          {hasContact ? (
            <>
              {email ? (
                <li>
                  <a href={`mailto:${email}`} className="inline-flex items-center gap-2 hover:text-white">
                    <Mail className="h-4 w-4" aria-hidden /> {email}
                  </a>
                </li>
              ) : null}
              {phone ? (
                <li>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-white">
                    <Phone className="h-4 w-4" aria-hidden /> {phone}
                  </a>
                </li>
              ) : null}
              {location ? (
                <li className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" aria-hidden /> {location}
                </li>
              ) : null}
            </>
          ) : (
            <li>
              <Link href="/#contact" className="hover:text-white">
                Send us a message
              </Link>
            </li>
          )}
          {site.socials.length ? (
            <li className="flex flex-wrap gap-2 pt-3">
              {site.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-3 py-1 text-xs hover:border-white/30 hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </li>
          ) : null}
        </FooterCol>
      </div>

      <FooterWordmark />

      <div className="container-x flex flex-col gap-3 border-t border-white/[0.06] py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.legalName}. All rights reserved.
        </p>
        <p>
          <a href={site.url} className="hover:text-white">
            {new URL(site.url).host.replace(/^www\./, "")}
          </a>
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="font-sans text-xs font-semibold tracking-[0.16em] text-fg-subtle uppercase">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm text-fg-muted">{children}</ul>
    </div>
  );
}
