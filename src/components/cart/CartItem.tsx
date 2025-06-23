'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart, FoodItem } from '@/context/CartContext';

interface CartItemProps {
  item: FoodItem;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(item.id);
      return;
    }

    setIsUpdating(true);
    // Simulate API delay
    setTimeout(() => {
      updateQuantity(item.id, newQuantity);
      setIsUpdating(false);
    }, 300);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-100 last:border-0">
      {/* Food Image */}
      <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Food Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.restaurant}</p>
        
        {/* Size and Add-ons */}
        <div className="flex flex-col text-xs text-gray-500 mt-1">
          {item.size && (
            <span>Size: {item.size}</span>
          )}
          {item.ingredients && item.ingredients.length > 0 && (
            <span>Add-ons: {item.ingredients.join(', ')}</span>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center mx-4">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={isUpdating}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
          </svg>
        </button>
        
        <span className="mx-3 font-semibold text-gray-800 min-w-[2rem] text-center">
          {isUpdating ? '...' : item.quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={isUpdating}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>

      {/* Price */}
      <div className="text-right">
        <p className="font-semibold text-gray-800">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">
          ${item.price.toFixed(2)} each
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Remove item"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </button>
    </div>
  );
} 