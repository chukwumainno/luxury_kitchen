'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { useCart } from '@/context/CartContext';

// Mock payment methods
const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit Card', icon: 'credit-card' },
  { id: 'paypal', name: 'PayPal', icon: 'paypal' },
  { id: 'apple', name: 'Apple Pay', icon: 'apple' },
  { id: 'cash', name: 'Cash on Delivery', icon: 'cash' },
];

// Mock addresses
const SAVED_ADDRESSES = [
  { 
    id: 'home',
    name: 'Home',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    default: true,
  },
  {
    id: 'work',
    name: 'Work',
    address: '555 Business Ave, Floor 5',
    city: 'New York',
    state: 'NY',
    zip: '10022',
    default: false,
  }
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [selectedAddress, setSelectedAddress] = useState(SAVED_ADDRESSES[0].id);
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const deliveryFee = 5;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate API call for order placement
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      router.push('/tracking');
    }, 2000);
  };

  // Icon components
  const PaymentIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'credit-card':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
          </svg>
        );
      case 'paypal':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
          </svg>
        );
      case 'apple':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'cash':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center mb-6">
          <Link href="/cart" className="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Delivery Address</h2>
              
              <div className="space-y-3">
                {SAVED_ADDRESSES.map(address => (
                  <div 
                    key={address.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedAddress === address.id 
                        ? 'border-primary bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedAddress(address.id)}
                  >
                    <div className="flex items-start">
                      <div className="flex items-center h-5 mt-1">
                        <input
                          type="radio"
                          id={`address-${address.id}`}
                          name="address"
                          className="w-4 h-4 accent-primary"
                          checked={selectedAddress === address.id}
                          onChange={() => setSelectedAddress(address.id)}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label 
                          htmlFor={`address-${address.id}`}
                          className="font-medium text-gray-800 flex items-center"
                        >
                          {address.name}
                          {address.default && (
                            <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </label>
                        <p className="text-gray-600 mt-1">{address.address}</p>
                        <p className="text-gray-600">{address.city}, {address.state} {address.zip}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="mt-4 flex items-center text-primary font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add New Address
              </button>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h2>
              
              <div className="grid grid-cols-2 gap-3">
                {PAYMENT_METHODS.map(method => (
                  <div 
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPayment === method.id 
                        ? 'border-primary bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <div className="flex items-center">
                      <div className="flex items-center h-5">
                        <input
                          type="radio"
                          id={`payment-${method.id}`}
                          name="payment"
                          className="w-4 h-4 accent-primary"
                          checked={selectedPayment === method.id}
                          onChange={() => setSelectedPayment(method.id)}
                        />
                      </div>
                      <div className="ml-3 flex items-center">
                        <span className="text-gray-600 mr-2">
                          <PaymentIcon type={method.icon} />
                        </span>
                        <label 
                          htmlFor={`payment-${method.id}`}
                          className="text-sm font-medium text-gray-800"
                        >
                          {method.name}
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-4 border-b border-gray-100 pb-4 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <span className="text-gray-800 font-medium">{item.quantity}x </span>
                      <span className="text-gray-600">{item.name}</span>
                      {item.size && <span className="text-gray-400 text-sm"> ({item.size})</span>}
                    </div>
                    <span className="text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              {/* Price Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="btn btn-primary w-full py-3 disabled:opacity-70"
              >
                {isProcessing ? 'Processing...' : `Place Order • $${total.toFixed(2)}`}
              </button>
              
              <p className="text-center text-xs text-gray-500 mt-4">
                By placing an order you agree to our{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 