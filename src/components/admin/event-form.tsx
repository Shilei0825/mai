import Link from "next/link";
import { Button, Field, Input, Textarea } from "@/components/ui";
import type { Event } from "@/lib/types";

function toLocalInput(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function EventForm({
  event,
  action,
  submitLabel,
}: {
  event?: Event;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Title">
          <Input
            name="title"
            required
            defaultValue={event?.title ?? ""}
            placeholder="An Evening in Piedmont"
          />
        </Field>
        <Field label="URL slug" hint="Leave blank to auto-generate from title.">
          <Input
            name="slug"
            defaultValue={event?.slug ?? ""}
            placeholder="piedmont-evening"
          />
        </Field>
      </div>

      <Field label="Tagline">
        <Input
          name="tagline"
          defaultValue={event?.tagline ?? ""}
          placeholder="Barolo, Barbaresco, and the hills they come from."
        />
      </Field>

      <Field label="Description">
        <Textarea
          name="description"
          rows={6}
          defaultValue={event?.description ?? ""}
          placeholder="What guests will taste, see, and learn."
        />
      </Field>

      <Field label="Hero image URL">
        <Input
          name="hero_image_url"
          defaultValue={event?.hero_image_url ?? ""}
          placeholder="https://…"
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Starts at">
          <Input
            type="datetime-local"
            name="starts_at"
            required
            defaultValue={toLocalInput(event?.starts_at)}
          />
        </Field>
        <Field label="Ends at (optional)">
          <Input
            type="datetime-local"
            name="ends_at"
            defaultValue={toLocalInput(event?.ends_at)}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Venue">
          <Input
            name="venue"
            defaultValue={event?.venue ?? ""}
            placeholder="Casa Mai · Private Dining Room"
          />
        </Field>
        <Field label="Address">
          <Input
            name="address"
            defaultValue={event?.address ?? ""}
            placeholder="Shared with confirmed guests"
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <Field label="Ticket price (USD)">
          <Input
            type="number"
            step="0.01"
            min="0"
            name="ticket_price"
            required
            defaultValue={
              event ? (event.ticket_price_cents / 100).toFixed(2) : "95.00"
            }
          />
        </Field>
        <Field label="Capacity (seats)">
          <Input
            type="number"
            min="1"
            name="capacity"
            defaultValue={event?.capacity ?? 16}
          />
        </Field>
        <Field label="Status">
          <select
            name="status"
            defaultValue={event?.status ?? "draft"}
            className="w-full bg-cream border border-line px-4 py-3 text-ink focus:outline-none focus:border-wine"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="sold_out">Sold out</option>
            <option value="archived">Archived</option>
          </select>
        </Field>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <Button type="submit" variant="wine" size="lg">
          {submitLabel}
        </Button>
        <Link
          href="/admin/events"
          className="text-[11px] uppercase tracking-[0.22em] text-muted hover:text-wine"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
