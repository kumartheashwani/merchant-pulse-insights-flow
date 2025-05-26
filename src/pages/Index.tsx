
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { MetricCard } from '@/components/MetricCard';
import { 
  PieChart, 
  BarChart3, 
  ShoppingCart, 
  UserX, 
  TrendingUp, 
  Users,
  Target,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
          <p className="text-blue-100 mb-4">
            Here's what's happening with your D2C electronics store this week.
          </p>
          <div className="flex gap-4">
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-sm opacity-90">Revenue this month</p>
              <p className="text-xl font-bold">$84,352</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-sm opacity-90">Orders</p>
              <p className="text-xl font-bold">1,247</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-sm opacity-90">Conversion Rate</p>
              <p className="text-xl font-bold">3.2%</p>
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
            onClick={() => navigate('/market-share')}
            className="hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100"
          />
          
          <MetricCard
            title="Avg Transaction Size"
            value="$127"
            change={8.2}
            changeLabel="vs competitors"
            icon={<BarChart3 size={20} />}
            onClick={() => navigate('/transaction-analysis')}
            className="hover:bg-gradient-to-br hover:from-emerald-50 hover:to-emerald-100"
          />
          
          <MetricCard
            title="Top Product Performance"
            value="iPhone Cases"
            change={-5.3}
            changeLabel="churn rate"
            icon={<ShoppingCart size={20} />}
            onClick={() => navigate('/product-insights')}
            className="hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100"
          />
          
          <MetricCard
            title="Customer Churn"
            value="8.7%"
            change={-1.2}
            changeLabel="vs last month"
            icon={<UserX size={20} />}
            onClick={() => navigate('/churn-analysis')}
            className="hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100"
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
            onClick={() => navigate('/trend-analysis')}
            className="hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100"
          />
          
          <MetricCard
            title="Customer Segments"
            value="5 Active"
            change={12.8}
            changeLabel="engagement up"
            icon={<Users size={20} />}
            onClick={() => navigate('/customer-segmentation')}
            className="hover:bg-gradient-to-br hover:from-indigo-50 hover:to-indigo-100"
          />
        </div>

        {/* Insights & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <div className="p-3 bg-emerald-50 rounded-lg">
                <h4 className="font-semibold text-emerald-900 mb-1">Optimize Wireless Earbuds</h4>
                <p className="text-sm text-emerald-700">15% churn detected, recommend price adjustment</p>
                <Button size="sm" className="mt-2">Take Action</Button>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-1">Target High-Income Segment</h4>
                <p className="text-sm text-purple-700">Untapped 35-45 age group with 2x spending power</p>
                <Button size="sm" className="mt-2">Launch Campaign</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="text-emerald-600" size={20} />
                Competitive Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-semibold">TechHub</p>
                  <p className="text-sm text-slate-600">Market Leader</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">23%</p>
                  <p className="text-sm text-slate-600">Market Share</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-semibold">ElectroMax</p>
                  <p className="text-sm text-slate-600">Close Competitor</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">18%</p>
                  <p className="text-sm text-slate-600">Market Share</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div>
                  <p className="font-semibold text-blue-900">Your Store</p>
                  <p className="text-sm text-blue-600">Growing Fast</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-blue-900">12.3%</p>
                  <p className="text-sm text-blue-600">Market Share</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
