"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";


import { eur } from "@/lib/format";
import { useParams, useRouter } from "next/navigation";

type Order = {
  id: string;
  created_at: string;
  total_cents: number;
  status: string;
  delivery_type: string | null;
  delivery_address: string | null;
  phone: string | null;
  note: string | null;
  delivery_fee_cents: number | null;
  delivery_free: boolean | null;
};

type Item = {
  id: string;
  name_snapshot: string;
  quantity: number;
  price_cents: number;
  customizations_json: any;
};

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    async function load() {
      setErr("");
      const { data: userRes } = await supabase.auth.getUser();
      if (!userRes.user) {
        router.push("/compte");
        return;
      }

      const { data: o, error: oErr } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

      if (oErr) {
        setErr("Commande introuvable.");
        setLoading(false);
        return;
      }

      const { data: its, error: iErr } = await supabase
        .from("order_items")
        .select("id, name_snapshot, quantity, price_cents, customizations_json")
        .eq("order_id", id)
        .order("created_at", { ascending: true });

      if (iErr) {
        setErr("Impossible de charger les articles.");
        setLoading(false);
        return;
      }

      setOrder(o as any);
      setItems((its ?? []) as any);
      setLoading(false);
    }

    load();
  }, [id, router]);

  if (loading) return <div className="p-8 text-center text-sm text-gray-500">Chargement…</div>;
  if (err) return <div className="p-8 text-center text-sm text-red-600">{err}</div>;
  if (!order) return null;

  const deliveryLabel = order.delivery_type === "delivery" ? "Livraison" : "À emporter";

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow ring-1 ring-black/5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Commande #{order.id.slice(0, 8)}</h1>
            <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleString("fr-FR")}</p>
          </div>
          <span className={`text-xs font-semibold ${order.status === "paid" ? "text-green-600" : "text-orange-600"}`}>
            {order.status === "paid" ? "Payée" : "En attente"}
          </span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
          <div className="rounded-2xl bg-gray-50 p-4">
            <div className="text-xs text-gray-500">Mode</div>
            <div className="font-semibold text-gray-900">{deliveryLabel}</div>
            {order.delivery_type === "delivery" && order.delivery_address ? (
              <div className="mt-1 text-gray-700">{order.delivery_address}</div>
            ) : null}
          </div>

          <div className="rounded-2xl bg-gray-50 p-4">
            <div className="text-xs text-gray-500">Contact</div>
            <div className="font-semibold text-gray-900">{order.phone ?? "—"}</div>
            {order.note ? <div className="mt-1 text-gray-700">Note : {order.note}</div> : null}
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow ring-1 ring-black/5">
        <h2 className="text-lg font-semibold text-gray-900">Articles</h2>

        <div className="mt-4 space-y-3">
          {items.map((it) => (
            <div key={it.id} className="flex items-start justify-between gap-3 rounded-2xl border border-gray-100 p-4">
              <div>
                <div className="font-semibold text-gray-900">
                  {it.quantity} × {it.name_snapshot}
                </div>
                {/* Affichage simple des customizations */}
                {it.customizations_json && Object.keys(it.customizations_json).length > 0 ? (
                  <pre className="mt-2 text-xs text-gray-600 whitespace-pre-wrap">
                    {JSON.stringify(it.customizations_json, null, 2)}
                  </pre>
                ) : null}
              </div>
              <div className="font-bold text-gray-900">
                {eur(it.price_cents * it.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-gray-700">
            <span>Frais de livraison</span>
            <span>
              {order.delivery_type === "delivery"
                ? order.delivery_free
                  ? "Offerte"
                  : eur(order.delivery_fee_cents ?? 0)
                : eur(0)}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{eur(order.total_cents)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => router.push("/compte")}
        className="w-full rounded-2xl bg-[#1F5C3A] py-4 text-sm font-semibold text-white"
      >
        Retour
      </button>
    </div>
  );
}
