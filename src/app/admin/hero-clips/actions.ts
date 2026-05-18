"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function addHeroClip(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();

  const label_en = String(formData.get("label_en") ?? "").trim();
  const video_url = String(formData.get("video_url") ?? "").trim();
  const poster_url = String(formData.get("poster_url") ?? "").trim();
  if (!label_en || !video_url || !poster_url) {
    throw new Error("Label, video URL, and poster URL are required.");
  }

  const { count } = await admin
    .from("hero_clips")
    .select("*", { count: "exact", head: true });

  const { error } = await admin.from("hero_clips").insert({
    label_en,
    label_it: String(formData.get("label_it") ?? "") || null,
    video_url,
    poster_url,
    position: (count ?? 0) + 1,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/hero-clips");
  revalidatePath("/");
}

export async function updateHeroClip(id: string, formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();

  const { error } = await admin
    .from("hero_clips")
    .update({
      label_en: String(formData.get("label_en") ?? "").trim() || "Untitled",
      label_it: String(formData.get("label_it") ?? "") || null,
      video_url: String(formData.get("video_url") ?? "").trim(),
      poster_url: String(formData.get("poster_url") ?? "").trim(),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/hero-clips");
  revalidatePath("/");
}

export async function deleteHeroClip(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const admin = createAdminClient();
  const { error } = await admin.from("hero_clips").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/hero-clips");
  revalidatePath("/");
}

export async function reorderHeroClip(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  const admin = createAdminClient();

  const { data: clips } = await admin
    .from("hero_clips")
    .select("id, position")
    .order("position", { ascending: true });
  if (!clips) return;
  const idx = clips.findIndex((c) => c.id === id);
  if (idx < 0) return;
  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= clips.length) return;

  const a = clips[idx];
  const b = clips[swapIdx];
  await admin.from("hero_clips").update({ position: b.position }).eq("id", a.id);
  await admin.from("hero_clips").update({ position: a.position }).eq("id", b.id);
  revalidatePath("/admin/hero-clips");
  revalidatePath("/");
}
