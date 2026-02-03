"use client";

import { useCallback, useMemo, useState } from "react";
import { useCart } from "@/store/cart";
import PizzaDealConfigurator, { PizzaDealConfig } from "@/components/PizzaDealConfigurator";
import { PIZZA_DEALS } from "@/lib/exclusives";

export default function PizzaDealPage() {
  const cart = useCart();
  const [cfg, setCfg] = useState<PizzaDealConfig | null>(null);
  const [priceCents, setPriceCents] = useState<number>(PIZZA_DEALS[0].priceCents);

  const onChange = useCallback((c: PizzaDealConfig, p: number) => {
    setCfg(c);
    setPriceCents(p);
  }, []);

  const canAdd = useMemo(() => !!cfg && cfg.pizzas.every((p) => p.trim().length > 0), [cfg]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
      <PizzaDealConfigurator onChange={onChange} />

      <div className="rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-6 h-fit">
        <div className="text-sm text-gray-500">Total</div>
        <div className="mt-1 text-3xl font-extrabold">{(priceCents / 100).toFixed(2)} €</div>

        <button
          type="button"
          disabled={!canAdd}
          onClick={() => {
            if (!cfg) return;
            cart.add({
              productId: cfg.dealId,
              name: "Menu pizza à emporter",
              priceCents,
              quantity: 1,
              imageUrl: "/categories/pizza0.jpg",
              customizations: {
                exclusive: { type: "pizza-deal", ...cfg },
              },
            });
          }}
          className="mt-6 w-full rounded-2xl bg-[#095f30] py-4 text-white font-extrabold
                     shadow-[0_12px_30px_rgba(9,95,48,0.18)]
                     hover:brightness-110 active:brightness-95
                     disabled:opacity-40 disabled:cursor-not-allowed
                     focus:outline-none focus-visible:ring-4 focus-visible:ring-[#095f30]/25"
        >
          Ajouter au panier <span className="opacity-90">{(priceCents / 100).toFixed(2)} €</span>
        </button>

        <p className="mt-3 text-xs text-gray-500">
          ⚠️ Offre à emporter uniquement.
        </p>
      </div>
    </div>
  );
}
