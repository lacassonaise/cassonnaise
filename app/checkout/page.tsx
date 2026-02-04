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
  
  // 1. État pour gérer l'hydratation (évite l'erreur 418)
  const [mounted, setMounted] = useState(false);
  
  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">("pickup");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [deliveryResult, setDeliveryResult] = useState<ReturnType<typeof calculateDelivery> | null>(null);

  const baseTotal = cart.totalCents ? cart.totalCents() : 0;

  // 2. On attend que le composant soit monté côté client
  useEffect(() => {
    setMounted(true);
  }, []);

  // 3. Calcul de la livraison
  useEffect(() => {
    if (mounted && deliveryType === "delivery" && postalCode) {
      setDeliveryResult(calculateDelivery(postalCode, baseTotal));
    } else {
      setDeliveryResult(null);
    }
  }, [deliveryType, postalCode, baseTotal, mounted]);

  async function continueToPayment() {
    const { data: { user } } = await supabase.auth.getUser();

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
    window.location.href = url;
  }

  // 4. Pendant l'hydratation, on affiche un loader ou rien
  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  // 5. Si le panier est vide après le montage
  if (cart.items.length === 0) {
    router.push("/");
    return null;
  }

  return (
    <div className="relative z-50 p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Finaliser ma commande</h1>
      
      {/* Ajoutez vos inputs ici (téléphone, adresse, etc.) */}
      
      <div className="mt-8 border-t pt-4">
        <button 
          onClick={continueToPayment}
          className="w-full bg-[#1F5C3A] text-white py-4 rounded-xl font-bold hover:opacity-90"
        >
          Payer maintenant ({eur(baseTotal)})
        </button>
      </div>
    </div>
  );
}
