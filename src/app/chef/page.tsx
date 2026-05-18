import Image from "next/image";
import Link from "next/link";
import { BlurIn, FadeIn, Stagger, StaggerItem } from "@/components/animations";
import { getChefProfile } from "@/lib/data";

export const metadata = { title: "La Chef · Maimouna Niang" };

const FALLBACK_PORTRAIT =
  "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=2000&q=90";
const FALLBACK_HERO =
  "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=2400&q=90";

export default async function ChefPage() {
  const chef = await getChefProfile();
  if (!chef) {
    return (
      <section className="py-40 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <p className="text-muted">The chef&apos;s profile is being prepared.</p>
      </section>
    );
  }

  const portrait = chef.photo_url ?? FALLBACK_PORTRAIT;
  const heroImage = chef.hero_image_url ?? FALLBACK_HERO;

  return (
    <>
      {/* Cinematic editorial cover */}
      <section className="relative h-[100svh] min-h-[700px] max-h-[1100px] w-full overflow-hidden bg-ink text-ivory">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover photo-warm kenburns"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.4)_0%,rgba(11,11,12,0.2)_40%,rgba(11,11,12,0.85)_100%)]" />
        </div>

        <div className="hero-entry-1 absolute top-24 md:top-28 left-6 md:left-12 text-[10px] uppercase tracking-[0.42em] text-ivory/60">
          La chef · Portrait
        </div>
        <div className="hero-entry-1 absolute top-24 md:top-28 right-6 md:right-12 text-[10px] uppercase tracking-[0.42em] text-ivory/60 text-right">
          Mai · MMXXVI
        </div>

        <div className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-20 md:pb-28 max-w-[1600px] mx-auto w-full">
          <p className="hero-entry-2 text-[11px] uppercase tracking-[0.42em] text-gold-soft mb-8">
            Meet the founder
          </p>
          <h1 className="font-display font-light leading-[0.88] tracking-[-0.025em] text-[clamp(3rem,9vw,9rem)]">
            <span className="hero-entry-3 block">{chef.name.split(" ")[0]}</span>
            <span className="hero-entry-4 block italic text-gold-soft">
              {chef.name.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          {chef.title && (
            <p className="hero-entry-5 mt-8 text-ivory/70 text-[12px] uppercase tracking-[0.32em]">
              {chef.title}
            </p>
          )}
        </div>
      </section>

      {/* Editorial split — portrait + bio */}
      <section className="py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <FadeIn className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-ivory-2 grain">
              <Image
                src={portrait}
                alt={chef.name}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover photo-warm"
              />
            </div>
            {chef.origin && (
              <p className="mt-5 text-[10px] uppercase tracking-[0.42em] text-muted">
                Origine · {chef.origin}
              </p>
            )}
          </FadeIn>

          <div className="lg:col-span-7 lg:pt-6">
            <BlurIn>
              <p className="text-[10px] uppercase tracking-[0.42em] text-muted mb-8">
                §01 · Il ritratto
              </p>
              <h2 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.4rem,5vw,4.5rem)] max-w-[15ch]">
                A kitchen built around{" "}
                <em className="italic text-wine">a long table.</em>
              </h2>
            </BlurIn>

            {chef.bio && (
              <FadeIn delay={0.15} className="mt-12">
                <p className="dropcap text-[18px] leading-[1.8] text-ink/85 whitespace-pre-line">
                  {chef.bio}
                </p>
              </FadeIn>
            )}

            {chef.philosophy && (
              <FadeIn delay={0.25} className="mt-12 border-l-2 border-wine pl-8">
                <p className="font-display italic text-3xl md:text-4xl text-wine leading-snug">
                  “{chef.philosophy}”
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.32em] text-muted">
                  — Maimouna
                </p>
              </FadeIn>
            )}

            {chef.signature_dish && (
              <FadeIn delay={0.3} className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-muted">
                    Piatto firma · Signature
                  </p>
                  <p className="mt-2 font-display text-2xl">
                    {chef.signature_dish}
                  </p>
                </div>
                {chef.instagram_handle && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.32em] text-muted">
                      Instagram
                    </p>
                    <a
                      href={`https://instagram.com/${chef.instagram_handle.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 font-display text-2xl text-wine hover:underline"
                    >
                      {chef.instagram_handle}
                    </a>
                  </div>
                )}
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      {/* Certifications */}
      {chef.certifications.length > 0 && (
        <section className="bg-paper py-32 md:py-48 px-6 md:px-12 grain">
          <div className="max-w-7xl mx-auto">
            <BlurIn className="max-w-3xl mb-20">
              <p className="text-[10px] uppercase tracking-[0.42em] text-muted mb-8">
                §02 · Formazione · Credentials
              </p>
              <h2 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.4rem,5vw,4.5rem)]">
                The training behind <em className="italic text-wine">the table.</em>
              </h2>
            </BlurIn>

            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12" step={0.1}>
              {chef.certifications.map((c, i) => (
                <StaggerItem key={c.id}>
                  <article className="group">
                    {c.image_url ? (
                      <div className="relative aspect-[4/5] overflow-hidden bg-ivory-2 grain mb-5">
                        <Image
                          src={c.image_url}
                          alt={c.name}
                          fill
                          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 photo-warm"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/5] flex items-center justify-center bg-ink/5 border border-line mb-5">
                        <span className="font-display italic text-7xl text-gold-soft tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    )}
                    <p className="text-[10px] uppercase tracking-[0.32em] text-muted">
                      {c.issuer ?? "Certification"}
                      {c.year && ` · ${c.year}`}
                    </p>
                    <p className="mt-2 font-display text-2xl leading-tight">
                      {c.name}
                    </p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Closer CTA */}
      <section className="py-32 md:py-48 px-6 md:px-12 text-center">
        <BlurIn>
          <p className="text-[10px] uppercase tracking-[0.42em] text-muted mb-10">
            §03 · A tavola
          </p>
          <h2 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.4rem,6vw,5.5rem)] max-w-3xl mx-auto">
            Come sit at Maimouna&apos;s <em className="italic text-wine">long table.</em>
          </h2>
        </BlurIn>
        <FadeIn delay={0.2} className="mt-12">
          <Link
            href="/events"
            className="group inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.24em] text-ink hover:text-wine transition-colors"
          >
            <span>Vedi i prossimi eventi</span>
            <span className="block h-px w-10 bg-current transition-all duration-700 group-hover:w-24" />
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
