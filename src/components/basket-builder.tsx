"use client";

import { useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import {
  BUILDER_ITEMS,
  BUNDLE_PRICE_CENTS,
  A_LA_CARTE_TOTAL_CENTS,
  computeBundle,
} from "@/lib/builder-catalog";

type Cart = Record<string, number>;

const SHIPPING_CENTS = 1500;

export function BasketBuilder({ signedIn }: { signedIn: boolean }) {
  const router = useRouter();
  const [cart, setCart] = useState<Cart>({});
  const [method, setMethod] = useState<"pickup" | "shipping">("shipping");
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const { subtotal_cents, isBundle } = useMemo(
    () => computeBundle(cart),
    [cart],
  );
  const totalItems = useMemo(
    () => Object.values(cart).reduce((s, q) => s + q, 0),
    [cart],
  );
  const shipping = method === "shipping" && totalItems > 0 ? SHIPPING_CENTS : 0;
  const total = subtotal_cents + shipping;
  const bundleSavings = A_LA_CARTE_TOTAL_CENTS - BUNDLE_PRICE_CENTS;

  function adjust(id: string, delta: number) {
    setCart((c) => {
      const next = Math.max(0, (c[id] ?? 0) + delta);
      const out = { ...c };
      if (next === 0) delete out[id];
      else out[id] = next;
      return out;
    });
  }

  function setQty(id: string, raw: number) {
    setCart((c) => {
      const next = Math.max(0, Math.min(20, Math.floor(raw) || 0));
      const out = { ...c };
      if (next === 0) delete out[id];
      else out[id] = next;
      return out;
    });
  }

  function applyCuratedSet() {
    const all: Cart = {};
    for (const item of BUILDER_ITEMS) all[item.id] = 1;
    setCart(all);
  }

  function clearCart() {
    setCart({});
  }

  function handleCheckout() {
    setError(null);
    if (totalItems === 0) {
      setError("Add at least one item.");
      return;
    }
    if (!signedIn) {
      router.push(`/login?next=/baskets/build`);
      return;
    }
    start(async () => {
      const res = await fetch("/api/checkout/custom-basket", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          items: cart,
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

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-line">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
            Nine Italian goods · pick any combination
          </p>
          <button
            type="button"
            onClick={applyCuratedSet}
            className="text-[11px] uppercase tracking-[0.22em] text-wine hover:text-wine-deep underline underline-offset-4"
          >
            Add all nine — save {formatPrice(bundleSavings)}
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
          {BUILDER_ITEMS.map((item) => {
            const qty = cart[item.id] ?? 0;
            return (
              <div
                key={item.id}
                className={`flex gap-4 p-3 border ${
                  qty > 0 ? "border-wine bg-cream" : "border-line bg-ivory"
                } transition-colors`}
              >
                <div className="relative w-24 h-24 shrink-0 bg-ivory-2 overflow-hidden">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover photo-warm"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <h3 className="font-display text-base leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2 mt-1 flex-1">
                    {item.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-display text-base">
                      {formatPrice(item.price_cents)}
                    </span>
                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => adjust(item.id, 1)}
                        className="text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 border border-ink hover:bg-ink hover:text-ivory transition-colors"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center border border-ink">
                        <button
                          type="button"
                          onClick={() => adjust(item.id, -1)}
                          className="px-2.5 py-1 text-sm hover:bg-ink hover:text-ivory transition-colors"
                          aria-label="Remove one"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={0}
                          max={20}
                          value={qty}
                          onChange={(e) =>
                            setQty(item.id, Number(e.target.value))
                          }
                          className="w-10 text-center bg-transparent text-sm py-1 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => adjust(item.id, 1)}
                          className="px-2.5 py-1 text-sm hover:bg-ink hover:text-ivory transition-colors"
                          aria-label="Add one"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start space-y-5 border border-line bg-cream p-6">
        <h2 className="font-display text-2xl">Your basket</h2>

        {totalItems === 0 ? (
          <p className="text-sm text-muted">Pick items from the left to build your basket.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {BUILDER_ITEMS.filter((i) => (cart[i.id] ?? 0) > 0).map((i) => (
              <li key={i.id} className="flex justify-between gap-3">
                <span className="text-ink">
                  {i.name}{" "}
                  <span className="text-muted">× {cart[i.id]}</span>
                </span>
                <span className="text-ink shrink-0">
                  {formatPrice(i.price_cents * (cart[i.id] ?? 0))}
                </span>
              </li>
            ))}
          </ul>
        )}

        {totalItems > 0 && (
          <>
            {isBundle && (
              <div className="text-[11px] uppercase tracking-[0.22em] text-wine bg-ivory border border-wine/30 px-3 py-2">
                Curated bundle applied — saving {formatPrice(bundleSavings)}
              </div>
            )}

            <div className="border-t border-line pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span>{formatPrice(subtotal_cents)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">
                  {method === "shipping" ? "Shipping" : "Pickup at event"}
                </span>
                <span>{shipping > 0 ? formatPrice(shipping) : "Free"}</span>
              </div>
              <div className="flex justify-between font-display text-xl pt-2 border-t border-line">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMethod("pickup")}
                className={`text-[11px] uppercase tracking-[0.18em] py-3 border transition-colors ${
                  method === "pickup"
                    ? "bg-ink text-ivory border-ink"
                    : "bg-cream text-ink border-line"
                }`}
              >
                Pickup at event
              </button>
              <button
                type="button"
                onClick={() => setMethod("shipping")}
                className={`text-[11px] uppercase tracking-[0.18em] py-3 border transition-colors ${
                  method === "shipping"
                    ? "bg-ink text-ivory border-ink"
                    : "bg-cream text-ink border-line"
                }`}
              >
                Ship to me
              </button>
            </div>

            {error && <p className="text-sm text-wine">{error}</p>}

            <Button
              onClick={handleCheckout}
              disabled={pending}
              variant="wine"
              size="lg"
              className="w-full"
            >
              {pending
                ? "Opening checkout…"
                : signedIn
                  ? "Checkout"
                  : "Sign in to checkout"}
            </Button>

            <button
              type="button"
              onClick={clearCart}
              className="w-full text-[11px] uppercase tracking-[0.22em] text-muted hover:text-ink transition-colors"
            >
              Clear basket
            </button>
          </>
        )}
      </aside>
    </div>
  );
}
