"use client";

import { useCallback, useState } from "react";
import { useCart } from "@/store/cart";
import { RIZ_CROUSTI } from "@/lib/exclusives";
import RizCroustiConfigurator, { RizCroustiConfig } from "@/components/RizCroustiConfigurator";

export default function RizCroustiPage() {
  const cart = useCart();
  const [cfg, setCfg] = useState<RizCroustiConfig | null>(null);
  const [priceCents, setPriceCents] = useState<number>(RIZ_CROUSTI.priceCents);

  const onChange = useCallback((c: RizCroustiConfig, p: number) => {
    setCfg(c);
    setPriceCents(p);
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
      <RizCroustiConfigurator onChange={onChange} />

      <div className="rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-6 h-fit">
        <div className="text-sm text-gray-500">Total</div>
        <div className="mt-1 text-3xl font-extrabold">{(priceCents / 100).toFixed(2)} €</div>

        <button
          type="button"
          disabled={!cfg}
          onClick={() => {
            if (!cfg) return;
            cart.add({
              productId: RIZ_CROUSTI.id,
              name: RIZ_CROUSTI.name,
              priceCents,
              quantity: 1,
              imageUrl: RIZ_CROUSTI.image,
              customizations: {
                exclusive: { type: "riz-crousti", ...cfg },
              },
            });
          }}
          className="mt-6 w-full rounded-2xl bg-[#095f30] py-4 text-white font-extrabold
                     shadow-[0_12px_30px_rgba(9,95,48,0.18)]
                     hover:brightness-110 active:brightness-95
                     disabled:opacity-40 disabled:cursor-not-allowed
                     focus:outline-none focus-visible:ring-4 focus-visible:ring-[#095f30]/25"
        >
          Ajouter au panier <span className="opacity-90"> {(priceCents / 100).toFixed(2)} €</span>
        </button>
      </div>
    </div>
  );
}
