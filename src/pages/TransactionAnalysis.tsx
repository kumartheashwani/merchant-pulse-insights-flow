
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, DollarSign, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const transactionData = [
  { competitor: 'Your Store', avgTransaction: 127, change: 8.2 },
  { competitor: 'TechHub', avgTransaction: 98, change: -2.1 },
  { competitor: 'ElectroMax', avgTransaction: 134, change: 5.3 },
  { competitor: 'GadgetWorld', avgTransaction: 89, change: -0.8 },
  { competitor: 'Market Avg', avgTransaction: 117, change: 2.4 },
];

const trendData = [
  { month: 'Jan', yourStore: 115, market: 110 },
  { month: 'Feb', yourStore: 118, market: 112 },
  { month: 'Mar', yourStore: 122, market: 114 },
  { month: 'Apr', yourStore: 125, market: 116 },
  { month: 'May', yourStore: 127, market: 117 },
];

const TransactionAnalysis = () => {
  const navigate = useNavigate();

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
            <h1 className="text-3xl font-bold text-slate-900">Transaction Size Analysis</h1>
            <p className="text-slate-600">Compare your average transaction size with competitors</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Competitive Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={transactionData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="competitor" type="category" width={100} />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Avg Transaction']}
                    />
                    <Bar 
                      dataKey="avgTransaction" 
                      fill="url(#colorGradient)"
                      radius={[0, 4, 4, 0]}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <DollarSign className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-emerald-100 text-sm">Your Average</p>
                  <p className="text-3xl font-bold">$127</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+8.2% vs market</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <p className="text-sm font-semibold text-emerald-800">Premium Positioning</p>
                  <p className="text-xs text-emerald-600">8.2% above market average</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-semibold text-blue-800">Growth Trajectory</p>
                  <p className="text-xs text-blue-600">Steady upward trend</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-semibold text-purple-800">Competitive Edge</p>
                  <p className="text-xs text-purple-600">Premium product mix</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Trend Analysis (Last 5 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [`$${value}`, name === 'yourStore' ? 'Your Store' : 'Market Average']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="yourStore" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="market" 
                    stroke="#6b7280" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#6b7280' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Transaction Drivers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="font-medium">Premium Products</span>
                <span className="text-emerald-600 font-bold">+45%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="font-medium">Bundle Sales</span>
                <span className="text-emerald-600 font-bold">+32%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="font-medium">Loyalty Discounts</span>
                <span className="text-blue-600 font-bold">+18%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="font-medium">Seasonal Items</span>
                <span className="text-purple-600 font-bold">+25%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Optimization Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-semibold text-emerald-900 mb-2">Cross-sell Accessories</h4>
                <p className="text-emerald-700 text-sm mb-3">
                  Increase AOV by 15% with targeted accessory recommendations
                </p>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Implement Strategy
                </Button>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Premium Upsell</h4>
                <p className="text-blue-700 text-sm mb-3">
                  Target mid-tier customers for premium product upgrades
                </p>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Create Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default TransactionAnalysis;
