import Image from "next/image";
import { BlurIn, FadeIn } from "@/components/animations";

const PORTRAIT =
  "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=1800&q=90";

export function Benvenuti() {
  return (
    <>
      {/* Statement section — pure typography, brutal whitespace */}
      <section className="py-40 md:py-56 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <BlurIn>
            <p className="text-[10px] uppercase tracking-[0.42em] text-muted mb-12">
              §01 · La filosofia
            </p>
          </BlurIn>
          <BlurIn delay={0.15}>
            <h2 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.6rem,6.5vw,6rem)] max-w-[16ch]">
              A small room.
              <br />
              A long table.
              <br />
              <em className="italic text-wine">Italy, honestly.</em>
            </h2>
          </BlurIn>
        </div>
      </section>

      {/* Editorial photo + caption */}
      <section className="relative">
        <FadeIn>
          <div className="relative aspect-[16/9] md:aspect-[21/8] overflow-hidden grain">
            <Image
              src={PORTRAIT}
              alt="A candlelit Italian wine cellar"
              fill
              sizes="100vw"
              className="object-cover photo-warm kenburns"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
          </div>
        </FadeIn>

        <div className="px-6 md:px-12 max-w-6xl mx-auto py-20 md:py-28 grid md:grid-cols-12 gap-12">
          <FadeIn className="md:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.42em] text-muted">
              Da dove veniamo
            </p>
            <p className="mt-4 font-display italic text-2xl md:text-3xl leading-tight text-wine">
              From where we come.
            </p>
          </FadeIn>
          <div className="md:col-span-7 md:col-start-6 space-y-7 text-ink/85 text-[17px] md:text-[19px] leading-[1.75]">
            <FadeIn>
              <p>
                We started Mai because the Italy we grew up with — the long
                Sunday lunches, the small producers, the bottle someone&apos;s{" "}
                <em>nonno</em> buried in the cellar — felt very far from how
                Italian food is sold around us.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p>
                So we built something small. Sixteen guests, no more. Five or
                six pours, a few cheeses, a square of chocolate. We tell you
                where every bottle came from and who made it.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p>
                And before you leave, you take home a basket of the ten goods
                we walked through together — so the evening continues at your
                kitchen counter, with the people who weren&apos;t at the table.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
