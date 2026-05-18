import Link from "next/link";
import { ButtonLink } from "@/components/ui";
import { getAllBaskets } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { deleteBasket } from "./actions";

export default async function AdminBasketsPage() {
  const baskets = await getAllBaskets();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl">Baskets</h1>
          <p className="text-muted mt-1">
            One basket per event. Edit pricing, stock, and contents.
          </p>
        </div>
        <ButtonLink href="/admin/baskets/new" variant="wine">
          New basket
        </ButtonLink>
      </div>

      <div className="border border-line bg-ivory">
        {baskets.length === 0 ? (
          <p className="p-6 text-muted">
            No baskets yet.{" "}
            <Link href="/admin/baskets/new" className="text-wine underline">
              Add one
            </Link>
            .
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="py-3 px-5 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                  Basket
                </th>
                <th className="py-3 px-5 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                  Event
                </th>
                <th className="py-3 px-5 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                  Price
                </th>
                <th className="py-3 px-5 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                  Sold
                </th>
                <th className="py-3 px-5 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                  Fulfillment
                </th>
                <th className="py-3 px-5"></th>
              </tr>
            </thead>
            <tbody>
              {baskets.map((b) => (
                <tr key={b.id} className="border-b border-line-soft last:border-0">
                  <td className="py-4 px-5 align-top font-medium">{b.name}</td>
                  <td className="py-4 px-5 align-top">
                    {b.event?.title ?? "—"}
                  </td>
                  <td className="py-4 px-5 align-top">
                    {formatPrice(b.price_cents)}
                  </td>
                  <td className="py-4 px-5 align-top">
                    {b.units_sold}
                    {b.stock != null && ` / ${b.stock}`}
                  </td>
                  <td className="py-4 px-5 align-top text-xs text-muted">
                    {b.fulfillment_pickup && "Pickup"}
                    {b.fulfillment_pickup && b.fulfillment_shipping && " · "}
                    {b.fulfillment_shipping && "Ship"}
                  </td>
                  <td className="py-4 px-5 align-top text-right whitespace-nowrap">
                    <Link
                      href={`/admin/baskets/${b.id}/edit`}
                      className="text-wine text-[11px] uppercase tracking-[0.18em] mr-4"
                    >
                      Edit
                    </Link>
                    <form action={deleteBasket} className="inline">
                      <input type="hidden" name="id" value={b.id} />
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
