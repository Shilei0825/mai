import Image from "next/image";
import Link from "next/link";
import { BlurIn } from "@/components/animations";
import { getDictionary } from "@/lib/i18n";

const CLOSER_PHOTO =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2400&q=90";
const CLOSER_VIDEO =
  "https://videos.pexels.com/video-files/3173315/3173315-uhd_2560_1440_25fps.mp4";

export async function Closer() {
  const t = await getDictionary();
  return (
    <section className="relative min-h-[720px] flex items-center overflow-hidden grain">
      <div className="absolute inset-0 -z-10">
        <Image
          src={CLOSER_PHOTO}
          alt=""
          fill
          sizes="100vw"
          className="object-cover photo-warm kenburns"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-75"
          autoPlay
          muted
          loop
          playsInline
          poster={CLOSER_PHOTO}
        >
          <source src={CLOSER_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.45)_0%,rgba(11,11,12,0.7)_100%)]" />
      </div>
      <div className="relative w-full px-6 md:px-12 py-32 md:py-48 max-w-7xl mx-auto text-ivory">
        <BlurIn>
          <p className="text-[10px] uppercase tracking-[0.42em] text-gold-soft mb-12">
            {t.closer.section}
          </p>
        </BlurIn>
        <BlurIn delay={0.15}>
          <h2 className="font-display font-light leading-[0.9] tracking-[-0.02em] text-[clamp(3rem,9vw,9rem)] max-w-[14ch]">
            <em className="italic">{t.closer.line1}</em>
            <br />
            <em className="italic">{t.closer.line2}</em>
            <br />
            <em className="italic text-gold-soft">{t.closer.line3}</em>
          </h2>
        </BlurIn>
        <BlurIn delay={0.3}>
          <p className="mt-12 text-ivory/65 max-w-md leading-relaxed text-lg">
            {t.closer.description}
          </p>
        </BlurIn>
        <BlurIn delay={0.45}>
          <Link
            href="/events"
            className="group mt-12 inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.24em] text-ivory hover:text-gold-soft transition-colors"
          >
            <span>{t.closer.cta}</span>
            <span className="block h-px w-10 bg-current transition-all duration-700 group-hover:w-24" />
          </Link>
        </BlurIn>
      </div>
    </section>
  );
}
