"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(6);

  // ⏳ redirection automatique
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      router.push("/");
    }, 6000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5 text-center space-y-6">

        {/* Icône */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 text-3xl">
          ✓
        </div>

        {/* Titre */}
        <h1 className="text-2xl font-semibold text-#DF8C43">
          Paiement confirmé
        </h1>

        {/* Message */}
        <p className="text-sm text-green-700">
          Merci pour votre commande 🙏  
          <br />
          Le restaurant la prépare avec soin.
        </p>

        {/* Info */}
        <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
          🍽️ <strong>Commande envoyée au restaurant</strong>
          <br />
          Vous serez servi très bientôt.
        </div>

        {/* Redirection */}
        <p className="text-xs text-gray-500">
          Redirection automatique dans {seconds} seconde{seconds > 3 && "s"}…
        </p>

        {/* CTA */}
        <button
          onClick={() => router.push("/")}
          className="w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-#DF8C43"
        >
          Retour au menu
        </button>
      </div>
    </div>
  );
}


