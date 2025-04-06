'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { useCart } from '@/context/CartContext';
import { menuItems, MenuItem } from '@/data/menuData';

export default function FoodDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { addItem } = useCart();
  
  const { id } = use(params);
  
  const foodData = menuItems.find(item => item.id === id) as MenuItem;
  
  // If food item not found, you might want to handle this case
  if (!foodData) {
    return (
      <MainLayout>
        <div className="container py-20">
          <h1 className="text-2xl font-bold text-gray-800">Food item not found</h1>
          <Link href="/" className="text-primary hover:underline">
            Return to menu
          </Link>
        </div>
      </MainLayout>
    );
  }
  // Initialize with the first size if available
  const [selectedSize, setSelectedSize] = useState(foodData.sizes?.[0]);
  
  // Initialize with empty array for ingredients instead of assuming first ingredient exists
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  
  // Calculate total price based on size and ingredients
  const calculateTotalPrice = () => {
    let total = selectedSize?.price || 0;
    
    // Add ingredient prices
    ingredients.forEach(ingredientId => {
      const ingredient = foodData.addons?.find((i: { id: string }) => i.id === ingredientId);
      if (ingredient) {
        total += ingredient.price;
      }
    });
    
    return total * quantity;
  };

  // Add to cart
  const handleAddToCart = () => {
    const selectedIngredients = foodData.addons?.
      filter((i: { id: string; name: string; price: number }) => ingredients.includes(i.id))
      .map((i: { name: string }) => i.name) || [];

    addItem({
      id: `${foodData.id}-${selectedSize?.id || 'default'}-${ingredients.join('-')}`,
      name: foodData.name,
      price: calculateTotalPrice() / quantity,
      image: foodData.image,
      restaurant: foodData.restaurant,
      quantity: quantity,
      size: selectedSize?.name || 'Regular',
      ingredients: selectedIngredients,
    });
    
    router.push('/cart');
  };

  // Toggle ingredient
  const toggleIngredient = (ingredientId: string) => {
    if (ingredients.includes(ingredientId)) {
      setIngredients(ingredients.filter(id => id !== ingredientId));
    } else {
      setIngredients([...ingredients, ingredientId]);
    }
  };

  return (
    <MainLayout>
      <div className="pb-20 lg:pb-10">
        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 md:h-96">
          <Image
            src={foodData.image}
            alt={foodData.name}
            fill
            className="object-cover"
            priority
          />
          <Link
            href="/"
            className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
          </button>
        </div>
        
        <div className="container">
          {/* Food Info */}
          <div className="bg-white p-6 rounded-t-3xl -mt-8 relative">
            <h1 className="text-2xl font-bold text-gray-800">{foodData.name}</h1>
            
            <div className="flex items-center mt-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <div className="text-yellow-500 mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                </div>
                {foodData.rating} ({foodData.ratingCount})
              </div>
              <div className="mx-2">•</div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="text-orange-500 mr-1" aria-label="calories">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M11.47 1.72a.75.75 0 011.06 0l3 3a.75.75 0 11-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 01-1.06-1.06l3-3zM11.25 7.5V15a.75.75 0 001.5 0V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
                  </svg>
                </div>
                {foodData.calories} Calories
              </div>
              <div className="mx-2">•</div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="mr-1" aria-label="time">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                  </svg>
                </div>
                {foodData.time} min
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">{foodData.description}</p>
            
            {/* Size Selection */}
            {foodData.sizes && foodData.sizes.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Select Size</h2>
                <div className="grid grid-cols-3 gap-3">
                  {foodData.sizes.map((size: {id: string; name: string; price: number}) => (
                    <button
                      key={size.id}
                      className={`border rounded-lg p-3 flex flex-col items-center transition-all ${
                        selectedSize?.id === size.id
                          ? 'border-primary bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      <span className="text-sm font-medium">{size.name}</span>
                      <span className="text-gray-700 font-semibold mt-1">${size.price.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Ingredients */}
            {foodData.addons && foodData.addons.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Add Ingredients</h2>
                <div className="space-y-3">
                  {foodData.addons.map((ingredient: {
                    id: string;
                    name: string;
                    weight: string;
                    price: number;
                  }) => (
                    <div 
                      key={ingredient.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="mr-3">
                          <input
                            type="checkbox"
                            id={ingredient.id}
                            className="w-5 h-5 accent-primary"
                            checked={ingredients.includes(ingredient.id)}
                            onChange={() => toggleIngredient(ingredient.id)}
                          />
                        </div>
                        <div>
                          <label 
                            htmlFor={ingredient.id}
                            className="font-medium text-gray-800 block mb-0.5"
                          >
                            {ingredient.name}
                          </label>
                          <span className="text-sm text-gray-500">{ingredient.weight}</span>
                        </div>
                      </div>
                      <div className="text-primary-700 font-medium">
                        +${ingredient.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity and Add to Cart */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 lg:static lg:border-0 lg:p-0 lg:mt-8">
              <div className="container">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="bg-gray-100 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                      </svg>
                    </button>
                    <span className="mx-4 font-semibold text-gray-800 w-5 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="bg-gray-100 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="btn btn-primary px-8 py-3 flex-1 ml-6"
                  >
                    Add to Cart • ${calculateTotalPrice().toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 