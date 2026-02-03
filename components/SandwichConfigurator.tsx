"use client";

import { useMemo, useState } from "react";
import { Sandwich } from "@/lib/sandwiches";
import { useCart } from "@/store/cart";
import { eur } from "@/lib/format";

type Variant = "seul" | "menu";

export default function SandwichConfigurator({
  sandwich,
}: {
  sandwich: Sandwich;
}) {
  const cart = useCart();

  const [variant, setVariant] = useState<Variant>("menu");
  const [removed, setRemoved] = useState<string[]>([]);

  function toggleRemove(i: string) {
    setRemoved((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  }

  const finalIngredients = useMemo(
    () => sandwich.ingredients.filter((i) => !removed.includes(i)),
    [sandwich.ingredients, removed]
  );

  /** ✅ PRIX SÛR */
  const priceCents = sandwich.prices[variant];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm space-y-4">
      {/* Image */}
      <div className="h-36 overflow-hidden rounded-xl bg-gray-100">
        <img
          src={sandwich.image}
          alt={sandwich.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Nom */}
      <h3 className="text-lg font-bold">{sandwich.name}</h3>

      {/* Choix */}
      <div className="flex gap-2">
        <button
          onClick={() => setVariant("menu")}
          className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold ${
            variant === "menu"
              ? "bg-[#1F5C3A] text-white"
              : "bg-gray-100"
          }`}
        >
          Menu
        </button>

        <button
          onClick={() => setVariant("seul")}
          className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold ${
            variant === "seul"
              ? "bg-[#1F5C3A] text-white"
              : "bg-gray-100"
          }`}
        >
          Seul
        </button>
      </div>

      {/* Info menu */}
      {variant === "menu" && (
        <div className="text-xs text-gray-600">
          Inclus : Frites 🍟 + Boisson 🥤
        </div>
      )}

      {/* Ingrédients */}
      <div>
        <div className="mb-2 text-sm font-semibold">
          Ingrédients (modifiable)
        </div>

        <div className="flex flex-wrap gap-2">
          {sandwich.ingredients.map((i) => (
            <button
              key={i}
              onClick={() => toggleRemove(i)}
              className={`rounded-xl px-3 py-1 text-xs transition ${
                removed.includes(i)
                  ? "bg-red-100 text-red-600 line-through"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      {/* Prix + panier */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-lg font-bold">{eur(priceCents)}</div>

        <button
          onClick={() =>
            cart.add({
              productId: sandwich.slug,
              name: sandwich.name,
              priceCents,
              quantity: 1,
              imageUrl: sandwich.image,
              customizations: {
                variant, // ✅ menu / seul
                ingredients: finalIngredients,
                removedIngredients: removed,
                extras: variant === "menu" ? ["Frites", "Boisson"] : [],
              },
            })
          }
          className="rounded-xl bg-[#C97A3A] px-5 py-3 text-sm font-bold text-white hover:opacity-90"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}


