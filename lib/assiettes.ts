/* =====================
   TYPES
===================== */

export type AssietteSize = 1 | 2 | 3;

/* =====================
   PRIX
===================== */

export const ASSIETTE_PRICES: Record<AssietteSize, number> = {
  1: 990,
  2: 1190,
  3: 1390,
};

/* =====================
   RÈGLES
===================== */

export const MEAT_COUNT_BY_ASSIETTE: Record<AssietteSize, number> = {
  1: 1,
  2: 2,
  3: 3,
};

/* =====================
   DONNÉES
===================== */

export const ASSIETTE_MEATS = [
  "Kebab",
  "Chicken",
  "Escalope",
  "Merguez",
  "Cordon bleu",
  "Nuggets",
  "Tenders",
];
