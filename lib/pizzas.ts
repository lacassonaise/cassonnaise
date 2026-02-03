/* =====================
   TYPES
   ===================== */

export type PizzaBase = "tomate" | "creme";
export type PizzaSize = "senior" | "mega";


export type Allergen =
  | "lait"
  | "gluten"
  | "oeuf"
  | "poisson"
  | "moutarde"
  | "fruits_a_coque";

export type Pizza = {
  slug: string;
  name: string;
  base: PizzaBase;
  ingredients: string[];
  allergens: Allergen[];
  prices: {
    senior: number;
    mega: number;
  };
  image: string;
};

/* =====================
   PRIX
   ===================== */

export const DEFAULT_PRICES = {
  senior: 1200, // 12€
  mega: 1900,   // 19€
};

export const SUPPLEMENTS_PRICE = {
  senior: 150, // +1,50€
  mega: 200,   // +2€
};

export const CHEESY_PRICE = {
  senior: 200, // +2€
  mega: 400,   // +4€
};

/* =====================
   SUPPLÉMENTS (1 FOIS PAR BASE)
   ===================== */

export const SUPPLEMENTS_BY_BASE: Record<PizzaBase, string[]> = {
  tomate: [
    "Jambon",
    "Chorizo",
    "Merguez",
    "Poulet",
    "Poulet tikka",
    "Viande hachée",
    "Viande kebab (Halal)",
    "Thon",
    "Champignons",
    "Poivrons",
    "Oignon",
    "Olives",
    "Œuf",
    "Fromage en plus",
  ],

  creme: [
    "Jambon",
    "Poulet",
    "Poulet fumé",
    "Lardons",
    "Viande hachée",
    "Pommes de terre",
    "Champignons",
    "Oignon",
    "Fromage en plus",
  ],
};

/* =====================
   ALLERGÈNES
   ===================== */

export const ALLERGEN_LABELS: Record<Allergen, string> = {
  lait: "Lait",
  gluten: "Gluten",
  oeuf: "Œuf",
  poisson: "Poisson",
  moutarde: "Moutarde",
  fruits_a_coque: "Fruits à coque",
};

/* =====================
   PIZZAS – BASE TOMATE
   ===================== */

export const PIZZAS: Pizza[] = [
  {
    slug: "classica",
    name: "Classica",
    base: "tomate",
    ingredients: ["Mozzarella", "Origan"],
    allergens: ["lait", "gluten"],
    prices: DEFAULT_PRICES,
    image: "/pizzas/pizza classica.webp",
  },
  {
    slug: "riene",
    name: "Riene",
    base: "tomate",
    ingredients: ["Mozzarella", "Jambon", "Champignons"],
    allergens: ["lait", "gluten"],
    prices: DEFAULT_PRICES,
    image: "/pizzas/pizza-reine.png",
  },
  {
    slug: "calzone",
    name: "Calzone",
    base: "tomate",
    ingredients: ["Mozzarella", "Jambon"],
    allergens: ["lait", "gluten"],
    prices: DEFAULT_PRICES,
    image: "/pizzas/pizzacalzone.jpg",
  },
  {
    slug: "vegetarienne",
    name: "Végétarienne",
    base: "tomate",
    ingredients: ["Mozzarella", "Champignons", "Oignon rouge", "Tomate cerise", "Poivrons", "Olives"],
    allergens: ["lait", "gluten"],
    prices: DEFAULT_PRICES,
    image: "/pizzas/Pizza-vegetarienne.webp",
  },
  {
    slug: "orientale",
    name: "Orientale",
    base: "tomate",
    ingredients: ["Mozzarella", "Merguez", "Champignons", "Œuf"],
    allergens: ["lait", "gluten", "oeuf"],
    prices: DEFAULT_PRICES,
    image: "/pizzas/pizza orientale.webp",
  },
  {
    slug: "4-fromages",
    name: "4 Fromages",
    base: "tomate",
    ingredients: ["Mozzarella", "Chèvre", "Cheddar", "Boursin"],
    allergens: ["lait", "gluten"],
    prices: DEFAULT_PRICES,
    image: "/pizzas/pizza 4 fromages.webp",
  },
  {
    slug: "campione",
    name: "Campione",
    base: "tomate",
    ingredients: ["Mozzarella", "Viande hachée", "Champignons", "Œuf"],
    allergens: ["lait", "gluten", "oeuf"],
    prices: DEFAULT_PRICES,
    image: "/pizzas/pizza campione.jpg",
  },
  {
    slug: "napolitaine",
    name: "Napolitaine",
    base: "tomate",
    ingredients: ["Mozzarella", "Anchois", "Câpres", "Olives"],
    allergens: ["lait", "gluten", "poisson"],
    prices: DEFAULT_PRICES,
    image: "/pizzas/pizza-napolitaine.webp",
  },
  {
    slug: "kebab",
    name: "Kebab",
    base: "tomate",
    ingredients: ["Mozzarella", "Viande kebab (Halal)", "Oignon", "Olives", "Sauce kebab"],
    allergens: ["lait", "gluten"],
    prices: DEFAULT_PRICES,
    image: "/pizzas/pizza-kebab.jpg",
  },
  {
    slug: "barbecue",
    name: "Barbecue",
    base: "tomate",
    ingredients: ["Mozzarella", "Sauce barbecue", "Viande hachée", "Poulet", "Poivrons"],
    allergens: ["lait", "gluten"],
    prices: DEFAULT_PRICES,
    image: "/pizzas/pizza-barbecue.jpg",
  },
{
  slug: "4-saisons",
  name: "4 Saisons",
  base: "tomate",
  ingredients: ["Mozzarella", "Jambon", "Champignons", "Poivrons", "Olives"],
  allergens: ["lait", "gluten"],
  prices: DEFAULT_PRICES,
  image: "/pizzas/pizza-quatre-saisons.jpg",
},
{
  slug: "4-jambons",
  name: "4 Jambons",
  base: "tomate",
  ingredients: ["Mozzarella", "Jambon", "Lardons", "Chorizo", "Bacon"],
  allergens: ["lait", "gluten"],
  prices: DEFAULT_PRICES,
  image: "/pizzas/pizza-de-4-jambon.jpg",
},
{
  slug: "Cassonnaise",
  name: "Cassonnaise",
  base: "tomate",
  ingredients: ["Mozzarella", "Viande hachée", "Merguez", "Œuf"],
  allergens: ["lait", "gluten", "oeuf"],
  prices: DEFAULT_PRICES,
  image: "/pizzas/cassonnaise.jpg",
},
{
  slug: "bolognaise",
  name: "Bolognaise",
  base: "tomate",
  ingredients: ["Mozzarella", "Viande hachée", "Œuf", "Oignon", "Olives"],
  allergens: ["lait", "gluten", "oeuf"],
  prices: DEFAULT_PRICES,
  image: "/pizzas/Pizza_Bolognesa.jpg",
},
{
  slug: "biggy-burger",
  name: "Biggy Burger",
  base: "tomate",
  ingredients: ["Mozzarella", "Viande hachée", "Cheddar", "Œuf", "Oignon", "Olives"],
  allergens: ["lait", "gluten", "oeuf"],
  prices: DEFAULT_PRICES,
  image: "/pizzas/pizza-burger.jpg",
},
{
  slug: "indienne",
  name: "Indienne",
  base: "tomate",
  ingredients: ["Mozzarella", "Sauce curry", "Poulet tikka", "Olives"],
  allergens: ["lait", "gluten"],
  prices: DEFAULT_PRICES,
  image: "/pizzas/pizza-indienne.jpg",
},
{
  slug: "grandchampenois",
  name: "Grandchampenois",
  base: "tomate",
  ingredients: ["Mozzarella", "Poulet", "Pommes de terre", "Chèvre", "Cheddar"],
  allergens: ["lait", "gluten"],
  prices: DEFAULT_PRICES,
  image: "/pizzas/pizza grandchampenois.png",
},
{
  slug: "boursin",
  name: "Boursin",
  base: "tomate",
  ingredients: ["Mozzarella", "Viande hachée", "Pommes de terre", "Boursin", "Olives"],
  allergens: ["lait", "gluten"],
  prices: DEFAULT_PRICES,
  image: "/pizzas/pizza boursin.jpg",
},
{
  slug: "paysanne",
  name: "Paysanne",
  base: "tomate",
  ingredients: ["Mozzarella", "Lardons", "Champignons", "Oignon"],
  allergens: ["lait", "gluten"],
  prices: DEFAULT_PRICES,
  image: "/pizzas/PIZZA-PAYSANNE.jpg",
},
{
  slug: "saumon",
  name: "Saumon",
  base: "tomate",
  ingredients: ["Mozzarella", "Saumon fumé"],
  allergens: ["lait", "gluten", "poisson"],
  prices: DEFAULT_PRICES,
  image: "/pizzas/pizza-saumon.jpg",
},

  /* =====================
     PIZZAS – BASE CRÈME
     ===================== */

  {
    slug: "dame-blanche",
    name: "Dame Blanche",
    base: "creme",
    ingredients: ["Crème fraîche", "Mozzarella", "Poulet", "Pommes de terre", "Chèvre"],
    allergens: ["lait", "gluten"],
    prices: DEFAULT_PRICES,
    image: "/pizzas/dameblanche.jpg",
  },
  {
    slug: "tartiflette",
    name: "Tartiflette",
    base: "creme",
    ingredients: ["Crème fraîche", "Mozzarella", "Lardons", "Pommes de terre", "Reblochon"],
    allergens: ["lait", "gluten"],
    prices: DEFAULT_PRICES,
    image: "/pizzas/tartiflette.jpg",
  },
  {
    slug: "raclette",
    name: "Raclette",
    base: "creme",
    ingredients: ["Crème fraîche", "Mozzarella", "Jambon", "Pommes de terre", "Raclette", "Oignon"],
    allergens: ["lait", "gluten"],
    prices: DEFAULT_PRICES,
    image: "/pizzas/raclette.jpg",
  },
  {
    slug: "chevre-miel",
    name: "Chèvre & Miel",
    base: "creme",
    ingredients: ["Crème fraîche", "Mozzarella", "Chèvre", "Miel", "Noix concassées"],
    allergens: ["lait", "gluten", "fruits_a_coque"],
    prices: DEFAULT_PRICES,
    image: "/pizzas/chevreetmiel.jpg",
  },
  {
    slug: "venezia",
    name: "Venezia",
    base: "creme",
    ingredients: ["Crème fraîche", "Mozzarella", "Saumon fumé", "Citron"],
    allergens: ["lait", "gluten", "poisson"],
    prices: DEFAULT_PRICES,
    image: "/pizzas/venezia.jpg",
  },

{
  slug: "chicken",
  name: "Chicken",
  base: "creme",
  ingredients: ["Crème fraîche", "Mozzarella", "Poulet fumé", "Pommes de terre", "Œuf", "Olives"],
  allergens: ["lait", "gluten", "oeuf"],
  prices: DEFAULT_PRICES,
  image: "/pizzas/chicken.jpg",
},
{
  slug: "boursalino",
  name: "Boursalino",
  base: "creme",
  ingredients: ["Crème fraîche", "Mozzarella", "Viande hachée", "Boursin", "Pommes de terre"],
  allergens: ["lait", "gluten"],
  prices: DEFAULT_PRICES,
  image: "/pizzas/bousalino.jpg",
},
{
  slug: "savoyarde",
  name: "Savoyarde",
  base: "creme",
  ingredients: ["Crème fraîche", "Mozzarella", "Jambon", "Pommes de terre", "Reblochon"],
  allergens: ["lait", "gluten"],
  prices: DEFAULT_PRICES,
  image: "/pizzas/savoyard.jpg",
},
{
  slug: "7-fromages",
  name: "7 Fromages",
  base: "creme",
  ingredients: ["Crème fraîche", "Assortiment de fromages"],
  allergens: ["lait", "gluten"],
  prices: DEFAULT_PRICES,
  image: "/pizzas/7fromages.jpg",
},
{
  slug: "gourmande",
  name: "Gourmande",
  base: "creme",
  ingredients: ["Crème fraîche", "Mozzarella", "Jambon", "Poulet fumé", "Pommes de terre", "Œuf"],
  allergens: ["lait", "gluten", "oeuf"],
  prices: DEFAULT_PRICES,
  image: "/pizzas/gaurmande1.jpg",
},
{
  slug: "normande",
  name: "Normande",
  base: "creme",
  ingredients: ["Crème fraîche", "Mozzarella", "Pommes de terre", "Oignon", "Camembert de Normandie"],
  allergens: ["lait", "gluten"],
  prices: DEFAULT_PRICES,
  image: "/pizzas/normande.jpg",
},
{
  slug: "montagnarde",
  name: "Montagnarde",
  base: "creme",
  ingredients: ["Crème fraîche", "Mozzarella", "Viande hachée", "Chèvre", "Œuf"],
  allergens: ["lait", "gluten", "oeuf"],
  prices: DEFAULT_PRICES,
  image: "/pizzas/montagnarde.jpg",
},
{
  slug: "hawaienne",
  name: "Hawaïenne",
  base: "creme",
  ingredients: ["Crème fraîche", "Mozzarella", "Poulet fumé", "Ananas", "Pommes de terre", "Olives"],
  allergens: ["lait", "gluten"],
  prices: DEFAULT_PRICES,
  image: "/pizzas/hawaienne.jpg",
},
];

/* =====================
   HELPERS
   ===================== */
export const PIZZAS_BY_BASE: Record<PizzaBase, Pizza[]> = {
  tomate: PIZZAS.filter((p) => p.base === "tomate"),
  creme: PIZZAS.filter((p) => p.base === "creme"),
};
export function getPizzaBySlug(slug: string): Pizza | undefined {
  return PIZZAS.find((p) => p.slug === slug);
}


