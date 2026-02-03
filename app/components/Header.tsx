"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const TEL_NUMBER = "0982282214";
const TEL_DISPLAY = "09 82 28 22 14";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-[#0B2A45] via-[#0c406b] to-[#071826] shadow-md">

      {/* BARRE PRINCIPALE */}
      <div className="mx-auto flex flex-col items-center gap-3 px-4 py-3 md:flex-row md:justify-between md:px-8 md:py-4 max-w-6xl">

        {/* LOGO */}
        <Link href="/" className="flex flex-col items-center text-center gap-1">
          <div className="relative h-24 w-24 sm:h-20 sm:w-20 md:h-24 md:w-24">
            <Image
              src="/logo.webp"
              alt="Cassonnaise Restaurant"
              fill
              sizes="96px"
              priority
              className="object-contain drop-shadow-md"
            />
          </div>

          <p className="text-[11px] sm:text-xs font-medium text-[#C97A3A] tracking-wide">
            Restaurant • Pizzas • Tacos • Burgers
          </p>
        </Link>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">

          {/* TELEPHONE */}
          <a
            href={`tel:${TEL_NUMBER}`}
            className="rounded-full bg-[#1F5C3A] px-4 py-2 text-xs sm:text-sm font-bold text-white hover:opacity-90"
          >
            📞 {TEL_DISPLAY}
          </a>

          {/* BURGER */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Ouvrir le menu"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <div className="space-y-1">
              <span className="block h-0.5 w-4 bg-white"></span>
              <span className="block h-0.5 w-4 bg-white"></span>
              <span className="block h-0.5 w-4 bg-white"></span>
            </div>
          </button>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-2">
            <Link href="/menu" className="rounded-full px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10">
              Menu
            </Link>
            <Link href="/contact" className="rounded-full px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10">
              Contact
            </Link>
            <Link href="/compte" className="rounded-full px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10">
              Mon compte
            </Link>
          </nav>
        </div>
      </div>

      {/* OVERLAY + MENU MOBILE */}
      {open && (
        <>
          {/* BLUR OVERLAY */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* MENU MOBILE */}
          <div className="fixed top-[96px] left-0 right-0 z-50 md:hidden bg-[#081F33] shadow-lg">
            <nav className="flex flex-col items-center gap-1 py-4">
              {["menu", "contact", "compte"].map((item) => (
                <Link
                  key={item}
                  href={`/${item}`}
                  onClick={() => setOpen(false)}
                  className="w-full py-3 text-center text-white font-semibold hover:bg-white/10"
                >
                  {item === "menu" ? "Menu" : item === "contact" ? "Contact" : "Mon compte"}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}

      {/* BARRE SIGNATURE */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1F5C3A] via-[#9C5A2E] to-[#1F5C3A]" />
    </header>
  );
}


