import { notFound } from "next/navigation";
import { MENU_CONFIG } from "@/lib/menu";

type Props = {
  params: {
    slug: string;
  };
};

export default function MenuSlugPage({ params }: Props) {
  const entry = MENU_CONFIG[params.slug as keyof typeof MENU_CONFIG];

  if (!entry) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold">
          {entry.title}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Choisissez vos produits dans la catégorie {entry.title}
        </p>
      </header>

      {/* 
        Ici tu affiches soit :
        - les produits depuis Supabase
        - ou un composant générique menu
      */}
    </main>
  );
}


