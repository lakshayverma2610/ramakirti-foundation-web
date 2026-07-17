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
  title: {
    default: 'Ramakirti Foundation | Educate. Nourish. Empower.',
    template: '%s | Ramakirti Foundation',
  },
  description:
    'Non-profit NGO providing free education, food distribution, and women empowerment in Gurgaon, Haryana since 2021. Donate online — 80G tax exempt.',
  keywords: [
    'NGO Gurgaon', 'Ramakirti Foundation', 'education charity India',
    'women empowerment NGO', 'food distribution Haryana',
    'donate NGO India', '80G tax exemption charity',
  ],
  authors: [{ name: 'Ramakirti Foundation' }],
  creator: 'Ramakirti Foundation',
  metadataBase: new URL('https://ramakirtifoundation.co.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ramakirtifoundation.co.in',
    siteName: 'Ramakirti Foundation',
    title: 'Ramakirti Foundation | Education is a Right for Everyone',
    description:
      'Support education, food, and women empowerment in Gurgaon. Donate now — 80G tax exempt. UPI, Net Banking & Cards accepted.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ramakirti Foundation — Educate, Nourish, Empower',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ramakirti Foundation | Education is a Right for Everyone',
    description: 'Empowering underprivileged communities in Gurgaon through education, food and women empowerment.',
    creator: '@ramakirtifound',
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
      <body className={`${roboto.className} antialiased text-[17px]`}>
        {children}
        {/* Razorpay checkout.js — loaded once site-wide */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
