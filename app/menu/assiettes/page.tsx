"use client";

import { useCallback, useMemo, useState } from "react";
import { useCart } from "@/store/cart";
import AssietteConfigurator, {
  AssietteConfig,
} from "@/components/AssietteConfigurator";

export default function AssiettesPage() {
  const cart = useCart();

  const [config, setConfig] = useState<AssietteConfig | null>(null);
  const [priceCents, setPriceCents] = useState(0);

  const canAdd = !!config && config.meats.length > 0;

  const formattedPrice = useMemo(
    () => (priceCents / 100).toFixed(2),
    [priceCents]
  );

  const handleChange = useCallback(
    (c: AssietteConfig, p: number) => {
      setConfig(c);
      setPriceCents(p);
    },
    []
  );

  const handleAdd = useCallback(() => {
    if (!config || config.meats.length === 0) return;

    cart.add({
      productId: "assiette",
      name: `Assiette ${config.size} viande${
        config.size > 1 ? "s" : ""
      }`,
      priceCents,
      quantity: 1,
      imageUrl: "/categories/assiette.jpg",
      customizations: {
        meats: config.meats,
      },
    });
  }, [cart, config, priceCents]);

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold">🍽️ Assiettes</h1>
        <p className="text-gray-500 mt-2">
          Choisis le nombre de viandes
        </p>
      </header>

      <AssietteConfigurator onChange={handleChange} />

      <div className="mt-8 flex items-center justify-between">
        <p className="text-3xl font-bold">{formattedPrice} €</p>

        <button
          disabled={!canAdd}
          onClick={handleAdd}
          className="rounded-2xl bg-[#095f30] px-8 py-4 text-white font-bold
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Ajouter au panier
        </button>
      </div>
    </main>
  );
}
