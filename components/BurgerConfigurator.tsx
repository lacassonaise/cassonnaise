"use client";

import { useMemo, useState } from "react";
import { Burger } from "@/lib/burgers";
import { useCart } from "@/store/cart";

export type BurgerConfig = {
  removedIngredients: string[];
  menu: boolean;
};

type Props = {
  burger: Burger;
};

export default function BurgerConfigurator({ burger }: Props) {
  const cart = useCart();

  const [removed, setRemoved] = useState<string[]>([]);
  const [menu, setMenu] = useState(false);

  function toggleIngredient(ingredient: string) {
    setRemoved((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  }

  const priceCents = useMemo(
    () => (menu ? burger.prices.menu : burger.prices.seul),
    [menu, burger]
  );

  return (
    <div className="rounded-3xl bg-white shadow-lg overflow-hidden flex flex-col">
      {/* Image */}
      <img
        src={burger.image}
        alt={burger.name}
        className="h-40 w-full object-cover"
      />

      <div className="p-5 flex flex-col gap-4 flex-1">
        <h3 className="text-xl font-bold">{burger.name}</h3>

        {/* Ingrédients */}
        <div>
          <p className="text-sm font-semibold mb-2">
            Ingrédients (clique pour retirer)
          </p>
          <div className="flex flex-wrap gap-2">
            {burger.ingredients.map((ingredient) => {
              const isRemoved = removed.includes(ingredient);

              return (
                <button
                  key={ingredient}
                  onClick={() => toggleIngredient(ingredient)}
                  className={`rounded-full px-3 py-2 text-xs transition ${
                    isRemoved
                      ? "bg-red-100 text-red-700 line-through"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {ingredient}
                </button>
              );
            })}
          </div>
        </div>

        {/* Formule */}
        <div className="flex gap-2">
          <button
            onClick={() => setMenu(false)}
            className={`flex-1 rounded-xl py-2 font-semibold ${
              !menu ? "bg-black text-white" : "bg-gray-100"
            }`}
          >
            Seul {(burger.prices.seul / 100).toFixed(2)} €
          </button>

          <button
            onClick={() => setMenu(true)}
            className={`flex-1 rounded-xl py-2 font-semibold ${
              menu ? "bg-black text-white" : "bg-gray-100"
            }`}
          >
            Menu {(burger.prices.menu / 100).toFixed(2)} €
          </button>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t">
          <span className="text-xl font-bold">
            {(priceCents / 100).toFixed(2)} €
          </span>

          <button
            onClick={() =>
              cart.add({
                productId: burger.slug,
                name: burger.name,
                priceCents,
                quantity: 1,
                imageUrl: burger.image,
                customizations: {
                  menu,
                  removedIngredients: removed,
                },
              })
            }
            className="rounded-xl bg-[#1F5C3A] px-4 py-2 text-white font-bold hover:bg-[#18492e]"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}


