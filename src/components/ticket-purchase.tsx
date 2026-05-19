"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, Input, Label } from "@/components/ui";
import type { Event } from "@/lib/types";

export function TicketPurchase({
  event,
  signedIn,
  hasBundledBasket = false,
}: {
  event: Event;
  signedIn: boolean;
  hasBundledBasket?: boolean;
}) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [basketFulfillment, setBasketFulfillment] = useState<
    "pickup" | "shipping"
  >("pickup");
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const seatsLeft =
    event.capacity != null ? event.capacity - event.tickets_sold : null;
  const soldOut = event.status === "sold_out" || seatsLeft === 0;
  const max = seatsLeft != null ? Math.max(1, seatsLeft) : 8;

  function handleBuy() {
    setError(null);
    if (!signedIn) {
      router.push(`/login?next=/events/${event.slug}`);
      return;
    }
    start(async () => {
      const res = await fetch("/api/checkout/event", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          quantity: qty,
          basketFulfillment: hasBundledBasket ? basketFulfillment : undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) {
        setError(json.error ?? "Could not start checkout.");
        return;
      }
      window.location.href = json.url;
    });
  }

  if (soldOut) {
    return (
      <div className="text-sm text-muted">
        This evening is fully booked. Reserve a seat at the next event.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Field label="Number of seats">
        <Input
          type="number"
          min={1}
          max={max}
          value={qty}
          onChange={(e) =>
            setQty(Math.min(max, Math.max(1, Number(e.target.value) || 1)))
          }
        />
      </Field>

      {hasBundledBasket && (
        <div>
          <Label>Your basket — included free</Label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setBasketFulfillment("pickup")}
              className={`text-[11px] uppercase tracking-[0.18em] py-3 border transition-colors ${
                basketFulfillment === "pickup"
                  ? "bg-ink text-ivory border-ink"
                  : "bg-cream text-ink border-line"
              }`}
            >
              Pickup at event
            </button>
            <button
              type="button"
              onClick={() => setBasketFulfillment("shipping")}
              className={`text-[11px] uppercase tracking-[0.18em] py-3 border transition-colors ${
                basketFulfillment === "shipping"
                  ? "bg-ink text-ivory border-ink"
                  : "bg-cream text-ink border-line"
              }`}
            >
              Ship to me
            </button>
          </div>
          <p className="mt-1.5 text-xs text-muted">
            One basket per seat. Shipping address collected at checkout.
          </p>
        </div>
      )}

      {error && <p className="text-sm text-wine">{error}</p>}
      <Button
        onClick={handleBuy}
        disabled={pending}
        className="w-full"
        variant="wine"
        size="lg"
      >
        {pending
          ? "Opening checkout…"
          : signedIn
            ? "Reserve & pay"
            : "Sign in to reserve"}
      </Button>
    </div>
  );
}
