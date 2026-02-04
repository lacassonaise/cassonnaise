import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Cassonnaise",
  description: "Pizza, Tacos & Burgers à Casson",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-white text-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}


