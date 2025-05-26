
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, TrendingDown, TrendingUp, AlertTriangle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const productData = [
  { 
    name: 'iPhone Cases', 
    rank: 1, 
    performance: 'declining', 
    churnRate: 18,
    competitorAvg: 12,
    opportunity: 'Price Optimization',
    recommendation: 'Reduce price by 8% and add loyalty rewards'
  },
  { 
    name: 'Wireless Earbuds', 
    rank: 2, 
    performance: 'declining', 
    churnRate: 15,
    competitorAvg: 10,
    opportunity: 'Shipping Speed',
    recommendation: 'Offer next-day delivery for premium customers'
  },
  { 
    name: 'Phone Chargers', 
    rank: 3, 
    performance: 'stable', 
    churnRate: 12,
    competitorAvg: 11,
    opportunity: 'Bundle Deals',
    recommendation: 'Create charging bundles with cables and adapters'
  },
  { 
    name: 'Bluetooth Speakers', 
    rank: 4, 
    performance: 'growing', 
    churnRate: 8,
    competitorAvg: 14,
    opportunity: 'Market Expansion',
    recommendation: 'Increase inventory and expand to new geographies'
  },
  { 
    name: 'Smart Watches', 
    rank: 5, 
    performance: 'growing', 
    churnRate: 6,
    competitorAvg: 13,
    opportunity: 'Premium Positioning',
    recommendation: 'Focus on high-end models and exclusive features'
  },
];

const ProductInsights = () => {
  const navigate = useNavigate();

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'growing': return 'bg-emerald-100 text-emerald-800';
      case 'stable': return 'bg-blue-100 text-blue-800';
      case 'declining': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceIcon = (performance: string) => {
    switch (performance) {
      case 'growing': return <TrendingUp size={16} />;
      case 'declining': return <TrendingDown size={16} />;
      default: return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Product Performance Insights</h1>
            <p className="text-slate-600">Analyze your top products and competitive positioning</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <Package className="w-8 h-8 mx-auto mb-2" />
                <p className="text-blue-100 text-sm">Total Products</p>
                <p className="text-3xl font-bold">156</p>
                <p className="text-blue-100 text-sm mt-1">Active SKUs</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <p className="text-emerald-100 text-sm">Top Performer</p>
                <p className="text-xl font-bold">Smart Watches</p>
                <p className="text-emerald-100 text-sm mt-1">6% churn rate</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                <p className="text-red-100 text-sm">Needs Attention</p>
                <p className="text-xl font-bold">iPhone Cases</p>
                <p className="text-red-100 text-sm mt-1">18% churn rate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Top 5 Products Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productData.map((product) => (
                <div key={product.rank} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-700">
                        #{product.rank}
                      </div>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <Badge className={getPerformanceColor(product.performance)}>
                        {getPerformanceIcon(product.performance)}
                        <span className="ml-1 capitalize">{product.performance}</span>
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">{product.churnRate}%</p>
                      <p className="text-sm text-slate-500">Churn Rate</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Your Churn:</span>
                        <span className="font-semibold">{product.churnRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Competitor Avg:</span>
                        <span className="font-semibold">{product.competitorAvg}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Difference:</span>
                        <span className={`font-semibold ${
                          product.churnRate > product.competitorAvg ? 'text-red-600' : 'text-emerald-600'
                        }`}>
                          {product.churnRate > product.competitorAvg ? '+' : '-'}
                          {Math.abs(product.churnRate - product.competitorAvg)}%
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-slate-600 mb-2">Opportunity:</p>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {product.opportunity}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-sm text-slate-600 mb-2">Recommendation:</p>
                      <p className="text-sm text-slate-800">{product.recommendation}</p>
                      <Button size="sm" className="mt-2">
                        Implement
                      </Button>
                    </div>
                    
                    <div>
                      <p className="text-sm text-slate-600 mb-2">Customer Insights:</p>
                      <p className="text-sm text-slate-800 mb-2">Analyze who buys this product</p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full flex items-center gap-2"
                        onClick={() => navigate('/customer-segmentation')}
                      >
                        <Users size={16} />
                        View Customer Segments
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">🚨 Urgent: iPhone Cases</h4>
                <p className="text-red-700 text-sm mb-3">
                  50% higher churn than competitors. Immediate price adjustment needed.
                </p>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Adjust Pricing
                </Button>
              </div>
              <div className="p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-semibold text-emerald-900 mb-2">💡 Opportunity: Smart Watches</h4>
                <p className="text-emerald-700 text-sm mb-3">
                  Outperforming competitors. Consider expanding inventory.
                </p>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Expand Inventory
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Competitive Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Products Beating Competition</span>
                  <span className="text-emerald-600 font-bold">2/5</span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Average Churn vs Market</span>
                  <span className="text-red-600 font-bold">+2.3%</span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Potential Revenue Recovery</span>
                  <span className="text-blue-600 font-bold">$23,450</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProductInsights;
