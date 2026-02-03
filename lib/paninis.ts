export type Panini = {
  slug: string;
  name: string;
  ingredients: string[];
  prices: {
    seul: number; // 6€
    menu: number; // 7,50€
  };
  image: string;
};

export const PANINI_PRICES = {
  seul: 600,
  menu: 750,
} as const;

export const PANINI_SAUCES = [
  "Mayonnaise",
  "Ketchup",
  "Algérienne",
  "Samouraï",
  "Barbecue",
  "Blanche",
  "Biggy",
  "Harissa",
] as const;

// D’après ce qu’on lit sur ta photo (paninis + mozzarella + sauce au choix)
export const PANINIS: Panini[] = [
  {
    slug: "panini-viande-hachee",
    name: "Panini Viande Hachée",
    ingredients: ["Mozzarella", "Viande hachée", "Sauce au choix"],
    prices: PANINI_PRICES,
    image: "/paninis/panini1.jpg",
  },
  {
    slug: "panini-lardon-chevre",
    name: "Panini Lardon Chèvre",
    ingredients: ["Mozzarella", "Lardons", "Chèvre", "Sauce au choix"],
    prices: PANINI_PRICES,
    image: "/paninis/panini5.jpg",
  },
  {
    slug: "panini-4-fromages",
    name: "Panini 4 Fromages",
    ingredients: ["4 fromages", "Sauce au choix"],
    prices: PANINI_PRICES,
    image: "/paninis/panini6.jpg",
  },
  {
    slug: "panini-merguez",
    name: "Panini Merguez",
    ingredients: ["Mozzarella", "Merguez", "Sauce au choix"],
    prices: PANINI_PRICES,
    image: "/paninis/panini2.jpg",
  },
  {
    slug: "panini-poulet",
    name: "Panini Poulet",
    ingredients: ["Mozzarella", "Poulet", "Sauce au choix"],
    prices: PANINI_PRICES,
    image: "/paninis/panini3.jpg",
  },
  {
    slug: "panini-jambon",
    name: "Panini Jambon",
    ingredients: ["Mozzarella", "Jambon", "Sauce au choix"],
    prices: PANINI_PRICES,
    image: "/paninis/panini7.jpg",
  },
  {
    slug: "panini-saumon",
    name: "Panini Saumon",
    ingredients: ["Mozzarella", "Saumon", "Sauce au choix"],
    prices: PANINI_PRICES,
    image: "/paninis/panini4.jpg",
  },
];

