import Image from "next/image";
import Link from "next/link";
import { BlurIn, FadeIn, Stagger, StaggerItem } from "@/components/animations";

const BASKET_PHOTO =
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=2000&q=90";

const TEN = [
  { it: "Vino", en: "Estate-bottled wines" },
  { it: "Cioccolato", en: "Single-origin Piedmont chocolate" },
  { it: "Formaggio", en: "Aged regional cheeses" },
  { it: "Olio", en: "Cold-pressed olive oil" },
  { it: "Nocciole", en: "Hand-toasted hazelnuts" },
  { it: "Miele", en: "Monoflora honey" },
  { it: "Amaretti", en: "Crisp almond cookies" },
  { it: "Saba", en: "Cooked grape must" },
  { it: "Digestivo", en: "Small-batch liqueurs" },
  { it: "Sorpresa", en: "And one quiet surprise" },
];

export function TheBasket() {
  return (
    <section className="bg-ink text-ivory py-32 md:py-48 px-6 md:px-12 grain">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-16">
          <FadeIn className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden grain grain-strong">
              <Image
                src={BASKET_PHOTO}
                alt="A still life of Italian goods"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover photo-warm kenburns"
              />
            </div>
          </FadeIn>

          <div className="lg:col-span-6 lg:pl-6">
            <BlurIn>
              <p className="text-[10px] uppercase tracking-[0.42em] text-gold-soft mb-10">
                §04 · Il cesto
              </p>
              <h2 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.4rem,5.5vw,5rem)] max-w-[14ch]">
                Ten goods from the table —
                <em className="italic text-gold-soft"> yours to take home.</em>
              </h2>
            </BlurIn>

            <FadeIn delay={0.2}>
              <p className="mt-8 text-ivory/75 leading-relaxed text-lg max-w-lg">
                Every event has its own basket. The same ten items every guest
                tasted that evening, packed for you to share at home.
              </p>
            </FadeIn>

            <Stagger className="mt-14 grid grid-cols-2 gap-x-10" step={0.05}>
              {TEN.map((t, i) => (
                <StaggerItem
                  key={t.it}
                  className="border-b border-ivory/12 py-4 flex items-baseline gap-5"
                >
                  <span className="font-display italic text-gold-soft tabular-nums text-base w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 flex items-baseline justify-between gap-3">
                    <p className="font-display text-xl tracking-tight">
                      {t.it}
                    </p>
                    <p className="text-[11px] text-ivory/45 text-right leading-tight">
                      {t.en}
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
                <span>Esplora i cesti</span>
                <span className="block h-px w-10 bg-current transition-all duration-700 group-hover:w-20" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
