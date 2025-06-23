'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import MainLayout from '@/components/layout/MainLayout';
import { useSearchParams } from 'next/navigation';

// Dynamic import for the map component to avoid SSR issues
const TrackingMap = dynamic(() => import('@/components/map/TrackingMap'), {
  ssr: false,
  loading: () => (
    <div className="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
      <p className="text-blue-600 font-medium">Loading Map...</p>
    </div>
  ),
});

// Mock delivery status
const DELIVERY_STATUSES = [
  { key: 'accepted', label: 'Order Accepted', time: '06:20 PM', completed: true },
  { key: 'cooking', label: 'Cooking Food', time: '06:25 PM', completed: false },
  { key: 'on_the_way', label: 'Food\'s on the Way', time: '06:40 PM', completed: false },
  { key: 'delivered', label: 'Delivered to you', time: '06:50 PM', completed: false },
];

// Mock driver info
const DRIVER_INFO = {
  name: 'John Smith',
  image: '/images/driver.jpg',
  rating: 4.8,
};

function TrackingContent() {
  const searchParams = useSearchParams();
  const [currentStatus, setCurrentStatus] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(25);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Get order ID from params if available
  const orderId = searchParams.get('order') || '#ORD-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  
  // Simulate order progress
  useEffect(() => {
    if (currentStatus < DELIVERY_STATUSES.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStatus(prev => prev + 1);
        setTimeRemaining(prev => Math.max(0, prev - 5));
      }, 15000); // Progress every 15 seconds for demo
      
      return () => clearTimeout(timer);
    }
  }, [currentStatus]);
  
  // Count down remaining time (simulate real-time updates)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = Math.max(0, prev - 1);
        if (newTime === 0 && currentStatus < DELIVERY_STATUSES.length - 1) {
          setCurrentStatus(prevStatus => prevStatus + 1);
          return 15; // Reset to 15 minutes for next stage
        }
        return newTime;
      });
    }, 60000); // Update every minute

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentStatus]);

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tracking Order</h1>
          <p className="text-sm text-gray-500">Order {orderId}</p>
        </div>
        <button className="ml-auto p-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
      
      {/* Map */}
      <div className="mb-6">
        <TrackingMap currentStatus={currentStatus} />
      </div>
      
      {/* Delivery Status */}
      <div className="bg-primary-50 mb-6 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-full text-white w-12 h-12 flex items-center justify-center">
              <span className="font-bold text-sm">{timeRemaining}m</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                {DELIVERY_STATUSES[currentStatus]?.label || 'Processing'}
              </h3>
              <p className="text-sm text-gray-600">
                {currentStatus === 0 && 'Your order has been confirmed'}
                {currentStatus === 1 && 'Chef is preparing your food'}
                {currentStatus === 2 && 'Driver is on the way to you'}
                {currentStatus === 3 && 'Order has been delivered'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-white p-3 rounded-full shadow-sm border border-gray-200 hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </button>
            <button className="bg-white p-3 rounded-full shadow-sm border border-gray-200 hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Driver Info */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{DRIVER_INFO.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <div className="flex text-yellow-400 mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                </div>
                {DRIVER_INFO.rating} • Delivery Partner
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </button>
            <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress Timeline */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h3>
        <div className="space-y-6">
          {DELIVERY_STATUSES.map((status, index) => (
            <div key={status.key} className="flex">
              <div className="mr-4 relative">
                <div 
                  className={`w-5 h-5 rounded-full ${
                    index <= currentStatus ? 'bg-primary' : 'bg-gray-200'
                  } flex items-center justify-center z-10 relative`}
                >
                  {index < currentStatus && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
                      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                    </svg>
                  )}
                  {index === currentStatus && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                {index < DELIVERY_STATUSES.length - 1 && (
                  <div 
                    className={`absolute top-5 left-2.5 w-0.5 h-6 ${
                      index < currentStatus ? 'bg-primary' : 'bg-gray-200'
                    }`} 
                  />
                )}
              </div>
              <div className="flex-1 pb-6">
                <div className="flex justify-between">
                  <h4 
                    className={`font-medium ${
                      index <= currentStatus ? 'text-gray-800' : 'text-gray-400'
                    }`}
                  >
                    {status.label}
                  </h4>
                  <span 
                    className={`text-sm ${index <= currentStatus ? 'text-gray-600' : 'text-gray-400'}`}
                  >
                    {status.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {currentStatus === DELIVERY_STATUSES.length - 1 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Delivered!</h3>
              <p className="text-gray-600 mb-4">Thank you for choosing Luxury Kitchen. Enjoy your meal!</p>
              <Link href="/" className="btn btn-primary">
                Order Again
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <MainLayout>
      <Suspense fallback={
        <div className="container py-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading tracking information...</p>
            </div>
          </div>
        </div>
      }>
        <TrackingContent />
      </Suspense>
    </MainLayout>
  );
} 