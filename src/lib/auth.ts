import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type ProfileRole = "customer" | "admin";

export type AuthUser = {
  id: string;
  email: string | null;
  role: ProfileRole;
  fullName: string | null;
};

export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  return {
    id: user.id,
    email: user.email ?? null,
    role: (profile?.role as ProfileRole) ?? "customer",
    fullName: profile?.full_name ?? null,
  };
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return user;
}
