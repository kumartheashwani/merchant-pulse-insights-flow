import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  UserX, 
  PieChart,
  Home,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: PieChart, label: 'Market Share', path: '/market-share' },
  { icon: ShoppingCart, label: 'Product Insights', path: '/product-insights' },
  { icon: UserX, label: 'Churn Analysis', path: '/churn-analysis' },
  { icon: TrendingUp, label: 'Trend Analysis', path: '/trend-analysis' },
  { icon: Users, label: 'Customer Segments', path: '/customer-segmentation' },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "bg-blue-900 text-white transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-blue-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
              MerchantIQ
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 hover:bg-blue-700 rounded transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg" 
                  : "hover:bg-blue-700 text-blue-200 hover:text-white"
              )}
            >
              <Icon size={20} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-blue-700">
        <div className={cn(
          "bg-blue-800 rounded-lg p-3",
          collapsed ? "text-center" : ""
        )}>
          {!collapsed ? (
            <div>
              <p className="text-sm text-blue-300 mb-1">Business Type</p>
              <p className="font-semibold text-blue-100">D2C Store</p>
            </div>
          ) : (
            <div className="w-3 h-3 bg-blue-400 rounded-full mx-auto"></div>
          )}
        </div>
      </div>
    </div>
  );
};
