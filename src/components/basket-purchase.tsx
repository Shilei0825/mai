"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, Input, Label } from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import type { Basket } from "@/lib/types";

export function BasketPurchase({
  basket,
  signedIn,
  compact = false,
}: {
  basket: Basket;
  signedIn: boolean;
  compact?: boolean;
}) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const canPickup = basket.fulfillment_pickup;
  const canShip = basket.fulfillment_shipping;
  const [method, setMethod] = useState<"pickup" | "shipping">(
    canPickup ? "pickup" : "shipping",
  );

  const soldOut =
    basket.stock != null && basket.units_sold >= basket.stock;
  const maxStock =
    basket.stock != null
      ? Math.max(1, basket.stock - basket.units_sold)
      : 12;

  const shippingCost = method === "shipping" ? basket.shipping_cents : 0;
  const total = qty * basket.price_cents + shippingCost;

  function handleBuy() {
    setError(null);
    if (!signedIn) {
      router.push(`/login?next=${window.location.pathname}`);
      return;
    }
    start(async () => {
      const res = await fetch("/api/checkout/basket", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          basketId: basket.id,
          quantity: qty,
          fulfillmentMethod: method,
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
      <div className="text-sm opacity-80">
        This basket is sold out. The next event introduces a new one.
      </div>
    );
  }

  const inputClass = compact
    ? ""
    : "bg-ink-soft text-ivory border-ivory/20 focus:border-gold-soft";

  return (
    <div className="space-y-4">
      <Field label="Quantity">
        <Input
          type="number"
          min={1}
          max={maxStock}
          value={qty}
          onChange={(e) =>
            setQty(
              Math.min(maxStock, Math.max(1, Number(e.target.value) || 1)),
            )
          }
          className={inputClass}
        />
      </Field>

      {canPickup && canShip && (
        <div>
          <Label className={compact ? undefined : "text-ivory/70"}>
            How will you receive it?
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMethod("pickup")}
              className={`text-[11px] uppercase tracking-[0.18em] py-3 border transition-colors ${
                method === "pickup"
                  ? compact
                    ? "bg-ink text-ivory border-ink"
                    : "bg-ivory text-ink border-ivory"
                  : compact
                    ? "bg-cream text-ink border-line"
                    : "bg-transparent text-ivory/70 border-ivory/20 hover:border-ivory/50"
              }`}
            >
              Pickup at event
            </button>
            <button
              type="button"
              onClick={() => setMethod("shipping")}
              className={`text-[11px] uppercase tracking-[0.18em] py-3 border transition-colors ${
                method === "shipping"
                  ? compact
                    ? "bg-ink text-ivory border-ink"
                    : "bg-ivory text-ink border-ivory"
                  : compact
                    ? "bg-cream text-ink border-line"
                    : "bg-transparent text-ivory/70 border-ivory/20 hover:border-ivory/50"
              }`}
            >
              Ship to me
            </button>
          </div>
        </div>
      )}

      <div
        className={`text-sm flex items-center justify-between pt-3 border-t ${
          compact ? "border-line" : "border-ivory/15"
        }`}
      >
        <span className={compact ? "text-muted" : "text-ivory/60"}>Total</span>
        <span className="font-display text-2xl">{formatPrice(total)}</span>
      </div>

      {error && <p className="text-sm text-wine">{error}</p>}

      <Button
        onClick={handleBuy}
        disabled={pending}
        className="w-full"
        variant={compact ? "wine" : "primary"}
        size="lg"
      >
        {pending
          ? "Opening checkout…"
          : signedIn
            ? "Buy this basket"
            : "Sign in to buy"}
      </Button>
    </div>
  );
}
