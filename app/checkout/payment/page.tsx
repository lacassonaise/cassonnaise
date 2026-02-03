"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";
import { useCheckout } from "@/store/checkout";

export default function PaymentPage() {
  const cart = useCart();
  const checkout = useCheckout();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function pay() {
    setLoading(true);

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        items: cart.items,
        totalCents: checkout.finalTotalCents,
        deliveryType: checkout.deliveryType,
        deliveryFeeCents: checkout.deliveryFeeCents,
        deliveryFree: checkout.deliveryFree,
        phone: checkout.phone,
        note: checkout.note,
        address: checkout.address,
      }),
    });

    if (!res.ok) {
      alert("Erreur création commande");
      setLoading(false);
      return;
    }

    const { orderId } = await res.json();
    router.push(`/checkout/success?order=${orderId}`);
  }

  return (
    <button
      onClick={pay}
      disabled={loading}
      className="w-full bg-black text-white py-4 rounded-xl"
    >
      {loading ? "Traitement…" : "Payer"}
    </button>
  );
}


