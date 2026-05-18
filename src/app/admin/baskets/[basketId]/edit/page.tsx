import Link from "next/link";
import { notFound } from "next/navigation";
import { BasketForm } from "@/components/admin/basket-form";
import { Field, Input, Button } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import type { Basket, BasketItem } from "@/lib/types";
import {
  addBasketItem,
  deleteBasketItem,
  updateBasket,
} from "../../actions";

type Props = { params: Promise<{ basketId: string }> };

export default async function EditBasketPage({ params }: Props) {
  const { basketId } = await params;
  const supabase = await createClient();

  const [{ data: basket }, { data: items }, { data: event }] =
    await Promise.all([
      supabase.from("baskets").select("*").eq("id", basketId).maybeSingle(),
      supabase
        .from("basket_items")
        .select("*")
        .eq("basket_id", basketId)
        .order("position", { ascending: true }),
      supabase
        .from("baskets")
        .select("event_id, events(title, starts_at)")
        .eq("id", basketId)
        .maybeSingle(),
    ]);
  if (!basket) notFound();

  const updateAction = updateBasket.bind(null, basketId);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const linkedEvent = (event as any)?.events as
    | { title: string; starts_at: string }
    | null;

  return (
    <div className="space-y-10">
      <div>
        <Link
          href="/admin/baskets"
          className="text-[11px] uppercase tracking-[0.22em] text-muted hover:text-wine"
        >
          ← Baskets
        </Link>
        <h1 className="font-display text-4xl mt-3">Edit basket</h1>
        {linkedEvent && (
          <p className="text-muted mt-1">
            For <strong>{linkedEvent.title}</strong> ·{" "}
            {new Date(linkedEvent.starts_at).toLocaleDateString()}
          </p>
        )}
      </div>

      <BasketForm
        basket={basket as Basket}
        action={updateAction}
        submitLabel="Save changes"
      />

      <div className="pt-6 border-t border-line space-y-6">
        <div>
          <h2 className="font-display text-3xl">What&apos;s inside</h2>
          <p className="text-muted mt-1">
            Add the products in this basket — usually nine or ten items.
          </p>
        </div>

        <ul className="space-y-2 max-w-3xl">
          {(items ?? []).map((it: BasketItem, i: number) => (
            <li
              key={it.id}
              className="flex items-start justify-between gap-4 border border-line bg-ivory p-4"
            >
              <div className="flex gap-4">
                <span className="font-display text-gold tabular-nums w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-medium">{it.name}</p>
                  {it.description && (
                    <p className="text-sm text-muted leading-snug">
                      {it.description}
                    </p>
                  )}
                </div>
              </div>
              <form action={deleteBasketItem}>
                <input type="hidden" name="id" value={it.id} />
                <input type="hidden" name="basket_id" value={basketId} />
                <button
                  type="submit"
                  className="text-[11px] uppercase tracking-[0.18em] text-muted hover:text-wine"
                >
                  Remove
                </button>
              </form>
            </li>
          ))}
        </ul>

        <form
          action={addBasketItem}
          className="max-w-3xl border border-line bg-cream p-6 space-y-4"
        >
          <input type="hidden" name="basket_id" value={basketId} />
          <h3 className="font-display text-xl">Add an item</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name">
              <Input name="name" required placeholder="Barolo DOCG, 2019" />
            </Field>
            <Field label="Short description (optional)">
              <Input
                name="description"
                placeholder="Single-vineyard Nebbiolo from La Morra."
              />
            </Field>
          </div>
          <Button type="submit" variant="primary">
            Add item
          </Button>
        </form>
      </div>
    </div>
  );
}
