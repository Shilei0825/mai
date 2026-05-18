export type Event = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string | null;
  hero_image_url: string | null;
  starts_at: string;
  ends_at: string | null;
  venue: string | null;
  address: string | null;
  ticket_price_cents: number;
  capacity: number | null;
  tickets_sold: number;
  status: "draft" | "published" | "sold_out" | "archived";
  created_at: string;
};

export type Basket = {
  id: string;
  event_id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  price_cents: number;
  shipping_cents: number;
  stock: number | null;
  units_sold: number;
  fulfillment_pickup: boolean;
  fulfillment_shipping: boolean;
  created_at: string;
};

export type BasketItem = {
  id: string;
  basket_id: string;
  name: string;
  description: string | null;
  position: number;
};

export type Order = {
  id: string;
  user_id: string | null;
  customer_email: string;
  customer_name: string | null;
  customer_phone: string | null;
  event_id: string | null;
  basket_id: string | null;
  kind: "event_ticket" | "basket";
  quantity: number;
  fulfillment_method: "pickup" | "shipping" | null;
  shipping_address: ShippingAddress | null;
  subtotal_cents: number;
  shipping_cents: number;
  total_cents: number;
  status: "pending" | "paid" | "fulfilled" | "canceled" | "refunded";
  stripe_session_id: string | null;
  stripe_payment_intent: string | null;
  notes: string | null;
  created_at: string;
};

export type ShippingAddress = {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};

export type ChefProfile = {
  id: string;
  name: string;
  title: string | null;
  bio: string | null;
  philosophy: string | null;
  origin: string | null;
  signature_dish: string | null;
  photo_url: string | null;
  hero_image_url: string | null;
  instagram_handle: string | null;
  updated_at: string;
};

export type ChefCertification = {
  id: string;
  chef_id: string;
  name: string;
  issuer: string | null;
  year: number | null;
  image_url: string | null;
  position: number;
  created_at: string;
};
