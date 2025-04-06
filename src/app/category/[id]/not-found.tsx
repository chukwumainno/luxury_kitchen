import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="container min-h-[60vh] flex flex-col items-center justify-center text-center py-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Category Not Found</h2>
        <p className="text-gray-600 mb-8">The category you are looking for doesn't exist or has been moved.</p>
        <Link
          href="/"
          className="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Return Home
        </Link>
      </div>
    </MainLayout>
  );
} 