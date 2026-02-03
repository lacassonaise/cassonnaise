import Link from "next/link";
import Image from "next/image";

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 space-y-16">

      {/* =====================
          CATEGORIES
      ===================== */}
      <section id="menu">
        <h1 className="text-2xl font-bold text-[#0B2A45]">
          Menu
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Choisis une catégorie.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/menu/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
            >
              {/* IMAGE */}
              <div className="relative h-28 w-full">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* BADGE */}
              {cat.popular && (
                <span className="absolute top-2 left-2 rounded-full bg-[#C97A3A] px-2 py-0.5 text-[10px] font-bold text-white">
                  Populaire
                </span>
              )}

              {/* TEXTE */}
              <div className="p-3 text-center">
                <span className="text-sm font-semibold text-gray-900">
                  {cat.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================
          EXCLUSIFS
      ===================== */}
      <section>
        <h2 className="text-xl font-bold text-[#0B2A45]">
          Nos offres & exclusifs
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Menus, offres spéciales et incontournables
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exclusives.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
            >
              {/* IMAGE */}
              <div className="relative h-36 w-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* BADGE */}
              {item.badge && (
                <span className="absolute top-2 left-2 rounded-full bg-[#1F5C3A] px-2 py-0.5 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              )}

              {/* CONTENU */}
              <div className="p-4">
                <div className="text-sm font-semibold text-gray-900">
                  {item.name}
                </div>

                {item.hint && (
                  <div className="mt-1 text-xs text-gray-600">
                    {item.hint}
                  </div>
                )}

                <div className="mt-3 text-xs font-semibold text-[#C97A3A]">
                  Découvrir →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

/* =====================
   DONNÉES CATÉGORIES
   ===================== */
const categories = [
  { slug: "pizzas", label: "Pizzas", image: "/categories/pizza.png", popular: true },
  { slug: "burgers", label: "Burgers", image: "/categories/burgers.jpg", popular: true },
  { slug: "tacos", label: "Tacos et Bowls", image: "/categories/tacos.jpg", popular: true },
  { slug: "tex-mex", label: "Text-Mex", image: "/categories/texmex.jpg" },
  { slug: "sandwiches", label: "Sandwiches", image: "/categories/sandwich.jpg" },
  { slug: "paninis", label: "Paninis", image: "/categories/panini.jpg" },
  { slug: "salades", label: "Salades", image: "/categories/salades.jpg" },
  { slug: "assiettes", label: "Assiettes", image: "/categories/assiette.jpg" },
  { slug: "pizzawichs", label: "Pizzawichs", image: "/categories/pizzawichs.jpg" },
  { slug: "refreshments", label: "Desserts / Glaces / Boissons", image: "/categories/dessert.jpg" },
];

/* =====================
   DONNÉES EXCLUSIFS
   ===================== */
const exclusives = [
  {
    name: "Menu Pizza",
    hint: "À emporter uniquement",
    link: "/menu/exclusives/pizza-deal",
    image: "/categories/pizza0.jpg",
    badge: "À emporter",
  },
  {
    name: "Riz Crousti",
    hint: "9,90€",
    link: "/menu/exclusives/riz-crousti",
    image: "/categories/riz.jpg",
    badge: "Nouveau",
  },
  {
    name: "Menu Kids",
    hint: "6€",
    link: "/menu/exclusives/kids",
    image: "/categories/kid.png",
  },
  {
    name: "Pizza Nutella",
    hint: "14€",
    link: "/menu/exclusives/pizza-nutella",
    image: "/categories/nuttela.jpg",
  },
  {
    name: "Pizza base mozzarella",
    link: "/menu/exclusives/pizza-mozza",
    image: "/categories/mozza.jpg",
  },
];
