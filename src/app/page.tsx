'use client';

import MainLayout from '@/components/layout/MainLayout';
import CategoryList from '@/components/food/CategoryList';
import FoodCard from '@/components/food/FoodCard';
import PromoBanner from '@/components/ui/PromoBanner';
import SectionHeader from '@/components/ui/SectionHeader';
import { menuItems } from '@/data/menuData';

// Mock data for categories
const categories = [
  { 
    id: 'rice', 
    name: 'Rice Dishes', 
    icon: '/images/jollof_rice.jpeg' 
  },
  { 
    id: 'snacks', 
    name: 'Snacks', 
    icon: '/images/Fresh_ shawarma .jpeg' 
  },
  { 
    id: 'pizza', 
    name: 'Pizza', 
    icon: '/images/Pepperoni_pizza.jpeg' 
  },
  { 
    id: 'meat', 
    name: 'Meat & Chicken', 
    icon: '/images/Roasted_Chicken.jpeg' 
  },
  { 
    id: 'soups', 
    name: 'Soups & Swallow', 
    icon: '/images/Egusi _Soup_and_pounded_yam.jpeg' 
  },
  { 
    id: 'drinks', 
    name: 'Drinks', 
    icon: '/images/Cold_ Drinks.jpeg' 
  }
];

// Get best sellers from menuData
const bestSellers = menuItems.slice(0, 6); // Take first 6 items as best sellers

export default function Home() {
  return (
    <MainLayout>
      <div className="container">
        {/* Greeting */}
        
        {/* Categories */}
        <CategoryList categories={categories} />
        
        {/* Promo Banner */}
        <PromoBanner
          title="New Year Offer"
          description="Get discount on selected items"
          discount="30% OFF"
          validPeriod="16 - 31 Dec"
          buttonText="Get Now"
          buttonLink="/promotions/new-year"
          imageUrl="/images/fried_rice_and__chicken.jpeg"
        />
        
        {/* Best Sellers */}
        <div className="py-6">
          <SectionHeader title="Best Sellers" seeAllLink="/best-sellers" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestSellers.map((food) => (
              <FoodCard
                key={food.id}
                {...food}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
