import Image from "next/image";
import { BlurIn, Stagger, StaggerItem } from "@/components/animations";

const REGIONS = [
  {
    name: "Piemonte",
    en: "Piedmont",
    tagline: "Barolo. Barbaresco. Gianduja.",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1600&q=90",
  },
  {
    name: "Toscana",
    en: "Tuscany",
    tagline: "Olio. Pecorino. Chianti.",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=1600&q=90",
  },
  {
    name: "Sicilia",
    en: "Sicily",
    tagline: "Marsala. Pistacchio. Cannoli.",
    image:
      "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=1600&q=90",
  },
  {
    name: "Veneto",
    en: "Veneto",
    tagline: "Prosecco. Risotto. Tiramisù.",
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1600&q=90",
  },
];

export function Regioni() {
  return (
    <section className="bg-paper py-32 md:py-48 px-6 md:px-12 grain">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 mb-20 md:mb-32 items-end">
          <BlurIn className="md:col-span-7">
            <p className="text-[10px] uppercase tracking-[0.42em] text-muted mb-10">
              §02 · Le regioni
            </p>
            <h2 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.4rem,5.5vw,5rem)]">
              Italy is not one flavor.
              <br />
              <em className="italic text-wine">It is a thousand tables.</em>
            </h2>
          </BlurIn>
          <BlurIn delay={0.15} className="md:col-span-4 md:col-start-9">
            <p className="font-display italic text-xl text-muted leading-relaxed">
              L&apos;Italia non è un solo sapore. <br />È mille tavole.
            </p>
          </BlurIn>
        </div>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16" step={0.12}>
          {REGIONS.map((r, i) => (
            <StaggerItem key={r.name}>
              <article className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-ink mb-6 grain">
                  <Image
                    src={r.image}
                    alt={r.name}
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
                  {r.tagline}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
