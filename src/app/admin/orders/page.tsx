import { StatusSelect } from "@/components/admin/status-select";
import { getAllOrders } from "@/lib/data";
import { formatEventDate, formatPrice } from "@/lib/utils";
import { setOrderStatus } from "./actions";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl">Orders</h1>
        <p className="text-muted mt-1">
          Newest first. Update status as you fulfill each order.
        </p>
      </div>

      <div className="border border-line bg-ivory overflow-x-auto">
        {orders.length === 0 ? (
          <p className="p-6 text-muted">No orders yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="py-3 px-5 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                  When
                </th>
                <th className="py-3 px-5 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                  Customer
                </th>
                <th className="py-3 px-5 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                  Item
                </th>
                <th className="py-3 px-5 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                  Qty
                </th>
                <th className="py-3 px-5 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                  Total
                </th>
                <th className="py-3 px-5 text-[11px] uppercase tracking-[0.18em] text-muted font-normal">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const label =
                  o.kind === "event_ticket"
                    ? o.event
                      ? `Seat · ${o.event.title}`
                      : "Event seat"
                    : o.basket
                      ? `Basket · ${o.basket.name}`
                      : "Basket";
                return (
                  <tr key={o.id} className="border-b border-line-soft last:border-0">
                    <td className="py-4 px-5 align-top whitespace-nowrap">
                      {formatEventDate(o.created_at)}
                    </td>
                    <td className="py-4 px-5 align-top">
                      <div>{o.customer_email}</div>
                      {o.customer_name && (
                        <div className="text-xs text-muted">
                          {o.customer_name}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-5 align-top">
                      <div>{label}</div>
                      {o.kind === "basket" && o.fulfillment_method && (
                        <div className="text-xs text-muted capitalize">
                          {o.fulfillment_method === "pickup"
                            ? "Pickup at event"
                            : "Shipping"}
                        </div>
                      )}
                      {o.shipping_address && (
                        <div className="text-xs text-muted mt-1">
                          {o.shipping_address.line1},{" "}
                          {o.shipping_address.city} {o.shipping_address.state}{" "}
                          {o.shipping_address.postal_code}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-5 align-top">{o.quantity}</td>
                    <td className="py-4 px-5 align-top">
                      {formatPrice(o.total_cents)}
                    </td>
                    <td className="py-4 px-5 align-top">
                      <StatusSelect
                        orderId={o.id}
                        current={o.status}
                        action={setOrderStatus}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
