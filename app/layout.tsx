import "./globals.css";
import Header from "@/components/Header";
import PromoBar from "@/components/PromoBar";
import CartDrawerClient from "@/components/CartDrawerClient";

import Footer from "@/components/Footer";

/* =====================
   METADATA (SEO + JSON-LD)
===================== */

export const metadata = {
  title: {
    default: "Cassonnaise – Pizza, Tacos & Burgers à Casson",
    template: "%s | Cassonnaise",
  },
  description:
    "Pizza, tacos, burgers à Casson. Livraison gratuite dès 25€ jusqu’à 12 km ou retrait en magasin.",
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: "La Cassonnaise",
      image: "https://www.lacassonnaise.fr/categories/hero.jpg",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3 rue Myotis",
        addressLocality: "Casson",
        postalCode: "44390",
        addressCountry: "FR",
      },
      telephone: "+33982282214",
      servesCuisine: [
        "Pizza",
        "Tacos",
        "Burgers",
        "Sandwichs",
      ],
      priceRange: "€€",
      url: "https://www.lacassonnaise.fr",
      sameAs: [
        "https://www.google.com/maps/place/La+Cassonnaise",
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "11:00",
          closes: "22:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday", "Monday"],
          opens: "18:00",
          closes: "22:00",
        },
      ],
      hasMenu: "https://www.lacassonnaise.fr/menu",
    }),
  },
};

/* =====================
   ROOT LAYOUT
===================== */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-gray-900 flex flex-col">
        {/* HEADER */}
        <Header />

        {/* PROMO BAR */}
        <PromoBar />

        {/* CONTENU */}
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />

        {/* PANIER */}
    
       <CartDrawerClient />

      </body>
    </html>
  );
}
