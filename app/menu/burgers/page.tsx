"use client";

import { BURGERS } from "@/lib/burgers";
import BurgerConfigurator from "@/components/BurgerConfigurator";

export default function BurgersPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold">🍔 Nos Burgers</h1>
        <p className="text-gray-500 mt-2">
          Personnalise ton burger comme tu l’aimes
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BURGERS.map((burger) => (
          <BurgerConfigurator key={burger.slug} burger={burger} />
        ))}
      </div>
    </main>
  );
}
