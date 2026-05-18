import Image from "next/image";
import Link from "next/link";
import { BlurIn, FadeIn, Stagger, StaggerItem } from "@/components/animations";
import { getChefProfile } from "@/lib/data";
import { getDictionary, getLocale, pickLocalized } from "@/lib/i18n";

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

  const [t, locale] = await Promise.all([getDictionary(), getLocale()]);
  const portrait = chef.photo_url ?? FALLBACK_PORTRAIT;
  const heroImage = chef.hero_image_url ?? FALLBACK_HERO;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cAny = chef as any;
  const bio = pickLocalized(chef.bio, cAny.bio_it, locale);
  const title = pickLocalized(chef.title, cAny.title_it, locale);
  const signature = pickLocalized(
    chef.signature_dish,
    cAny.signature_dish_it,
    locale,
  );

  const [firstName, ...restName] = chef.name.split(" ");

  return (
    <>
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
          {t.chef.titlePrefix}
        </div>
        <div className="hero-entry-1 absolute top-24 md:top-28 right-6 md:right-12 text-[10px] uppercase tracking-[0.42em] text-ivory/60 text-right">
          Mai · MMXXVI
        </div>

        <div className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-20 md:pb-28 max-w-[1600px] mx-auto w-full">
          <p className="hero-entry-2 text-[11px] uppercase tracking-[0.42em] text-gold-soft mb-8">
            {t.chef.heroEyebrow}
          </p>
          <h1 className="font-display font-light leading-[0.88] tracking-[-0.025em] text-[clamp(3rem,9vw,9rem)]">
            <span className="hero-entry-3 block">{firstName}</span>
            <span className="hero-entry-4 block italic text-gold-soft">
              {restName.join(" ")}
            </span>
          </h1>
          {title && (
            <p className="hero-entry-5 mt-8 text-ivory/70 text-[12px] uppercase tracking-[0.32em]">
              {title}
            </p>
          )}
        </div>
      </section>

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
                {t.chef.origin} · {chef.origin}
              </p>
            )}
          </FadeIn>

          <div className="lg:col-span-7 lg:pt-6">
            <BlurIn>
              <p className="text-[10px] uppercase tracking-[0.42em] text-muted mb-8">
                {t.chef.portraitSection}
              </p>
              <h2 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.4rem,5vw,4.5rem)] max-w-[15ch]">
                {t.chef.portraitHeadlineA}{" "}
                <em className="italic text-wine">
                  {t.chef.portraitHeadlineB}
                </em>
              </h2>
            </BlurIn>

            {bio && (
              <FadeIn delay={0.15} className="mt-12">
                <p className="dropcap text-[18px] leading-[1.8] text-ink/85 whitespace-pre-line">
                  {bio}
                </p>
              </FadeIn>
            )}

            {chef.philosophy && (
              <FadeIn delay={0.25} className="mt-12 border-l-2 border-wine pl-8">
                <p className="font-display italic text-3xl md:text-4xl text-wine leading-snug">
                  &ldquo;{chef.philosophy}&rdquo;
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.32em] text-muted">
                  {t.chef.quoteAttribution}
                </p>
              </FadeIn>
            )}

            {signature && (
              <FadeIn delay={0.3} className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-muted">
                    {t.chef.signature}
                  </p>
                  <p className="mt-2 font-display text-2xl">{signature}</p>
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

      {chef.certifications.length > 0 && (
        <section className="bg-paper py-32 md:py-48 px-6 md:px-12 grain">
          <div className="max-w-7xl mx-auto">
            <BlurIn className="max-w-3xl mb-20">
              <p className="text-[10px] uppercase tracking-[0.42em] text-muted mb-8">
                {t.chef.credentialsSection}
              </p>
              <h2 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.4rem,5vw,4.5rem)]">
                {t.chef.credentialsHeadlineA}{" "}
                <em className="italic text-wine">
                  {t.chef.credentialsHeadlineB}
                </em>
              </h2>
            </BlurIn>

            <Stagger
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
              step={0.1}
            >
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

      <section className="py-32 md:py-48 px-6 md:px-12 text-center">
        <BlurIn>
          <p className="text-[10px] uppercase tracking-[0.42em] text-muted mb-10">
            {t.chef.closerSection}
          </p>
          <h2 className="font-display font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.4rem,6vw,5.5rem)] max-w-3xl mx-auto">
            {t.chef.closerHeadlineA}{" "}
            <em className="italic text-wine">{t.chef.closerHeadlineB}</em>
          </h2>
        </BlurIn>
        <FadeIn delay={0.2} className="mt-12">
          <Link
            href="/events"
            className="group inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.24em] text-ink hover:text-wine transition-colors"
          >
            <span>{t.chef.closerCta}</span>
            <span className="block h-px w-10 bg-current transition-all duration-700 group-hover:w-24" />
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
