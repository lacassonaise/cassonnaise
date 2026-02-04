"use client";
const cart = useCart();

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/store/cart";
import { eur } from "@/lib/format";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const cart = useCart();

  const total = cart.totalCents();
  const count = cart.count();

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#1F5C3A] px-5 py-3 text-white shadow-lg hover:opacity-90 transition"
      >
        <span className="text-sm font-semibold">Panier</span>
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
          {count}
        </span>
      </button>

      {/* Backdrop */}
      {open && (
        <div
         className="fixed bottom-0 right-0 z-40 bg-black/40 backdrop-blur-sm"
          style={{ inset: 0 }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
  className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl
    transition-transform duration-300 flex flex-col
    ${open ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"}
  `}
>
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-5 shrink-0">
          <div className="text-lg font-bold">Votre panier</div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Items (scrollable) */}
        <div className="flex-1 overflow-auto px-5 space-y-4">
          {cart.items.length === 0 ? (
            <div className="rounded-2xl bg-gray-50 p-6 text-center text-sm text-gray-500">
              Votre panier est vide 🍕
            </div>
          ) : (
            cart.items.map((it) => {
              const c = it.customizations?.size;

              return (
                <div
                  key={it.id}
                  className="flex gap-3 rounded-2xl bg-gray-50 p-3 shadow-sm"
                >
                  {/* Image */}
                  <div className="h-16 w-16 overflow-hidden rounded-xl bg-gray-200">
                    {it.imageUrl && (
                      <img
                        src={it.imageUrl}
                        alt={it.name}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  {/* Infos */}
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{it.name}</div>
                    <div className="text-xs text-gray-500">
                      {eur(it.priceCents)} / unité
                    </div>

                    {c && (
                      <div className="mt-1 space-y-0.5 text-xs text-gray-500">
                        <div>
                          Taille {c.size} · Base {c.base}
                          {c.cheesy && " · Cheesy crust"}
                        </div>

                        {c.ingredients?.length > 0 && (
                          <div>
                            Ingrédients : {c.ingredients.join(", ")}
                          </div>
                        )}

                        {c.removedIngredients?.length > 0 && (
                          <div className="text-red-500">
                            Sans : {c.removedIngredients.join(", ")}
                          </div>
                        )}
                      </div>
                    )}
{/* 🌯 DÉTAILS TACOS */}
{c?.meats && (
  <div className="mt-1 space-y-0.5 text-xs text-gray-500">
    <div>
      Tacos {c?.size?.toUpperCase()} · {c?.base === "tortilla" ? "Tortilla" : "Bowl"}
     
    </div>

    <div>Viandes : {c.meats.join(", ")}</div>

    {c?.sauces?.length > 0 && (
      <div>Sauces : {c.sauces.join(", ")}</div>
    )}

    {c?.extras?.length > 0 && (
      <div>Extras : {c.extras.join(", ")}</div>
    )}

    {c?.menu && (
      <div className="font-semibold text-green-700">
        Menu (frites + boisson)
      </div>
    )}
  </div>
)}

                    {/* Quantité */}
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => cart.dec(it.id)}
                        className="h-7 w-7 rounded-full bg-white shadow hover:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="text-sm">{it.quantity}</span>

                      <button
                        onClick={() => cart.inc(it.id)}
                        className="h-7 w-7 rounded-full bg-white shadow hover:bg-gray-100"
                      >
                        +
                      </button>

                      <button
                        onClick={() => cart.remove(it.id)}
                        className="ml-auto text-xs text-red-600 hover:underline"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer (always visible) */}
        <div className="shrink-0 px-5 py-4 bg-white shadow-[0_-6px_12px_-6px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total</span>
            <span className="text-xl font-bold">{eur(total)}</span>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => cart.clear()}
              className="w-1/2 rounded-xl bg-gray-200 py-3 text-sm font-semibold hover:bg-gray-200"
            >
              Vider
            </button>

            <Link
              href="/checkout"
              
              onClick={() => setOpen(false)}

              className="w-1/2 rounded-xl bg-[#1F5C3A] py-3 text-center text-sm font-semibold text-white hover:opacity-90"
            >
              Commander
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}



