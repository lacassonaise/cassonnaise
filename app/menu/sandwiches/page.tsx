"use client";

import SandwichConfigurator from "@/components/SandwichConfigurator";
import { SANDWICHES } from "@/lib/sandwiches";

export default function SandwichesMenuPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      {/* Titre */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">🥪 Nos Sandwiches</h1>
        <p className="text-sm text-gray-600">
          Choisissez votre sandwich, menu ou seul, ingrédients modifiables
        </p>
      </div>

      {/* Liste sandwiches */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SANDWICHES.map((sandwich) => (
          <SandwichConfigurator
            key={sandwich.slug}
            sandwich={sandwich}
          />
        ))}
      </div>
    </div>
  );
}



