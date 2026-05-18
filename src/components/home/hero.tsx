import Link from "next/link";
import { getDictionary, getLocale } from "@/lib/i18n";
import { HeroReel } from "@/components/home/hero-reel";

export async function Hero() {
  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);
  return (
    <section className="relative h-[100svh] min-h-[760px] max-h-[1100px] w-full overflow-hidden bg-ink text-ivory">
      <HeroReel locale={locale} />

      <div className="hero-entry-1 absolute top-24 md:top-28 left-6 md:left-12 text-[10px] uppercase tracking-[0.42em] text-ivory/60 z-10">
        {t.hero.editionLeft}
      </div>
      <div className="hero-entry-1 absolute top-24 md:top-28 right-6 md:right-12 text-[10px] uppercase tracking-[0.42em] text-ivory/60 text-right z-10">
        {t.hero.editionRight}
      </div>

      <div className="relative h-full flex flex-col justify-end z-10">
        <div className="px-6 md:px-12 pb-20 md:pb-28 max-w-[1600px] mx-auto w-full">
          <p className="hero-entry-2 text-[11px] md:text-[12px] uppercase tracking-[0.42em] text-gold-soft mb-8">
            {t.hero.eyebrow}
          </p>

          <h1 className="font-display font-light leading-[0.88] tracking-[-0.025em] text-[clamp(3.5rem,11vw,11rem)] max-w-[15ch]">
            <span className="hero-entry-3 block">{t.hero.headlineA}</span>
            <span className="hero-entry-4 block italic text-gold-soft">
              {t.hero.headlineB}
            </span>
          </h1>

          <div className="hero-entry-5 mt-12 md:mt-14 grid md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-6 text-ivory/80 leading-relaxed text-lg max-w-md">
              {t.hero.description}
            </p>

            <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-3">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-3 bg-wine hover:bg-wine-deep text-ivory px-7 py-4 text-[12px] uppercase tracking-[0.24em] transition-colors shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
              >
                <span>{t.hero.ctaReserve}</span>
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/baskets"
                className="inline-flex items-center justify-center gap-3 border border-ivory/70 text-ivory hover:bg-ivory hover:text-ink px-7 py-4 text-[12px] uppercase tracking-[0.24em] transition-colors"
              >
                <span>{locale === "it" ? "Esplora i prodotti" : "Shop products"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-entry-6 absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-ivory/60 z-10">
        <span className="text-[10px] uppercase tracking-[0.32em]">
          {t.hero.scrollCue}
        </span>
        <span className="block h-10 w-px bg-current animate-pulse" />
      </div>
    </section>
  );
}
