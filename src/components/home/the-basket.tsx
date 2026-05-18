import Image from "next/image";
import Link from "next/link";
import { BlurIn, FadeIn, Stagger, StaggerItem } from "@/components/animations";
import { getDictionary } from "@/lib/i18n";

const BASKET_PHOTO =
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=2000&q=90";
const BASKET_VIDEO =
  "https://videos.pexels.com/video-files/4253334/4253334-uhd_2560_1440_25fps.mp4";

export async function TheBasket() {
  const t = await getDictionary();
  return (
    <section className="bg-ink text-ivory py-32 md:py-48 px-6 md:px-12 grain">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-16">
          <FadeIn className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden grain grain-strong bg-ink-2">
              <Image
                src={BASKET_PHOTO}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover photo-warm kenburns"
              />
              <video
                className="absolute inset-0 h-full w-full object-cover opacity-85"
                autoPlay
                muted
                loop
                playsInline
                poster={BASKET_PHOTO}
              >
                <source src={BASKET_VIDEO} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
            </div>
          </FadeIn>

          <div className="lg:col-span-6 lg:pl-6">
            <BlurIn>
              <p className="text-[10px] uppercase tracking-[0.42em] text-gold-soft mb-10">
                {t.basket.section}
              </p>
              <h2 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.4rem,5.5vw,5rem)] max-w-[14ch]">
                {t.basket.headlineA}{" "}
                <em className="italic text-gold-soft">{t.basket.headlineB}</em>
              </h2>
            </BlurIn>

            <FadeIn delay={0.2}>
              <p className="mt-8 text-ivory/75 leading-relaxed text-lg max-w-lg">
                {t.basket.description}
              </p>
            </FadeIn>

            <Stagger className="mt-14 grid grid-cols-2 gap-x-10" step={0.05}>
              {t.basket.items.map((item, i) => (
                <StaggerItem
                  key={item.label + i}
                  className="border-b border-ivory/12 py-4 flex items-baseline gap-5"
                >
                  <span className="font-display italic text-gold-soft tabular-nums text-base w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 flex items-baseline justify-between gap-3">
                    <p className="font-display text-xl tracking-tight">
                      {item.label}
                    </p>
                    <p className="text-[11px] text-ivory/45 text-right leading-tight">
                      {item.sub}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <FadeIn delay={0.2} className="mt-12">
              <Link
                href="/baskets"
                className="group inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.24em] text-ivory hover:text-gold-soft transition-colors"
              >
                <span>{t.basket.cta}</span>
                <span className="block h-px w-10 bg-current transition-all duration-700 group-hover:w-20" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
