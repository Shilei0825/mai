import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "no signature" }, { status: 400 });
  }
  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("stripe webhook signature failed", err);
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;
    if (!orderId) {
      return NextResponse.json({ received: true });
    }

    const admin = createAdminClient();
    const { data: order } = await admin
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .maybeSingle();
    if (!order) {
      return NextResponse.json({ received: true });
    }

    // Idempotency: only act on first transition to paid.
    if (order.status === "paid" || order.status === "fulfilled") {
      return NextResponse.json({ received: true });
    }

    const shippingAddress = session.collected_information?.shipping_details
      ?.address
      ? {
          name:
            session.collected_information.shipping_details.name ??
            order.customer_name ??
            "",
          line1:
            session.collected_information.shipping_details.address.line1 ?? "",
          line2:
            session.collected_information.shipping_details.address.line2 ??
            undefined,
          city: session.collected_information.shipping_details.address.city ?? "",
          state:
            session.collected_information.shipping_details.address.state ?? "",
          postal_code:
            session.collected_information.shipping_details.address
              .postal_code ?? "",
          country:
            session.collected_information.shipping_details.address.country ??
            "",
        }
      : null;

    await admin
      .from("orders")
      .update({
        status: "paid",
        stripe_payment_intent:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : (session.payment_intent?.id ?? null),
        shipping_address: shippingAddress,
      })
      .eq("id", orderId);

    if (order.kind === "event_ticket" && order.event_id) {
      const { data: e } = await admin
        .from("events")
        .select("tickets_sold, capacity")
        .eq("id", order.event_id)
        .maybeSingle();
      if (e) {
        const newSold = (e.tickets_sold ?? 0) + order.quantity;
        await admin
          .from("events")
          .update({
            tickets_sold: newSold,
            status:
              e.capacity != null && newSold >= e.capacity
                ? "sold_out"
                : undefined,
          })
          .eq("id", order.event_id);
      }
    } else if (order.kind === "basket" && order.basket_id) {
      const { data: b } = await admin
        .from("baskets")
        .select("units_sold")
        .eq("id", order.basket_id)
        .maybeSingle();
      if (b) {
        await admin
          .from("baskets")
          .update({ units_sold: (b.units_sold ?? 0) + order.quantity })
          .eq("id", order.basket_id);
      }
    }
  }

  return NextResponse.json({ received: true });
}
