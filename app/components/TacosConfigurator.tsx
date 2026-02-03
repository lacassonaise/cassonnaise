"use client";

import { useEffect, useMemo, useState } from "react";
import {
  TACO_PRICES,
  MENU_PRICE,
  EXTRA_PRICE,
  MEAT_COUNT_BY_SIZE,
  BASES,
  MEATS,
  SAUCES,
  EXTRAS,
  TacoSize,
  TacoBase,
} from "@/lib/tacos";

export type TacosConfig = {
  size: TacoSize;
  base: TacoBase;
  meats: string[];
  sauces: string[];
  extras: string[];
  menu: boolean;
};

type Props = {
  onChange: (config: TacosConfig, priceCents: number) => void;
};

export default function TacosConfigurator({ onChange }: Props) {
  const [size, setSize] = useState<TacoSize>("M");
  const [base, setBase] = useState<TacoBase>("tortilla");
  const [meats, setMeats] = useState<string[]>([]);
  const [sauces, setSauces] = useState<string[]>([]);
  const [extras, setExtras] = useState<string[]>([]);
  const [menu, setMenu] = useState(false);

  const maxMeats = MEAT_COUNT_BY_SIZE[size];

  function toggle(
    set: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
    max?: number
  ) {
    set((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      if (max !== undefined && prev.length >= max) return prev;
      return [...prev, value];
    });
  }

  const priceCents = useMemo(() => {
    return (
      TACO_PRICES[size] +
      (menu ? MENU_PRICE : 0) +
      extras.length * EXTRA_PRICE
    );
  }, [size, menu, extras]);

  useEffect(() => {
    if (meats.length > maxMeats) {
      setMeats((m) => m.slice(0, maxMeats));
      return;
    }

    onChange(
      { size, base, meats, sauces, extras, menu },
      priceCents
    );
  }, [size, base, meats, sauces, extras, menu, priceCents, maxMeats, onChange]);

  const selected =
    "bg-[#1F5C3A] text-white shadow-sm";
  const unselected =
    "bg-gray-100 hover:bg-gray-200";

  return (
    <div className="space-y-6">
      {/* Taille */}
      <section>
        <h3 className="font-semibold">Taille</h3>
        <div className="flex gap-2 mt-2">
          {(["M", "L", "XL"] as TacoSize[]).map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition
                ${size === s ? selected : unselected}`}
            >
              {s} ({MEAT_COUNT_BY_SIZE[s]} viande
              {MEAT_COUNT_BY_SIZE[s] > 1 && "s"})
            </button>
          ))}
        </div>
      </section>

      {/* Base */}
      <section>
        <h3 className="font-semibold">Base</h3>
        <div className="flex gap-2 mt-2">
          {BASES.map((b) => (
            <button
              key={b}
              onClick={() => setBase(b)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition
                ${base === b ? selected : unselected}`}
            >
              {b === "tortilla" ? "Tortilla gratinée" : "Bowl"}
            </button>
          ))}
        </div>
      </section>

      {/* Viandes */}
      <section>
        <h3 className="font-semibold">
          Viandes <span className="text-xs text-[#C97A3A]">(max {maxMeats})</span>
        </h3>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {MEATS.map((m) => (
            <button
              key={m}
              onClick={() => toggle(setMeats, m, maxMeats)}
              className={`px-3 py-2 rounded-xl text-sm transition
                ${meats.includes(m) ? selected : unselected}`}
            >
              {m}
            </button>
          ))}
        </div>
      </section>

      {/* Sauces */}
      <section>
        <h3 className="font-semibold">Sauces</h3>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {SAUCES.map((s) => (
            <button
              key={s}
              onClick={() => toggle(setSauces, s)}
              className={`px-3 py-2 rounded-xl text-sm transition
                ${sauces.includes(s) ? selected : unselected}`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Extras */}
      <section>
        <h3 className="font-semibold">
          Extras <span className="text-xs text-gray-500">(+1,50€)</span>
        </h3>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {EXTRAS.map((e) => (
            <button
              key={e}
              onClick={() => toggle(setExtras, e)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition
                ${
                  extras.includes(e)
                    ? "bg-[#C97A3A] text-white"
                    : unselected
                }`}
            >
              {e}
            </button>
          ))}
        </div>
      </section>

      {/* Menu */}
      <label className="flex items-center gap-3 text-sm font-medium">
        <input
          type="checkbox"
          checked={menu}
          onChange={(e) => setMenu(e.target.checked)}
          className="accent-[#C97A3A]"
        />
        Menu (Frites 🍟 + Boisson 🥤)
      </label>
    </div>
  );
}

