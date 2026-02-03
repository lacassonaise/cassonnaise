"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";

export default function CartPage() {
  const router = useRouter();
  const cart = useCart();

  if (cart.items.length === 0) {
    return <p className="p-6">Ton panier est vide.</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Panier</h1>

      {cart.items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between border rounded-xl p-3"
        >
          <div>
            <div className="font-semibold">{item.name}</div>
            <div className="text-sm text-gray-600">
              {item.quantity} × {(item.priceCents / 100).toFixed(2)} €
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => cart.dec(item.id)}>-</button>
            <button onClick={() => cart.inc(item.id)}>+</button>
            <button onClick={() => cart.remove(item.id)}>🗑️</button>
          </div>
        </div>
      ))}

      <div className="flex justify-between pt-4 font-bold">
        <span>Total</span>
        <span>{(cart.totalCents() / 100).toFixed(2)} €</span>
      </div>

      <button
        onClick={() => router.push("/checkout")}
        className="w-full rounded-xl bg-black py-3 text-white font-semibold"
      >
        Commander
      </button>
    </div>
  );
}
