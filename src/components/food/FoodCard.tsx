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
}

export default function FoodCard({
  id,
  name,
  price,
  image,
  restaurant,
  calories,
  time,
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