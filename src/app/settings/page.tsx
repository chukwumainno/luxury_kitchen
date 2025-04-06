'use client';

import { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    newMenuItems: true
  });

  const handleToggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center space-x-2 mb-6">
          <Link href="/profile" className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        </div>

        <div className="space-y-8">
          {/* Theme Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Theme</h2>
            <p className="text-gray-600 mb-4">Choose your preferred color theme for the app</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                className={`p-4 rounded-xl border transition-all ${
                  theme === 'green' 
                    ? 'border-primary-500 ring-2 ring-primary-200' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setTheme('green')}
              >
                <div className="h-16 w-full rounded-lg bg-green-500 mb-3"></div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">Green Theme</span>
                  {theme === 'green' && (
                    <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      Active
                    </span>
                  )}
                </div>
              </button>

              <button 
                className={`p-4 rounded-xl border transition-all ${
                  theme === 'red' 
                    ? 'border-primary-500 ring-2 ring-primary-200' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setTheme('red')}
              >
                <div className="h-16 w-full rounded-lg bg-red-500 mb-3"></div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">Red Theme</span>
                  {theme === 'red' && (
                    <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      Active
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h2>
            <p className="text-gray-600 mb-4">Manage your notification preferences</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-800">Order Updates</h3>
                  <p className="text-sm text-gray-500">Get notified when your order status changes</p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notifications.orderUpdates}
                      onChange={() => handleToggleNotification('orderUpdates')}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-800">Promotions</h3>
                  <p className="text-sm text-gray-500">Get notified about discounts and special offers</p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notifications.promotions}
                      onChange={() => handleToggleNotification('promotions')}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-800">Newsletter</h3>
                  <p className="text-sm text-gray-500">Receive our monthly newsletter</p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notifications.newsletter}
                      onChange={() => handleToggleNotification('newsletter')}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="font-medium text-gray-800">New Menu Items</h3>
                  <p className="text-sm text-gray-500">Get notified when new items are added to the menu</p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notifications.newMenuItems}
                      onChange={() => handleToggleNotification('newMenuItems')}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* App Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">About App</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Version</span>
                <span className="text-gray-800 font-medium">1.0.0</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Last Updated</span>
                <span className="text-gray-800 font-medium">October 15, 2023</span>
              </div>
              
              <div className="py-2">
                <div className="mb-2">
                  <Link href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                    Terms of Service
                  </Link>
                </div>
                <div>
                  <Link href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 