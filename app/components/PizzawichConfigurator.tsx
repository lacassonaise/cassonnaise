"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  PIZZAWICH_PRICES,
  PIZZAWICH_MEATS,
  PizzawichSize,
  PizzawichBase,
} from "@/lib/pizzawichs";

export type PizzawichConfig = {
  size: PizzawichSize;
  base: PizzawichBase;
  meats: string[];
};

type Props = {
  onChange: (config: PizzawichConfig, price: number) => void;
};

export default function PizzawichConfigurator({ onChange }: Props) {
  const [size, setSize] = useState<PizzawichSize>(1);
  const [base, setBase] = useState<PizzawichBase>("tomate");
  const [meats, setMeats] = useState<string[]>([]);

  const remaining = size - meats.length;

  function toggleMeat(meat: string) {
    setMeats((prev) => {
      if (prev.includes(meat)) return prev.filter((m) => m !== meat);
      if (prev.length >= size) return prev;
      return [...prev, meat];
    });
  }

  const price = useMemo(() => PIZZAWICH_PRICES[size], [size]);

  // ✅ Garde toujours la dernière version de onChange sans la mettre en deps
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // ✅ Déclenche seulement sur changement réel de config/price
  useEffect(() => {
    onChangeRef.current({ size, base, meats }, price);
  }, [size, base, meats, price]);

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* HEADER */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">🍕 Pizzawich</h2>
        <p className="text-gray-500">Sandwich dans une pâte à pizza</p>
      </div>

      {/* CONTENU */}
      <div className="p-6 space-y-8">
        {/* Base */}
        <Section title="Base">
          {(["tomate", "creme"] as PizzawichBase[]).map((b) => (
            <Chip key={b} active={base === b} onClick={() => setBase(b)}>
              {b === "tomate" ? "Tomate" : "Crème fraîche"}
            </Chip>
          ))}
        </Section>

        {/* Nombre de viandes */}
        <Section title="Nombre de viandes">
          {[1, 2, 3].map((s) => (
            <Chip
              key={s}
              active={size === s}
              onClick={() => {
                setSize(s as PizzawichSize);
                setMeats([]);
              }}
            >
              {s} viande{s > 1 && "s"}
            </Chip>
          ))}
        </Section>

        {/* Viandes */}
        <Section
          title={`Choix des viandes ${
            remaining > 0 ? `(encore ${remaining})` : "(complet)"
          }`}
        >
          {PIZZAWICH_MEATS.map((m) => (
            <Chip
              key={m}
              active={meats.includes(m)}
              disabled={!meats.includes(m) && remaining === 0}
              onClick={() => toggleMeat(m)}
            >
              {m}
            </Chip>
          ))}
        </Section>
      </div>

      {/* FOOTER */}
      <div className="p-6 border-t flex items-center justify-between">
        <p className="text-2xl font-bold">{(price / 100).toFixed(2)} €</p>
      </div>
    </div>
  );
}

/* UI */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="flex flex-wrap gap-3">{children}</div>
    </section>
  );
}

function Chip({
  active,
  disabled,
  onClick,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition
        ${active ? "bg-[#095f30] text-white" : "bg-gray-100 hover:bg-gray-200"}
        ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}

