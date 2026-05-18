import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { siteUrl } from "@/lib/utils";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const basketId = body?.basketId as string | undefined;
  const quantity = Math.max(1, Math.min(20, Number(body?.quantity) || 1));
  const fulfillmentMethod = body?.fulfillmentMethod as
    | "pickup"
    | "shipping"
    | undefined;
  if (!basketId || !fulfillmentMethod) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { data: basket } = await supabase
    .from("baskets")
    .select("*, events(slug)")
    .eq("id", basketId)
    .maybeSingle();
  if (!basket) {
    return NextResponse.json({ error: "Basket not found" }, { status: 404 });
  }
  if (fulfillmentMethod === "pickup" && !basket.fulfillment_pickup) {
    return NextResponse.json(
      { error: "Pickup is not available for this basket" },
      { status: 400 },
    );
  }
  if (fulfillmentMethod === "shipping" && !basket.fulfillment_shipping) {
    return NextResponse.json(
      { error: "Shipping is not available for this basket" },
      { status: 400 },
    );
  }
  if (basket.stock != null && basket.units_sold + quantity > basket.stock) {
    return NextResponse.json(
      { error: "Not enough baskets in stock" },
      { status: 400 },
    );
  }

  const admin = createAdminClient();
  const subtotal = basket.price_cents * quantity;
  const shipping =
    fulfillmentMethod === "shipping" ? basket.shipping_cents : 0;
  const total = subtotal + shipping;

  const { data: order, error: orderErr } = await admin
    .from("orders")
    .insert({
      user_id: user.id,
      customer_email: user.email,
      customer_name: user.user_metadata?.full_name ?? null,
      event_id: basket.event_id,
      basket_id: basket.id,
      kind: "basket",
      quantity,
      fulfillment_method: fulfillmentMethod,
      subtotal_cents: subtotal,
      shipping_cents: shipping,
      total_cents: total,
      status: "pending",
    })
    .select("id")
    .single();
  if (orderErr || !order) {
    return NextResponse.json(
      { error: "Could not create order" },
      { status: 500 },
    );
  }

  const lineItems: Array<{
    quantity: number;
    price_data: {
      currency: string;
      unit_amount: number;
      product_data: { name: string; description?: string };
    };
  }> = [
    {
      quantity,
      price_data: {
        currency: "usd",
        unit_amount: basket.price_cents,
        product_data: {
          name: basket.name,
          description: basket.description ?? undefined,
        },
      },
    },
  ];

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
    cancel_url: siteUrl(
      `/baskets/${basket.id}?canceled=1`,
    ),
    metadata: {
      order_id: order.id,
      kind: "basket",
      basket_id: basket.id,
      quantity: String(quantity),
      fulfillment_method: fulfillmentMethod,
    },
  });

  await admin
    .from("orders")
    .update({ stripe_session_id: session.id })
    .eq("id", order.id);

  return NextResponse.json({ url: session.url });
}
