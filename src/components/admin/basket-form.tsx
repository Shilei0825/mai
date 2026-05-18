import Link from "next/link";
import { Button, Field, Input, Textarea } from "@/components/ui";
import type { Basket, Event } from "@/lib/types";

export function BasketForm({
  basket,
  eventsForPicker,
  action,
  submitLabel,
}: {
  basket?: Basket;
  eventsForPicker?: Pick<Event, "id" | "title" | "starts_at">[];
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-6 max-w-3xl">
      {eventsForPicker && (
        <Field label="Event">
          <select
            name="event_id"
            required
            defaultValue={basket?.event_id ?? ""}
            className="w-full bg-cream border border-line px-4 py-3 text-ink focus:outline-none focus:border-wine"
          >
            <option value="">Pick an event…</option>
            {eventsForPicker.map((e) => (
              <option key={e.id} value={e.id}>
                {e.title} — {new Date(e.starts_at).toLocaleDateString()}
              </option>
            ))}
          </select>
        </Field>
      )}

      <Field label="Basket name">
        <Input
          name="name"
          required
          defaultValue={basket?.name ?? ""}
          placeholder="The Piedmont Basket"
        />
      </Field>

      <Field label="Description">
        <Textarea
          name="description"
          rows={4}
          defaultValue={basket?.description ?? ""}
        />
      </Field>

      <Field label="Image URL">
        <Input
          name="image_url"
          defaultValue={basket?.image_url ?? ""}
          placeholder="https://…"
        />
      </Field>

      <div className="grid sm:grid-cols-3 gap-6">
        <Field label="Price (USD)">
          <Input
            type="number"
            step="0.01"
            min="0"
            name="price"
            required
            defaultValue={
              basket ? (basket.price_cents / 100).toFixed(2) : "185.00"
            }
          />
        </Field>
        <Field label="Shipping (USD)">
          <Input
            type="number"
            step="0.01"
            min="0"
            name="shipping"
            defaultValue={
              basket ? (basket.shipping_cents / 100).toFixed(2) : "18.00"
            }
          />
        </Field>
        <Field label="Stock (optional)">
          <Input
            type="number"
            min="0"
            name="stock"
            defaultValue={basket?.stock ?? ""}
            placeholder="24"
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            name="fulfillment_pickup"
            defaultChecked={basket?.fulfillment_pickup ?? true}
            className="size-4 accent-wine"
          />
          Allow pickup at event
        </label>
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            name="fulfillment_shipping"
            defaultChecked={basket?.fulfillment_shipping ?? true}
            className="size-4 accent-wine"
          />
          Allow shipping
        </label>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <Button type="submit" variant="wine" size="lg">
          {submitLabel}
        </Button>
        <Link
          href="/admin/baskets"
          className="text-[11px] uppercase tracking-[0.22em] text-muted hover:text-wine"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
