'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { useCart } from '@/context/CartContext';
import { menuItems, MenuItem } from '@/data/menuData';

export default function FoodDetailPage({ params }: { params: Promise<{ id: string }> }) {
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
    let total = selectedSize?.price || foodData.price;
    
    // Add ingredient prices
    ingredients.forEach(ingredientId => {
      const ingredient = foodData.addons?.find((i: { id: string }) => i.id === ingredientId);
      if (ingredient) {
        total += ingredient.price;
      }
    });
    
    return total * quantity;
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: `${foodData.id}-${selectedSize?.id || 'default'}-${Date.now()}`,
      name: foodData.name,
      price: calculateTotalPrice() / quantity, // Price per item
      image: foodData.image,
      restaurant: foodData.restaurant,
      quantity: quantity,
      size: selectedSize?.name,
      ingredients: ingredients
    };
    
    addItem(cartItem);
    
    // Show success message or redirect
    router.push('/cart');
  };

  const toggleIngredient = (ingredientId: string) => {
    setIngredients(prev => 
      prev.includes(ingredientId) 
        ? prev.filter(id => id !== ingredientId)
        : [...prev, ingredientId]
    );
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

        {/* Content */}
        <div className="container py-6">
          <div className="bg-white rounded-2xl p-6 -mt-8 relative z-10 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{foodData.name}</h1>
                <p className="text-gray-600">{foodData.restaurant}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">
                  ${selectedSize?.price?.toFixed(2) || foodData.price.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <div className="flex text-yellow-400 mr-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                {foodData.rating} ({foodData.ratingCount})
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <div className="mr-1" aria-label="calories">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.004 10.407c.138.435-.216.842-.672.842h-3.465a.75.75 0 01-.65-.375l-1.732-3c-.229-.396-.053-.907.393-1.004a5.252 5.252 0 016.126 3.537zM8.12 8.464c.307-.338.838-.235 1.066.16l1.732 3a.75.75 0 010 .75l-1.732 3c-.229.397-.76.5-1.067.161C6.676 14.347 6 12.77 6 11s.676-3.347 2.12-4.536zM19.93 11.5c.446.089.63.59.394 1.001l-1.731 3a.75.75 0 01-.65.375h-3.465c-.457 0-.81-.407-.672-.842A5.252 5.252 0 0019.93 11.5z" />
                    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5z" clipRule="evenodd" />
                  </svg>
                </div>
                {foodData.calories} cal
              </div>

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
            {foodData.ingredients && foodData.ingredients.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Add Ingredients</h2>
                <div className="space-y-3">
                  {foodData.ingredients.map((ingredient: {id: string; name: string; price: number}) => (
                    <label key={ingredient.id} className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={ingredients.includes(ingredient.id)}
                          onChange={() => toggleIngredient(ingredient.id)}
                          className="w-4 h-4 accent-primary mr-3"
                        />
                        <span className="text-gray-800">{ingredient.name}</span>
                      </div>
                      <span className="text-gray-600 font-medium">+${ingredient.price.toFixed(2)}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Add-ons */}
            {foodData.addons && foodData.addons.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Add-ons</h2>
                <div className="space-y-3">
                  {foodData.addons.map((addon: {id: string; name: string; weight: string; price: number}) => (
                    <label key={addon.id} className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={ingredients.includes(addon.id)}
                          onChange={() => toggleIngredient(addon.id)}
                          className="w-4 h-4 accent-primary mr-3"
                        />
                        <div>
                          <span className="text-gray-800">{addon.name}</span>
                          <span className="text-gray-500 text-sm ml-2">({addon.weight})</span>
                        </div>
                      </div>
                      <span className="text-gray-600 font-medium">+${addon.price.toFixed(2)}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity and Add to Cart */}
            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
              <div className="flex items-center">
                <span className="text-gray-600 mr-4">Quantity</span>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                  </button>
                  <span className="mx-4 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="btn btn-primary px-8 py-3 font-semibold"
              >
                Add to Cart • ${calculateTotalPrice().toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 