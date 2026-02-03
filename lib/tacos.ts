/* =====================
   TYPES
===================== */

export type TacoSize = "M" | "L" | "XL";
export type TacoBase = "tortilla" | "bowl";

/* =====================
   PRIX
===================== */

export const TACO_PRICES: Record<TacoSize, number> = {
  M: 900,
  L: 1000,
  XL: 1200,
};

export const MENU_PRICE = 150; // +1,50 €
export const EXTRA_PRICE = 150;

/* =====================
   RÈGLES
===================== */

export const MEAT_COUNT_BY_SIZE: Record<TacoSize, number> = {
  M: 1,
  L: 2,
  XL: 3,
};

/* =====================
   DONNÉES
===================== */

export const BASES: TacoBase[] = ["tortilla", "bowl"];

export const MEATS = [
  "Kebab",
  "Poulet",
  "Tenders",
  "Merguez",
  "Steak",
  "Cordon bleu",
  "Nuggets",
];

export const SAUCES = [
  "Mayonnaise",
  "Ketchup",
  "Algérienne",
  "Blanche",
  "Samouraï",
  "Barbecue",
  "Biggy",
  "Harissa",
];

export const EXTRAS = [
  "Œuf",
  "Mozza",
  "Cheddar",
  "Lardons",
  "Bacon",
  "Chèvre",
  "Poivrons",
  "Champignons",
];
