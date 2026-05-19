import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getDictionary, getLocale } from "@/lib/i18n";
import { LanguageToggle } from "@/components/language-toggle";

export async function SiteHeader() {
  const [user, locale, t] = await Promise.all([
    getCurrentUser(),
    getLocale(),
    getDictionary(),
  ]);

  return (
    <header className="border-b border-line-soft bg-ivory/85 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink shadow-sm">
            <Image
              src="/mai-logo.png"
              alt="Mai"
              width={40}
              height={42}
              className="opacity-95"
              priority
            />
          </span>
          <span className="font-display text-3xl tracking-wide leading-none">
            Mai
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[12px] uppercase tracking-[0.2em] text-ink-soft">
          <Link href="/events" className="hover:text-wine transition-colors">
            {t.nav.events}
          </Link>
          <Link href="/baskets" className="hover:text-wine transition-colors">
            {t.nav.baskets}
          </Link>
          <Link href="/chef" className="hover:text-wine transition-colors">
            {t.nav.chef}
          </Link>
          <Link href="/about" className="hover:text-wine transition-colors">
            {t.nav.story}
          </Link>
          <Link href="/contact" className="hover:text-wine transition-colors">
            {t.nav.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-5 text-[13px] uppercase tracking-[0.18em]">
          <LanguageToggle current={locale} />
          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="hidden sm:inline text-wine hover:text-wine-deep text-[11px] tracking-[0.22em]"
                >
                  {t.nav.admin}
                </Link>
              )}
              <Link
                href="/account"
                className="hover:text-wine text-[11px] tracking-[0.22em]"
              >
                {t.nav.account}
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-wine text-[11px] tracking-[0.22em]"
              >
                {t.nav.signIn}
              </Link>
              <Link
                href="/signup"
                className="hidden sm:inline-flex items-center px-4 py-2 bg-ink text-ivory hover:bg-wine transition-colors text-[11px] tracking-[0.22em]"
              >
                {t.nav.reserve}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
