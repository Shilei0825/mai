"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

function toCents(input: FormDataEntryValue | null) {
  const n = Number(input ?? 0);
  if (Number.isNaN(n)) return 0;
  return Math.round(n * 100);
}

export async function createBasket(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();

  const eventId = String(formData.get("event_id") ?? "");
  if (!eventId) throw new Error("Pick an event");

  const { data: basket, error } = await admin
    .from("baskets")
    .insert({
      event_id: eventId,
      name: String(formData.get("name") ?? "").trim() || "The Mai Basket",
      description: String(formData.get("description") ?? "") || null,
      image_url: String(formData.get("image_url") ?? "") || null,
      price_cents: toCents(formData.get("price")),
      shipping_cents: toCents(formData.get("shipping")),
      stock: formData.get("stock") ? Number(formData.get("stock")) : null,
      fulfillment_pickup: formData.get("fulfillment_pickup") === "on",
      fulfillment_shipping: formData.get("fulfillment_shipping") === "on",
    })
    .select("id")
    .single();
  if (error || !basket) throw new Error(error?.message ?? "Could not create");

  revalidatePath("/admin/baskets");
  revalidatePath("/baskets");
  redirect(`/admin/baskets/${basket.id}/edit`);
}

export async function updateBasket(id: string, formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();

  const { error } = await admin
    .from("baskets")
    .update({
      name: String(formData.get("name") ?? "").trim(),
      description: String(formData.get("description") ?? "") || null,
      image_url: String(formData.get("image_url") ?? "") || null,
      price_cents: toCents(formData.get("price")),
      shipping_cents: toCents(formData.get("shipping")),
      stock: formData.get("stock") ? Number(formData.get("stock")) : null,
      fulfillment_pickup: formData.get("fulfillment_pickup") === "on",
      fulfillment_shipping: formData.get("fulfillment_shipping") === "on",
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/baskets");
  revalidatePath(`/admin/baskets/${id}/edit`);
  revalidatePath("/baskets");
  revalidatePath(`/baskets/${id}`);
}

export async function deleteBasket(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const admin = createAdminClient();
  const { error } = await admin.from("baskets").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/baskets");
  revalidatePath("/baskets");
}

export async function addBasketItem(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();
  const basketId = String(formData.get("basket_id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!basketId || !name) throw new Error("Missing fields");

  const { count } = await admin
    .from("basket_items")
    .select("*", { count: "exact", head: true })
    .eq("basket_id", basketId);

  const { error } = await admin.from("basket_items").insert({
    basket_id: basketId,
    name,
    description: String(formData.get("description") ?? "") || null,
    position: (count ?? 0) + 1,
  });
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/baskets/${basketId}/edit`);
  revalidatePath(`/baskets/${basketId}`);
}

export async function deleteBasketItem(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();
  const id = String(formData.get("id") ?? "");
  const basketId = String(formData.get("basket_id") ?? "");
  const { error } = await admin.from("basket_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/baskets/${basketId}/edit`);
  revalidatePath(`/baskets/${basketId}`);
}
