import Link from "next/link";
import { EventForm } from "@/components/admin/event-form";
import { createEvent } from "../actions";

export default function NewEventPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/events"
          className="text-[11px] uppercase tracking-[0.22em] text-muted hover:text-wine"
        >
          ← Events
        </Link>
        <h1 className="font-display text-4xl mt-3">New event</h1>
      </div>
      <EventForm action={createEvent} submitLabel="Create event" />
    </div>
  );
}
