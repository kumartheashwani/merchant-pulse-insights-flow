
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
  const map = useRef<L.Map | null>(null);
  const markersLayer = useRef<L.LayerGroup | null>(null);
  const [zoomLevel, setZoomLevel] = useState<'state' | 'city'>('state');
  const [selectedState, setSelectedState] = useState<string>('');

  const initializeMap = () => {
    if (!mapContainer.current) return;

    // Initialize the map
    map.current = L.map(mapContainer.current).setView([39.8283, -98.5795], 4);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map.current);

    // Create a layer group for markers
    markersLayer.current = L.layerGroup().addTo(map.current);

    // Add markers for initial data
    addMarkers(data.filter(location => location.level === 'state'));
  };

  const addMarkers = (locations: GeographicData[]) => {
    if (!map.current || !markersLayer.current) return;

    // Clear existing markers
    markersLayer.current.clearLayers();

    locations.forEach((location) => {
      // Create custom icon based on market share and trend
      const size = Math.max(20, Math.min(50, location.share * 2));
      const color = location.trend > 0 ? '#10b981' : location.trend < 0 ? '#ef4444' : '#6b7280';
      
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border: 2px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 10px;
            font-weight: bold;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            cursor: pointer;
          ">
            ${location.share}%
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      // Create marker
      const marker = L.marker([location.coordinates[1], location.coordinates[0]], {
        icon: customIcon,
      });

      // Create popup content
      const popupContent = `
        <div class="p-2">
          <h3 class="font-semibold">${location.name}</h3>
          <p class="text-sm">Market Share: ${location.share}%</p>
          <p class="text-sm ${location.trend > 0 ? 'text-green-600' : location.trend < 0 ? 'text-red-600' : 'text-gray-600'}">
            Trend: ${location.trend > 0 ? '+' : ''}${location.trend}%
          </p>
        </div>
      `;

      marker.bindPopup(popupContent);

      // Add click event
      marker.on('click', () => {
        onLocationSelect?.(location);
      });

      // Add marker to layer group
      markersLayer.current?.addLayer(marker);
    });
  };

  const filteredData = data.filter(location => {
    if (zoomLevel === 'state') {
      return location.level === 'state';
    } else {
      return selectedState ? location.name.includes(selectedState) : location.level === 'city';
    }
  });

  useEffect(() => {
    initializeMap();

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (map.current && markersLayer.current) {
      // Update markers based on filters
      addMarkers(filteredData);

      // Adjust zoom based on level
      if (zoomLevel === 'state') {
        map.current.setView([39.8283, -98.5795], 4);
      } else {
        // If filtering by state, zoom to that state's approximate center
        if (selectedState && filteredData.length > 0) {
          const stateData = filteredData[0];
          map.current.setView([stateData.coordinates[1], stateData.coordinates[0]], 7);
        } else {
          map.current.setView([39.8283, -98.5795], 6);
        }
      }
    }
  }, [zoomLevel, selectedState, filteredData]);

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
      
      <div className="relative w-full h-80 rounded-lg overflow-hidden border">
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
