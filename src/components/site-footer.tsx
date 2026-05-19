import Image from "next/image";
import Link from "next/link";

// Build marker — bumped any time we ship hero/content changes so you can
// confirm which version your browser is rendering vs. what's deployed.
const BUILD_TAG = "build-2026-05-18-pasta-board";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-ink text-ivory">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-5">
          <div className="flex items-center gap-3">
            <Image
              src="/mai-logo.png"
              alt="Mai"
              width={72}
              height={76}
              className="opacity-95"
            />
            <span className="font-display text-4xl tracking-wide">Mai</span>
          </div>
          <p className="text-ivory/70 max-w-md leading-relaxed">
            Intimate Italian tastings — wine, chocolate, and food — paired with
            a curated basket of authentic goods to take home.
          </p>
        </div>

        <div>
          <h4 className="text-[12px] uppercase tracking-[0.22em] text-gold-soft mb-4">
            Visit
          </h4>
          <ul className="space-y-2 text-ivory/80 text-sm">
            <li>
              <Link href="/events" className="hover:text-ivory">
                Upcoming events
              </Link>
            </li>
            <li>
              <Link href="/baskets" className="hover:text-ivory">
                Baskets
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-ivory">
                Our story
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-ivory">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[12px] uppercase tracking-[0.22em] text-gold-soft mb-4">
            Account
          </h4>
          <ul className="space-y-2 text-ivory/80 text-sm">
            <li>
              <Link href="/login" className="hover:text-ivory">
                Sign in
              </Link>
            </li>
            <li>
              <Link href="/signup" className="hover:text-ivory">
                Create account
              </Link>
            </li>
            <li>
              <Link href="/account" className="hover:text-ivory">
                My orders
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ivory/50">
          <p>
            © {year} Mai. All rights reserved.{" "}
            <span className="ml-2 text-ivory/30 font-mono">
              {BUILD_TAG}
            </span>
          </p>
          <p className="italic font-display text-base text-gold-soft">
            Dal cuore d&apos;Italia, alla tua tavola.
          </p>
        </div>
      </div>
    </footer>
  );
}
