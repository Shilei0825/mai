import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type {
  Basket,
  BasketItem,
  ChefCertification,
  ChefProfile,
  Event,
  HeroClip,
  Order,
} from "@/lib/types";

export async function getHeroClips(): Promise<HeroClip[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("hero_clips")
    .select("*")
    .order("position", { ascending: true });
  return (data as HeroClip[]) ?? [];
}

export async function getChefProfile(): Promise<
  (ChefProfile & { certifications: ChefCertification[] }) | null
> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data: chef } = await supabase
    .from("chef_profile")
    .select("*")
    .limit(1)
    .maybeSingle();
  if (!chef) return null;
  const { data: certs } = await supabase
    .from("chef_certifications")
    .select("*")
    .eq("chef_id", (chef as ChefProfile).id)
    .order("position", { ascending: true });
  return {
    ...(chef as ChefProfile),
    certifications: (certs as ChefCertification[]) ?? [],
  };
}

export async function getUpcomingEvents(limit = 6): Promise<Event[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .in("status", ["published", "sold_out"])
    .gte("starts_at", new Date().toISOString())
    .order("starts_at", { ascending: true })
    .limit(limit);
  if (error || !data) return [];
  return data as Event[];
}

export async function getAllEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("starts_at", { ascending: false });
  if (error || !data) return [];
  return data as Event[];
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) return null;
  return (data as Event) ?? null;
}

export async function getBasketForEvent(
  eventId: string,
): Promise<(Basket & { items: BasketItem[] }) | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data: basket } = await supabase
    .from("baskets")
    .select("*")
    .eq("event_id", eventId)
    .maybeSingle();
  if (!basket) return null;
  const { data: items } = await supabase
    .from("basket_items")
    .select("*")
    .eq("basket_id", basket.id)
    .order("position", { ascending: true });
  return { ...(basket as Basket), items: (items as BasketItem[]) ?? [] };
}

export async function getBasketById(
  id: string,
): Promise<(Basket & { items: BasketItem[]; event: Event | null }) | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data: basket } = await supabase
    .from("baskets")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!basket) return null;
  const [{ data: items }, { data: event }] = await Promise.all([
    supabase
      .from("basket_items")
      .select("*")
      .eq("basket_id", basket.id)
      .order("position", { ascending: true }),
    supabase
      .from("events")
      .select("*")
      .eq("id", (basket as Basket).event_id)
      .maybeSingle(),
  ]);
  return {
    ...(basket as Basket),
    items: (items as BasketItem[]) ?? [],
    event: (event as Event) ?? null,
  };
}

export async function getAllBaskets(): Promise<
  Array<Basket & { event: Event | null }>
> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("baskets")
    .select("*, events(*)")
    .order("created_at", { ascending: false });
  if (!data) return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((row) => {
    const { events, ...basket } = row;
    return { ...(basket as Basket), event: (events as Event) ?? null };
  });
}

export async function getMyOrders(userId: string): Promise<Order[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return (data as Order[]) ?? [];
}

export async function getAllOrders(): Promise<
  Array<Order & { event: Event | null; basket: Basket | null }>
> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("orders")
    .select("*, events(*), baskets(*)")
    .order("created_at", { ascending: false })
    .limit(200);
  if (!data) return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((row) => {
    const { events, baskets, ...order } = row;
    return {
      ...(order as Order),
      event: (events as Event) ?? null,
      basket: (baskets as Basket) ?? null,
    };
  });
}
