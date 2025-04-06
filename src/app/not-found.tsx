'use client';

import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="container py-24">
        <div className="flex flex-col items-center text-center">
          <div className="text-[120px] font-bold text-primary-500 leading-none">404</div>
          <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-4">Page Not Found</h1>
          <p className="text-gray-600 max-w-md mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="mb-12">
            <Link href="/" className="btn btn-primary px-8">
              Back to Home
            </Link>
          </div>
          
          <div className="relative w-full max-w-md h-64">
            <Image 
              src="/images/empty-plate.jpeg"
              alt="Looking for something?"
              fill
              className="object-contain"
            />
          </div>
          
          <div className="mt-8 text-gray-700">
            <p>Looking for something to eat?</p>
            <Link href="/" className="text-primary-600 font-medium hover:underline">
              Browse our menu
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 