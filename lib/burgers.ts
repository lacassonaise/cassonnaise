/* =====================
   TYPES
===================== */

export type Burger = {
  slug: string;
  name: string;
  ingredients: string[];
  prices: {
    seul: number; // burger seul
    menu: number; // burger + frites + boisson
  };
  image: string;
};

/* =====================
   DONNÉES BURGERS
   (selon ton menu papier)
===================== */

export const BURGERS: Burger[] = [
  {
    slug: "le-cheese",
    name: "Le Cheese",
    ingredients: [
      "Steak",
      "Cheddar",
      "Salade",
      "Tomate",
      "Oignons",
    ],
    prices: {
      seul: 600,
      menu: 750,
    },
    image: "/burgers/le cheese.jpg",
  },

  {
    slug: "double-cheese",
    name: "Double Cheese",
    ingredients: [
      "Double steak",
      "Cheddar",
      "Salade",
      "Tomate",
      "Oignons",
    ],
    prices: {
      seul: 700,
      menu: 850,
    },
    image: "/burgers/doublecheese.jpg",
  },

  {
    slug: "le-chicken",
    name: "Le Chicken",
    ingredients: [
      "Poulet pané",
      "Cheddar",
      "Salade",
      "Tomate",
      "Oignons",
    ],
    prices: {
      seul: 850,
      menu: 1000,
    },
    image: "/burgers/le chicken.webp",
  },

  {
    slug: "le-gourmet",
    name: "Le Gourmet",
    ingredients: [
      "Steak maison",
      "Galette de mozzarella",
      "Salade",
      "Tomate",
      "Oignons",
    ],
    prices: {
      seul: 800,
      menu: 950,
    },
    image: "/burgers/le gourmet.jpg",
  },

  {
    slug: "le-country",
    name: "Le Country",
    ingredients: [
      "Steak",
      "Galette de pommes de terre",
      "Cheddar",
      "Salade",
      "Tomate",
      "Oignons",
    ],
    prices: {
      seul: 800,
      menu: 950,
    },
    image: "/burgers/le country.jpg",
  },

  {
    slug: "le-big",
    name: "Le Big",
    ingredients: [
      "Steak 180g",
      "Cheddar",
      "Salade",
      "Tomate",
      "Oignons",
    ],
    prices: {
      seul: 850,
      menu: 1000,
    },
    image: "/burgers/le big.jpg",
  },

  {
    slug: "le-fish",
    name: "Le Fish",
    ingredients: [
      "Poisson pané",
      "Cheddar",
      "Salade",
      "Tomate",
      "Oignons",
    ],
    prices: {
      seul: 800,
      menu: 950,
    },
    image: "/burgers/le fish.jpg",
  },
/*
  {
    slug: "menu-kids",
    name: "Menu Kids",
    ingredients: [
      "Mini burger",
      "Nuggets",
      "Frites",
      "Boisson",
    ],
    prices: {
      seul: 600,
      menu: 600, // kids = menu direct
    },
    image: "/burgers/menu-kids.jpg",
  },*/
];
