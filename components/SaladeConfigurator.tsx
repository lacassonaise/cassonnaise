"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Salade } from "@/lib/salades";

export type SaladeConfig = {
  removedIngredients: string[];
  pain: boolean; // “pain à la demande”
};

type Props = {
  salade: Salade;
  onChange: (config: SaladeConfig, priceCents: number) => void;
};

export default function SaladeConfigurator({ salade, onChange }: Props) {
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [pain, setPain] = useState(false);

  const priceCents = useMemo(() => salade.price, [salade.price]);

  function toggleIngredient(ingredient: string) {
    setRemovedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  }

  useMemo(() => {
    onChange({ removedIngredients, pain }, priceCents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removedIngredients, pain, priceCents]);

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition overflow-hidden">
      <div className="relative h-44 w-full">
        <Image
          src={salade.image}
          alt={salade.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-extrabold">{salade.name}</h3>
            <p className="text-xs text-gray-500 mt-1">
              Clique pour retirer un ingrédient
            </p>
          </div>

          <div className="text-right text-lg font-extrabold">
            {(priceCents / 100).toFixed(2)} €
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {salade.ingredients.map((ing) => {
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

        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <input
            type="checkbox"
            checked={pain}
            onChange={(e) => setPain(e.target.checked)}
            className="h-4 w-4"
          />
          Pain à la demande
        </label>
      </div>
    </div>
  );
}
