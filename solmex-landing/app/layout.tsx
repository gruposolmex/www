import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SiteLayout from '@/components/layout/SiteLayout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Solmex | Capa de coordinación para demanda logística confiable',
  description:
    'Red coordinada de operadores y terminales validados para demanda estructurada: selección, asignación, ejecución verificable y priorización conforme a desempeño documentado. Modelo distinto al mercado abierto genérico.',
  keywords:
    'logística México, coordinación de carga, terminales intermodales, transporte ferroviario, cadena de suministro, patios ferroviarios, trazabilidad logística, Grupo Solmex',
  openGraph: {
    title: 'Solmex | Demanda logística confiable, coordinada',
    description:
      'Operadores y terminales validados, marco normativo común y ejecución verificable. Punto de acceso único para el mandante; priorización acorde al cumplimiento medido.',
    type: 'website',
    locale: 'es_MX',
    siteName: 'Grupo Solmex',
    url: 'https://gruposolmex.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solmex | Capa de coordinación para demanda confiable',
    description:
      'Red validada, flujo coordinado (demanda a validación) y ejecución verificable en tiempo real. Esquema distinto al marketplace abierto.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://gruposolmex.com',
  },
  other: {
    'theme-color': '#0A0A0A',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body
        className={`${inter.className} bg-[#131313] text-[#E5E2E1] antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Grupo Solmex',
              alternateName: 'Soluciones Logísticas FyT S.A. de C.V.',
              url: 'https://gruposolmex.com',
              description:
                'Coordinación de demanda logística confiable entre operadores y terminales validados en México. Marco normativo común, asignación explícita y ejecución verificable.',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'MX',
              },
              sameAs: [],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+52-229-264-4088',
                contactType: 'sales',
                availableLanguage: ['Spanish'],
              },
            }),
          }}
        />
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
