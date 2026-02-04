"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";
import { eur } from "@/lib/format";
import { calculateDelivery } from "@/lib/delivery";
import { supabase } from "@/lib/supabase/client";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();

  const baseTotal = cart.totalCents();

  const [deliveryType, setDeliveryType] =
    useState<"pickup" | "delivery">("pickup");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [deliveryResult, setDeliveryResult] =
    useState<ReturnType<typeof calculateDelivery> | null>(null);

  useEffect(() => {
    if (deliveryType === "delivery" && postalCode) {
      setDeliveryResult(calculateDelivery(postalCode, baseTotal));
    } else {
      setDeliveryResult(null);
    }
  }, [deliveryType, postalCode, baseTotal]);

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
        deliveryType,
        phone,
        note,
        address,
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

    // ✅ CORRECT : client only, déclenché par un event
    window.location.href = url;
  }

  if (cart.items.length === 0) {
    router.push("/");
    return null;
  }
return (
  <div className="relative z-50">
  <button onClick={continueToPayment}>
      Payer maintenant ({eur(baseTotal)})
    </button>
  </div>
);

}
