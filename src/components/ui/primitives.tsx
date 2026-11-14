import Link from "next/link";
import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import type { Media } from "@/lib/content";
import { Reveal } from "./Reveal";

/* ─────────────── Buttons ─────────────── */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
} & Omit<ComponentProps<"a">, "href">;

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,background-color,border-color,color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-soft focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900";
const variants = {
  primary:
    "bg-gradient-to-r from-electric via-violet to-[#8f6bff] text-snow shadow-[0_10px_40px_-10px_rgba(77,107,255,0.7)] hover:shadow-[0_14px_50px_-8px_rgba(109,91,255,0.85)] hover:-translate-y-0.5",
  outline:
    "border border-white/15 bg-white/[0.03] text-fg lg:backdrop-blur hover:border-white/30 hover:bg-white/[0.07] hover:-translate-y-0.5",
  ghost: "text-fg-muted hover:text-fg",
};
const sizes = { md: "h-11 px-5 text-sm", lg: "h-13 px-7 text-[0.95rem]" };

export function Button({ href, children, variant = "primary", size = "md", external, className = "", ...rest }: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

/* ─────────────── Section scaffolding ─────────────── */

export function Section({ id, children, className = "", labelledBy }: { id?: string; children: ReactNode; className?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative py-24 sm:py-32 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <p className="eyebrow">
        <span aria-hidden className="h-px w-6 bg-gradient-to-r from-transparent to-electric-soft" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 text-[2.15rem] leading-[1.08] font-semibold sm:text-5xl">
        {title}
      </h2>
      {intro ? <p className="mt-5 text-lg leading-relaxed text-fg-muted">{intro}</p> : null}
    </Reveal>
  );
}

/* ─────────────── Device frames ─────────────── */

export function BrowserFrame({
  media,
  url,
  priority,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className = "",
}: {
  media: Media;
  url?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-ink-850 shadow-[0_30px_80px_-20px_var(--shade)] ${className}`}>
      <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.07] bg-ink-800/90 px-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        {url ? (
          <span className="mx-auto truncate rounded-md bg-white/[0.05] px-3 py-0.5 text-[0.65rem] text-fg-subtle">{url}</span>
        ) : null}
      </div>
      <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes={sizes} priority={priority} className="block h-auto w-full" />
    </div>
  );
}

export function PhoneFrame({ media, sizes = "220px", className = "", priority }: { media: Media; sizes?: string; className?: string; priority?: boolean }) {
  return (
    <div className={`rounded-[2rem] border border-white/15 bg-[#04060d] p-1.5 shadow-[0_30px_70px_-15px_var(--shade)] ${className}`}>
      <div className="relative overflow-hidden rounded-[1.6rem]">
        <span aria-hidden className="absolute top-1.5 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
        <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes={sizes} priority={priority} className="block h-auto w-full" />
      </div>
    </div>
  );
}

export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-fg-muted ${className}`}>
      {children}
    </span>
  );
}
