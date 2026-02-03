import { notFound } from "next/navigation";
import { EXCLUSIVES_INDEX, type ExclusiveSlug } from "@/lib/exclusives";

import RizCroustiPage from "../_pages/RizCroustiPage";
import PizzaMozzaPage from "../_pages/PizzaMozzaPage";
import PizzaDealPage from "../_pages/PizzaDealPage";
import KidsPage from "../_pages/KidsPage";
import PizzaNutellaPage from "../_pages/PizzaNutellaPage";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ExclusiveSlugPage({ params }: Props) {
  const { slug: rawSlug } = await params;

  const slug = rawSlug as ExclusiveSlug;
  const meta = EXCLUSIVES_INDEX[slug];

  if (!meta) notFound();

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold">{meta.title}</h1>
        {meta.hint && <p className="text-gray-500 mt-2">{meta.hint}</p>}
      </header>

      {slug === "riz-crousti" && <RizCroustiPage />}
      {slug === "pizza-mozza" && <PizzaMozzaPage />}
      {slug === "pizza-deal" && <PizzaDealPage />}
      {slug === "kids" && <KidsPage />}
      {slug === "pizza-nutella" && <PizzaNutellaPage />}
    </main>
  );
}
