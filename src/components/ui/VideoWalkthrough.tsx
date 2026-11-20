"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { Clock, Mic, Play } from "lucide-react";
import type { Walkthrough } from "@/lib/content";
import { trackEvent } from "@/lib/track";

export type WalkthroughItem = Walkthrough & { product: string };

/**
 * Tabbed video player. Shows the poster until the visitor presses play, so the
 * MP4 is only downloaded on demand. Switching tabs returns to the poster.
 */
export function VideoWalkthrough({ videos, tabLabel = "label", className = "" }: { videos: WalkthroughItem[]; tabLabel?: "label" | "product"; className?: string }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const baseId = useId();
  const v = videos[active];
  if (!v) return null;

  const select = (i: number) => {
    setActive(i);
    setPlaying(false);
  };

  const play = () => {
    setPlaying(true);
    trackEvent("walkthrough_play", { product: v.product, video: v.label });
  };

  return (
    <div className={className}>
      {videos.length > 1 ? (
        <div role="tablist" aria-label="Walkthrough videos" className="mb-5 flex flex-wrap gap-2">
          {videos.map((x, i) => (
            <button
              key={x.src}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${baseId}-panel`}
              onClick={() => select(i)}
              className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition ${
                i === active
                  ? "bg-white text-ink-900"
                  : "border border-white/15 bg-white/[0.03] text-fg-muted hover:border-white/30 hover:text-fg"
              }`}
            >
              {tabLabel === "product" ? x.product : x.label}
              <span className={`text-xs tabular-nums ${i === active ? "text-ink-900/60" : "text-fg-subtle"}`}>{x.duration}</span>
            </button>
          ))}
        </div>
      ) : null}

      <div
        id={`${baseId}-panel`}
        role={videos.length > 1 ? "tabpanel" : undefined}
        aria-labelledby={videos.length > 1 ? `${baseId}-tab-${active}` : undefined}
        className="ring-gradient relative overflow-hidden rounded-[var(--radius-card)] bg-ink-900 p-1.5 sm:p-2"
      >
        <div className="relative aspect-video overflow-hidden rounded-[calc(var(--radius-card)-0.4rem)] bg-black">
          {playing ? (
            <video
              key={v.src}
              src={v.src}
              poster={v.poster}
              controls
              autoPlay
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full"
              aria-label={v.title}
            />
          ) : (
            <button type="button" onClick={play} className="group absolute inset-0 block h-full w-full cursor-pointer" aria-label={`Play video: ${v.title} (${v.duration})`}>
              <Image src={v.poster} alt="" fill sizes="(min-width: 1280px) 1100px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
              <span
                aria-hidden
                className="absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-r from-electric to-violet text-snow shadow-[0_10px_40px_-6px_rgba(77,107,255,0.8)] transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20"
              >
                <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" />
              </span>
              <span aria-hidden className="absolute right-4 bottom-4 left-4 flex flex-wrap items-end justify-between gap-2 text-left text-snow">
                <span className="text-sm font-semibold drop-shadow sm:text-base">{v.title}</span>
                <span className="flex items-center gap-2 text-xs">
                  {v.voiceover ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur">
                      <Mic className="h-3 w-3" /> Voiceover
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 tabular-nums backdrop-blur">
                    <Clock className="h-3 w-3" /> {v.duration}
                  </span>
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
