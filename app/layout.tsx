import type { Metadata } from 'next';
import { Geist, Geist_Mono, Cormorant_Garamond } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'Design Engineer & Frontend Lead, Logan Biesterfeldt',
  description:
    'Design Engineer and senior frontend engineer based in Calgary. I own product problems end to end, from Figma to production code, with deep technical experience in DeFi, blockchain infrastructure, and React/TypeScript systems. Open to opportunities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorantDisplay.variable} antialiased`}
        style={{ ['--accent-color' as string]: ThemeAccentColor }}
      >
        {children}
      </body>
    </html>
  );
}
