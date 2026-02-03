"use client";

import { useState, useMemo } from "react";
import { Pizza, SUPPLEMENTS_BY_BASE, SUPPLEMENTS_PRICE } from "@/lib/pizzas";
import { useCart } from "@/store/cart";

type Props = {
  base: "tomate" | "creme";
  title: string;
  pizzas: Pizza[];
};

export default function PizzaBaseSection({ base, title, pizzas }: Props) {
  const cart = useCart();

  const [pizza, setPizza] = useState<Pizza>(pizzas[0]);
  const [removed, setRemoved] = useState<string[]>([]);
  const [extras, setExtras] = useState<string[]>([]);
  const [size, setSize] = useState<"senior" | "mega">("senior");

  const finalIngredients = useMemo(() => {
    return [
      ...pizza.ingredients.filter(i => !removed.includes(i)),
      ...extras,
    ];
  }, [pizza, removed, extras]);

  const price =
    pizza.prices[size] + extras.length * SUPPLEMENTS_PRICE[size];

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold">{title}</h2>

      {/* CHOIX PIZZA */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {pizzas.map(p => (
          <button
            key={p.slug}
            onClick={() => {
              setPizza(p);
              setRemoved([]);
              setExtras([]);
            }}
            className={`rounded-xl border px-3 py-2 text-sm ${
              pizza.slug === p.slug ? "bg-black text-white" : ""
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* TAILLE */}
      <div className="flex gap-2">
        {(["senior","mega"] as const).map(s => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`rounded-xl border px-3 py-2 ${
              size === s ? "bg-black text-white" : ""
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* INGRÉDIENTS */}
      <div className="flex flex-wrap gap-2">
        {pizza.ingredients.map(i => (
          <button
            key={i}
            onClick={() =>
              setRemoved(r =>
                r.includes(i) ? r.filter(x => x !== i) : [...r, i]
              )
            }
            className={`rounded-xl border px-3 py-1 text-sm ${
              removed.includes(i) ? "line-through bg-red-100" : ""
            }`}
          >
            {i}
          </button>
        ))}
      </div>

      {/* SUPPLÉMENTS (UNE FOIS PAR BASE) */}
      <div className="grid grid-cols-2 gap-2">
        {SUPPLEMENTS_BY_BASE[base].map(i => (
          <button
            key={i}
            onClick={() =>
              setExtras(e =>
                e.includes(i) ? e.filter(x => x !== i) : [...e, i]
              )
            }
            className={`rounded-xl border px-3 py-2 ${
              extras.includes(i) ? "bg-black text-white" : ""
            }`}
          >
            {i}
          </button>
        ))}
      </div>

      {/* AJOUT PANIER */}
      <button
        onClick={() =>
          cart.add({
            productId: pizza.slug,
            name: pizza.name,
            quantity: 1,
            priceCents: price,
            customizations: {
              base,
              size,
              ingredients: finalIngredients,
            },
          })
        }
        className="rounded-xl bg-[#1F5C3A] px-6 py-3 text-white font-bold"
      >
        Ajouter ({(price / 100).toFixed(2)} €)
      </button>
    </section>
  );
}

