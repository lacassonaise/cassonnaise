"use client";

import { useMemo, useState } from "react";
import {
  ALLERGEN_LABELS,
  SUPPLEMENTS_BY_BASE,
  SUPPLEMENTS_PRICE,
  CHEESY_PRICE,
  Pizza,
} from "@/lib/pizzas";
import { useCart } from "@/store/cart";

type Size = "senior" | "mega";

export default function PizzaConfigurator({ pizza }: { pizza: Pizza }) {
  const cart = useCart();

  const [size, setSize] = useState<Size>("senior");
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [extras, setExtras] = useState<string[]>([]);
  const [cheesy, setCheesy] = useState(false);
  const [openExtras, setOpenExtras] = useState(false);

  const toggleRemove = (i: string) => {
    setRemovedIngredients((p) =>
      p.includes(i) ? p.filter((x) => x !== i) : [...p, i]
    );
  };

  const toggleExtra = (i: string) => {
    setExtras((p) =>
      p.includes(i) ? p.filter((x) => x !== i) : [...p, i]
    );
  };

  const supplements = SUPPLEMENTS_BY_BASE[pizza.base];

  const priceCents = useMemo(() => {
    let price = pizza.prices[size];
    price += extras.length * SUPPLEMENTS_PRICE[size];
    if (cheesy) price += CHEESY_PRICE[size];
    return price;
  }, [pizza.prices, size, extras, cheesy]);

  const finalIngredients = useMemo(() => {
    const base = pizza.ingredients.filter(
      (i) => !removedIngredients.includes(i)
    );
    return [...base, ...extras.filter((i) => !base.includes(i))];
  }, [pizza.ingredients, removedIngredients, extras]);

  return (
    <div className="rounded-3xl bg-gray-50 shadow-sm hover:shadow-md transition p-4 space-y-4">
      {/* Image */}
      <img
        src={pizza.image}
        alt={pizza.name}
        className="h-40 w-full rounded-2xl object-cover"
      />

      {/* Titre */}
      <div>
        <h3 className="text-lg font-bold text-gray-900">{pizza.name}</h3>
        <p className="text-xs text-gray-500">
          Base {pizza.base === "tomate" ? "tomate" : "crème fraîche"}
        </p>
      </div>

      {/* Taille */}
      <div className="flex gap-2">
        {(["senior", "mega"] as Size[]).map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition ${
              size === s
                ? "bg-[#1F5C3A] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {s === "senior" ? "Senior" : "Mega"}
          </button>
        ))}
      </div>

      {/* Ingrédients */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-1">
          Ingrédients (modifiable)
        </p>
        <div className="flex flex-wrap gap-2">
          {pizza.ingredients.map((i) => (
            <button
              key={i}
              onClick={() => toggleRemove(i)}
              className={`rounded-full px-3 py-1 text-xs transition ${
                removedIngredients.includes(i)
                  ? "bg-red-100 text-red-700 line-through"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      {/* Suppléments bouton */}
      <button
        onClick={() => setOpenExtras((o) => !o)}
        className="w-full rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition"
      >
        {openExtras ? "Fermer les suppléments" : "Choisir des suppléments"}
      </button>

      {/* Suppléments */}
      {openExtras && (
        <div className="rounded-2xl bg-gray-50 p-3">
          <p className="mb-2 text-sm font-semibold text-gray-700">
            Suppléments (+{SUPPLEMENTS_PRICE[size] / 100}€)
          </p>

          <div className="grid grid-cols-2 gap-2">
            {supplements.map((i) => (
              <button
                key={i}
                onClick={() => toggleExtra(i)}
                className={`rounded-full px-3 py-1 text-xs transition ${
                  extras.includes(i)
                    ? "bg-[#1F5C3A] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cheesy */}
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={cheesy}
          onChange={(e) => setCheesy(e.target.checked)}
        />
        Cheesy crust (+{CHEESY_PRICE[size] / 100}€)
      </label>

      {/* Allergènes */}
      <p className="text-xs text-gray-500">
        Allergènes : {pizza.allergens.map((a) => ALLERGEN_LABELS[a]).join(", ")}
      </p>

      {/* Prix + panier */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xl font-bold text-gray-900">
          {(priceCents / 100).toFixed(2)} €
        </span>

        <button
          onClick={() =>
            cart.add({
              productId: pizza.slug,
              name: pizza.name,
              priceCents,
              quantity: 1,
              imageUrl: pizza.image,
              customizations: {
                size,
                base: pizza.base,
                cheesy,
                ingredients: finalIngredients,
                removedIngredients,
                extras,
              },
            })
          }
          className="rounded-xl bg-[#1F5C3A] px-5 py-3 text-white font-bold hover:opacity-90 transition"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}




