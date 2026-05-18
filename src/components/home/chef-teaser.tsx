import Image from "next/image";
import Link from "next/link";
import { BlurIn, FadeIn } from "@/components/animations";
import type { ChefProfile } from "@/lib/types";

const FALLBACK_PORTRAIT =
  "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1600&q=90";

export function ChefTeaser({ chef }: { chef: ChefProfile | null }) {
  if (!chef) return null;
  const photo = chef.photo_url ?? FALLBACK_PORTRAIT;

  return (
    <section className="py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <FadeIn className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-ivory-2 grain">
              <Image
                src={photo}
                alt={chef.name}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover photo-warm"
              />
            </div>
          </FadeIn>

          <div className="lg:col-span-6 lg:col-start-7">
            <BlurIn>
              <p className="text-[10px] uppercase tracking-[0.42em] text-muted mb-10">
                §05 · La chef
              </p>
              <h2 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.4rem,5.5vw,5rem)]">
                Conosci la chef.
              </h2>
              <p className="mt-4 font-display italic text-2xl md:text-3xl text-wine leading-tight">
                Meet the chef.
              </p>
            </BlurIn>

            <FadeIn delay={0.2}>
              <p className="mt-10 font-display text-3xl md:text-4xl leading-tight tracking-tight">
                {chef.name}
              </p>
              {chef.title && (
                <p className="mt-1 text-[10px] uppercase tracking-[0.32em] text-muted">
                  {chef.title}
                </p>
              )}
              {chef.bio && (
                <p className="mt-8 text-ink/75 leading-relaxed text-[17px] max-w-md">
                  {chef.bio.split("\n")[0]}
                </p>
              )}
              {chef.philosophy && (
                <p className="mt-8 font-display italic text-xl md:text-2xl text-wine leading-snug max-w-md">
                  “{chef.philosophy}”
                </p>
              )}
            </FadeIn>

            <FadeIn delay={0.35} className="mt-12">
              <Link
                href="/chef"
                className="group inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.24em] text-ink hover:text-wine transition-colors"
              >
                <span>Il suo ritratto · Her story</span>
                <span className="block h-px w-10 bg-current transition-all duration-700 group-hover:w-20" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
