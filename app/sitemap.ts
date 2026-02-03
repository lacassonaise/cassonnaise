import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cassonnaise.vercel.app"; // à changer si domaine pro

  return [
    { url: `${baseUrl}`, priority: 1 },
    { url: `${baseUrl}/menu`, priority: 0.9 },
    { url: `${baseUrl}/compte`, priority: 0.7 },
    { url: `${baseUrl}/contact`, priority: 0.6 },
    { url: `${baseUrl}/mentions-legales`, priority: 0.3 },
    { url: `${baseUrl}/politique-confidentialite`, priority: 0.3 },
    { url: `${baseUrl}/conditions-generales`, priority: 0.3 },
  ];
}

