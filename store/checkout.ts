"use client";

import { create } from "zustand";

type CheckoutState = {
  orderId: string | null;

  deliveryType: "pickup" | "delivery";
  deliveryFeeCents: number;
  deliveryFree: boolean;

  finalTotalCents: number;
  
  // Ajoute ces trois lignes ici :
  phone: string;
  address: string;
  note: string;

  setCheckout: (data: Partial<CheckoutState>) => void;
  clear: () => void;
};

export const useCheckout = create<CheckoutState>((set) => ({
  orderId: null,

  deliveryType: "pickup",
  deliveryFeeCents: 0,
  deliveryFree: false,

  finalTotalCents: 0,
  
  // Définit les valeurs par défaut ici :
  phone: "",
  address: "",
  note: "",

  setCheckout: (data) => set((s) => ({ ...s, ...data })),
  clear: () =>
    set({
      orderId: null,
      deliveryType: "pickup",
      deliveryFeeCents: 0,
      deliveryFree: false,
      finalTotalCents: 0,
      // N'oublie pas de les remettre à zéro ici aussi :
      phone: "",
      address: "",
      note: "",
    }),
}));
