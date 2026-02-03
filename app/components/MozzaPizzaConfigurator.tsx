"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { MOZZA_PIZZA, MozzaPizzaSauce, MozzaPizzaSize } from "@/lib/exclusives";

export type MozzaPizzaConfig = {
  size: MozzaPizzaSize;
  sauce: MozzaPizzaSauce;
  addedIngredients: string[]; // saisis par le client (chips)
};

type Props = {
  onChange: (config: MozzaPizzaConfig, priceCents: number) => void;
};

export default function MozzaPizzaConfigurator({ onChange }: Props) {
  const [size, setSize] = useState<MozzaPizzaSize>("senior");
  const [sauce, setSauce] = useState<MozzaPizzaSauce>("tomate");
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const priceCents = useMemo(() => {
    const base = MOZZA_PIZZA.sizes[size].basePriceCents;
    const extras = ingredients.length * MOZZA_PIZZA.ingredientUnitCents;
    return base + extras;
  }, [size, ingredients]);

  useEffect(() => {
    onChangeRef.current(
      { size, sauce, addedIngredients: ingredients },
      priceCents
    );
  }, [size, sauce, ingredients, priceCents]);

  function addIngredient() {
    const v = input.trim();
    if (!v) return;
    // évite doublons exacts
    if (ingredients.some((x) => x.toLowerCase() === v.toLowerCase())) {
      setInput("");
      return;
    }
    setIngredients((prev) => [...prev, v]);
    setInput("");
  }

  function removeIngredient(v: string) {
    setIngredients((prev) => prev.filter((x) => x !== v));
  }

  return (
    <div className="rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold tracking-tight">🍕 Pizza base mozzarella</h3>
            <p className="mt-1 text-sm text-gray-500">
              Choisis taille + sauce + ingrédients (+1,50€ / ingrédient)
            </p>
          </div>

          <div className="rounded-2xl bg-[#095f30]/10 px-4 py-2 text-[#095f30]">
            <div className="text-xs font-semibold uppercase tracking-wide">Prix</div>
            <div className="text-lg font-extrabold">{(priceCents / 100).toFixed(2)} €</div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      <div className="p-6 space-y-8">
        <Section title="Taille">
          {(Object.keys(MOZZA_PIZZA.sizes) as MozzaPizzaSize[]).map((s) => (
            <Chip key={s} active={size === s} onClick={() => setSize(s)}>
              {MOZZA_PIZZA.sizes[s].label} — {(MOZZA_PIZZA.sizes[s].basePriceCents / 100).toFixed(2)} €
            </Chip>
          ))}
        </Section>

        <Section title="Sauce">
          {(Object.keys(MOZZA_PIZZA.sauces) as MozzaPizzaSauce[]).map((b) => (
            <Chip key={b} active={sauce === b} onClick={() => setSauce(b)}>
              {MOZZA_PIZZA.sauces[b]}
            </Chip>
          ))}
        </Section>

        <section>
          <h4 className="text-sm font-bold text-gray-900">Ingrédients ajoutés</h4>

          <div className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex: champignons"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#095f30]/40 focus:ring-4 focus:ring-[#095f30]/10"
            />
            <button
              type="button"
              onClick={addIngredient}
              className="rounded-2xl bg-[#095f30] px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(9,95,48,0.18)] hover:brightness-110 active:brightness-95"
            >
              Ajouter
            </button>
          </div>

          {ingredients.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {ingredients.map((ing) => (
                <button
                  key={ing}
                  type="button"
                  onClick={() => removeIngredient(ing)}
                  className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
                  title="Cliquer pour retirer"
                >
                  {ing} <span className="opacity-60">×</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">
              Ajoute des ingrédients si tu veux (optionnel).
            </p>
          )}
        </section>

        <p className="text-xs text-gray-500">
          Prix ingrédients : +{(MOZZA_PIZZA.ingredientUnitCents / 100).toFixed(2)}€ / ingrédient.
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h4 className="text-sm font-bold text-gray-900">{title}</h4>
      <div className="mt-3 flex flex-wrap gap-3">{children}</div>
    </section>
  );
}

function Chip({
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
      className={[
        "rounded-full px-4 py-2 text-sm font-semibold transition",
        "ring-1 ring-inset focus:outline-none focus-visible:ring-4 focus-visible:ring-[#095f30]/25",
        active
          ? "bg-[#095f30] text-white ring-[#095f30]"
          : "bg-gray-50 text-gray-900 ring-gray-200 hover:bg-gray-100",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
