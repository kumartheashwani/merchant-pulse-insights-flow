
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, Calendar, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar } from 'recharts';

const weekOverWeekData = [
  { week: 'W1', yourSales: 18500, competition: 16200 },
  { week: 'W2', yourSales: 19200, competition: 16800 },
  { week: 'W3', yourSales: 22100, competition: 17300 },
  { week: 'W4', yourSales: 24600, competition: 17900 },
  { week: 'W5', yourSales: 23800, competition: 18200 },
];

const monthOverMonthData = [
  { month: 'Jan', yourSales: 74500, competition: 68200 },
  { month: 'Feb', yourSales: 78200, competition: 69800 },
  { month: 'Mar', yourSales: 82100, competition: 71300 },
  { month: 'Apr', yourSales: 89600, competition: 73900 },
  { month: 'May', yourSales: 94200, competition: 75200 },
];

const categoryPerformance = [
  { category: 'Mobile Accessories', growth: 25.4, marketGrowth: 12.8 },
  { category: 'Audio Devices', growth: 18.9, marketGrowth: 15.2 },
  { category: 'Charging Solutions', growth: 15.3, marketGrowth: 8.7 },
  { category: 'Screen Protection', growth: 8.7, marketGrowth: 11.4 },
  { category: 'Smart Devices', growth: 32.1, marketGrowth: 28.9 },
];

const TrendAnalysis = () => {
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
            <h1 className="text-3xl font-bold text-slate-900">Sales Trend Analysis</h1>
            <p className="text-slate-600">Track your performance trends compared to market competition</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <p className="text-emerald-100 text-sm">WoW Growth</p>
                <p className="text-3xl font-bold">+15.4%</p>
                <p className="text-emerald-100 text-sm mt-1">Last 5 weeks</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2" />
                <p className="text-blue-100 text-sm">MoM Growth</p>
                <p className="text-3xl font-bold">+26.5%</p>
                <p className="text-blue-100 text-sm mt-1">Last 5 months</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <BarChart className="w-8 h-8 mx-auto mb-2" />
                <p className="text-purple-100 text-sm">vs Competition</p>
                <p className="text-3xl font-bold">+8.3%</p>
                <p className="text-purple-100 text-sm mt-1">Outperforming</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Week over Week Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weekOverWeekData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        `$${value.toLocaleString()}`, 
                        name === 'yourSales' ? 'Your Sales' : 'Competition Avg'
                      ]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="yourSales" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="competition" 
                      stroke="#6b7280" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: '#6b7280', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Month over Month Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthOverMonthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        `$${value.toLocaleString()}`, 
                        name === 'yourSales' ? 'Your Sales' : 'Competition Avg'
                      ]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="yourSales" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="competition" 
                      stroke="#6b7280" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: '#6b7280', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Category Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryPerformance.map((category, index) => (
                <div key={index} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{category.category}</h3>
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={`${
                          category.growth > category.marketGrowth 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {category.growth > category.marketGrowth ? 'Outperforming' : 'Underperforming'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Your Growth:</span>
                        <span className="font-semibold text-emerald-600">+{category.growth}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Market Growth:</span>
                        <span className="font-semibold text-slate-600">+{category.marketGrowth}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Difference:</span>
                        <span className={`font-semibold ${
                          category.growth > category.marketGrowth ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                          {category.growth > category.marketGrowth ? '+' : ''}
                          {(category.growth - category.marketGrowth).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="col-span-2">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Your Performance</span>
                          <span>{category.growth}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(category.growth * 2, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Market Average</span>
                          <span>{category.marketGrowth}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-slate-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(category.marketGrowth * 2, 100)}%` }}
                          ></div>
                        </div>
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
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-semibold text-emerald-900 mb-2">🚀 Strong Growth Momentum</h4>
                <p className="text-emerald-700 text-sm">
                  15.4% WoW and 26.5% MoM growth significantly outpaces market average.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">📱 Smart Devices Leading</h4>
                <p className="text-blue-700 text-sm">
                  32.1% growth in smart devices category, slightly ahead of market.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">⚡ Mobile Accessories Surge</h4>
                <p className="text-purple-700 text-sm">
                  25.4% growth vs 12.8% market average - strongest competitive advantage.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Growth Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">📺 Screen Protection Gap</h4>
                <p className="text-yellow-700 text-sm mb-3">
                  8.7% growth vs 11.4% market. Opportunity to catch up.
                </p>
                <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                  Develop Strategy
                </Button>
              </div>
              <div className="p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-semibold text-emerald-900 mb-2">🎯 Double Down on Winners</h4>
                <p className="text-emerald-700 text-sm mb-3">
                  Mobile accessories showing 2x market growth rate.
                </p>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Increase Investment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default TrendAnalysis;
