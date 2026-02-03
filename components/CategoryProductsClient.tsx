"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

import { eur } from "@/lib/format";

type Price = {
  label: string;
  price_cents: number;
};

type Row = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  product_prices: Price[];
};

export default function CategoryProductsClient({ slug }: { slug: string }) {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      setLoading(true);

      const { data: category, error: catError } = await supabase
        .from("categories")
        .select("id,name")
        .eq("slug", slug)
        .maybeSingle();

      if (catError || !category) {
        if (mounted) {
          setTitle("Catégorie introuvable");
          setItems([]);
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from("products")
        .select("id,name,slug,image_url,product_prices(label,price_cents)")
        .eq("category_id", category.id)
        .order("created_at", { ascending: true });

      if (!mounted) return;

      setTitle(category.name);
      setItems(data ?? []);
      setLoading(false);

      if (error) console.error(error);
    }

    fetchData();
    return () => {
      mounted = false;
    };
  }, [slug]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold">{title}</h2>

      {loading ? (
        <div className="mt-4 text-sm text-gray-600">Chargement…</div>
      ) : items.length === 0 ? (
        <div className="mt-4 rounded-2xl border p-4 text-sm text-gray-600">
          Aucun produit pour cette catégorie.
        </div>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {items.map((p) => {
            const cheapest = p.product_prices.length
              ? [...p.product_prices].sort(
                  (a, b) => a.price_cents - b.price_cents
                )[0]
              : null;

            return (
              <Link
                key={p.id}
                href={`/p/${p.slug}`}
                className="flex gap-4 rounded-2xl border p-4 hover:shadow-sm"
              >
                <div className="h-20 w-20 rounded-xl bg-gray-100 overflow-hidden">
                  {p.image_url && (
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div className="flex-1">
                  <div className="text-sm font-semibold">{p.name}</div>
                  <div className="mt-1 text-xs text-gray-600">
                    {cheapest
                      ? `À partir de ${eur(cheapest.price_cents)}`
                      : "Prix non défini"}
                  </div>
                  <div className="mt-3 text-xs font-semibold">
                    Configurer →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
