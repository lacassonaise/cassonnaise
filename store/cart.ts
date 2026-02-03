"use client";

import { create } from "zustand";

/* =====================
   TYPES
===================== */

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  priceCents: number;
  quantity: number;
  imageUrl?: string | null;

  customizations?: {
    pizza?: {
      size: "senior" | "mega";
      base: "tomate" | "creme";
    };

    exclusive?: {
      type: "riz-crousti" | "pizza-mozza" | "pizza-deal" | "kids" | "pizza-nutella";
      takeawayOnly?: true;
    };

    meats?: string[];
    panini?: any;
    pizzawich?: any; 
    burger?: any;    // Optionnel : au cas où tu en aurais un
    tacos?: any;
    // --- AJOUTE CELLE-CI POUR LES BOISSONS ---
    refreshment?: any;

    // --- LA LIGNE MAGIQUE POUR LE FUTUR ---
    [key: string]: any;
  };
};

/* =====================
   STORE
===================== */

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "id">) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;

  totalCents: () => number;
  count: () => number;
  canDeliver: () => boolean;
};

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export const useCart = create<CartState>((set, get) => ({
  items: [],

  add: (item) =>
    set((state) => ({
      items: [...state.items, { ...item, id: uid() }],
    })),

  remove: (id) =>
    set((state) => ({
      items: state.items.filter((x) => x.id !== id),
    })),

  inc: (id) =>
    set((state) => ({
      items: state.items.map((x) =>
        x.id === id ? { ...x, quantity: x.quantity + 1 } : x
      ),
    })),

  dec: (id) =>
    set((state) => ({
      items: state.items
        .map((x) =>
          x.id === id ? { ...x, quantity: x.quantity - 1 } : x
        )
        .filter((x) => x.quantity > 0),
    })),

  clear: () => set({ items: [] }),

  totalCents: () =>
    get().items.reduce(
      (t, item) => t + item.priceCents * item.quantity,
      0
    ),

  count: () =>
    get().items.reduce((t, item) => t + item.quantity, 0),

  canDeliver: () =>
    !get().items.some(
      (item) => item.customizations?.exclusive?.takeawayOnly === true
    ),
}));
