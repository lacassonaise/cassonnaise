"use client";

import { useState } from "react";
import Link from "next/link";

/* =========================
   HORAIRES (SOURCE : FLYER)
   =========================
   Mar–Sam : 11h–14h | 18h–22h
   Dim & Lun : 18h–22h
*/
function isOpenNow() {
  const now = new Date();
  const day = now.getDay(); // 0 = dimanche
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const time = hour + minutes / 60;

  const schedule = {
    0: [[18, 22]],                 // Dimanche
    1: [[18, 22]],                 // Lundi
    2: [[11, 14], [18, 22]],       // Mardi
    3: [[11, 14], [18, 22]],       // Mercredi
    4: [[11, 14], [18, 22]],       // Jeudi
    5: [[11, 14], [18, 22]],       // Vendredi
    6: [[11, 14], [18, 22]],       // Samedi
  };

  return schedule[day]?.some(
    ([start, end]) => time >= start && time <= end
  );
}

function OpenBadge() {
  const open = isOpenNow();

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        open
          ? "bg-green-500/15 text-green-400"
          : "bg-red-500/15 text-red-400"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          open ? "bg-green-400" : "bg-red-400"
        }`}
      />
      {open ? "Ouvert maintenant" : "Fermé"}
    </span>
  );
}

/* =========================
   FOOTER
   ========================= */
export default function Footer() {
  const [open, setOpen] = useState(null);

  const toggle = (key) => {
    setOpen(open === key ? null : key);
  };

  return (
    <footer className="mt-20 bg-gradient-to-b from-[#071826] to-[#04111c] text-white">

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6 md:grid md:grid-cols-3 md:gap-10 md:space-y-0 md:px-6">

        {/* IDENTITÉ */}
        <div>
          <h3 className="text-base font-bold">Cassonnaise</h3>

          <div className="mt-2">
            <OpenBadge />
          </div>

          <p className="mt-3 text-sm text-white/70 leading-relaxed">
            Pizza, Tacos & Burgers à Casson.<br />
            Sur place • À emporter • Livraison
          </p>

          <p className="mt-2 text-xs text-white/60">
            Mar–Sam : 11h–14h • 18h–22h<br />
            Dim & Lun : 18h–22h
          </p>

          {/* ITINÉRAIRE */}
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=3+Rue+Myotis+Casson+44390"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1F5C3A] px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
          >
            📍 Itinéraire
          </a>
        </div>

        {/* ACCORDÉON MOBILE */}
        <div className="space-y-4 md:hidden">

          {/* MAP */}
          <Accordion
            title="Nous trouver"
            isOpen={open === "map"}
            onClick={() => toggle("map")}
          >
            <div className="overflow-hidden rounded-xl border border-white/10">
              <iframe
                title="Localisation Cassonnaise"
                src="https://www.google.com/maps?q=3%20Rue%20Myotis%20Casson%2044390&output=embed"
                loading="lazy"
                className="h-48 w-full border-0"
              />
            </div>
          </Accordion>

          {/* LÉGAL */}
          <Accordion
            title="Informations légales"
            isOpen={open === "legal"}
            onClick={() => toggle("legal")}
          >
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/mentions-legales">Mentions légales</Link></li>
              <li><Link href="/politique-confidentialite">Politique de confidentialité</Link></li>
              <li><Link href="/conditions-generales">Conditions générales</Link></li>
            </ul>
          </Accordion>
        </div>

        {/* DESKTOP - MAP */}
        <div className="hidden md:block">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[#C97A3A]">
            Nous trouver
          </h4>
          <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
            <iframe
              title="Localisation Cassonnaise"
              src="https://www.google.com/maps?q=3%20Rue%20Myotis%20Casson%2044390&output=embed"
              loading="lazy"
              className="h-48 w-full border-0"
            />
          </div>
        </div>

        {/* DESKTOP - LÉGAL */}
        <div className="hidden md:block">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[#C97A3A]">
            Informations
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link href="/mentions-legales">Mentions légales</Link></li>
            <li><Link href="/politique-confidentialite">Politique de confidentialité</Link></li>
            <li><Link href="/conditions-generales">Conditions générales</Link></li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10 py-3 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Cassonnaise — Tous droits réservés
      </div>
    </footer>
  );
}

/* =========================
   ACCORDÉON
   ========================= */
function Accordion({ title, isOpen, onClick, children }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold"
      >
        {title}
        <span className="text-lg">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

