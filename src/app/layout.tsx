'use client';

import { Inter } from 'next/font/google';
import Head from 'next/head';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Luxury Kitchen - Premium Food Delivery</title>
        <meta name="description" content="Order premium quality food from Luxury Kitchen. Fast delivery, fresh ingredients, exceptional taste." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={`${inter.className} min-h-screen bg-gray-50`} suppressHydrationWarning={true}>
        <ThemeProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
