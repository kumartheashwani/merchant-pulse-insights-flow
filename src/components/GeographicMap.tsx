
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface GeographicData {
  id: string;
  name: string;
  share: number;
  trend: number;
  coordinates: [number, number];
  level: 'state' | 'city';
}

interface GeographicMapProps {
  data: GeographicData[];
  onLocationSelect?: (location: GeographicData) => void;
}

const GeographicMap = ({ data, onLocationSelect }: GeographicMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [zoomLevel, setZoomLevel] = useState<'state' | 'city'>('state');
  const [selectedState, setSelectedState] = useState<string>('');

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-98.5795, 39.8283], // Center of US
      zoom: zoomLevel === 'state' ? 4 : 8,
      pitch: 0,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add markers for each location
    data.forEach((location) => {
      if (!map.current) return;
      
      // Create a custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.style.cssText = `
        width: ${Math.max(20, location.share)}px;
        height: ${Math.max(20, location.share)}px;
        background-color: ${location.trend > 0 ? '#10b981' : location.trend < 0 ? '#ef4444' : '#6b7280'};
        border: 2px solid white;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 10px;
        font-weight: bold;
      `;
      markerElement.textContent = `${location.share}%`;

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-semibold">${location.name}</h3>
          <p class="text-sm">Market Share: ${location.share}%</p>
          <p class="text-sm ${location.trend > 0 ? 'text-green-600' : location.trend < 0 ? 'text-red-600' : 'text-gray-600'}">
            Trend: ${location.trend > 0 ? '+' : ''}${location.trend}%
          </p>
        </div>
      `);

      // Add marker to map
      new mapboxgl.Marker(markerElement)
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(map.current);

      // Add click handler
      markerElement.addEventListener('click', () => {
        onLocationSelect?.(location);
      });
    });

    setShowTokenInput(false);
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      initializeMap();
    }
  };

  const filteredData = data.filter(location => {
    if (zoomLevel === 'state') {
      return location.level === 'state';
    } else {
      return selectedState ? location.name.includes(selectedState) : location.level === 'city';
    }
  });

  useEffect(() => {
    if (map.current && !showTokenInput) {
      // Clear existing markers and re-add with filtered data
      const markers = document.querySelectorAll('.custom-marker');
      markers.forEach(marker => marker.remove());
      
      // Re-initialize with filtered data
      filteredData.forEach((location) => {
        if (!map.current) return;
        
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.style.cssText = `
          width: ${Math.max(20, location.share)}px;
          height: ${Math.max(20, location.share)}px;
          background-color: ${location.trend > 0 ? '#10b981' : location.trend < 0 ? '#ef4444' : '#6b7280'};
          border: 2px solid white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 10px;
          font-weight: bold;
        `;
        markerElement.textContent = `${location.share}%`;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-2">
            <h3 class="font-semibold">${location.name}</h3>
            <p class="text-sm">Market Share: ${location.share}%</p>
            <p class="text-sm ${location.trend > 0 ? 'text-green-600' : location.trend < 0 ? 'text-red-600' : 'text-gray-600'}">
              Trend: ${location.trend > 0 ? '+' : ''}${location.trend}%
            </p>
          </div>
        `);

        new mapboxgl.Marker(markerElement)
          .setLngLat(location.coordinates)
          .setPopup(popup)
          .addTo(map.current);

        markerElement.addEventListener('click', () => {
          onLocationSelect?.(location);
        });
      });

      // Adjust zoom based on level
      if (zoomLevel === 'state') {
        map.current.flyTo({ center: [-98.5795, 39.8283], zoom: 4 });
      } else {
        map.current.flyTo({ zoom: 8 });
      }
    }
  }, [zoomLevel, selectedState, showTokenInput]);

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="flex flex-col items-center justify-center h-80 space-y-4 bg-gray-50 rounded-lg">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Mapbox Token Required</h3>
          <p className="text-sm text-gray-600 max-w-md">
            To display the interactive map, please enter your Mapbox public token. 
            You can get one from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mapbox.com</a>
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
          <Input
            id="mapbox-token"
            type="text"
            placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiaWF0IjoxNjA5NDA5NjAwfQ..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="w-80"
          />
          <Button onClick={handleTokenSubmit} className="w-full">
            Initialize Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <Label htmlFor="zoom-level">View Level:</Label>
          <Select value={zoomLevel} onValueChange={(value: 'state' | 'city') => setZoomLevel(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="state">State</SelectItem>
              <SelectItem value="city">City</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {zoomLevel === 'city' && (
          <div className="flex items-center gap-2">
            <Label htmlFor="state-filter">Filter by State:</Label>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All States" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All States</SelectItem>
                <SelectItem value="NY">New York</SelectItem>
                <SelectItem value="CA">California</SelectItem>
                <SelectItem value="TX">Texas</SelectItem>
                <SelectItem value="FL">Florida</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      <div className="relative w-full h-80 rounded-lg overflow-hidden">
        <div ref={mapContainer} className="absolute inset-0" />
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span>Positive Trend</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Negative Trend</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <span>Neutral</span>
        </div>
        <span className="ml-4">Marker size represents market share percentage</span>
      </div>
    </div>
  );
};

export default GeographicMap;
