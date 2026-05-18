"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

const CHEF_ID = "00000000-0000-0000-0000-000000000001";

export async function updateChef(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();
  const { error } = await admin
    .from("chef_profile")
    .update({
      name: String(formData.get("name") ?? "").trim() || "Chef",
      title: String(formData.get("title") ?? "") || null,
      bio: String(formData.get("bio") ?? "") || null,
      philosophy: String(formData.get("philosophy") ?? "") || null,
      origin: String(formData.get("origin") ?? "") || null,
      signature_dish: String(formData.get("signature_dish") ?? "") || null,
      photo_url: String(formData.get("photo_url") ?? "") || null,
      hero_image_url: String(formData.get("hero_image_url") ?? "") || null,
      instagram_handle: String(formData.get("instagram_handle") ?? "") || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", CHEF_ID);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/chef");
  revalidatePath("/chef");
  revalidatePath("/");
}

export async function addCertification(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Name required");

  const { count } = await admin
    .from("chef_certifications")
    .select("*", { count: "exact", head: true })
    .eq("chef_id", CHEF_ID);

  const yearStr = String(formData.get("year") ?? "").trim();
  const { error } = await admin.from("chef_certifications").insert({
    chef_id: CHEF_ID,
    name,
    issuer: String(formData.get("issuer") ?? "") || null,
    year: yearStr ? Number(yearStr) : null,
    image_url: String(formData.get("image_url") ?? "") || null,
    position: (count ?? 0) + 1,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/chef");
  revalidatePath("/chef");
}

export async function deleteCertification(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const admin = createAdminClient();
  const { error } = await admin.from("chef_certifications").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/chef");
  revalidatePath("/chef");
}
