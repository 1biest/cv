import type { Metadata } from 'next';
import { Geist, Geist_Mono, Cormorant_Garamond } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import './globals.css';
import { ThemeAccentColor } from './config';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const cormorantDisplay = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://biest.ca';
const title = 'Logan Biesterfeldt | Frontend, Design & Forward Deployed AI Engineer';
const description =
  'Frontend Engineer, Product Design Engineer, and Forward Deployed AI Software Engineer based in Calgary. Building high-reliability TypeScript/React interfaces, Figma design systems, 3D/PostgreSQL platforms (AgOS), DeFi lending systems ($300M+ peak TVL at Neptune Finance), and spec-driven agentic AI software.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: 'Logan Biesterfeldt — Portfolio',
  authors: [{ name: 'Logan Biesterfeldt', url: siteUrl }],
  creator: 'Logan Biesterfeldt',
  keywords: [
    'Frontend Engineer',
    'Product Design Engineer',
    'Forward Deployed Engineer',
    'AI Software Engineering',
    'Design Engineer',
    'React',
    'TypeScript',
    'Next.js',
    'Three.js',
    'PostgreSQL',
    'Tailwind CSS',
    'Design Systems',
    'DeFi',
    'Calgary',
    'Logan Biesterfeldt',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'profile',
    title,
    description,
    url: siteUrl,
    siteName: 'Logan Biesterfeldt',
    locale: 'en_US',
    firstName: 'Logan',
    lastName: 'Biesterfeldt',
    username: '1biest',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@1biesterfeldt',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  dateModified: new Date().toISOString(),
  mainEntity: {
    '@type': 'Person',
    name: 'Logan Biesterfeldt',
    jobTitle: 'Frontend Engineer, Product Design Engineer & Forward Deployed AI Engineer',
    description,
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Calgary',
      addressRegion: 'AB',
      addressCountry: 'CA',
    },
    email: 'mailto:logan.biesterfeldt@gmail.com',
    sameAs: [
      'https://biest.ca',
      'https://github.com/1biest',
      'https://www.linkedin.com/in/biest/',
      'https://x.com/1biesterfeldt',
      'https://t.me/Biesterfeldt',
    ],
    knowsAbout: [
      'Frontend Engineering',
      'Product Design & Design Systems',
      'Forward Deployed Software Engineering',
      'Agentic AI Systems',
      'React 19',
      'TypeScript',
      'Next.js',
      'Three.js',
      'PostgreSQL',
      'Tailwind CSS',
      'DeFi & Blockchain Infrastructure',
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorantDisplay.variable} antialiased`}
        style={{ ['--accent-color' as string]: ThemeAccentColor }}
      >
        {children}
        <Analytics />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID ?? 'G-X4G4BGPMJX'}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID ?? 'G-X4G4BGPMJX'}');
          `}
        </Script>
      </body>
    </html>
  );
}
