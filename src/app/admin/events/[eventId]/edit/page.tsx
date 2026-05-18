import Link from "next/link";
import { notFound } from "next/navigation";
import { EventForm } from "@/components/admin/event-form";
import { createClient } from "@/lib/supabase/server";
import type { Event } from "@/lib/types";
import { updateEvent } from "../../actions";

type Props = { params: Promise<{ eventId: string }> };

export default async function EditEventPage({ params }: Props) {
  const { eventId } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .maybeSingle();
  if (!event) notFound();

  const action = updateEvent.bind(null, eventId);

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/events"
          className="text-[11px] uppercase tracking-[0.22em] text-muted hover:text-wine"
        >
          ← Events
        </Link>
        <h1 className="font-display text-4xl mt-3">Edit event</h1>
      </div>
      <EventForm
        event={event as Event}
        action={action}
        submitLabel="Save changes"
      />
    </div>
  );
}
