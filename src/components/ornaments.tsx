import { cn } from "@/lib/utils";

export function LaurelDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 text-gold",
        className,
      )}
    >
      <span className="h-px w-16 sm:w-24 bg-current opacity-40" />
      <svg
        viewBox="0 0 80 24"
        className="h-5 w-auto"
        fill="none"
        aria-hidden
      >
        <path
          d="M4 12c8 0 14-4 16-9M76 12c-8 0-14-4-16-9M4 12c8 0 14 4 16 9M76 12c-8 0-14 4-16 9"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="40" cy="12" r="2.4" fill="currentColor" />
        <path
          d="M28 12h-6M52 12h6"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
      <span className="h-px w-16 sm:w-24 bg-current opacity-40" />
    </div>
  );
}

export function WaxSeal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={cn("text-wine", className)}
      fill="none"
      aria-hidden
    >
      <circle
        cx="40"
        cy="40"
        r="34"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      <circle
        cx="40"
        cy="40"
        r="28"
        stroke="currentColor"
        strokeWidth="1"
      />
      <text
        x="40"
        y="36"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize="14"
        fontStyle="italic"
        fill="currentColor"
      >
        Mai
      </text>
      <text
        x="40"
        y="50"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="6"
        letterSpacing="2"
        fill="currentColor"
      >
        ITALIA
      </text>
      <path
        d="M28 56l4 4M52 56l-4 4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Flourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 14"
      className={cn("text-gold", className)}
      fill="none"
      aria-hidden
    >
      <path
        d="M2 7c10-6 22-6 30 0s22 6 30 0 22-6 30 0 22 6 26 0"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <circle cx="60" cy="7" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function CornerOrnament({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={cn(
        "text-gold",
        flip && "rotate-90",
        className,
      )}
      fill="none"
      aria-hidden
    >
      <path
        d="M2 2h12M2 2v12M2 2c6 0 14 4 18 10 4 5 6 11 6 18"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
