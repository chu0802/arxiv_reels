import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import RegisterSW from './register-sw';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ArXiv Reels',
  description: 'Swipeable arXiv summaries with AI chat',
  manifest: "/manifest.json",
  themeColor: "#111827"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
