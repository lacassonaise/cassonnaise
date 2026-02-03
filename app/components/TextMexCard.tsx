"use client";

import Image from "next/image";
import { TextMexItem } from "@/lib/textmex";
import { useCart } from "@/store/cart";

export default function TextMexCard({ item }: { item: TextMexItem }) {
  const cart = useCart();

  return (
    <div className="group bg-white rounded-3xl shadow hover:shadow-xl transition overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-40 w-full">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition"
        />
      </div>

      {/* Contenu */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div>
          <h2 className="font-semibold text-lg">{item.name}</h2>
          <p className="text-sm text-gray-500">{item.description}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="font-bold text-lg">
            {(item.price / 100).toFixed(2)} €
          </p>

          <button
            onClick={() =>
              cart.add({
                productId: item.id,
                name: item.name,
                priceCents: item.price,
                quantity: 1,
                imageUrl: item.image,
              })
            }
            className="rounded-xl bg-[#095f30] px-4 py-2 text-white font-bold
                       hover:bg-[#074d27] transition"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
