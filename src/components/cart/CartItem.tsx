'use client';

import Image from 'next/image';
import { FoodItem, useCart } from '@/context/CartContext';

interface CartItemProps {
  item: FoodItem;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-100">
      <div className="relative w-20 h-20 rounded-xl overflow-hidden mr-4">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      
      <div className="flex-1">
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.restaurant}</p>
        {item.size && <p className="text-xs text-gray-400">{item.size}</p>}
      </div>
      
      <div className="text-right ml-4">
        <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
        <div className="flex items-center justify-end mt-2">
          <button
            onClick={handleDecreaseQuantity}
            className="bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            </svg>
          </button>
          
          <span className="mx-3 font-medium text-gray-800">{item.quantity}</span>
          
          <button
            onClick={handleIncreaseQuantity}
            className="bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 