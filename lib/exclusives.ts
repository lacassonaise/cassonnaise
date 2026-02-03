/* lib/exclusives.ts */

/* =====================
   RIZ CROUSTI
===================== */
export type RizCroustiSauce = "piquante" | "sucree" | "sans";

export const RIZ_CROUSTI = {
  id: "riz-crousti",
  name: "Riz crousti",
  description: "Riz + poulet crousti + sauce secrète + sauce au choix",
  priceCents: 990, // 9,90 €
  image: "/exclusives/riz-crousti.jpg",
  sauceChoices: ["piquante", "sucree", "sans"] as const,
} as const;

/* =====================
   PIZZA BASE MOZZARELLA (à composer)
===================== */
export type MozzaPizzaSize = "senior" | "mega";
export type MozzaPizzaSauce = "tomate" | "creme";

export const MOZZA_PIZZA = {
  id: "pizza-mozza",
  name: "Compose ta pizza (base mozzarella)",
  ingredientUnitCents: 150, // +1,50€
  sizes: {
    senior: { label: "Sénior", basePriceCents: 1000 },
    mega: { label: "Méga", basePriceCents: 1700 },
  } as const,
  sauces: {
    tomate: "Sauce tomate",
    creme: "Crème fraîche",
  } as const,
  image: "/categories/mozza.jpg",
} as const;

/* =====================
   MENU PIZZA À EMPORTER UNIQUEMENT
===================== */
export type PizzaDealId = "deal-senior" | "deal-mega" | "deal-nantais";

export type PizzaDeal = {
  id: PizzaDealId;
  name: string;
  priceCents: number;
  pizzaCount: number;
  pizzaSize: MozzaPizzaSize;
  drinksLabel: string;
  takeawayOnly: true;
};

export const PIZZA_DEALS: PizzaDeal[] = [
  {
    id: "deal-senior",
    name: "Menu Pizza Sénior",
    priceCents: 2500,
    pizzaCount: 2,
    pizzaSize: "senior",
    drinksLabel: "2 Coca 33cl",
    takeawayOnly: true,
  },
  {
    id: "deal-mega",
    name: "Menu Pizza Méga",
    priceCents: 3900,
    pizzaCount: 2,
    pizzaSize: "mega",
    drinksLabel: "1 Coca 1,25L",
    takeawayOnly: true,
  },
  {
    id: "deal-nantais",
    name: "Menu Pizza Nantais",
    priceCents: 4900,
    pizzaCount: 4,
    pizzaSize: "senior",
    drinksLabel: "1 Coca 1,25L",
    takeawayOnly: true,
  },
];

/* =====================
   KIDS + NUTELLA (simple)
===================== */
export const KIDS_MENU = {
  id: "kids",
  name: "Menu Kids",
  description: "Menu enfant",
  priceCents: 600, // 6€
  image: "/categories/kid.png",
} as const;

export const PIZZA_NUTELLA = {
  id: "pizza-nutella",
  name: "Pizza Nutella",
  description: "Dessert",
  priceCents: 1400, // 14€
  image: "/categories/nuttela.jpg",
} as const;

/* =====================
   ROUTING: slugs exclusives
===================== */
export type ExclusiveSlug =
  | "pizza-deal"
  | "riz-crousti"
  | "kids"
  | "pizza-nutella"
  | "pizza-mozza";

export const EXCLUSIVES_INDEX: Record<
  ExclusiveSlug,
  { title: string; image: string; hint?: string }
> = {
  "pizza-deal": {
    title: "📦 Menu Pizza (à emporter)",
    image: "/categories/pizza0.jpg",
    hint: "À emporter uniquement",
  },
  "riz-crousti": {
    title: "🍗 Riz Crousti",
    image: RIZ_CROUSTI.image,
    hint: "9,90€",
  },
  kids: {
    title: "🧒Menu Kids",
    image: KIDS_MENU.image,
    hint: "",
  },
  "pizza-nutella": {
    title: "🍫 Pizza Nutella",
    image: PIZZA_NUTELLA.image,
    hint: "14€",
  },
  "pizza-mozza": {
    title: "🧀 Pizza base mozzarella",
    image: MOZZA_PIZZA.image,
    hint: "Sénior 10€ / Méga 17€",
  },
};

