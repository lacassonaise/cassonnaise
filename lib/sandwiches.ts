// lib/sandwiches.ts

export type Sandwich = {
  slug: string;
  name: string;
  ingredients: string[];
  prices: {
    seul: number; // sandwich seul
    menu: number; // sandwich + frites + boisson
  };
  image: string;
};

export const SANDWICHES: Sandwich[] = [
  {
    slug: "kebab",
    name: "Kebab",
    ingredients: ["Kebab", "Salade", "Tomates", "Oignons"],
    prices: {
      seul: 700,
      menu: 850,
    },
    image: "/sandwiches/kebab.jpg",
  },
  {
    slug: "americain",
    name: "Américain",
    ingredients: [
      "2 Steaks",
      "Œuf",
      "Cheddar",
      "Salade",
      "Tomates",
      "Oignons",
    ],
    prices: {
      seul: 800,
      menu: 950,
    },
    image: "/sandwiches/americain.jpeg",
  },
  {
    slug: "chicken",
    name: "Chicken",
    ingredients: [
      "Poulet curry",
      "Cheddar",
      "Salade",
      "Tomates",
      "Oignons",
    ],
    prices: {
      seul: 750,
      menu: 900,
    },
    image: "/sandwiches/chicken.jpg",
  },
  {
    slug: "merguez",
    name: "Merguez",
    ingredients: ["Merguez", "Salade", "Tomates", "Oignons"],
    prices: {
      seul: 700,
      menu: 850,
    },
    image: "/sandwiches/merguez.jpg",
  },
  {
    slug: "cordon-bleu",
    name: "Cordon Bleu",
    ingredients: [
      "Cordon bleu",
      "Cheddar",
      "Salade",
      "Tomates",
      "Oignons",
    ],
    prices: {
      seul: 600,
      menu: 750,
    },
    image: "/sandwiches/cordonbleu.jpg",
  },
  {
    slug: "radical",
    name: "Radical",
    ingredients: [
      "Cordon bleu",
      "Viande au choix",
      "Cheddar",
      "Salade",
      "Tomates",
      "Oignons",
    ],
    prices: {
      seul: 750,
      menu: 900,
    },
    image: "/sandwiches/radical.jpg",
  },
  {
    slug: "supreme",
    name: "Supreme",
    ingredients: [
      "Chicken",
      "Viande au choix",
      "Fromage",
      "Salade",
      "Tomates",
      "Oignons",
    ],
    prices: {
      seul: 750,
      menu: 950,
    },
    image: "/sandwiches/supreme.jpg",
  },
  {
    slug: "steak",
    name: "Steak",
    ingredients: [
      "2 Steaks",
      "Cheddar",
      "Salade",
      "Tomates",
      "Oignons",
    ],
    prices: {
      seul: 750,
      menu: 900,
    },
    image: "/sandwiches/steak.jpg",
  },
];
