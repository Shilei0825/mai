// Hardcoded a la carte catalog for the custom basket builder.
// Prices intentionally sum higher than the curated basket ($160) so the
// bundle discount is real when a guest picks all nine.

export type BuilderItem = {
  id: string;
  name: string;
  description: string;
  category: "wine" | "pasta" | "sauce" | "cheese" | "oil" | "chocolate";
  price_cents: number;
  image_url: string;
};

export const BUILDER_ITEMS: BuilderItem[] = [
  {
    id: "barolo",
    name: "Barolo DOCG, 2019",
    description: "Single-vineyard Nebbiolo from La Morra — rose, tar, dried cherry.",
    category: "wine",
    price_cents: 3200,
    image_url:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=85",
  },
  {
    id: "barbaresco",
    name: "Barbaresco DOCG, 2020",
    description: "Producer-bottled from the Langhe — lifted, perfumed, age-worthy.",
    category: "wine",
    price_cents: 3200,
    image_url:
      "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=1200&q=85",
  },
  {
    id: "chianti",
    name: "Chianti Classico DOCG, 2021",
    description: "Sangiovese from the heart of Tuscany — bright, savory, food-driven.",
    category: "wine",
    price_cents: 2400,
    image_url:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=85",
  },
  {
    id: "prosecco",
    name: "Prosecco DOC, NV",
    description: "From Conegliano — crisp, green-apple, lightly almond.",
    category: "wine",
    price_cents: 2000,
    image_url:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&q=85",
  },
  {
    id: "pasta",
    name: "Trofie al Pesto Pasta, 500g",
    description: "Hand-rolled trofie from Liguria, the noodle made for pesto.",
    category: "pasta",
    price_cents: 1400,
    image_url:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=1200&q=85",
  },
  {
    id: "sauce",
    name: "Sugo al Pomodoro San Marzano, 400g",
    description: "Slow-simmered jarred sauce from D.O.P. San Marzano tomatoes.",
    category: "sauce",
    price_cents: 1200,
    image_url:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=1200&q=85",
  },
  {
    id: "cheese",
    name: "Pecorino Toscano D.O.P., 200g",
    description: "Aged sheep's milk cheese from Tuscany — nutty, lingering.",
    category: "cheese",
    price_cents: 2400,
    image_url:
      "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=1200&q=85",
  },
  {
    id: "oil",
    name: "Taggiasca Olive Oil, 250ml",
    description: "First cold-press, single-estate from the Ligurian coast.",
    category: "oil",
    price_cents: 1800,
    image_url:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=85",
  },
  {
    id: "gianduja",
    name: "Gianduja Tablet 70%, 100g",
    description: "Single-origin chocolate with Piedmont hazelnut paste.",
    category: "chocolate",
    price_cents: 1600,
    image_url:
      "https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=1200&q=85",
  },
];

// Sum of a la carte prices for the full set of nine.
export const A_LA_CARTE_TOTAL_CENTS = BUILDER_ITEMS.reduce(
  (sum, item) => sum + item.price_cents,
  0,
);

// Curated bundle price — the same nine items, in one go.
export const BUNDLE_PRICE_CENTS = 16000;

// Bundle discount applied when the cart is exactly { all 9 ids, qty = 1 each }.
export function computeBundle(
  cart: Record<string, number>,
): { isBundle: boolean; subtotal_cents: number } {
  const ids = Object.keys(cart).filter((id) => cart[id] > 0);
  const allNineQty1 =
    ids.length === BUILDER_ITEMS.length &&
    BUILDER_ITEMS.every((item) => cart[item.id] === 1);
  if (allNineQty1) {
    return { isBundle: true, subtotal_cents: BUNDLE_PRICE_CENTS };
  }
  const subtotal_cents = BUILDER_ITEMS.reduce((sum, item) => {
    const qty = cart[item.id] || 0;
    return sum + qty * item.price_cents;
  }, 0);
  return { isBundle: false, subtotal_cents };
}

export function getBuilderItem(id: string): BuilderItem | undefined {
  return BUILDER_ITEMS.find((i) => i.id === id);
}
