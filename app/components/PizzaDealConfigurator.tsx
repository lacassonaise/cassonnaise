"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { PIZZA_DEALS, PizzaDealId } from "@/lib/exclusives";

export type PizzaDealConfig = {
  dealId: PizzaDealId;
  pizzas: string[]; // saisis par le client
  takeawayOnly: true;
};

type Props = {
  onChange: (config: PizzaDealConfig, priceCents: number) => void;
};

export default function PizzaDealConfigurator({ onChange }: Props) {
  const [dealId, setDealId] = useState<PizzaDealId>("deal-senior");
  const [pizzas, setPizzas] = useState<string[]>(["", ""]);

  const deal = useMemo(() => PIZZA_DEALS.find((d) => d.id === dealId)!, [dealId]);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    // ajuste la taille du tableau selon le deal
    setPizzas((prev) => {
      const next = [...prev];
      while (next.length < deal.pizzaCount) next.push("");
      return next.slice(0, deal.pizzaCount);
    });
  }, [deal.pizzaCount]);

  const priceCents = deal.priceCents;

  useEffect(() => {
    onChangeRef.current(
      { dealId, pizzas, takeawayOnly: true },
      priceCents
    );
  }, [dealId, pizzas, priceCents]);

  function setPizza(index: number, value: string) {
    setPizzas((prev) => prev.map((p, i) => (i === index ? value : p)));
  }

  const isComplete = useMemo(
    () => pizzas.every((p) => p.trim().length > 0),
    [pizzas]
  );

  return (
    <div className="rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold tracking-tight">Menu pizza à emporter</h3>
            <p className="mt-1 text-sm text-gray-500">
              Uniquement à emporter — indique les pizzas choisies
            </p>
          </div>

          <div className="rounded-2xl bg-[#095f30]/10 px-4 py-2 text-[#095f30]">
            <div className="text-xs font-semibold uppercase tracking-wide">Prix</div>
            <div className="text-lg font-extrabold">{(priceCents / 100).toFixed(2)} €</div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      <div className="p-6 space-y-6">
        <section>
          <h4 className="text-sm font-bold text-gray-900">Choix du menu</h4>
          <div className="mt-3 flex flex-wrap gap-3">
            {PIZZA_DEALS.map((d) => (
              <Chip key={d.id} active={dealId === d.id} onClick={() => setDealId(d.id)}>
                {d.name} — {(d.priceCents / 100).toFixed(2)} €
              </Chip>
            ))}
          </div>
        </section>

        <div className="rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-200">
          <div className="text-sm font-semibold text-gray-900">
            {deal.pizzaCount} pizza(s) {deal.pizzaSize === "senior" ? "Sénior" : "Méga"} + {deal.drinksLabel}
          </div>
          <div className="mt-1 text-xs text-gray-500">À emporter uniquement</div>
        </div>

        <section className="space-y-3">
          <h4 className="text-sm font-bold text-gray-900">Pizzas au choix</h4>
          {pizzas.map((p, i) => (
            <input
              key={i}
              value={p}
              onChange={(e) => setPizza(i, e.target.value)}
              placeholder={`Pizza ${i + 1}`}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#095f30]/40 focus:ring-4 focus:ring-[#095f30]/10"
            />
          ))}
          {!isComplete && (
            <p className="text-sm text-gray-500">
              Renseigne toutes les pizzas pour valider.
            </p>
          )}
        </section>
      </div>
    </div>
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
