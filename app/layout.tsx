import type { Metadata } from 'next';
import { Geist, Geist_Mono, Cormorant_Garamond } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://logan-cv.vercel.app';
const title = 'Design Engineer & Frontend Lead, Logan Biesterfeldt';
const description =
  'Design Engineer and senior frontend engineer based in Calgary. I own product problems end to end, from Figma to production code, with deep technical experience in DeFi, blockchain infrastructure, and React/TypeScript systems. Open to opportunities.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: 'Logan Biesterfeldt — Portfolio',
  authors: [{ name: 'Logan Biesterfeldt', url: siteUrl }],
  creator: 'Logan Biesterfeldt',
  keywords: [
    'Design Engineer',
    'Frontend Lead',
    'Frontend Engineer',
    'React',
    'TypeScript',
    'Next.js',
    'Tailwind CSS',
    'Design Systems',
    'DeFi',
    'Blockchain',
    'Web3',
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
    jobTitle: 'Design Engineer & Frontend Lead',
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
      'https://github.com/1biest',
      'https://www.linkedin.com/in/biest/',
      'https://x.com/1biesterfeldt',
      'https://t.me/Biesterfeldt',
    ],
    knowsAbout: [
      'Design Engineering',
      'Frontend Architecture',
      'Design Systems',
      'React',
      'TypeScript',
      'Next.js',
      'Tailwind CSS',
      'DeFi',
      'Blockchain Infrastructure',
      'Web3',
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
      </body>
    </html>
  );
}
