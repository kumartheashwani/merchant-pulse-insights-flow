
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, UserX, AlertCircle, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const churnReasons = [
  { reason: 'Price', percentage: 35, color: '#ef4444' },
  { reason: 'Shipping Speed', percentage: 28, color: '#f97316' },
  { reason: 'Product Quality', percentage: 18, color: '#eab308' },
  { reason: 'Customer Service', percentage: 12, color: '#22c55e' },
  { reason: 'Other', percentage: 7, color: '#94a3b8' },
];

const productChurn = [
  { product: 'iPhone Cases', churnRate: 18, customersLost: 234, competitorGain: 'TechHub' },
  { product: 'Wireless Earbuds', churnRate: 15, customersLost: 189, competitorGain: 'ElectroMax' },
  { product: 'Phone Chargers', churnRate: 12, customersLost: 156, competitorGain: 'GadgetWorld' },
  { product: 'Screen Protectors', churnRate: 10, customersLost: 98, competitorGain: 'TechHub' },
  { product: 'Car Chargers', churnRate: 8, customersLost: 67, competitorGain: 'ElectroMax' },
];

const ChurnAnalysis = () => {
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
            <h1 className="text-3xl font-bold text-slate-900">Customer Churn Analysis</h1>
            <p className="text-slate-600">Identify customers moving to competitors and understand why</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <UserX className="w-8 h-8 mx-auto mb-2" />
                <p className="text-red-100 text-sm">Overall Churn Rate</p>
                <p className="text-3xl font-bold">8.7%</p>
                <p className="text-red-100 text-sm mt-1">Last 30 days</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <TrendingDown className="w-8 h-8 mx-auto mb-2" />
                <p className="text-orange-100 text-sm">Customers Lost</p>
                <p className="text-3xl font-bold">744</p>
                <p className="text-orange-100 text-sm mt-1">This month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                <p className="text-yellow-100 text-sm">Revenue Impact</p>
                <p className="text-3xl font-bold">$94K</p>
                <p className="text-yellow-100 text-sm mt-1">Monthly loss</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <TrendingDown className="w-8 h-8 mx-auto mb-2" />
                <p className="text-emerald-100 text-sm">vs Last Month</p>
                <p className="text-3xl font-bold">-1.2%</p>
                <p className="text-emerald-100 text-sm mt-1">Improvement</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Churn Reasons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={churnReasons}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="percentage"
                      label={({ reason, percentage }) => `${reason}: ${percentage}%`}
                    >
                      {churnReasons.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {churnReasons.map((reason) => (
                  <div key={reason.reason} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: reason.color }}
                      ></div>
                      <span className="text-sm">{reason.reason}</span>
                    </div>
                    <span className="font-semibold">{reason.percentage}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Product Churn Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productChurn}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="product" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Churn Rate']}
                    />
                    <Bar 
                      dataKey="churnRate" 
                      fill="url(#churnGradient)"
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="churnGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Detailed Product Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productChurn.map((product) => (
                <div key={product.product} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{product.product}</h3>
                    <Badge variant="destructive" className="text-sm">
                      {product.churnRate}% Churn
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Customers Lost:</span>
                        <span className="font-semibold">{product.customersLost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Revenue Impact:</span>
                        <span className="font-semibold text-red-600">
                          -${(product.customersLost * 127).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-slate-600 mb-2">Primary Competitor:</p>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        {product.competitorGain}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                        Retention Campaign
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        Analyze Competitor
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
              <CardTitle>Immediate Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">🚨 Price Match Campaign</h4>
                <p className="text-red-700 text-sm mb-3">
                  35% of churn is price-related. Launch immediate price matching for top 3 products.
                </p>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Launch Campaign
                </Button>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">📦 Shipping Upgrade</h4>
                <p className="text-orange-700 text-sm mb-3">
                  28% cite shipping speed. Offer free expedited shipping for loyal customers.
                </p>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  Implement Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Recovery Potential</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Winnable Customers</span>
                  <span className="text-emerald-600 font-bold">450</span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Potential Revenue Recovery</span>
                  <span className="text-emerald-600 font-bold">$57K</span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">ROI on Retention Campaign</span>
                  <span className="text-emerald-600 font-bold">340%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ChurnAnalysis;
