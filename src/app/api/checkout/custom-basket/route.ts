import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { siteUrl } from "@/lib/utils";
import {
  BUILDER_ITEMS,
  BUNDLE_PRICE_CENTS,
  computeBundle,
  getBuilderItem,
} from "@/lib/builder-catalog";

const SHIPPING_CENTS = 1500;

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const rawItems = body?.items as Record<string, number> | undefined;
  const fulfillmentMethod = body?.fulfillmentMethod as
    | "pickup"
    | "shipping"
    | undefined;
  if (!rawItems || !fulfillmentMethod) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Sanitize: keep only known ids, clamp qty 1-20.
  const cart: Record<string, number> = {};
  for (const item of BUILDER_ITEMS) {
    const qty = Math.max(0, Math.min(20, Math.floor(rawItems[item.id] ?? 0)));
    if (qty > 0) cart[item.id] = qty;
  }
  const totalItems = Object.values(cart).reduce((s, q) => s + q, 0);
  if (totalItems === 0) {
    return NextResponse.json({ error: "Empty basket" }, { status: 400 });
  }

  const { isBundle, subtotal_cents } = computeBundle(cart);
  const shipping = fulfillmentMethod === "shipping" ? SHIPPING_CENTS : 0;
  const total = subtotal_cents + shipping;

  // Record an order. We don't link to a basket row — custom baskets are
  // standalone. The chosen items are stashed in `notes` as JSON so the
  // admin can read them later.
  const admin = createAdminClient();
  const itemsForRecord = Object.entries(cart).map(([id, qty]) => {
    const item = getBuilderItem(id)!;
    return {
      id,
      name: item.name,
      qty,
      unit_cents: item.price_cents,
    };
  });

  const { data: order, error: orderErr } = await admin
    .from("orders")
    .insert({
      user_id: user.id,
      customer_email: user.email,
      customer_name: user.user_metadata?.full_name ?? null,
      kind: "basket",
      quantity: 1,
      fulfillment_method: fulfillmentMethod,
      subtotal_cents,
      shipping_cents: shipping,
      total_cents: total,
      status: "pending",
      notes: JSON.stringify({
        custom: true,
        bundle: isBundle,
        items: itemsForRecord,
      }),
    })
    .select("id")
    .single();
  if (orderErr || !order) {
    return NextResponse.json(
      { error: "Could not create order" },
      { status: 500 },
    );
  }

  // Build Stripe line items. If the bundle applies, charge one Bundle line
  // item; otherwise, one Stripe line item per cart row.
  const lineItems: Array<{
    quantity: number;
    price_data: {
      currency: string;
      unit_amount: number;
      product_data: { name: string; description?: string };
    };
  }> = isBundle
    ? [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: BUNDLE_PRICE_CENTS,
            product_data: {
              name: "The Mai Basket — Curated Set of Nine",
              description: BUILDER_ITEMS.map((i) => i.name).join(", "),
            },
          },
        },
      ]
    : Object.entries(cart).map(([id, qty]) => {
        const item = getBuilderItem(id)!;
        return {
          quantity: qty,
          price_data: {
            currency: "usd",
            unit_amount: item.price_cents,
            product_data: {
              name: item.name,
              description: item.description,
            },
          },
        };
      });

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    customer_email: user.email ?? undefined,
    payment_method_types: ["card"],
    line_items: lineItems,
    shipping_address_collection:
      fulfillmentMethod === "shipping"
        ? { allowed_countries: ["US"] }
        : undefined,
    shipping_options:
      fulfillmentMethod === "shipping" && shipping > 0
        ? [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: shipping, currency: "usd" },
                display_name: "Standard shipping",
              },
            },
          ]
        : undefined,
    success_url: siteUrl(`/account?paid=${order.id}`),
    cancel_url: siteUrl(`/baskets/build?canceled=1`),
    metadata: {
      order_id: order.id,
      kind: "custom_basket",
      fulfillment_method: fulfillmentMethod,
      bundle: isBundle ? "1" : "0",
    },
  });

  await admin
    .from("orders")
    .update({ stripe_session_id: session.id })
    .eq("id", order.id);

  return NextResponse.json({ url: session.url });
}
