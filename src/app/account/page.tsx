import { redirect } from "next/navigation";
import Link from "next/link";
import { Container, Eyebrow, Hairline } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth";
import { getMyOrders } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { formatEventDate, formatPrice } from "@/lib/utils";

export const metadata = { title: "Your account" };

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/account");

  const orders = await getMyOrders(user.id);
  const supabase = await createClient();

  // Hydrate event/basket titles for display.
  const eventIds = [...new Set(orders.map((o) => o.event_id).filter(Boolean))];
  const basketIds = [...new Set(orders.map((o) => o.basket_id).filter(Boolean))];
  const [{ data: events }, { data: baskets }] = await Promise.all([
    eventIds.length
      ? supabase.from("events").select("id, title, slug, starts_at").in("id", eventIds as string[])
      : Promise.resolve({ data: [] as Array<{ id: string; title: string; slug: string; starts_at: string }> }),
    basketIds.length
      ? supabase.from("baskets").select("id, name").in("id", basketIds as string[])
      : Promise.resolve({ data: [] as Array<{ id: string; name: string }> }),
  ]);
  const eventById = new Map(
    (events ?? []).map((e) => [e.id, e]),
  );
  const basketById = new Map(
    (baskets ?? []).map((b) => [b.id, b]),
  );

  return (
    <>
      <section className="pt-20 pb-12">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <Eyebrow>Your account</Eyebrow>
              <h1 className="mt-4 font-display text-5xl">
                Buon ritorno{user.fullName ? `, ${user.fullName.split(" ")[0]}` : ""}.
              </h1>
              <p className="text-muted mt-2">{user.email}</p>
            </div>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="text-[11px] uppercase tracking-[0.22em] text-muted hover:text-wine"
              >
                Sign out
              </button>
            </form>
          </div>
        </Container>
      </section>

      <Hairline />

      <section className="py-16">
        <Container>
          <h2 className="font-display text-3xl mb-8">Your orders</h2>
          {orders.length === 0 ? (
            <div className="border border-line bg-cream py-16 text-center">
              <p className="text-muted">
                No orders yet —{" "}
                <Link href="/events" className="text-wine underline">
                  see what&apos;s coming up
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th className="py-3 pr-4 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                      Date
                    </th>
                    <th className="py-3 pr-4 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                      Item
                    </th>
                    <th className="py-3 pr-4 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                      Qty
                    </th>
                    <th className="py-3 pr-4 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                      Status
                    </th>
                    <th className="py-3 text-right text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => {
                    const event = o.event_id ? eventById.get(o.event_id) : null;
                    const basket = o.basket_id
                      ? basketById.get(o.basket_id)
                      : null;
                    const label =
                      o.kind === "event_ticket"
                        ? event
                          ? `Seat · ${event.title}`
                          : "Event seat"
                        : basket
                          ? `Basket · ${basket.name}`
                          : "Basket";
                    return (
                      <tr key={o.id} className="border-b border-line-soft">
                        <td className="py-4 pr-4 align-top">
                          {formatEventDate(o.created_at)}
                        </td>
                        <td className="py-4 pr-4 align-top">
                          <div>{label}</div>
                          {o.kind === "basket" && o.fulfillment_method && (
                            <div className="text-xs text-muted capitalize mt-0.5">
                              {o.fulfillment_method === "pickup"
                                ? "Pickup at event"
                                : "Shipping"}
                            </div>
                          )}
                        </td>
                        <td className="py-4 pr-4 align-top">{o.quantity}</td>
                        <td className="py-4 pr-4 align-top">
                          <span className="text-[10px] uppercase tracking-[0.2em] px-2 py-1 bg-ivory-2">
                            {o.status}
                          </span>
                        </td>
                        <td className="py-4 align-top text-right">
                          {formatPrice(o.total_cents)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
