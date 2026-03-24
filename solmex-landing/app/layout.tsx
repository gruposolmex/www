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
  title: 'Solmex | Coordinación de carga industrial en México',
  description:
    'Alineamos terminales, patios e intermodales con cargadores grandes: quién mueve la carga, cuándo y con comprobante. Menos fricción, protocolos establecidos, trazabilidad operativa.',
  keywords:
    'logística México, coordinación de carga, terminales intermodales, transporte ferroviario, cadena de suministro, patios ferroviarios, trazabilidad logística, Grupo Solmex',
  openGraph: {
    title: 'Solmex | Carga industrial coordinada en toda la cadena',
    description:
      'Red que asigna volumen con criterio único: el que cumple en tiempo y forma sigue recibiendo carga. Terminales y clientes bajo el mismo estándar.',
    type: 'website',
    locale: 'es_MX',
    siteName: 'Grupo Solmex',
    url: 'https://gruposolmex.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solmex | Coordinación de carga industrial en México',
    description:
      'Terminales y cargadores conectados con protocolos establecidos y comprobante de ejecución. Operación seria para cuentas grandes.',
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
                'Coordinación de carga industrial entre terminales, patios e intermodales y clientes grandes en México. Protocolos establecidos y trazabilidad operativa.',
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
