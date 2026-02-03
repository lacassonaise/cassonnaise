"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Panini, PANINI_SAUCES } from "@/lib/paninis";

export type PaniniConfig = {
  menu: boolean;
  sauce: string;
  removedIngredients: string[];
};

type Props = {
  panini: Panini;
  onChange: (config: PaniniConfig, priceCents: number) => void;
};

export default function PaniniConfigurator({ panini, onChange }: Props) {
  const [menu, setMenu] = useState(false);
  const [sauce, setSauce] = useState<string>(PANINI_SAUCES[0]);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);

  const priceCents = useMemo(
    () => (menu ? panini.prices.menu : panini.prices.seul),
    [menu, panini]
  );

  function toggleIngredient(ingredient: string) {
    setRemovedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  }

  // Push state upward whenever it changes
  useMemo(() => {
    onChange({ menu, sauce, removedIngredients }, priceCents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu, sauce, removedIngredients, priceCents]);

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition overflow-hidden">
      {/* Image */}
      <div className="relative h-44 w-full">
        <Image
          src={panini.image}
          alt={panini.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="p-5 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-extrabold">{panini.name}</h3>
            <p className="text-xs text-gray-500 mt-1">
              Clique sur un ingrédient pour le retirer
            </p>
          </div>

          <div className="text-right">
            <div className="text-lg font-extrabold">
              {(priceCents / 100).toFixed(2)} €
            </div>
            <div className="text-[11px] text-gray-500">
              {menu ? "Menu" : "Seul"}
            </div>
          </div>
        </div>

        {/* Formule */}
        <div className="grid grid-cols-2 gap-3">
          <OptionButton active={!menu} onClick={() => setMenu(false)}>
            Seul <span className="opacity-80">{(panini.prices.seul / 100).toFixed(2)}€</span>
          </OptionButton>
          <OptionButton active={menu} onClick={() => setMenu(true)}>
            Menu <span className="opacity-80"> {(panini.prices.menu / 100).toFixed(2)}€</span>
          </OptionButton>
        </div>

        {/* Sauce */}
        <div>
          <label className="text-sm font-semibold">Sauce</label>
          <select
            value={sauce}
            onChange={(e) => setSauce(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#095f30]/30"
          >
            {PANINI_SAUCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Ingrédients */}
        <div>
          <div className="text-sm font-semibold mb-2">Ingrédients</div>
          <div className="flex flex-wrap gap-2">
            {panini.ingredients.map((ing) => {
              const removed = removedIngredients.includes(ing);
              return (
                <button
                  key={ing}
                  type="button"
                  onClick={() => toggleIngredient(ing)}
                  className={`rounded-full px-3 py-2 text-xs font-semibold transition
                    ${
                      removed
                        ? "bg-red-100 text-red-700 line-through"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                >
                  {ing}
                </button>
              );
            })}
          </div>
        </div>

        {/* Note menu */}
        {menu && (
          <p className="text-xs text-gray-500">
            Menu = frites + boisson
          </p>
        )}
      </div>
    </div>
  );
}

/* UI */
function OptionButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl px-4 py-3 text-sm font-extrabold transition
        ${
          active
            ? "bg-[#095f30] text-white"
            : "bg-gray-100 hover:bg-gray-200 text-gray-900"
        }`}
    >
      {children}
    </button>
  );
}
