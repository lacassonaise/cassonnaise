"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ASSIETTE_PRICES,
  MEAT_COUNT_BY_ASSIETTE,
  ASSIETTE_MEATS,
  AssietteSize,
} from "@/lib/assiettes";

/* Données fixes (menu papier) */
const SIDES = ["Frites", "Salade"];
const VEGGIES = ["Oignons", "Tomates"];

export type AssietteConfig = {
  size: AssietteSize;
  meats: string[];
  removedSides: string[];
  removedVeggies: string[];
  extraSalad: boolean;
};

type Props = {
  onChange: (config: AssietteConfig, priceCents: number) => void;
};

export default function AssietteConfigurator({ onChange }: Props) {
  const [size, setSize] = useState<AssietteSize>(1);
  const [meats, setMeats] = useState<string[]>([]);
  const [removedSides, setRemovedSides] = useState<string[]>([]);
  const [removedVeggies, setRemovedVeggies] = useState<string[]>([]);
  const [extraSalad, setExtraSalad] = useState(false);

  const maxMeats = MEAT_COUNT_BY_ASSIETTE[size];
  const remaining = maxMeats - meats.length;

  /* -------- Viandes -------- */
  function toggleMeat(meat: string) {
    setMeats((prev) => {
      if (prev.includes(meat)) return prev.filter((m) => m !== meat);
      if (prev.length >= maxMeats) return prev;
      return [...prev, meat];
    });
  }

  /* -------- Accompagnements -------- */
  function toggleSide(side: string) {
    setRemovedSides((prev) =>
      prev.includes(side)
        ? prev.filter((s) => s !== side)
        : [...prev, side]
    );
  }

  /* -------- Crudités -------- */
  function toggleVeggie(veg: string) {
    setRemovedVeggies((prev) =>
      prev.includes(veg)
        ? prev.filter((v) => v !== veg)
        : [...prev, veg]
    );
  }

  const priceCents = useMemo(
    () => ASSIETTE_PRICES[size],
    [size]
  );

  useEffect(() => {
    if (meats.length > maxMeats) {
      setMeats((m) => m.slice(0, maxMeats));
      return;
    }

    onChange(
      {
        size,
        meats,
        removedSides,
        removedVeggies,
        extraSalad,
      },
      priceCents
    );
  }, [
    size,
    meats,
    removedSides,
    removedVeggies,
    extraSalad,
    maxMeats,
    priceCents,
    onChange,
  ]);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 space-y-10">
      {/* Taille */}
      <Section title="Nombre de viandes">
        {[1, 2, 3].map((s) => (
          <Chip
            key={s}
            active={size === s}
            onClick={() => setSize(s as AssietteSize)}
          >
            Assiette {s} viande{s > 1 && "s"}
          </Chip>
        ))}
      </Section>

      {/* Viandes */}
      <Section
        title={`Choix des viandes ${
          remaining > 0 ? `(encore ${remaining})` : "(complet)"
        }`}
      >
        {ASSIETTE_MEATS.map((m) => (
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

      {/* Accompagnements */}
      <Section title="Accompagnements (clique pour retirer)">
        {SIDES.map((side) => {
          const removed = removedSides.includes(side);

          return (
            <Chip
              key={side}
              active={!removed}
              onClick={() => toggleSide(side)}
            >
              {removed ? `Sans ${side}` : side}
            </Chip>
          );
        })}
      </Section>

      {/* Crudités */}
      <Section title="Crudités">
        {VEGGIES.map((veg) => {
          const removed = removedVeggies.includes(veg);

          return (
            <Chip
              key={veg}
              active={!removed}
              onClick={() => toggleVeggie(veg)}
            >
              {removed ? `Sans ${veg}` : veg}
            </Chip>
          );
        })}
      </Section>

      {/* + Salade */}
      <label className="flex items-center gap-3 text-sm font-semibold">
        <input
          type="checkbox"
          checked={extraSalad}
          onChange={(e) => setExtraSalad(e.target.checked)}
          className="h-5 w-5 accent-black"
        />
        + Salade supplémentaire
      </label>

      <p className="text-sm text-gray-500">
        Frites et salade incluses.  
        Vous pouvez retirer des éléments ou ajouter de la salade sans supplément.
      </p>
    </div>
  );
}

/* ---------- UI ---------- */

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
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition
        ${
          active
            ? "bg-[#095f30] text-white"
            : "bg-gray-100 hover:bg-gray-200"
        }
        ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}


