"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Clip = {
  it: string;
  en: string;
  poster: string;
  video: string;
};

export const HERO_CLIPS: Clip[] = [
  {
    it: "Vino",
    en: "Wine",
    poster:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=2400&q=90",
    video:
      "https://videos.pexels.com/video-files/4109248/4109248-uhd_2560_1440_24fps.mp4",
  },
  {
    it: "Cioccolato",
    en: "Chocolate",
    poster:
      "https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=2400&q=90",
    video:
      "https://videos.pexels.com/video-files/4259053/4259053-uhd_2732_1440_25fps.mp4",
  },
  {
    it: "Formaggio",
    en: "Cheese",
    poster:
      "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=2400&q=90",
    video:
      "https://videos.pexels.com/video-files/4040635/4040635-uhd_2560_1440_25fps.mp4",
  },
  {
    it: "Pasta",
    en: "Pasta",
    poster:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=2400&q=90",
    video:
      "https://videos.pexels.com/video-files/4253334/4253334-uhd_2560_1440_25fps.mp4",
  },
];

const CYCLE_MS = 6500;

export function HeroReel({
  showCaption = true,
  locale = "en",
}: {
  showCaption?: boolean;
  locale?: "en" | "it";
}) {
  const [idx, setIdx] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIdx((i) => (i + 1) % HERO_CLIPS.length);
    }, CYCLE_MS);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    // Reset the active video so it always starts playing from frame 0
    const v = videoRefs.current[idx];
    if (v) {
      try {
        v.currentTime = 0;
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } catch {
        // ignore
      }
    }
  }, [idx]);

  const current = HERO_CLIPS[idx];

  return (
    <>
      {/* Layered background — each clip keeps its DOM node so the video continues to load */}
      <div className="absolute inset-0">
        {HERO_CLIPS.map((clip, i) => (
          <motion.div
            key={clip.video}
            initial={false}
            animate={{ opacity: i === idx ? 1 : 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={clip.poster}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover photo-warm"
            />
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
              poster={clip.poster}
            >
              <source src={clip.video} type="video/mp4" />
            </video>
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.55)_0%,rgba(11,11,12,0.25)_45%,rgba(11,11,12,0.85)_100%)]" />
      </div>

      {/* Tiny caption + index dots */}
      {showCaption && (
        <div className="absolute bottom-28 md:bottom-32 right-6 md:right-12 flex items-center gap-5 z-10 text-ivory">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.en}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-right"
            >
              <p className="text-[10px] uppercase tracking-[0.42em] text-gold-soft">
                {locale === "it" ? "In tavola" : "Now showing"}
              </p>
              <p className="mt-1 font-display italic text-2xl md:text-3xl">
                {locale === "it" ? current.it : current.en}
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="flex flex-col gap-2">
            {HERO_CLIPS.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "block h-px transition-all duration-700",
                  i === idx
                    ? "bg-gold-soft w-8"
                    : "bg-ivory/35 w-4",
                )}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
