"use client";

import { useCallback, useMemo, useState } from "react";
import { useCart } from "@/store/cart";
import PizzawichConfigurator, {
  PizzawichConfig,
} from "@/components/PizzawichConfigurator";

export default function PizzawichsMenu() {
  const cart = useCart();
  const [config, setConfig] = useState<PizzawichConfig | null>(null);
  const [priceCents, setPriceCents] = useState<number>(0);

  const handleChange = useCallback((c: PizzawichConfig, p: number) => {
    setConfig(c);
    setPriceCents(p);
  }, []);

  const canAdd = useMemo(() => {
    return !!config && config.meats.length > 0;
  }, [config]);

  return (
    <div className="space-y-8">
      <div className="max-w-xl mx-auto">
        <PizzawichConfigurator onChange={handleChange} />
      </div>

      <div className="max-w-xl mx-auto">
        <button
          type="button"
          disabled={!canAdd}
          onClick={() => {
            if (!config) return;

            cart.add({
              productId: "pizzawich",
              name: `Pizzawich ${config.size} viande(s)`,
              priceCents,
              quantity: 1,
              imageUrl: "/categories/pizzawichs.jpg",
              customizations: { pizzawich: config },
            });
          }}
          className="w-full rounded-2xl bg-[#095f30] py-4 text-white font-extrabold disabled:opacity-40
                     outline-none focus:outline-none focus-visible:outline-none
                     focus-visible:ring-4 focus-visible:ring-[#095f30]/25"
        >
          Ajouter au panier{" "}
          <span className="opacity-90"> {(priceCents / 100).toFixed(2)} €</span>
        </button>
      </div>
    </div>
  );
}


