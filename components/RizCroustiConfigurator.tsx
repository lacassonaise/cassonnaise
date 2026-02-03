"use client";

import React, { useEffect, useRef, useState } from "react";
import { RIZ_CROUSTI, RizCroustiSauce } from "@/lib/exclusives";

export type RizCroustiConfig = {
  // Sauce secrète incluse (fixe)
  secretSauce: true;
  // Sauce au choix (piquante / sucrée / sans)
  sauceChoice: RizCroustiSauce;
};

type Props = {
  onChange: (config: RizCroustiConfig, priceCents: number) => void;
};

export default function RizCroustiConfigurator({ onChange }: Props) {
  const [sauceChoice, setSauceChoice] = useState<RizCroustiSauce>("piquante");

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onChangeRef.current(
      { secretSauce: true, sauceChoice },
      RIZ_CROUSTI.priceCents
    );
  }, [sauceChoice]);

  return (
    <div className="rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-extrabold tracking-tight"> Riz crousti</h3>
        <p className="mt-1 text-sm text-gray-500">
          Riz + poulet crousti + sauce secrète + sauce au choix
        </p>
      </div>

      <div className="h-px bg-gray-100" />

      <div className="p-6 space-y-5">
        <div className="rounded-2xl bg-[#095f30]/10 px-4 py-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#095f30]">
            Inclus
          </div>
          <div className="mt-1 text-sm font-semibold text-gray-900">
            Sauce secrète ✅
          </div>
        </div>

        <section>
          <h4 className="text-sm font-bold text-gray-900">Sauce au choix</h4>
          <div className="mt-3 flex flex-wrap gap-3">
            {RIZ_CROUSTI.sauceChoices.map((s) => (
              <Chip
                key={s}
                active={sauceChoice === s}
                onClick={() => setSauceChoice(s)}
              >
                {s === "piquante" ? "Piquante" : s === "sucree" ? "Sucrée" : "Sans"}
              </Chip>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-sm font-semibold transition",
        "ring-1 ring-inset focus:outline-none focus-visible:ring-4 focus-visible:ring-[#095f30]/25",
        active
          ? "bg-[#095f30] text-white ring-[#095f30]"
          : "bg-gray-50 text-gray-900 ring-gray-200 hover:bg-gray-100",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
