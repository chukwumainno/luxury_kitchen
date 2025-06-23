'use client';

import Image from 'next/image';
import Link from 'next/link';

interface FoodCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  restaurant: string;
  calories: number;
  time: number;
  rating?: number;
  ratingCount?: string;
  category?: string;
  description?: string;
}

export default function FoodCard({
  id,
  name,
  price,
  image,
  restaurant,
  calories,
  time,
  rating,
  ratingCount,
}: FoodCardProps) {
  return (
    <div className="card group hover:scale-[1.02] transition-all duration-200">
      <Link href={`/food/${id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{name}</h3>
            <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500 mb-3">{restaurant}</p>
          
          {/* Rating if available */}
          {rating && (
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400 mr-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-600">{rating} ({ratingCount})</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span className="text-orange-500">🔥</span> {calories} Calories
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span>⏱️</span> {time} min
            </div>
            <button className="bg-primary text-white p-1 rounded-full hover:bg-primary-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
} 