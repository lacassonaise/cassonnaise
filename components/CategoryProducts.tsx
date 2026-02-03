"use client";

import PizzaConfigurator from "./PizzaConfigurator";
import { Pizza } from "@/lib/pizzas";

type Props = {
  pizzas: Pizza[];
};

export default function CategoryProducts({ pizzas }: Props) {
  if (pizzas.length === 0) {
    return (
      <div className="rounded-2xl border p-4 text-sm text-gray-600">
        Aucun produit disponible.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {pizzas.map((pizza) => (
        <PizzaConfigurator key={pizza.slug} pizza={pizza} />
      ))}
    </div>
  );
}
