'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

// Mock user data
const USER = {
  name: 'John Wilson',
  email: 'john.wilson@example.com',
  phone: '+1 (212) 555-1234',
  image: '/images/profile.jpg',
  addresses: [
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
  ],
  paymentMethods: [
    {
      id: 'card1',
      type: 'Visa',
      number: '**** **** **** 4242',
      expiry: '09/25',
      default: true,
    },
    {
      id: 'card2',
      type: 'Mastercard',
      number: '**** **** **** 5555',
      expiry: '12/23',
      default: false,
    }
  ]
};

// Mock order history
const ORDERS = [
  {
    id: 'ORD-12345',
    date: '24 Sep 2022',
    time: '06:45 PM',
    total: 49.98,
    status: 'Delivered',
    items: [
      {
        id: 'item1',
        name: 'Cheese Pizza',
        quantity: 1,
        price: 12.99,
        image: '/images/pizza.jpg',
      },
      {
        id: 'item2',
        name: 'Burger Special',
        quantity: 2,
        price: 8.99,
        image: '/images/burger.jpg',
      }
    ]
  },
  {
    id: 'ORD-12344',
    date: '20 Sep 2022',
    time: '07:30 PM',
    total: 28.97,
    status: 'Delivered',
    items: [
      {
        id: 'item3',
        name: 'Sushi Combo',
        quantity: 1,
        price: 18.99,
        image: '/images/sushi.jpg',
      },
      {
        id: 'item4',
        name: 'Soft Drink',
        quantity: 2,
        price: 2.99,
        image: '/images/drink.jpg',
      }
    ]
  }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              {/* Profile Overview */}
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={USER.image}
                    alt={USER.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">{USER.name}</h2>
                  <p className="text-sm text-gray-500">{USER.email}</p>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="space-y-1">
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-primary-50 text-primary-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  Profile Information
                </button>
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'orders' 
                      ? 'bg-primary-50 text-primary-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('orders')}
                >
                  Order History
                </button>
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'addresses' 
                      ? 'bg-primary-50 text-primary-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('addresses')}
                >
                  Addresses
                </button>
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'payments' 
                      ? 'bg-primary-50 text-primary-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('payments')}
                >
                  Payment Methods
                </button>
                <Link 
                  href="/settings"
                  className="block w-full text-left px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Settings
                </Link>
                <button
                  className="w-full text-left px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Logout
                </button>
              </nav>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="md:col-span-3">
            {/* Profile Information */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={USER.name}
                      className="input"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={USER.email}
                      className="input"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={USER.phone}
                      className="input"
                      readOnly
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button className="btn btn-primary px-4">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Order History */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-800">Order History</h2>
                
                {ORDERS.map(order => (
                  <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800">Order #{order.id}</h3>
                        <p className="text-sm text-gray-500">{order.date} • {order.time}</p>
                      </div>
                      <div>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center py-2 border-b border-gray-100 last:border-0">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-3">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-800">${item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total</span>
                        <span className="font-bold text-gray-900">${order.total.toFixed(2)}</span>
                      </div>
                      <div className="mt-4 flex justify-end space-x-3">
                        <button className="btn btn-secondary text-sm">
                          Order Again
                        </button>
                        <Link href={`/tracking?order=${order.id}`} className="btn btn-primary text-sm">
                          Track Order
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Addresses */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">My Addresses</h2>
                  <button className="btn btn-primary text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Address
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {USER.addresses.map(address => (
                    <div key={address.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium text-gray-800 flex items-center">
                          {address.name}
                          {address.default && (
                            <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </h3>
                        <div className="flex space-x-2">
                          <button className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600">{address.address}</p>
                      <p className="text-gray-600">{address.city}, {address.state} {address.zip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Payment Methods */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Payment Methods</h2>
                  <button className="btn btn-primary text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Payment Method
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {USER.paymentMethods.map(method => (
                    <div key={method.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium text-gray-800 flex items-center">
                          {method.type}
                          {method.default && (
                            <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </h3>
                        <div className="flex space-x-2">
                          <button className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600">{method.number}</p>
                      <p className="text-gray-500 text-sm">Expires: {method.expiry}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 