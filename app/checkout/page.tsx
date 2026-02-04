"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";
import { eur } from "@/lib/format";
import { supabase } from "@/lib/supabase/client";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();

  const baseTotal = cart.totalCents();

  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  // ✅ CORRECTION React #418 : navigation dans useEffect
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

    // 1️⃣ Création commande
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

    // 2️⃣ Stripe Checkout
    const stripeRes = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        totalCents: baseTotal,
        orderId,
      }),
    });

    if (!stripeRes.ok) {
      alert("Erreur paiement");
      return;
    }

    const { url } = await stripeRes.json();

    // ✅ Redirection Stripe correcte
    window.location.href = url;
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-6">
      <h1 className="text-2xl font-bold">Finaliser la commande</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          continueToPayment();
        }}
        className="space-y-4"
      >
        <input
          required
          type="tel"
          placeholder="Téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded border p-3"
        />

        <textarea
          placeholder="Note (optionnel)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded border p-3"
        />

        <button
          type="submit"
          className="w-full rounded bg-[#1F5C3A] py-3 text-white font-semibold"
        >
          Payer maintenant ({eur(baseTotal)})
        </button>
      </form>
    </div>
  );
}

