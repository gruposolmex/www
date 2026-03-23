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
  title:
    'Solmex | La Capa de Asignación para Logística Prioritaria',
  description:
    'Solmex es la infraestructura institucional que dirige la demanda Tier-1 a nodos de alto rendimiento. Red coordinada de terminales en México con evidencia verificable y trazabilidad total.',
  keywords:
    'logística, asignación de demanda, terminales, México, infraestructura logística, coordinación, red logística, evidencia verificable, trazabilidad',
  openGraph: {
    title:
      'Solmex | La Capa de Asignación para Logística Prioritaria',
    description:
      'La infraestructura que convierte demanda fragmentada en volúmenes estables. Red coordinada de terminales en México.',
    type: 'website',
    locale: 'es_MX',
    siteName: 'Grupo Solmex',
    url: 'https://gruposolmex.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solmex | La Capa de Asignación para Logística Prioritaria',
    description:
      'Infraestructura institucional para coordinación logística de siguiente generación en México y LATAM.',
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
                'Infraestructura institucional para la coordinación logística de siguiente generación en México y LATAM.',
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
