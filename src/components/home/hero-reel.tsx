"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { HeroClip } from "@/lib/types";

// Fallback set used when the hero_clips table is empty.
const FALLBACK_CLIPS: HeroClip[] = [
  {
    id: "fallback-wine",
    label_en: "Wine",
    label_it: "Vino",
    poster_url:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=2400&q=90",
    video_url: "",
    position: 1,
    created_at: "",
  },
  {
    id: "fallback-chocolate",
    label_en: "Chocolate",
    label_it: "Cioccolato",
    poster_url:
      "https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=2400&q=90",
    video_url: "",
    position: 2,
    created_at: "",
  },
  {
    id: "fallback-cheese",
    label_en: "Cheese",
    label_it: "Formaggio",
    poster_url:
      "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=2400&q=90",
    video_url: "",
    position: 3,
    created_at: "",
  },
  {
    id: "fallback-pasta",
    label_en: "Pasta",
    label_it: "Pasta",
    poster_url:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=2400&q=90",
    video_url: "",
    position: 4,
    created_at: "",
  },
];

const CYCLE_MS = 6500;

export function HeroReel({
  clips,
  showCaption = true,
  locale = "en",
}: {
  clips: HeroClip[];
  showCaption?: boolean;
  locale?: "en" | "it";
}) {
  const list = clips.length > 0 ? clips : FALLBACK_CLIPS;
  const [idx, setIdx] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (list.length <= 1) return;
    const timer = window.setInterval(() => {
      setIdx((i) => (i + 1) % list.length);
    }, CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [list.length]);

  useEffect(() => {
    const v = videoRefs.current[idx];
    if (v && v.src) {
      try {
        v.currentTime = 0;
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } catch {
        // ignore
      }
    }
  }, [idx]);

  const current = list[idx];

  return (
    <>
      <div className="absolute inset-0">
        {list.map((clip, i) => (
          <motion.div
            key={clip.id}
            initial={false}
            animate={{ opacity: i === idx ? 1 : 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={clip.poster_url}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover photo-warm kenburns"
            />
            {clip.video_url && (
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay={i === 0}
                muted
                loop
                playsInline
                preload={i === 0 ? "auto" : "metadata"}
                poster={clip.poster_url}
              >
                <source src={clip.video_url} type="video/mp4" />
              </video>
            )}
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.55)_0%,rgba(11,11,12,0.25)_45%,rgba(11,11,12,0.85)_100%)]" />
      </div>

      {showCaption && list.length > 1 && (
        <div className="absolute top-44 md:top-48 left-1/2 -translate-x-1/2 z-10 text-ivory flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.42em] text-gold-soft">
            {locale === "it" ? "In tavola" : "On the table"}
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={current.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display italic text-lg md:text-xl"
            >
              {locale === "it"
                ? current.label_it || current.label_en
                : current.label_en}
            </motion.span>
          </AnimatePresence>
          <div className="ml-2 flex items-center gap-1.5">
            {list.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "block h-px transition-all duration-700",
                  i === idx ? "bg-gold-soft w-5" : "bg-ivory/30 w-2.5",
                )}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
