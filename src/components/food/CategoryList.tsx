'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  const [showAll, setShowAll] = useState(false);
  const initialCategories = categories.slice(0, 8); // Show only first 8 categories initially

  return (
    <div className="py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-2">
        {(showAll ? categories : initialCategories).map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="relative w-20 h-20 mb-2">
              <Image
                src={category.icon}
                alt={category.name}
                fill
                className="object-cover rounded-full"
                sizes="80px"
              />
            </div>
            <span className="text-sm text-gray-700 text-center">{category.name}</span>
          </Link>
        ))}
      </div>
      {categories.length > 8 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-colors"
          >
            {showAll ? 'Show Less' : 'View All Categories'}
          </button>
        </div>
      )}
    </div>
  );
} 