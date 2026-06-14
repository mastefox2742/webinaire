import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Webinaire IA "Subir ou Piloter ?" — Groupe Alpha',
  description:
    "Rejoins le webinaire gratuit du Groupe Alpha : Le monde change avec l'IA. Allez-vous subir ou piloter ? Samedi mi-octobre 2026, 10h–12h, 100% en ligne.",
  openGraph: {
    title: 'Webinaire IA "Subir ou Piloter ?" — Groupe Alpha',
    description: "Webinaire gratuit sur l'impact de l'IA sur le travail, les études et les affaires en Afrique.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased scroll-smooth">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
