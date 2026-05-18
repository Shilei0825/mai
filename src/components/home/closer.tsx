import Image from "next/image";
import Link from "next/link";
import { BlurIn } from "@/components/animations";
import { getDictionary } from "@/lib/i18n";

const CLOSER_PHOTO =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2400&q=90";

export async function Closer() {
  const t = await getDictionary();
  return (
    <section className="relative min-h-[780px] flex items-center overflow-hidden grain">
      <div className="absolute inset-0 -z-10">
        <Image
          src={CLOSER_PHOTO}
          alt="A long Italian dining table set for guests"
          fill
          sizes="100vw"
          className="object-cover photo-warm kenburns"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.25)_0%,rgba(11,11,12,0.45)_45%,rgba(11,11,12,0.7)_100%)]" />
      </div>
      <div className="relative w-full px-6 md:px-12 py-32 md:py-40 max-w-7xl mx-auto text-ivory">
        <BlurIn>
          <p className="text-[10px] uppercase tracking-[0.42em] text-gold-soft mb-10">
            {t.closer.section}
          </p>
        </BlurIn>
        <BlurIn delay={0.15}>
          <h2 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.6rem,6vw,6rem)] max-w-[16ch]">
            {t.closer.line1}
            <br />
            {t.closer.line2}
            <br />
            <em className="italic text-gold-soft">{t.closer.line3}</em>
          </h2>
        </BlurIn>
        <BlurIn delay={0.3}>
          <p className="mt-10 text-ivory/80 max-w-lg leading-relaxed text-lg">
            {t.closer.description}
          </p>
        </BlurIn>
        <BlurIn delay={0.45}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-3 bg-wine hover:bg-wine-deep text-ivory px-7 py-4 text-[12px] uppercase tracking-[0.24em] transition-colors shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            >
              <span>{t.closer.cta}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </BlurIn>
      </div>
    </section>
  );
}
