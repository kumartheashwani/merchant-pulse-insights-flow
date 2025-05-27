
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
  level: 'state' | 'city' | 'zipcode' | 'radius';
}

interface GeographicMapProps {
  data: GeographicData[];
  onLocationSelect?: (location: GeographicData) => void;
}

const GeographicMap = ({ data, onLocationSelect }: GeographicMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersLayer = useRef<L.LayerGroup | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  // Determine map type based on data
  const mapType = data.length > 0 ? data[0].level : 'state';
  const isStateLevel = mapType === 'state';
  const isLocalLevel = ['zipcode', 'radius', 'city'].includes(mapType);

  const initializeMap = () => {
    if (!mapContainer.current) return;

    // Different initial views based on data type
    const mapConfig = isStateLevel 
      ? { center: [39.8283, -98.5795], zoom: 4 } // US view for states
      : { center: [34.0522, -118.2437], zoom: 10 }; // Local view for zip/radius

    // Initialize the map
    map.current = L.map(mapContainer.current).setView(mapConfig.center as [number, number], mapConfig.zoom);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map.current);

    // Create a layer group for markers
    markersLayer.current = L.layerGroup().addTo(map.current);

    // Add markers for data
    addMarkers(data);
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
            ${location.share.toFixed(1)}%
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
      const levelLabel = location.level === 'zipcode' ? 'Zip Code' : 
                        location.level === 'radius' ? 'Radius Area' :
                        location.level === 'state' ? 'State' : 'City';
      
      const popupContent = `
        <div class="p-2">
          <h3 class="font-semibold">${location.name}</h3>
          <p class="text-sm">Type: ${levelLabel}</p>
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
        setSelectedLocation(location.id);
      });

      // Add marker to layer group
      markersLayer.current?.addLayer(marker);
    });

    // Auto-fit map to show all markers if there are multiple locations
    if (locations.length > 1 && map.current) {
      const group = L.featureGroup(markersLayer.current.getLayers());
      map.current.fitBounds(group.getBounds().pad(0.1));
    }
  };

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
    const location = data.find(l => l.id === locationId);
    if (location && map.current) {
      // Zoom to the selected location
      const zoomLevel = isLocalLevel ? 12 : 6;
      map.current.setView([location.coordinates[1], location.coordinates[0]], zoomLevel);
      
      // Trigger callback
      onLocationSelect?.(location);
    }
  };

  const resetView = () => {
    setSelectedLocation('');
    if (map.current) {
      if (isStateLevel) {
        map.current.setView([39.8283, -98.5795], 4);
      } else {
        // Auto-fit to all locations
        addMarkers(data);
      }
    }
  };

  useEffect(() => {
    initializeMap();

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (map.current && markersLayer.current) {
      addMarkers(data);
    }
  }, [data]);

  const getLocationTypeLabel = () => {
    switch (mapType) {
      case 'state': return 'State';
      case 'zipcode': return 'Zip Code';
      case 'radius': return 'Radius Area';
      case 'city': return 'City';
      default: return 'Location';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center flex-wrap">
        <div className="flex items-center gap-2">
          <Label htmlFor="location-select">Focus on {getLocationTypeLabel()}:</Label>
          <Select value={selectedLocation} onValueChange={handleLocationSelect}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder={`Select ${getLocationTypeLabel()}`} />
            </SelectTrigger>
            <SelectContent>
              {data.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedLocation && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={resetView}
          >
            Reset View
          </Button>
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
