import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatEventDate, formatPrice } from "@/lib/utils";

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [
    { count: eventCount },
    { count: basketCount },
    { count: paidOrders },
    { data: recentOrders },
    { data: upcomingEvents },
  ] = await Promise.all([
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("baskets").select("*", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "paid"),
    supabase
      .from("orders")
      .select("id, kind, total_cents, customer_email, created_at, status")
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("events")
      .select("id, slug, title, starts_at, tickets_sold, capacity, status")
      .gte("starts_at", new Date().toISOString())
      .order("starts_at", { ascending: true })
      .limit(5),
  ]);

  const revenue = (recentOrders ?? [])
    .filter((o) => o.status === "paid" || o.status === "fulfilled")
    .reduce((sum, o) => sum + o.total_cents, 0);

  const stats = [
    { label: "Events", value: eventCount ?? 0 },
    { label: "Baskets", value: basketCount ?? 0 },
    { label: "Paid orders", value: paidOrders ?? 0 },
    { label: "Recent revenue", value: formatPrice(revenue) },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl">Overview</h1>
        <p className="text-muted mt-1">Where Mai stands today.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="border border-line bg-ivory p-6"
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
              {s.label}
            </p>
            <p className="mt-3 font-display text-4xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="border border-line bg-ivory">
          <div className="flex items-center justify-between p-5 border-b border-line">
            <h2 className="font-display text-2xl">Upcoming events</h2>
            <Link
              href="/admin/events"
              className="text-[11px] uppercase tracking-[0.22em] text-wine"
            >
              Manage →
            </Link>
          </div>
          {(upcomingEvents ?? []).length === 0 ? (
            <p className="p-6 text-muted text-sm">
              Nothing scheduled.{" "}
              <Link
                href="/admin/events/new"
                className="text-wine underline"
              >
                Create one
              </Link>
              .
            </p>
          ) : (
            <ul>
              {(upcomingEvents ?? []).map((e) => (
                <li
                  key={e.id}
                  className="px-5 py-4 border-b border-line-soft last:border-0 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{e.title}</p>
                    <p className="text-xs text-muted">
                      {formatEventDate(e.starts_at)}
                    </p>
                  </div>
                  <div className="text-right text-xs text-muted">
                    {e.tickets_sold}
                    {e.capacity != null && ` / ${e.capacity}`} seats
                    <div className="mt-1 text-[10px] uppercase tracking-[0.2em]">
                      {e.status}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border border-line bg-ivory">
          <div className="flex items-center justify-between p-5 border-b border-line">
            <h2 className="font-display text-2xl">Recent orders</h2>
            <Link
              href="/admin/orders"
              className="text-[11px] uppercase tracking-[0.22em] text-wine"
            >
              All orders →
            </Link>
          </div>
          {(recentOrders ?? []).length === 0 ? (
            <p className="p-6 text-muted text-sm">No orders yet.</p>
          ) : (
            <ul>
              {(recentOrders ?? []).map((o) => (
                <li
                  key={o.id}
                  className="px-5 py-4 border-b border-line-soft last:border-0 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-sm">
                      {o.customer_email}
                    </p>
                    <p className="text-xs text-muted">
                      {o.kind === "event_ticket" ? "Seat" : "Basket"} ·{" "}
                      {formatEventDate(o.created_at)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatPrice(o.total_cents)}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
                      {o.status}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
