"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useCart } from "@/store/cart";
import { REFRESHMENTS, RefreshmentItem } from "@/lib/refreshments";

export default function RefreshmentsMenu() {
  const cart = useCart();

  const desserts = useMemo(
    () => REFRESHMENTS.filter((x) => x.category === "dessert"),
    []
  );
  const icecreams = useMemo(
    () => REFRESHMENTS.filter((x) => x.category === "icecream"),
    []
  );
  const drinks = useMemo(
    () => REFRESHMENTS.filter((x) => x.category === "drink"),
    []
  );

  function add(item: RefreshmentItem) {
    cart.add({
      productId: item.id,
      name: item.meta ? `${item.name} ${item.meta}` : item.name,
      priceCents: item.price,
      quantity: 1,
      imageUrl: item.image || null,
      customizations: {
        refreshment: {
          category: item.category,
          meta: item.meta,
        },
      },
    });
  }

  return (
    <div className="space-y-12">
      <Header />

      <Section title="🍰 Desserts">
        <Grid>
          {desserts.map((item) => (
            <Card key={item.id} item={item} onAdd={() => add(item)} />
          ))}
        </Grid>
      </Section>

      <Section title="🍦 Glaces">
        <Grid>
          {icecreams.map((item) => (
            <Card key={item.id} item={item} onAdd={() => add(item)} />
          ))}
        </Grid>
      </Section>

      <Section title="🥤 Boissons">
        <Grid>
          {drinks.map((item) => (
            <Card key={item.id} item={item} onAdd={() => add(item)} />
          ))}
        </Grid>
      </Section>
    </div>
  );
}

/* ---------- UI ---------- */

function Header() {
  return (
    <header>
      <h1 className="text-4xl font-extrabold">🍰 Desserts • 🍦 Glaces • 🥤 Boissons</h1>
      <p className="mt-2 text-gray-500">
        Termine en douceur ou ajoute une boisson
      </p>
    </header>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <h2 className="text-xl font-extrabold">{title}</h2>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

function Card({ item, onAdd }: { item: RefreshmentItem; onAdd: () => void }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition overflow-hidden">
      <div className="relative h-40 w-full">
        <Image
          src={item.image || "/categories/dessert.jpg"}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-extrabold">{item.name}</h3>
            {item.meta && <p className="text-xs text-gray-500 mt-1">{item.meta}</p>}
          </div>

          <div className="text-lg font-extrabold">
            {(item.price / 100).toFixed(2)} €
          </div>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="mt-4 w-full rounded-2xl bg-[#095f30] py-3 text-white font-extrabold"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}
