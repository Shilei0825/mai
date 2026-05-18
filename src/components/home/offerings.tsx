import Image from "next/image";
import Link from "next/link";
import { BlurIn, FadeIn } from "@/components/animations";
import { getDictionary } from "@/lib/i18n";

const RESERVATIONS_IMAGE =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=90";
const PRODUCTS_IMAGE =
  "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=1800&q=90";

export async function Offerings() {
  const t = await getDictionary();
  return (
    <section className="py-28 md:py-40 px-6 md:px-12 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <BlurIn className="max-w-3xl mb-16">
          <p className="text-[10px] uppercase tracking-[0.42em] text-muted mb-8">
            {t.offerings.section}
          </p>
          <h2 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.4rem,5.5vw,5rem)]">
            {t.offerings.headline}
          </h2>
          <p className="mt-6 text-muted leading-relaxed text-lg max-w-xl">
            {t.offerings.intro}
          </p>
        </BlurIn>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {/* Reservations card */}
          <FadeIn>
            <Link
              href="/events"
              className="group block relative overflow-hidden bg-ink text-ivory grain h-full"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src={RESERVATIONS_IMAGE}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover photo-warm transition-transform duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.32em] text-gold-soft">
                    I · {t.offerings.card1.eyebrow}
                  </span>
                  <span className="font-display italic text-gold-soft text-xl">
                    Mai
                  </span>
                </div>
              </div>
              <div className="px-8 pb-10 -mt-2 relative">
                <h3 className="font-display font-light text-[clamp(2rem,3.5vw,3.25rem)] leading-[0.95] tracking-tight">
                  {t.offerings.card1.title}
                </h3>
                <p className="mt-5 text-ivory/70 leading-relaxed max-w-md">
                  {t.offerings.card1.blurb}
                </p>
                <ul className="mt-8 space-y-2 text-sm text-ivory/65 border-t border-ivory/10 pt-6">
                  <li className="flex gap-3">
                    <span className="text-gold-soft">·</span>
                    {t.offerings.card1.bullet1}
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold-soft">·</span>
                    {t.offerings.card1.bullet2}
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold-soft">·</span>
                    {t.offerings.card1.bullet3}
                  </li>
                </ul>
                <div className="mt-10 inline-flex items-center gap-3 bg-wine group-hover:bg-wine-deep text-ivory px-6 py-3.5 text-[12px] uppercase tracking-[0.24em] transition-colors">
                  <span>{t.offerings.card1.cta}</span>
                  <span
                    aria-hidden
                    className="transition-transform duration-500 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>

          {/* Products card */}
          <FadeIn delay={0.12}>
            <Link
              href="/baskets"
              className="group block relative overflow-hidden bg-cream text-ink grain h-full border border-line"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src={PRODUCTS_IMAGE}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover photo-warm transition-transform duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/55 to-transparent" />
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.32em] text-wine">
                    II · {t.offerings.card2.eyebrow}
                  </span>
                  <span className="font-display italic text-wine text-xl">
                    Mai
                  </span>
                </div>
              </div>
              <div className="px-8 pb-10 -mt-2 relative">
                <h3 className="font-display font-light text-[clamp(2rem,3.5vw,3.25rem)] leading-[0.95] tracking-tight">
                  {t.offerings.card2.title}
                </h3>
                <p className="mt-5 text-ink/70 leading-relaxed max-w-md">
                  {t.offerings.card2.blurb}
                </p>
                <ul className="mt-8 space-y-2 text-sm text-ink/65 border-t border-line pt-6">
                  <li className="flex gap-3">
                    <span className="text-wine">·</span>
                    {t.offerings.card2.bullet1}
                  </li>
                  <li className="flex gap-3">
                    <span className="text-wine">·</span>
                    {t.offerings.card2.bullet2}
                  </li>
                  <li className="flex gap-3">
                    <span className="text-wine">·</span>
                    {t.offerings.card2.bullet3}
                  </li>
                </ul>
                <div className="mt-10 inline-flex items-center gap-3 bg-ink group-hover:bg-wine text-ivory px-6 py-3.5 text-[12px] uppercase tracking-[0.24em] transition-colors">
                  <span>{t.offerings.card2.cta}</span>
                  <span
                    aria-hidden
                    className="transition-transform duration-500 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
