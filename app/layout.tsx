import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Roboto, Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: 'Ramakirti Foundation | Empowering Communities',
  description: 'Ramakirti Foundation is a non-profit organization dedicated to empowering communities through education, healthcare, and sustainable development.',
  authors: [{ name: 'Ramakirti Foundation' }],
  creator: 'Ramakirti Foundation',
  metadataBase: new URL('https://ramakirtifoundation.co.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ramakirtifoundation.co.in',
    siteName: 'Ramakirti Foundation',
    title: 'Ramakirti Foundation | Empowering Communities',
    description: 'Ramakirti Foundation is a non-profit organization dedicated to empowering communities through education, healthcare, and sustainable development.',
    images: [
      {
        url: '/rf_bg_2.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ramakirti Foundation',
    description: 'Empowering communities through education, healthcare, and sustainable development.',
    images: ['/rf_bg_2.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#651A16',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Ramakirti Foundation',
  url: 'https://ramakirtifoundation.co.in',
  logo: 'https://ramakirtifoundation.co.in/logo.png',
  description: 'Non-profit providing education, food distribution, and women empowerment in Gurgaon',
  foundingDate: '2021',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '24',
    bestRating: '5',
    worstRating: '1',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '89 FF Housing Board Society, Sector 33',
    addressLocality: 'Gurgaon',
    addressRegion: 'Haryana',
    postalCode: '122022',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-88515-02840',
    email: 'support@ramakirtifoundation.co.in',
    contactType: 'General Enquiry',
  },
  sameAs: [
    'https://www.facebook.com/ramakirtifoundation.org',
    'https://www.instagram.com/ramakirtifoundation/',
    'https://www.linkedin.com/company/96037665/',
    'https://www.youtube.com/channel/UCY9gGWwrWTdLH6mxEDo6LFA',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.razorpay.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning={true} className={`${plusJakarta.variable} font-sans antialiased text-[17px]`}>
        <main className="min-h-screen">
          {children}
        </main>
        <a 
          href="https://wa.me/918851502840?text=Hi,%20I%20want%20to%20know%20more%20about%20volunteering/donating"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center cursor-pointer"
          aria-label="Contact us on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="28"
            height="28"
            className="fill-current"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </a>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
