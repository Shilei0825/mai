import Link from "next/link";
import { ButtonLink } from "@/components/ui";
import { getAllEvents } from "@/lib/data";
import { formatEventDate, formatPrice } from "@/lib/utils";
import { deleteEvent } from "./actions";

export default async function AdminEventsPage() {
  const events = await getAllEvents();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl">Events</h1>
          <p className="text-muted mt-1">
            Adjust pricing, capacity, and visibility.
          </p>
        </div>
        <ButtonLink href="/admin/events/new" variant="wine">
          New event
        </ButtonLink>
      </div>

      <div className="border border-line bg-ivory">
        {events.length === 0 ? (
          <p className="p-6 text-muted">
            No events yet.{" "}
            <Link href="/admin/events/new" className="text-wine underline">
              Create the first
            </Link>
            .
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="py-3 px-5 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                  When
                </th>
                <th className="py-3 px-5 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                  Title
                </th>
                <th className="py-3 px-5 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                  Price
                </th>
                <th className="py-3 px-5 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                  Seats
                </th>
                <th className="py-3 px-5 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                  Status
                </th>
                <th className="py-3 px-5"></th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id} className="border-b border-line-soft last:border-0">
                  <td className="py-4 px-5 align-top">
                    {formatEventDate(e.starts_at)}
                  </td>
                  <td className="py-4 px-5 align-top font-medium">
                    {e.title}
                  </td>
                  <td className="py-4 px-5 align-top">
                    {formatPrice(e.ticket_price_cents)}
                  </td>
                  <td className="py-4 px-5 align-top">
                    {e.tickets_sold}
                    {e.capacity != null && ` / ${e.capacity}`}
                  </td>
                  <td className="py-4 px-5 align-top">
                    <span className="text-[10px] uppercase tracking-[0.2em] px-2 py-1 bg-ivory-2">
                      {e.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 align-top text-right whitespace-nowrap">
                    <Link
                      href={`/admin/events/${e.id}/edit`}
                      className="text-wine text-[11px] uppercase tracking-[0.18em] mr-4"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/admin/baskets?event=${e.id}`}
                      className="text-ink-soft text-[11px] uppercase tracking-[0.18em] mr-4"
                    >
                      Basket
                    </Link>
                    <form
                      action={deleteEvent}
                      className="inline"
                    >
                      <input type="hidden" name="id" value={e.id} />
                      <button
                        type="submit"
                        className="text-muted hover:text-wine text-[11px] uppercase tracking-[0.18em]"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
