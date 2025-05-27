import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { MetricCard } from '@/components/MetricCard';
import { PaymentMethodCard } from '@/components/PaymentMethodCard';
import { StoreSelector } from '@/components/StoreSelector';
import { 
  PieChart, 
  ShoppingCart, 
  UserX, 
  TrendingUp, 
  Users,
  Target,
  DollarSign,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState('all');

  // Dynamic metrics based on selected store
  const getMetricsForStore = (storeId: string) => {
    const baseMetrics = {
      revenue: '$84,352',
      orders: '1,247',
      sentiment: '71%'
    };

    switch (storeId) {
      case 'store-main':
        return {
          revenue: '$24,500',
          orders: '387',
          sentiment: '78%'
        };
      case 'store-mall1':
        return {
          revenue: '$18,200',
          orders: '298',
          sentiment: '69%'
        };
      case 'group-downtown':
        return {
          revenue: '$45,800',
          orders: '678',
          sentiment: '74%'
        };
      default:
        return baseMetrics;
    }
  };

  const currentMetrics = getMetricsForStore(selectedStore);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Store Selection */}
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <StoreSelector 
            selectedStore={selectedStore}
            onStoreChange={setSelectedStore}
          />
        </div>

        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-xl p-6 text-white shadow-lg border border-blue-500/20">
          <h1 className="text-3xl font-bold mb-2 text-white">Welcome back, Sarah!</h1>
          <p className="text-blue-100 mb-4">
            Here's what's happening with your D2C electronics store this week.
          </p>
          <div className="flex gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/10">
              <p className="text-sm opacity-90">Revenue this month</p>
              <p className="text-xl font-bold">{currentMetrics.revenue}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/10">
              <p className="text-sm opacity-90">Orders</p>
              <p className="text-xl font-bold">{currentMetrics.orders}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/10">
              <p className="text-sm opacity-90">Avg Sentiment</p>
              <p className="text-xl font-bold">{currentMetrics.sentiment}</p>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Market Share"
            value="12.3%"
            change={2.1}
            changeLabel="vs last quarter"
            icon={<PieChart size={20} />}
            onClick={() => navigate(`/market-share?store=${selectedStore}`)}
            className="hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100"
          />
          
          <MetricCard
            title="Top Product Performance"
            value="iPhone Cases"
            change={-5.3}
            changeLabel="churn rate"
            icon={<ShoppingCart size={20} />}
            onClick={() => navigate(`/product-insights?store=${selectedStore}`)}
            className="hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100"
          />
          
          <MetricCard
            title="Customer Churn"
            value="8.7%"
            change={-1.2}
            changeLabel="vs last month"
            icon={<UserX size={20} />}
            onClick={() => navigate(`/churn-analysis?store=${selectedStore}`)}
            className="hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100"
          />

          <MetricCard
            title="Customer Sentiment"
            value={currentMetrics.sentiment}
            change={4.2}
            changeLabel="vs last month"
            icon={<MessageSquare size={20} />}
            onClick={() => navigate(`/product-insights?store=${selectedStore}`)}
            className="hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetricCard
            title="Sales Trend (WoW)"
            value="+15.4%"
            change={15.4}
            changeLabel="growth"
            icon={<TrendingUp size={20} />}
            onClick={() => navigate(`/trend-analysis?store=${selectedStore}`)}
            className="hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100"
          />
          
          <MetricCard
            title="Customer Segments"
            value="5 Active"
            change={12.8}
            changeLabel="engagement up"
            icon={<Users size={20} />}
            onClick={() => navigate(`/customer-segmentation?store=${selectedStore}`)}
            className="hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100"
          />
        </div>

        {/* Insights & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="text-blue-600" size={20} />
                Key Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-1">Expand to Nearby Zip Codes</h4>
                <p className="text-sm text-blue-700">Market analysis shows 23% opportunity in adjacent areas</p>
                <Button size="sm" className="mt-2">View Details</Button>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-1">Optimize Wireless Earbuds</h4>
                <p className="text-sm text-blue-700">15% churn detected, recommend price adjustment</p>
                <Button size="sm" className="mt-2">Take Action</Button>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-1">Target High-Income Segment</h4>
                <p className="text-sm text-blue-700">Untapped 35-45 age group with 2x spending power</p>
                <Button size="sm" className="mt-2">Launch Campaign</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="text-blue-600" size={20} />
                Sentiment Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                <div>
                  <p className="font-semibold">Smart Watches</p>
                  <p className="text-sm text-slate-600">Top Rated Product</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-emerald-100 text-emerald-800">82%</Badge>
                  <p className="text-sm text-slate-600">Positive</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-semibold">Wireless Earbuds</p>
                  <p className="text-sm text-slate-600">Needs Attention</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-yellow-100 text-yellow-800">58%</Badge>
                  <p className="text-sm text-slate-600">Mixed</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div>
                  <p className="font-semibold text-blue-900">Overall Sentiment</p>
                  <p className="text-sm text-blue-600">+4.2% vs last month</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-blue-100 text-blue-800">{currentMetrics.sentiment}</Badge>
                  <p className="text-sm text-blue-600">Positive Trend</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Analysis Card */}
          <PaymentMethodCard selectedStore={selectedStore} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
