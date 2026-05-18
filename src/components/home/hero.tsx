import Image from "next/image";
import Link from "next/link";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/4109248/4109248-uhd_2560_1440_24fps.mp4";
const HERO_POSTER =
  "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=2400&q=90";

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[760px] max-h-[1100px] w-full overflow-hidden bg-ink text-ivory">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <Image
          src={HERO_POSTER}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover photo-warm"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_POSTER}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.55)_0%,rgba(11,11,12,0.25)_45%,rgba(11,11,12,0.85)_100%)]" />
      </div>

      {/* Edition / issue marks */}
      <div className="hero-entry-1 absolute top-24 md:top-28 left-6 md:left-12 text-[10px] uppercase tracking-[0.42em] text-ivory/60">
        Edizione · No. I
      </div>
      <div className="hero-entry-1 absolute top-24 md:top-28 right-6 md:right-12 text-[10px] uppercase tracking-[0.42em] text-ivory/60 text-right">
        Stagione · MMXXVI
      </div>

      {/* Main composition — bottom-aligned, magazine-style */}
      <div className="relative h-full flex flex-col justify-end">
        <div className="px-6 md:px-12 pb-20 md:pb-28 max-w-[1600px] mx-auto w-full">
          <p className="hero-entry-2 text-[11px] md:text-[12px] uppercase tracking-[0.42em] text-gold-soft mb-8">
            Mai — An Italian Table
          </p>

          <h1 className="font-display font-light leading-[0.88] tracking-[-0.025em] text-[clamp(3.5rem,11vw,11rem)] max-w-[15ch]">
            <span className="hero-entry-3 block">Italy,</span>
            <span className="hero-entry-4 block italic text-gold-soft">
              one table at a time.
            </span>
          </h1>

          <div className="hero-entry-5 mt-12 md:mt-14 grid md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-5 text-ivory/75 leading-relaxed text-lg max-w-md">
              Intimate evenings of wine, chocolate, and food sourced from
              small Italian producers — paired with a curated basket of ten
              goods to take home.
            </p>

            <div className="md:col-span-7 flex items-center justify-start md:justify-end gap-6 md:gap-10 text-[12px] uppercase tracking-[0.24em]">
              <Link
                href="/events"
                className="group inline-flex items-center gap-3 text-ivory hover:text-gold-soft transition-colors"
              >
                <span>Riserva un posto</span>
                <span className="block h-px w-10 bg-current transition-all duration-700 group-hover:w-20" />
              </Link>
              <Link
                href="/chef"
                className="group inline-flex items-center gap-3 text-ivory/60 hover:text-ivory transition-colors"
              >
                <span>La chef</span>
                <span className="block h-px w-6 bg-current transition-all duration-700 group-hover:w-16" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-entry-6 absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-ivory/60">
        <span className="text-[10px] uppercase tracking-[0.32em]">Scorri</span>
        <span className="block h-10 w-px bg-current animate-pulse" />
      </div>
    </section>
  );
}
