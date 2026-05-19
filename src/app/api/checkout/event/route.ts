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
  const eventId = body?.eventId as string | undefined;
  const quantity = Math.max(1, Math.min(10, Number(body?.quantity) || 1));
  const basketFulfillment = body?.basketFulfillment as
    | "pickup"
    | "shipping"
    | undefined;
  if (!eventId) {
    return NextResponse.json({ error: "Missing event" }, { status: 400 });
  }
  if (
    basketFulfillment &&
    basketFulfillment !== "pickup" &&
    basketFulfillment !== "shipping"
  ) {
    return NextResponse.json(
      { error: "Invalid basket fulfillment" },
      { status: 400 },
    );
  }

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .maybeSingle();
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  if (event.status !== "published") {
    return NextResponse.json(
      { error: "Event is not available" },
      { status: 400 },
    );
  }
  if (
    event.capacity != null &&
    event.tickets_sold + quantity > event.capacity
  ) {
    return NextResponse.json(
      { error: "Not enough seats remaining" },
      { status: 400 },
    );
  }

  // Each ticket bundles one Mai Basket at no extra charge.
  const { data: basket } = await supabase
    .from("baskets")
    .select("id")
    .eq("event_id", event.id)
    .maybeSingle();

  const admin = createAdminClient();
  const subtotal = event.ticket_price_cents * quantity;
  const { data: order, error: orderErr } = await admin
    .from("orders")
    .insert({
      user_id: user.id,
      customer_email: user.email,
      customer_name: user.user_metadata?.full_name ?? null,
      event_id: event.id,
      basket_id: basket?.id ?? null,
      kind: "event_ticket",
      quantity,
      fulfillment_method: basketFulfillment ?? null,
      subtotal_cents: subtotal,
      shipping_cents: 0,
      total_cents: subtotal,
      status: "pending",
      notes: basket
        ? JSON.stringify({
            includes_basket: true,
            basket_fulfillment: basketFulfillment ?? "pickup",
            basket_qty: quantity,
          })
        : null,
    })
    .select("id")
    .single();
  if (orderErr || !order) {
    return NextResponse.json(
      { error: "Could not create order" },
      { status: 500 },
    );
  }

  const ticketDescription = basket
    ? `${event.tagline ? event.tagline + " " : ""}Includes one Mai Basket per seat (${
        basketFulfillment === "shipping" ? "ship to me" : "pickup at event"
      }).`
    : event.tagline ?? undefined;

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    customer_email: user.email ?? undefined,
    payment_method_types: ["card"],
    line_items: [
      {
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: event.ticket_price_cents,
          product_data: {
            name: `Seat · ${event.title}`,
            description: ticketDescription,
          },
        },
      },
    ],
    shipping_address_collection:
      basket && basketFulfillment === "shipping"
        ? { allowed_countries: ["US"] }
        : undefined,
    success_url: siteUrl(`/account?paid=${order.id}`),
    cancel_url: siteUrl(`/events/${event.slug}?canceled=1`),
    metadata: {
      order_id: order.id,
      kind: "event_ticket",
      event_id: event.id,
      quantity: String(quantity),
      basket_fulfillment: basketFulfillment ?? "",
    },
  });

  await admin
    .from("orders")
    .update({ stripe_session_id: session.id })
    .eq("id", order.id);

  return NextResponse.json({ url: session.url });
}
