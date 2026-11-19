import Image from "next/image";
import type { Media, Project } from "@/lib/content";
import { BrowserFrame, PhoneFrame } from "@/components/ui/primitives";

type Shots = { desktop?: Media; mobile?: Media };

/**
 * Card thumbnail: the desktop screenshot filling a 16:10 box, with the phone
 * screenshot overlapping the bottom-right corner. Falls back to `fallback`
 * on a brand gradient when there is no screenshot.
 */
export function DeviceThumb({ desktop, mobile, fallback, sizes, className = "" }: Shots & { fallback?: string; sizes: string; className?: string }) {
  return (
    <div className={`relative aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.08] bg-ink-900 ${className}`}>
      {desktop ? (
        <>
          <Image
            src={desktop.src}
            alt=""
            fill
            sizes={sizes}
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {mobile ? (
            <div className="absolute right-[5%] -bottom-[18%] w-[22%] rounded-[0.9rem] border border-white/20 bg-[#04060d] p-[3px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] transition-transform duration-700 group-hover:-translate-y-[6%]">
              <Image src={mobile.src} alt="" width={mobile.width} height={mobile.height} sizes="120px" className="block h-auto w-full rounded-[0.7rem]" />
            </div>
          ) : null}
        </>
      ) : (
        <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--color-electric)_35%,transparent),transparent_60%),radial-gradient(circle_at_80%_90%,color-mix(in_oklab,var(--color-violet)_35%,transparent),transparent_55%)]">
          <span className="font-display text-3xl font-semibold tracking-[-0.03em] text-white">{fallback}</span>
        </div>
      )}
    </div>
  );
}

/** Large hero: desktop in a browser frame with the phone overlapping it. */
export function DeviceHeroShots({ desktop, mobile, website, priority = true, sizes = "(min-width: 1280px) 1100px, 92vw" }: Shots & { website?: string; priority?: boolean; sizes?: string }) {
  if (!desktop) return null;
  const host = website ? new URL(website).host.replace(/^www\./, "") : undefined;
  return (
    <div className={`relative ${mobile ? "pr-[12%] pb-[6%] sm:pr-[10%]" : ""}`}>
      <BrowserFrame media={desktop} url={host} priority={priority} sizes={sizes} />
      {mobile ? (
        <PhoneFrame media={mobile} priority={priority} sizes="(min-width: 1024px) 240px, 25vw" className="absolute right-0 bottom-0 w-[24%] max-w-60 sm:w-[20%]" />
      ) : null}
    </div>
  );
}

export function ProjectThumb({ project: p, sizes }: { project: Project; sizes: string }) {
  return <DeviceThumb desktop={p.cover} mobile={p.mobile} fallback={p.name} sizes={sizes} />;
}

export function ProjectHeroShots({ project: p }: { project: Project }) {
  return <DeviceHeroShots desktop={p.cover} mobile={p.mobile} website={p.website} />;
}
