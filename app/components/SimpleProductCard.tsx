"use client";

import { useCart } from "@/store/cart";
import { eur } from "@/lib/format";

type Props = {
  product: {
    slug: string;
    name: string;
    ingredients: string[];
    priceCents: number;
    image: string;
  };
};

export default function SimpleProductCard({ product }: Props) {
  const cart = useCart();

  return (
    <div className="rounded-2xl bg-white shadow-sm p-4 space-y-3">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded-xl"
      />

      <h3 className="font-semibold text-lg">{product.name}</h3>

      <p className="text-sm text-gray-600">
        {product.ingredients.join(", ")}
      </p>

      <div className="flex items-center justify-between pt-2">
        <span className="font-bold">{eur(product.priceCents)}</span>

        <button
          onClick={() =>
            cart.add({
              productId: product.slug,
              name: product.name,
              priceCents: product.priceCents,
              quantity: 1,
              imageUrl: product.image,
            })
          }
          className="rounded-xl bg-green-600 px-4 py-2 text-white text-sm hover:opacity-90"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}
