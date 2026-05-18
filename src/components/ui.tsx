import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto max-w-7xl px-6 lg:px-10", className)}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[11px] uppercase tracking-[0.32em] text-gold",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "space-y-5",
        align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl",
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-4xl sm:text-5xl leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p className="text-muted text-lg leading-relaxed">{description}</p>
      )}
    </div>
  );
}

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "wine";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
};

const buttonStyles = ({
  variant = "primary",
  size = "md",
}: {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
}) =>
  cn(
    "inline-flex items-center justify-center font-medium uppercase tracking-[0.18em] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
    size === "sm" && "text-[11px] px-4 py-2",
    size === "md" && "text-[12px] px-6 py-3",
    size === "lg" && "text-[13px] px-8 py-4",
    variant === "primary" && "bg-ink text-ivory hover:bg-wine",
    variant === "wine" && "bg-wine text-ivory hover:bg-wine-deep",
    variant === "secondary" &&
      "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
    variant === "ghost" && "text-ink hover:text-wine",
  );

export function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: ButtonProps & ComponentProps<"button">) {
  return (
    <button
      {...rest}
      className={cn(buttonStyles({ variant, size }), className)}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  children,
  href,
  ...rest
}: ButtonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      {...rest}
      href={href}
      className={cn(buttonStyles({ variant, size }), className)}
    >
      {children}
    </Link>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "bg-cream border border-line-soft overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Hairline({ className }: { className?: string }) {
  return <div className={cn("hairline my-12", className)} />;
}

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "wine" | "gold" | "muted";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[10px] uppercase tracking-[0.2em]",
        tone === "neutral" && "bg-ink text-ivory",
        tone === "wine" && "bg-wine text-ivory",
        tone === "gold" && "bg-gold-soft text-ink",
        tone === "muted" && "bg-ivory-2 text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Input({
  className,
  ...rest
}: ComponentProps<"input">) {
  return (
    <input
      {...rest}
      className={cn(
        "w-full bg-cream border border-line px-4 py-3 text-ink placeholder:text-muted/70 focus:outline-none focus:border-wine transition-colors",
        className,
      )}
    />
  );
}

export function Textarea({
  className,
  ...rest
}: ComponentProps<"textarea">) {
  return (
    <textarea
      {...rest}
      className={cn(
        "w-full bg-cream border border-line px-4 py-3 text-ink placeholder:text-muted/70 focus:outline-none focus:border-wine transition-colors min-h-[120px]",
        className,
      )}
    />
  );
}

export function Label({
  className,
  children,
  ...rest
}: ComponentProps<"label">) {
  return (
    <label
      {...rest}
      className={cn(
        "block text-[11px] uppercase tracking-[0.22em] text-ink-soft mb-2",
        className,
      )}
    >
      {children}
    </label>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}
