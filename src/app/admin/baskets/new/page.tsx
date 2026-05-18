import Link from "next/link";
import { BasketForm } from "@/components/admin/basket-form";
import { createClient } from "@/lib/supabase/server";
import { createBasket } from "../actions";

export default async function NewBasketPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("id, title, starts_at")
    .order("starts_at", { ascending: false });
  const { data: existing } = await supabase
    .from("baskets")
    .select("event_id");
  const usedEventIds = new Set((existing ?? []).map((b) => b.event_id));
  const available = (events ?? []).filter((e) => !usedEventIds.has(e.id));

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/baskets"
          className="text-[11px] uppercase tracking-[0.22em] text-muted hover:text-wine"
        >
          ← Baskets
        </Link>
        <h1 className="font-display text-4xl mt-3">New basket</h1>
        <p className="text-muted mt-1">
          One basket per event. Pick an event that doesn&apos;t have one yet.
        </p>
      </div>

      {available.length === 0 ? (
        <div className="border border-line bg-ivory p-6 text-muted">
          Every event already has a basket.{" "}
          <Link href="/admin/events/new" className="text-wine underline">
            Create a new event
          </Link>{" "}
          first.
        </div>
      ) : (
        <BasketForm
          eventsForPicker={available}
          action={createBasket}
          submitLabel="Create basket"
        />
      )}
    </div>
  );
}
