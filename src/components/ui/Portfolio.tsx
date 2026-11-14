import Image from "next/image";
import type { Product, Tag } from "@/lib/content";

const logoSizes = {
  sm: { h: "h-8", text: "text-lg" },
  md: { h: "h-10 sm:h-11", text: "text-2xl sm:text-[1.65rem]" },
  lg: { h: "h-11 sm:h-12", text: "text-[1.7rem] sm:text-3xl" },
  xl: { h: "h-14 sm:h-16", text: "text-4xl sm:text-[2.6rem]" },
} as const;

/**
 * Product wordmark. Uses the dark/light wordmark images when the product has
 * them, otherwise its square app icon next to the product name.
 */
export function ProductLogo({
  product: p,
  size = "lg",
  priority,
}: {
  product: Product;
  size?: keyof typeof logoSizes;
  priority?: boolean;
}) {
  const { h, text } = logoSizes[size];
  if (p.logo) {
    const { src, srcLight, width, height } = p.logo;
    return (
      <>
        <Image src={src} alt="" width={width} height={height} priority={priority} className={`w-auto ${h} ${srcLight ? "light:hidden" : ""}`} />
        {srcLight ? (
          <Image src={srcLight} alt="" width={width} height={height} priority={priority} className={`hidden w-auto light:block ${h}`} />
        ) : null}
      </>
    );
  }
  return (
    <span className={`inline-flex items-center gap-3 ${h}`}>
      {p.mark ? (
        <Image src={p.mark.src} alt="" width={p.mark.width} height={p.mark.height} priority={priority} className="aspect-square h-full w-auto rounded-[22%]" />
      ) : null}
      <span className={`font-display leading-none font-semibold tracking-[-0.03em] text-white ${text}`}>{p.name}</span>
    </span>
  );
}

/** Accurate category labels (SaaS Product, Automotive, …). */
export function TagList({ tags, className = "" }: { tags: Tag[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Categories">
      {tags.map((t) => (
        <li
          key={t}
          className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[0.68rem] font-semibold tracking-wide text-fg-muted uppercase"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

