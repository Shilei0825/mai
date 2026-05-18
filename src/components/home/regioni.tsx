import Image from "next/image";
import { BlurIn, Stagger, StaggerItem } from "@/components/animations";
import { getDictionary, getLocale } from "@/lib/i18n";

const REGIONS = [
  {
    name: "Piemonte",
    en: "Piedmont",
    taglineEn: "Barolo. Barbaresco. Gianduja.",
    taglineIt: "Barolo. Barbaresco. Gianduja.",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1600&q=90",
  },
  {
    name: "Toscana",
    en: "Tuscany",
    taglineEn: "Olive oil. Pecorino. Chianti.",
    taglineIt: "Olio. Pecorino. Chianti.",
    image:
      "https://vgbuycqryudvdhgroajv.supabase.co/storage/v1/object/public/images/toscana-cypress.jpg",
  },
  {
    name: "Sicilia",
    en: "Sicily",
    taglineEn: "Marsala. Pistachio. Cannoli.",
    taglineIt: "Marsala. Pistacchio. Cannoli.",
    image:
      "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=1600&q=90",
  },
  {
    name: "Veneto",
    en: "Veneto",
    taglineEn: "Prosecco. Risotto. Tiramisù.",
    taglineIt: "Prosecco. Risotto. Tiramisù.",
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1600&q=90",
  },
];

export async function Regioni() {
  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);
  const italianMottoLines = t.regions.italianMotto.split("\n");
  return (
    <section className="bg-paper py-32 md:py-48 px-6 md:px-12 grain">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 mb-20 md:mb-32 items-end">
          <BlurIn className="md:col-span-7">
            <p className="text-[10px] uppercase tracking-[0.42em] text-muted mb-10">
              {t.regions.section}
            </p>
            <h2 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.4rem,5.5vw,5rem)]">
              {t.regions.headlineA}
              <br />
              <em className="italic text-wine">{t.regions.headlineB}</em>
            </h2>
          </BlurIn>
          <BlurIn delay={0.15} className="md:col-span-4 md:col-start-9">
            <p className="font-display italic text-xl text-muted leading-relaxed whitespace-pre-line">
              {italianMottoLines.join("\n")}
            </p>
          </BlurIn>
        </div>

        <Stagger
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16"
          step={0.12}
        >
          {REGIONS.map((r, i) => (
            <StaggerItem key={r.name}>
              <article className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-ink mb-6 grain">
                  <Image
                    src={r.image}
                    alt={r.en}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 photo-warm"
                  />
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="font-display text-3xl md:text-4xl tracking-tight">
                    {r.name}
                  </p>
                  <span className="text-[10px] uppercase tracking-[0.32em] text-muted tabular-nums">
                    {String(i + 1).padStart(2, "0")} / 04
                  </span>
                </div>
                <p className="mt-2 text-[15px] text-ink/65 leading-snug">
                  {locale === "it" ? r.taglineIt : r.taglineEn}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
