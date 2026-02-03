export type RefreshmentCategory = "dessert" | "icecream" | "drink";

export type RefreshmentItem = {
  id: string;
  name: string;
  price: number; // cents
  category: RefreshmentCategory;
  image?: string;
  meta?: string; // ex: "33cl", "50cl", etc
};

export const REFRESHMENTS: RefreshmentItem[] = [
  /* -------- DESSERTS -------- */
  {
    id: "tiramisu",
    name: "Tiramisu",
    price: 300,
    category: "dessert",
    image: "/boissons/tiramissu.jpg",
  },
  {
    id: "tarte-daim",
    name: "Tarte au Daim",
    price: 300,
    category: "dessert",
    image: "/boissons/tarte-daim.jpg",
  },
  {
    id: "panini-nutella",
    name: "Panini Nutella",
    price: 500,
    category: "dessert",
    image: "/boissons/nutella.jpg",
  },

  /* -------- GLACES -------- */
  {
    id: "glace-100ml",
    name: "Glace pot 100ml",
    price: 400,
    category: "icecream",
    image: "/icecreams/glace100ml.jpg",
    meta: "100ml",
  },
  {
    id: "glace-500ml",
    name: "Glace pot 500ml",
    price: 900,
    category: "icecream",
    image: "/icecreams/g500ml.jpg",
    meta: "500ml",
  },

  /* -------- BOISSONS -------- */
  {
    id: "boisson-33cl",
    name: "Boisson",
    price: 150,
    category: "drink",
    meta: "33cl",
    image: "/boissons/coca1.jpg",
  },
  {
    id: "eau-50cl",
    name: "Eau minérale",
    price: 150,
    category: "drink",
    meta: "50cl",
    image: "/boissons/eau.jpg",
  },
];
