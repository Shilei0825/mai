import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="border-b border-line-soft bg-ivory/85 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink shadow-sm">
            <Image
              src="/mai-logo.png"
              alt="Mai"
              width={28}
              height={28}
              className="opacity-95"
              priority
            />
          </span>
          <span className="font-display text-2xl tracking-wide leading-none">
            Mai
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-[13px] uppercase tracking-[0.18em] text-ink-soft">
          <Link href="/events" className="hover:text-wine transition-colors">
            Events
          </Link>
          <Link href="/baskets" className="hover:text-wine transition-colors">
            Baskets
          </Link>
          <Link href="/about" className="hover:text-wine transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-wine transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4 text-[13px] uppercase tracking-[0.18em]">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="hidden sm:inline text-wine hover:text-wine-deep"
                >
                  Admin
                </Link>
              )}
              <Link href="/account" className="hover:text-wine">
                Account
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-wine">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="hidden sm:inline-flex items-center px-4 py-2 bg-ink text-ivory hover:bg-wine transition-colors"
              >
                Reserve
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
