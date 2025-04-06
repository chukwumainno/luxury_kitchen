'use client';

import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  seeAllLink?: string;
}

export default function SectionHeader({ title, seeAllLink }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      {seeAllLink && (
        <Link href={seeAllLink} className="text-primary hover:text-primary-600 text-sm font-medium">
          See All
        </Link>
      )}
    </div>
  );
} 