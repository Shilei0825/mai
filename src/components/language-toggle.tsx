"use client";

import { useTransition } from "react";
import { setLocale } from "@/app/actions/locale";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle({ current }: { current: Locale }) {
  const [pending, start] = useTransition();

  function switchTo(next: Locale) {
    if (next === current || pending) return;
    start(async () => {
      await setLocale(next);
    });
  }

  return (
    <div
      className={cn(
        "inline-flex items-center text-[11px] uppercase tracking-[0.22em] select-none",
        pending && "opacity-60",
      )}
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => switchTo("en")}
        className={cn(
          "px-2 py-1 transition-colors",
          current === "en" ? "text-ink" : "text-muted hover:text-ink",
        )}
      >
        EN
      </button>
      <span className="text-line">/</span>
      <button
        type="button"
        onClick={() => switchTo("it")}
        className={cn(
          "px-2 py-1 transition-colors",
          current === "it" ? "text-ink" : "text-muted hover:text-ink",
        )}
      >
        IT
      </button>
    </div>
  );
}
