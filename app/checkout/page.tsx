"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";
import { supabase } from "@/lib/supabase/client";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();

  const baseTotal = cart.totalCents();

  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  // ✅ REDIRECTION CORRECTE (pas dans le render)
  useEffect(() => {
    if (cart.items.length === 0) {
      router.replace("/");
    }
  }, [cart.items.length, router]);

  if (cart.items.length === 0) {
    return null;
  }

  async function continueToPayment() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const orderRes = await fetch("/api/order", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        items: cart.items,
        totalCents: baseTotal,
        phone,
        note,
        userId: user?.id ?? null,
      }),
    });

    if (!orderRes.ok) {
      alert("Erreur création commande");
      return;
    }

    const { orderId } = await orderRes.json();

    const stripeRes = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ totalCents: baseTotal, orderId }),
    });

    if (!stripeRes.ok) {
      alert("Erreur paiement");
      return;
    }

    const { url } = await stripeRes.json();

    // ✅ SÉCURISÉ CLIENT ONLY
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  }

  return (
    <div className="relative z-50">
      <input
        placeholder="Téléphone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <textarea
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <button
        onClick={continueToPayment}
        className="bg-green-700 text-white px-4 py-2 rounded"
      >
        Payer maintenant ({baseTotal / 100} €)
      </button>
    </div>
  );
}
