"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/store/cart";
import { SALADES, Salade } from "@/lib/salades";
import SaladeConfigurator, {
  SaladeConfig,
} from "@/components/SaladeConfigurator";

export default function SaladesMenu() {
  const cart = useCart();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SALADES.map((salade) => (
        <SaladeCard key={salade.slug} salade={salade} />
      ))}
    </div>
  );

  function SaladeCard({ salade }: { salade: Salade }) {
    const [config, setConfig] = useState<SaladeConfig | null>(null);
    const [price, setPrice] = useState<number>(salade.price);

    const canAdd = useMemo(() => !!config, [config]);

    return (
      <div className="space-y-4">
        <SaladeConfigurator
          salade={salade}
          onChange={(c, p) => {
            setConfig(c);
            setPrice(p);
          }}
        />

        <button
          type="button"
          disabled={!canAdd}
          onClick={() =>
            cart.add({
              productId: salade.slug,
              name: salade.name,
              priceCents: price,
              quantity: 1,
              imageUrl: salade.image,
              customizations: {
                salade: config,
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
