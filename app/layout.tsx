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
  title: 'Senior Frontend Engineer - DeFi Infrastructure',
  description:
    'Senior frontend engineer building DeFi interface systems in React, TypeScript, Next.js, and CosmWasm with a focus on on-chain state synchronization, transaction reliability, and contract-aligned execution flows.',
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
