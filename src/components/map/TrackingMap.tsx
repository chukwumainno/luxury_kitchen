'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const restaurantIcon = new L.DivIcon({
  html: `<div class="bg-orange-500 text-white p-2 rounded-full shadow-lg">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
    </svg>
  </div>`,
  className: 'custom-marker',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const homeIcon = new L.DivIcon({
  html: `<div class="bg-gray-800 text-white p-2 rounded-full shadow-lg">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  </div>`,
  className: 'custom-marker',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const driverIcon = new L.DivIcon({
  html: `<div class="bg-green-500 text-white p-2 rounded-full shadow-lg animate-pulse">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  </div>`,
  className: 'custom-marker',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

interface TrackingMapProps {
  currentStatus: number;
}

export default function TrackingMap({ currentStatus }: TrackingMapProps) {
  // Mock coordinates (you can replace these with real coordinates)
  const restaurantPosition: [number, number] = [6.5244, 3.3792]; // Lagos, Nigeria (Restaurant)
  const homePosition: [number, number] = [6.4311, 3.4203]; // Customer location
  const driverPosition: [number, number] = [
    restaurantPosition[0] + (homePosition[0] - restaurantPosition[0]) * (currentStatus / 3),
    restaurantPosition[1] + (homePosition[1] - restaurantPosition[1]) * (currentStatus / 3)
  ]; // Driver moves between restaurant and home based on progress

  // Route path
  const routePath: [number, number][] = [
    restaurantPosition,
    [6.4778, 3.3995], // Intermediate point
    homePosition
  ];

  const center: [number, number] = [
    (restaurantPosition[0] + homePosition[0]) / 2,
    (restaurantPosition[1] + homePosition[1]) / 2
  ];

  return (
    <div className="relative h-64 rounded-xl overflow-hidden">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Restaurant marker */}
        <Marker position={restaurantPosition} icon={restaurantIcon}>
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold">Luxury Kitchen</h3>
              <p className="text-sm text-gray-600">Restaurant Location</p>
            </div>
          </Popup>
        </Marker>
        
        {/* Home marker */}
        <Marker position={homePosition} icon={homeIcon}>
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold">Your Location</h3>
              <p className="text-sm text-gray-600">Delivery Address</p>
            </div>
          </Popup>
        </Marker>
        
        {/* Driver marker (only show when order is being delivered) */}
        {currentStatus >= 2 && (
          <Marker position={driverPosition} icon={driverIcon}>
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold">Driver Location</h3>
                <p className="text-sm text-gray-600">On the way to you</p>
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* Route path */}
        <Polyline
          positions={routePath}
          color="#f97316"
          weight={4}
          opacity={0.7}
          dashArray="10, 10"
        />
      </MapContainer>
    </div>
  );
} 