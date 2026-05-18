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

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createEvent(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();

  const title = String(formData.get("title") ?? "").trim();
  if (!title) throw new Error("Title required");
  const slug =
    String(formData.get("slug") ?? "").trim() || slugify(title);

  const { error } = await admin.from("events").insert({
    title,
    slug,
    tagline: String(formData.get("tagline") ?? "") || null,
    description: String(formData.get("description") ?? "") || null,
    hero_image_url: String(formData.get("hero_image_url") ?? "") || null,
    starts_at: String(formData.get("starts_at") ?? new Date().toISOString()),
    ends_at: String(formData.get("ends_at") ?? "") || null,
    venue: String(formData.get("venue") ?? "") || null,
    address: String(formData.get("address") ?? "") || null,
    ticket_price_cents: toCents(formData.get("ticket_price")),
    capacity: formData.get("capacity")
      ? Number(formData.get("capacity"))
      : null,
    status: String(formData.get("status") ?? "draft"),
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
  redirect("/admin/events");
}

export async function updateEvent(id: string, formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();

  const { error } = await admin
    .from("events")
    .update({
      title: String(formData.get("title") ?? "").trim(),
      slug: String(formData.get("slug") ?? "").trim(),
      tagline: String(formData.get("tagline") ?? "") || null,
      description: String(formData.get("description") ?? "") || null,
      hero_image_url: String(formData.get("hero_image_url") ?? "") || null,
      starts_at: String(formData.get("starts_at") ?? new Date().toISOString()),
      ends_at: String(formData.get("ends_at") ?? "") || null,
      venue: String(formData.get("venue") ?? "") || null,
      address: String(formData.get("address") ?? "") || null,
      ticket_price_cents: toCents(formData.get("ticket_price")),
      capacity: formData.get("capacity")
        ? Number(formData.get("capacity"))
        : null,
      status: String(formData.get("status") ?? "draft"),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/events");
  revalidatePath(`/admin/events/${id}/edit`);
  revalidatePath("/events");
  revalidatePath("/");
  redirect("/admin/events");
}

export async function deleteEvent(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const admin = createAdminClient();
  const { error } = await admin.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
}
