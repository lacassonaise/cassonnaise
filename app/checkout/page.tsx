"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";
import { calculateDelivery } from "@/lib/delivery";
import { eur } from "@/lib/format";
import { supabase } from "@/lib/supabase/client";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();

  const baseTotal = cart.totalCents();

  const [deliveryType, setDeliveryType] =
    useState<"pickup" | "delivery">("pickup");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const deliveryResult =
    deliveryType === "delivery"
      ? calculateDelivery(postalCode, baseTotal)
      : null;

  const deliveryFeeCents = deliveryResult?.feeCents ?? 0;
  const finalTotal = baseTotal + deliveryFeeCents;

  async function pay() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const orderRes = await fetch("/api/order", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        items: cart.items,
        totalCents: finalTotal,
        deliveryType,
        deliveryFeeCents,
        deliveryFree: deliveryFeeCents === 0,
        phone,
        address,
        note,
        userId: user?.id ?? null,
      }),
    });

    if (!orderRes.ok) return alert("Erreur commande");

    const { orderId } = await orderRes.json();

    const stripeRes = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ totalCents: finalTotal, orderId }),
    });

    const { url } = await stripeRes.json();
    window.location.href = url;
  }

  if (cart.items.length === 0) {
    router.push("/");
    return null;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Récapitulatif</h1>

      {cart.items.map((i) => (
        <div key={i.id}>
          {i.quantity}× {i.name} — {eur(i.priceCents)}
        </div>
      ))}

      <hr />

      <label>
        <input
          type="radio"
          checked={deliveryType === "pickup"}
          onChange={() => setDeliveryType("pickup")}
        />
        À emporter
      </label>

      <label>
        <input
          type="radio"
          checked={deliveryType === "delivery"}
          onChange={() => setDeliveryType("delivery")}
        />
        Livraison
      </label>

      {deliveryType === "delivery" && (
        <>
          <input
            placeholder="Code postal"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            placeholder="Téléphone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            placeholder="Adresse"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </>
      )}

      <hr />

      <strong>Total : {eur(finalTotal)}</strong>

      <button onClick={pay} className="bg-black text-white p-3 rounded-xl">
        Payer maintenant
      </button>
    </div>
  );
}

