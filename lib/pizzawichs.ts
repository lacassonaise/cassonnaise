export type PizzawichSize = 1 | 2 | 3;
export type PizzawichBase = "tomate" | "creme";

export const PIZZAWICH_PRICES: Record<PizzawichSize, number> = {
  1: 800,
  2: 900,
  3: 1000,
};

export const PIZZAWICH_MEATS = [
  "Kebab",
  "Chicken",
  "Escalope",
  "Merguez",
  "Cordon bleu",
  "Nuggets",
  "Tenders",
] as const;
