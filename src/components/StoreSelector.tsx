
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Store, MapPin } from 'lucide-react';

export interface StoreOption {
  id: string;
  name: string;
  type: 'individual' | 'group' | 'all';
  location?: string;
  storeCount?: number;
}

interface StoreSelectorProps {
  selectedStore: string;
  onStoreChange: (storeId: string) => void;
  className?: string;
}

export const StoreSelector: React.FC<StoreSelectorProps> = ({
  selectedStore,
  onStoreChange,
  className = ""
}) => {
  const storeOptions: StoreOption[] = [
    { id: 'all', name: 'All Stores', type: 'all', storeCount: 12 },
    { id: 'group-downtown', name: 'Downtown Group', type: 'group', location: 'Downtown District', storeCount: 5 },
    { id: 'group-mall', name: 'Shopping Mall Group', type: 'group', location: 'Mall Locations', storeCount: 4 },
    { id: 'store-main', name: 'Main Street Store', type: 'individual', location: '123 Main St, Downtown' },
    { id: 'store-mall1', name: 'Westfield Mall Store', type: 'individual', location: 'Westfield Shopping Center' },
    { id: 'store-mall2', name: 'Eastgate Mall Store', type: 'individual', location: 'Eastgate Shopping Center' },
    { id: 'store-outlet', name: 'Outlet Store', type: 'individual', location: 'Premium Outlets' },
  ];

  const getSelectedStore = () => {
    return storeOptions.find(store => store.id === selectedStore);
  };

  const getStoreIcon = (type: string) => {
    switch (type) {
      case 'all':
        return <Store className="w-4 h-4 text-blue-600" />;
      case 'group':
        return <div className="w-4 h-4 bg-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">G</div>;
      default:
        return <MapPin className="w-4 h-4 text-green-600" />;
    }
  };

  const getStoreBadge = (type: string) => {
    switch (type) {
      case 'all':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">All Stores</Badge>;
      case 'group':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">Store Group</Badge>;
      default:
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Individual</Badge>;
    }
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <Store className="w-5 h-5 text-slate-600" />
        <span className="font-medium text-slate-900">Store View:</span>
      </div>
      
      <Select value={selectedStore} onValueChange={onStoreChange}>
        <SelectTrigger className="w-80">
          <SelectValue>
            <div className="flex items-center gap-2">
              {getStoreIcon(getSelectedStore()?.type || 'all')}
              <span>{getSelectedStore()?.name}</span>
              {getSelectedStore()?.storeCount && (
                <span className="text-xs text-slate-500">
                  ({getSelectedStore()?.storeCount} stores)
                </span>
              )}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {storeOptions.map((store) => (
            <SelectItem key={store.id} value={store.id}>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  {getStoreIcon(store.type)}
                  <div>
                    <div className="font-medium">{store.name}</div>
                    {store.location && (
                      <div className="text-xs text-slate-500">{store.location}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {store.storeCount && (
                    <span className="text-xs text-slate-500">
                      {store.storeCount} stores
                    </span>
                  )}
                  {getStoreBadge(store.type)}
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
