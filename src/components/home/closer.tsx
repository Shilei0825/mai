import Image from "next/image";
import Link from "next/link";
import { BlurIn } from "@/components/animations";

const CLOSER_PHOTO =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2400&q=90";

export function Closer() {
  return (
    <section className="relative min-h-[720px] flex items-center overflow-hidden grain">
      <div className="absolute inset-0 -z-10">
        <Image
          src={CLOSER_PHOTO}
          alt="An Italian table set for dinner"
          fill
          sizes="100vw"
          className="object-cover photo-warm kenburns"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.35)_0%,rgba(11,11,12,0.6)_100%)]" />
      </div>
      <div className="relative w-full px-6 md:px-12 py-32 md:py-48 max-w-7xl mx-auto text-ivory">
        <BlurIn>
          <p className="text-[10px] uppercase tracking-[0.42em] text-gold-soft mb-12">
            §06 · A tavola
          </p>
        </BlurIn>
        <BlurIn delay={0.15}>
          <h2 className="font-display font-light leading-[0.9] tracking-[-0.02em] text-[clamp(3rem,9vw,9rem)] max-w-[14ch]">
            <em className="italic">Mangia.</em>
            <br />
            <em className="italic">Bevi.</em>
            <br />
            <em className="italic text-gold-soft">Sii felice.</em>
          </h2>
        </BlurIn>
        <BlurIn delay={0.3}>
          <p className="mt-12 text-ivory/65 max-w-md leading-relaxed text-lg">
            Eat, drink, be happy. There are only sixteen seats at every Mai
            evening — reserve before the next is gone.
          </p>
        </BlurIn>
        <BlurIn delay={0.45}>
          <Link
            href="/events"
            className="group mt-12 inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.24em] text-ivory hover:text-gold-soft transition-colors"
          >
            <span>Riserva un posto</span>
            <span className="block h-px w-10 bg-current transition-all duration-700 group-hover:w-24" />
          </Link>
        </BlurIn>
      </div>
    </section>
  );
}
