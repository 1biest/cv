import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'Logan Biesterfeldt CV',
  description:
    'I build elegant frontend interfaces for smart contract based decentralized applications. I have several years of experience in web design & development, graphic design, motion graphics, and marketing, including my time with stake.fish',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900`}
        style={{ ['--accent-color' as string]: ThemeAccentColor }}
      >
        <style>{`
          a:hover {
            color: var(--accent-color);
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}
