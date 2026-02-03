"use client";

import { TEXT_MEX } from "@/lib/textmex";
import TextMexCard from "@/components/TextMexCard";

export default function TextMexPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold">🌮 Tex-Mex</h1>
        <p className="text-gray-500 mt-2">
          Pour les petites faims
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TEXT_MEX.map((item) => (
          <TextMexCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
