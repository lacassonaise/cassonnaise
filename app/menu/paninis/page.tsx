"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/store/cart";
import { PANINIS, Panini } from "@/lib/paninis";
import PaniniConfigurator, { PaniniConfig } from "@/components/PaniniConfigurator";

export default function PaninisMenu() {
  const cart = useCart();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {PANINIS.map((panini) => (
        <PaniniCard key={panini.slug} panini={panini} />
      ))}
    </div>
  );

  function PaniniCard({ panini }: { panini: Panini }) {
    const [config, setConfig] = useState<PaniniConfig | null>(null);
    const [price, setPrice] = useState(panini.prices.seul);

    const canAdd = useMemo(() => !!config, [config]);

    return (
      <div className="space-y-4">
        <PaniniConfigurator
          panini={panini}
          onChange={(c, p) => {
            setConfig(c);
            setPrice(p);
          }}
        />

        <button
          disabled={!canAdd}
          onClick={() =>
            cart.add({
              productId: panini.slug,
              name: panini.name,
              priceCents: price,
              quantity: 1,
              imageUrl: panini.image,
              customizations: {
                panini: config,
              },
            })
          }
          className="w-full rounded-2xl bg-[#095f30] py-3 text-white font-extrabold disabled:opacity-40"
        >
          Ajouter au panier  {(price / 100).toFixed(2)} €
        </button>
      </div>
    );
  }
}

