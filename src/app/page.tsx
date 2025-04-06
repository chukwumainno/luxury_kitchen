'use client';

import MainLayout from '@/components/layout/MainLayout';
import CategoryList from '@/components/food/CategoryList';
import FoodCard from '@/components/food/FoodCard';
import PromoBanner from '@/components/ui/PromoBanner';
import SectionHeader from '@/components/ui/SectionHeader';

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

// Mock data for food items
const bestSellers = [
  {
    id: 'jollof-rice-1',
    name: 'Special Jollof Rice',
    price: 10.99,
    image: '/images/jollof_rice.jpeg',
    restaurant: 'African Kitchen',
    calories: 380,
    time: 25
  },
  {
    id: 'chicken-1',
    name: 'Roasted Chicken',
    price: 13.99,
    image: '/images/Roasted_Chicken.jpeg',
    restaurant: 'African Kitchen',
    calories: 320,
    time: 20
  },
  {
    id: 'shawarma-1',
    name: 'Chicken Shawarma',
    price: 8.99,
    image: '/images/Fresh_ shawarma .jpeg',
    restaurant: 'Shawarma House',
    calories: 280,
    time: 15
  },
  {
    id: 'pizza-1',
    name: 'Pepperoni Pizza',
    price: 15.99,
    image: '/images/Pepperoni_pizza.jpeg',
    restaurant: 'Pizza House',
    calories: 850,
    time: 20
  }
];

export default function Home() {
  return (
    <MainLayout>
      <div className="container">
        {/* Greeting */}
        <div className="pt-6 pb-2">
          <p className="text-gray-500">Hello 👋</p>
          <h1 className="text-2xl font-bold text-gray-800">Luxury Kitchen</h1>
        </div>
        
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
                id={food.id}
                name={food.name}
                price={food.price}
                image={food.image}
                restaurant={food.restaurant}
                calories={food.calories}
                time={food.time}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
