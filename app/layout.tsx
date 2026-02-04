import "./globals.css";
import Header from "@/components/Header";
import PromoBar from "@/components/PromoBar";
import Footer from "@/components/Footer";
import Providers from "./providers";

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
      // ... tout le reste de ton JSON-LD ici ...
    }),
  },
};

// --- LE BLOC DOUBLON A ÉTÉ SUPPRIMÉ ICI ---

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-gray-900 flex flex-col">
        <Header />
        <Providers>
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
            {children}
          </main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}

