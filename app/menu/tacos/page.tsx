"use client";

import { useCallback, useMemo, useState } from "react";
import { useCart } from "@/store/cart";
import TacosConfigurator, { TacosConfig } from "@/components/TacosConfigurator";

export default function TacosPage() {
  const cart = useCart();

  const [config, setConfig] = useState<TacosConfig | null>(null);
  const [priceCents, setPriceCents] = useState<number>(0);

  const canAddToCart = useMemo(() => {
    return !!config && Array.isArray(config.meats) && config.meats.length > 0;
  }, [config]);

  const formattedPrice = useMemo(() => {
    return (priceCents / 100).toFixed(2);
  }, [priceCents]);

  const handleChange = useCallback((c: TacosConfig, pCents: number) => {
    setConfig(c);
    setPriceCents(pCents);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!config) return;

    // Sécurité supplémentaire
    if (!Array.isArray(config.meats) || config.meats.length === 0) return;

    cart.add({
      productId: "tacos",
      name: `Tacos ${String(config.size).toUpperCase()}`,
      priceCents,
      quantity: 1,
      imageUrl: "/categories/tacos.jpg",
     customizations: {
  meats: config.meats,
  sauces: config.sauces,
  menu: config.menu,
}

    });
  }, [cart, config, priceCents]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-3xl font-bold">🌯 Tacos & Bowls</h1>
      <p className="text-2xl font-bold mt-2">
          Choisis la taille, les viandes, les sauces et options
        </p>
      <TacosConfigurator onChange={handleChange} />

      <button
        type="button"
        disabled={!canAddToCart}
        onClick={handleAddToCart}
        aria-disabled={!canAddToCart}
        className="mt-6 w-full rounded-xl bg-[#095f30] py-4 text-white font-bold disabled:opacity-50"
      >
        Ajouter au panier <span className="opacity-90">  {formattedPrice} €</span>
      </button>
    </main>
  );
}

