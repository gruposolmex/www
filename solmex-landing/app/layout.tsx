import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Grupo Solmex | Soluciones Logísticas de México",
  description: "Operador logístico inteligente. Operación confiable. Evidencia verificable. Coordinamos una red de terminales certificadas para que su carga se mueva con certeza, trazabilidad y respuesta inmediata.",
  keywords: "logística, terminales, México, carga, transporte, operador logístico, soluciones logísticas",
  openGraph: {
    title: "Grupo Solmex | Soluciones Logísticas de México",
    description: "La red inteligente de terminales en México. Operación confiable. Evidencia verificable.",
    type: "website",
    locale: "es_MX",
    siteName: "Grupo Solmex",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`}>
      <body className={`${inter.className} bg-solmex-base text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
