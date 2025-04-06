'use client';

import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-20 lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
} 