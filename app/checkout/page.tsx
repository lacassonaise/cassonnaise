"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";

export default function CheckoutPage() {
  const cart = useCart();
  const router = useRouter();
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (cart.items.length === 0) {
      router.replace("/");
    }
  }, [cart.items.length, router]);

  if (cart.items.length === 0) return null;

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Finaliser la commande</h1>

      <input
        placeholder="Téléphone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border rounded p-3"
      />

      <button className="w-full bg-black text-white py-3 rounded-xl">
        Payer
      </button>
    </div>
  );
}

