import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  size: "senior" | "mega";
  ingredients: string[];
  priceCents: number;
  image: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({ items: [...state.items, item] })),
}));

