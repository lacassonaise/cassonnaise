"use client";

import Image from "next/image";
import { useCart } from "@/store/cart";
import { KIDS_MENU } from "@/lib/exclusives";

export default function KidsPage() {
  const cart = useCart();

  return (
    <div className="max-w-3xl">
      <div className="overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <div className="relative h-64 w-full">
          <Image
            src={KIDS_MENU.image}
            alt={KIDS_MENU.name}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-extrabold">{KIDS_MENU.name}</h2>
          <p className="mt-1 text-sm text-gray-500">{KIDS_MENU.description}</p>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-3xl font-extrabold">
              {(KIDS_MENU.priceCents / 100).toFixed(2)} €
            </div>

            <button
              type="button"
              onClick={() =>
                cart.add({
                  productId: KIDS_MENU.id,
                  name: KIDS_MENU.name,
                  priceCents: KIDS_MENU.priceCents,
                  quantity: 1,
                  imageUrl: KIDS_MENU.image,
                  customizations: { exclusive: { type: "kids" } },
                })
              }
              className="rounded-2xl bg-[#095f30] px-6 py-4 text-white font-extrabold
                         shadow-[0_12px_30px_rgba(9,95,48,0.18)]
                         hover:brightness-110 active:brightness-95
                         focus:outline-none focus-visible:ring-4 focus-visible:ring-[#095f30]/25"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
