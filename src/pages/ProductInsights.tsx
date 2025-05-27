import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, TrendingDown, TrendingUp, AlertTriangle, Users, MessageSquare, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SentimentModal } from '@/components/SentimentModal';

const productData = [
  { 
    name: 'iPhone Cases', 
    rank: 1, 
    performance: 'declining', 
    churnRate: 18,
    competitorAvg: 12,
    opportunity: 'Price Optimization',
    recommendation: 'Reduce price by 8% and add loyalty rewards',
    sentimentScore: 0.65,
    sentimentBreakdown: { positive: 65, negative: 20, neutral: 15 }
  },
  { 
    name: 'Wireless Earbuds', 
    rank: 2, 
    performance: 'declining', 
    churnRate: 15,
    competitorAvg: 10,
    opportunity: 'Shipping Speed',
    recommendation: 'Offer next-day delivery for premium customers',
    sentimentScore: 0.58,
    sentimentBreakdown: { positive: 58, negative: 28, neutral: 14 }
  },
  { 
    name: 'Phone Chargers', 
    rank: 3, 
    performance: 'stable', 
    churnRate: 12,
    competitorAvg: 11,
    opportunity: 'Bundle Deals',
    recommendation: 'Create charging bundles with cables and adapters',
    sentimentScore: 0.72,
    sentimentBreakdown: { positive: 72, negative: 15, neutral: 13 }
  },
  { 
    name: 'Bluetooth Speakers', 
    rank: 4, 
    performance: 'growing', 
    churnRate: 8,
    competitorAvg: 14,
    opportunity: 'Market Expansion',
    recommendation: 'Increase inventory and expand to new geographies',
    sentimentScore: 0.78,
    sentimentBreakdown: { positive: 78, negative: 12, neutral: 10 }
  },
  { 
    name: 'Smart Watches', 
    rank: 5, 
    performance: 'growing', 
    churnRate: 6,
    competitorAvg: 13,
    opportunity: 'Premium Positioning',
    recommendation: 'Focus on high-end models and exclusive features',
    sentimentScore: 0.82,
    sentimentBreakdown: { positive: 82, negative: 8, neutral: 10 }
  },
];

const wordCloudData = {
  'iPhone Cases': [
    { text: 'durable', value: 45, sentiment: 'positive' as const },
    { text: 'expensive', value: 32, sentiment: 'negative' as const },
    { text: 'stylish', value: 28, sentiment: 'positive' as const },
    { text: 'fragile', value: 25, sentiment: 'negative' as const },
    { text: 'perfect', value: 22, sentiment: 'positive' as const },
    { text: 'quality', value: 20, sentiment: 'positive' as const },
    { text: 'overpriced', value: 18, sentiment: 'negative' as const },
    { text: 'amazing', value: 15, sentiment: 'positive' as const }
  ],
  'Wireless Earbuds': [
    { text: 'sound', value: 42, sentiment: 'positive' as const },
    { text: 'battery', value: 38, sentiment: 'negative' as const },
    { text: 'comfortable', value: 35, sentiment: 'positive' as const },
    { text: 'connection', value: 30, sentiment: 'negative' as const },
    { text: 'excellent', value: 25, sentiment: 'positive' as const },
    { text: 'problems', value: 22, sentiment: 'negative' as const },
    { text: 'clear', value: 20, sentiment: 'positive' as const },
    { text: 'disappointing', value: 18, sentiment: 'negative' as const }
  ],
  'Phone Chargers': [
    { text: 'fast', value: 40, sentiment: 'positive' as const },
    { text: 'reliable', value: 35, sentiment: 'positive' as const },
    { text: 'works', value: 30, sentiment: 'positive' as const },
    { text: 'broke', value: 25, sentiment: 'negative' as const },
    { text: 'convenient', value: 22, sentiment: 'positive' as const },
    { text: 'cheap', value: 20, sentiment: 'negative' as const },
    { text: 'perfect', value: 18, sentiment: 'positive' as const },
    { text: 'stopped', value: 15, sentiment: 'negative' as const }
  ],
  'Bluetooth Speakers': [
    { text: 'sound', value: 50, sentiment: 'positive' as const },
    { text: 'loud', value: 45, sentiment: 'positive' as const },
    { text: 'portable', value: 38, sentiment: 'positive' as const },
    { text: 'bass', value: 35, sentiment: 'positive' as const },
    { text: 'great', value: 30, sentiment: 'positive' as const },
    { text: 'distorted', value: 20, sentiment: 'negative' as const },
    { text: 'amazing', value: 18, sentiment: 'positive' as const },
    { text: 'love', value: 15, sentiment: 'positive' as const }
  ],
  'Smart Watches': [
    { text: 'features', value: 48, sentiment: 'positive' as const },
    { text: 'battery', value: 42, sentiment: 'positive' as const },
    { text: 'accurate', value: 38, sentiment: 'positive' as const },
    { text: 'sleek', value: 35, sentiment: 'positive' as const },
    { text: 'excellent', value: 30, sentiment: 'positive' as const },
    { text: 'expensive', value: 15, sentiment: 'negative' as const },
    { text: 'perfect', value: 25, sentiment: 'positive' as const },
    { text: 'innovative', value: 20, sentiment: 'positive' as const }
  ]
};

const ProductInsights = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

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

  const getSentimentIcon = (score: number) => {
    if (score > 0.7) return <TrendingUp size={16} className="text-emerald-600" />;
    if (score < 0.5) return <TrendingDown size={16} className="text-red-600" />;
    return <MessageSquare size={16} className="text-slate-600" />;
  };

  const getSentimentColor = (score: number) => {
    if (score > 0.7) return 'bg-emerald-100 text-emerald-800';
    if (score < 0.5) return 'bg-red-100 text-red-800';
    return 'bg-slate-100 text-slate-800';
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
                      <Badge 
                        className={`${getSentimentColor(product.sentimentScore)} cursor-pointer hover:opacity-80`}
                        onClick={() => setSelectedProduct(product.name)}
                      >
                        {getSentimentIcon(product.sentimentScore)}
                        <span className="ml-1">Sentiment: {(product.sentimentScore * 100).toFixed(0)}%</span>
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">{product.churnRate}%</p>
                      <p className="text-sm text-slate-500">Churn Rate</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                    
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-4 h-4 text-blue-600" />
                        <p className="text-sm font-semibold text-blue-900">Customer Intelligence</p>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white/80 p-2 rounded text-center">
                          <p className="text-xs text-slate-600">Target Audience</p>
                          <p className="text-sm font-medium text-slate-800">Tech Enthusiasts 25-40</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="w-full flex items-center gap-2 bg-white/80 hover:bg-white border-blue-200 text-blue-700 hover:text-blue-800"
                          onClick={() => navigate('/customer-segmentation')}
                        >
                          <BarChart3 size={14} />
                          View Demographics
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-lg border border-emerald-100">
                      <div className="flex items-center gap-2 mb-3">
                        <MessageSquare className="w-4 h-4 text-emerald-600" />
                        <p className="text-sm font-semibold text-emerald-900">Review Analysis</p>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white/80 p-2 rounded text-center">
                          <p className="text-xs text-slate-600">Customer Mood</p>
                          <p className="text-sm font-medium text-slate-800">
                            {product.sentimentScore > 0.7 ? 'Very Positive' : 
                             product.sentimentScore > 0.5 ? 'Positive' : 'Mixed Feelings'}
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="w-full flex items-center gap-2 bg-white/80 hover:bg-white border-emerald-200 text-emerald-700 hover:text-emerald-800"
                          onClick={() => setSelectedProduct(product.name)}
                        >
                          <BarChart3 size={14} />
                          Analyze Feedback
                        </Button>
                      </div>
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

        {selectedProduct && (
          <SentimentModal
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            productName={selectedProduct}
            sentimentScore={productData.find(p => p.name === selectedProduct)?.sentimentScore || 0}
            wordCloudData={wordCloudData[selectedProduct as keyof typeof wordCloudData] || []}
            sentimentBreakdown={productData.find(p => p.name === selectedProduct)?.sentimentBreakdown || { positive: 0, negative: 0, neutral: 0 }}
          />
        )}
      </div>
    </Layout>
  );
};

export default ProductInsights;
