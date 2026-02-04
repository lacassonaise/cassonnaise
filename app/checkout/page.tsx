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

  async function pay() {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        items: cart.items,
      }),
    });

    const { url } = await res.json();
    window.location.href = url;
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Finaliser la commande</h1>

      <input
        placeholder="Téléphone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-3 rounded"
      />

      <button
        onClick={pay}
        className="w-full bg-black text-white py-3 rounded-xl"
      >
        Payer maintenant {cart.totalFormatted()}
      </button>
    </div>
  );
}

