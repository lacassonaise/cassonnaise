export type Salade = {
  slug: string;
  name: string;
  ingredients: string[];
  price: number; // 7,50€
  image: string;
};

export const SALADE_PRICE = 750;

// d’après ta photo “Nos Salades”
export const SALADES: Salade[] = [
  {
    slug: "salade-nature",
    name: "Salade Nature",
    ingredients: ["Salade verte", "Tomates", "Olives"],
    price: SALADE_PRICE,
    image: "/salades/nature.png",
  },
  {
    slug: "salade-norvegienne",
    name: "Salade Norvégienne",
    ingredients: ["Salade", "Tomates", "Saumon fumé", "Citron"],
    price: SALADE_PRICE,
    image: "/salades/norvegienne.png",
  },
  {
    slug: "salade-chevre-chaud",
    name: "Salade Chèvre Chaud",
    ingredients: ["Salade", "Tomates", "Chèvre chaud (toast)"],
    price: SALADE_PRICE,
    image: "/salades/chevre-chaud.png",
  },
  {
    slug: "salade-poulet",
    name: "Salade Poulet",
    ingredients: ["Salade", "Tomates", "Poulet", "Pommes de terre"],
    price: SALADE_PRICE,
    image: "/salades/poulet.png",
  },
  {
    slug: "salade-nicoise",
    name: "Salade Niçoise",
    ingredients: ["Salade", "Tomates", "Thon", "Olives"],
    price: SALADE_PRICE,
    image: "/salades/nicoise.png",
  },
  {
    slug: "salade-milieuese",
    name: "Salade Milieuèse",
    ingredients: ["Salade", "Tomates", "Chèvre (toast)", "Coulis de miel"],
    price: SALADE_PRICE,
    image: "/salades/millieuse.png",
  },
];
