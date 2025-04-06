'use client';

import Image from 'next/image';
import Link from 'next/link';

interface PromoBannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  discount?: string;
  validPeriod?: string;
}

export default function PromoBanner({
  title,
  description,
  buttonText,
  buttonLink,
  imageUrl,
  discount,
  validPeriod
}: PromoBannerProps) {
  return (
    <div className="relative bg-gray-900 rounded-xl overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="relative p-6 flex flex-col h-full">
        <div className="flex-1">
          {discount && (
            <div className="text-white text-2xl font-bold mb-1">
              {discount}
            </div>
          )}
          <h2 className="text-white text-xl font-bold mb-2">{title}</h2>
          
          {validPeriod && (
            <p className="text-white text-sm mb-3">{validPeriod}</p>
          )}
          
          <Link 
            href={buttonLink}
            className="inline-block bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-4"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
} 