import Image from "next/image";
import { BlurIn, FadeIn } from "@/components/animations";
import { getDictionary } from "@/lib/i18n";

const PORTRAIT =
  "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=1800&q=90";
const VIDEO =
  "https://videos.pexels.com/video-files/4040635/4040635-uhd_2560_1440_25fps.mp4";

export async function Benvenuti() {
  const t = await getDictionary();
  const headlineLines = t.philosophy.headline.split("\n");
  return (
    <>
      <section className="py-40 md:py-56 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <BlurIn>
            <p className="text-[10px] uppercase tracking-[0.42em] text-muted mb-12">
              {t.philosophy.section}
            </p>
          </BlurIn>
          <BlurIn delay={0.15}>
            <h2 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.6rem,6.5vw,6rem)] max-w-[16ch]">
              {headlineLines[0]}
              <br />
              {headlineLines[1]}
              <br />
              <em className="italic text-wine">{headlineLines[2]}</em>
            </h2>
          </BlurIn>
        </div>
      </section>

      <section className="relative">
        <FadeIn>
          <div className="relative aspect-[16/9] md:aspect-[21/8] overflow-hidden grain bg-ink">
            <Image
              src={PORTRAIT}
              alt=""
              fill
              sizes="100vw"
              className="object-cover photo-warm kenburns"
            />
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-80"
              autoPlay
              muted
              loop
              playsInline
              poster={PORTRAIT}
            >
              <source src={VIDEO} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
          </div>
        </FadeIn>

        <div className="px-6 md:px-12 max-w-6xl mx-auto py-20 md:py-28 grid md:grid-cols-12 gap-12">
          <FadeIn className="md:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.42em] text-muted">
              {t.philosophy.fromWhereWeComeLabel}
            </p>
            <p className="mt-4 font-display italic text-2xl md:text-3xl leading-tight text-wine">
              {t.philosophy.fromWhereWeCome}
            </p>
          </FadeIn>
          <div className="md:col-span-7 md:col-start-6 space-y-7 text-ink/85 text-[17px] md:text-[19px] leading-[1.75]">
            <FadeIn>
              <p>{t.philosophy.p1}</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p>{t.philosophy.p2}</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p>{t.philosophy.p3}</p>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
