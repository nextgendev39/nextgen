import Image from "next/image";
import type { Project } from "@/lib/content";
import { BrowserFrame, PhoneFrame } from "@/components/ui/primitives";

/**
 * Card thumbnail: the desktop screenshot filling a 16:10 box, with the phone
 * screenshot overlapping the bottom-right corner. Falls back to the project
 * name on a brand gradient when there is no screenshot.
 */
export function ProjectThumb({ project: p, sizes }: { project: Project; sizes: string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.08] bg-ink-900">
      {p.cover ? (
        <>
          <Image
            src={p.cover.src}
            alt=""
            fill
            sizes={sizes}
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {p.mobile ? (
            <div className="absolute right-[5%] -bottom-[18%] w-[22%] rounded-[0.9rem] border border-white/20 bg-[#04060d] p-[3px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] transition-transform duration-700 group-hover:-translate-y-[6%]">
              <Image src={p.mobile.src} alt="" width={p.mobile.width} height={p.mobile.height} sizes="120px" className="block h-auto w-full rounded-[0.7rem]" />
            </div>
          ) : null}
        </>
      ) : (
        <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--color-electric)_35%,transparent),transparent_60%),radial-gradient(circle_at_80%_90%,color-mix(in_oklab,var(--color-violet)_35%,transparent),transparent_55%)]">
          <span className="font-display text-3xl font-semibold tracking-[-0.03em] text-white">{p.name}</span>
        </div>
      )}
    </div>
  );
}

/** Case-study hero: desktop in a browser frame with the phone overlapping it. */
export function ProjectHeroShots({ project: p }: { project: Project }) {
  if (!p.cover) return null;
  const host = p.website ? new URL(p.website).host.replace(/^www\./, "") : undefined;
  return (
    <div className={`relative ${p.mobile ? "pr-[12%] pb-[6%] sm:pr-[10%]" : ""}`}>
      <BrowserFrame media={p.cover} url={host} priority sizes="(min-width: 1280px) 1100px, 92vw" />
      {p.mobile ? (
        <PhoneFrame media={p.mobile} priority sizes="(min-width: 1024px) 240px, 25vw" className="absolute right-0 bottom-0 w-[24%] max-w-60 sm:w-[20%]" />
      ) : null}
    </div>
  );
}
