import { notFound } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import FoodCard from '@/components/food/FoodCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { menuItems } from '@/data/menuData';

// Category mapping to match URL slugs with menuData categories
const categoryMapping = {
  'rice': ['Main Dishes'], // Jollof rice and similar are in Main Dishes
  'snacks': ['Quick Bites', 'Appetizers'], // Snacks map to Quick Bites and Appetizers
  'pizza': ['Main Dishes'], // Pizza is also in Main Dishes
  'meat': ['Grills'], // Meat dishes are in Grills
  'soups': ['Soups'], // Soups map directly
  'drinks': ['Beverages'], // Add Beverages category if not exists
  'main-dishes': ['Main Dishes'],
  'quick-bites': ['Quick Bites'],
  'appetizers': ['Appetizers'],
  'grills': ['Grills'],
  'sides': ['Sides']
};

// Helper function to format category name
const formatCategoryName = (id: string) => {
  const nameMapping = {
    'rice': 'Rice Dishes',
    'snacks': 'Snacks & Quick Bites', 
    'pizza': 'Pizza',
    'meat': 'Meat & Grills',
    'soups': 'Soups',
    'drinks': 'Beverages',
    'main-dishes': 'Main Dishes',
    'quick-bites': 'Quick Bites',
    'appetizers': 'Appetizers',
    'grills': 'Grills',
    'sides': 'Sides'
  };
  
  return nameMapping[id as keyof typeof nameMapping] || 
         id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params as required by Next.js 15+
  const { id } = await params;
  const categoryId = id.toLowerCase();
  
  // Get the mapped categories for this URL slug
  const mappedCategories = categoryMapping[categoryId as keyof typeof categoryMapping];
  
  // Filter menu items by the mapped categories
  const foodItems = menuItems.filter(item => {
    if (!mappedCategories) return false;
    return mappedCategories.some(category => 
      item.category.toLowerCase() === category.toLowerCase()
    );
  });
  
  // If no items found in category, show 404
  if (!foodItems.length) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container py-20">
        <SectionHeader
          title={`${formatCategoryName(categoryId)}`}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.map((food) => (
            <FoodCard key={food.id} {...food} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 