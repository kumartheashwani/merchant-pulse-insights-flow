
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Target, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const segmentData = [
  { age: 25, income: 45000, spending: 150, segment: 'Budget Conscious', competitors: 'Lower' },
  { age: 28, income: 55000, spending: 220, segment: 'Value Seekers', competitors: 'Similar' },
  { age: 32, income: 75000, spending: 380, segment: 'Premium Shoppers', competitors: 'Higher' },
  { age: 35, income: 85000, spending: 450, segment: 'Premium Shoppers', competitors: 'Higher' },
  { age: 38, income: 95000, spending: 520, segment: 'Luxury Buyers', competitors: 'Higher' },
  { age: 42, income: 120000, spending: 680, segment: 'Luxury Buyers', competitors: 'Much Higher' },
  { age: 45, income: 110000, spending: 620, segment: 'Luxury Buyers', competitors: 'Much Higher' },
];

const segmentComparison = [
  { 
    segment: 'Budget Conscious (18-30)', 
    yourShare: 18, 
    competitorShare: 22, 
    avgSpending: 185,
    competitorSpending: 195,
    opportunity: 'Price Competitiveness'
  },
  { 
    segment: 'Value Seekers (25-35)', 
    yourShare: 24, 
    competitorShare: 28, 
    avgSpending: 300,
    competitorSpending: 280,
    opportunity: 'Product Quality'
  },
  { 
    segment: 'Premium Shoppers (30-40)', 
    yourShare: 32, 
    competitorShare: 26, 
    avgSpending: 415,
    competitorSpending: 380,
    opportunity: 'Service Excellence'
  },
  { 
    segment: 'Luxury Buyers (35-50)', 
    yourShare: 15, 
    competitorShare: 32, 
    avgSpending: 640,
    competitorSpending: 720,
    opportunity: 'Premium Portfolio'
  },
];

const CustomerSegmentation = () => {
  const navigate = useNavigate();

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'Budget Conscious': return '#ef4444';
      case 'Value Seekers': return '#f97316';
      case 'Premium Shoppers': return '#10b981';
      case 'Luxury Buyers': return '#8b5cf6';
      default: return '#6b7280';
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
            <h1 className="text-3xl font-bold text-slate-900">Customer Segmentation</h1>
            <p className="text-slate-600">Analyze customer segments by age and income vs competitors</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2" />
                <p className="text-blue-100 text-sm">Total Segments</p>
                <p className="text-3xl font-bold">4</p>
                <p className="text-blue-100 text-sm mt-1">Active groups</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <Target className="w-8 h-8 mx-auto mb-2" />
                <p className="text-emerald-100 text-sm">Best Performing</p>
                <p className="text-xl font-bold">Premium</p>
                <p className="text-emerald-100 text-sm mt-1">32% share</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2" />
                <p className="text-purple-100 text-sm">Highest Value</p>
                <p className="text-xl font-bold">Luxury</p>
                <p className="text-purple-100 text-sm mt-1">$640 AOV</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <Target className="w-8 h-8 mx-auto mb-2" />
                <p className="text-red-100 text-sm">Biggest Opportunity</p>
                <p className="text-xl font-bold">Luxury</p>
                <p className="text-red-100 text-sm mt-1">17% gap</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Customer Segments by Age & Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    dataKey="age" 
                    name="Age"
                    domain={[20, 50]}
                    label={{ value: 'Age', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="income" 
                    name="Income"
                    domain={[40000, 130000]}
                    label={{ value: 'Annual Income ($)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value, name, props) => [
                      name === 'age' ? value : `$${value.toLocaleString()}`,
                      name === 'age' ? 'Age' : 'Income'
                    ]}
                    labelFormatter={() => ''}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 border rounded-lg shadow-lg">
                            <p className="font-semibold">{data.segment}</p>
                            <p>Age: {data.age}</p>
                            <p>Income: ${data.income.toLocaleString()}</p>
                            <p>Avg Spending: ${data.spending}</p>
                            <p>vs Competitors: {data.competitors}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter 
                    data={segmentData} 
                    fill={(entry) => getSegmentColor(entry.segment)}
                  />
                  {segmentData.map((entry, index) => (
                    <Scatter
                      key={index}
                      data={[entry]}
                      fill={getSegmentColor(entry.segment)}
                    />
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 justify-center">
              {['Budget Conscious', 'Value Seekers', 'Premium Shoppers', 'Luxury Buyers'].map((segment) => (
                <div key={segment} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: getSegmentColor(segment) }}
                  ></div>
                  <span className="text-sm">{segment}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Segment Comparison Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {segmentComparison.map((segment, index) => (
                <div key={index} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">{segment.segment}</h3>
                    <Badge 
                      className={`${
                        segment.yourShare > segment.competitorShare 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {segment.yourShare > segment.competitorShare ? 'Leading' : 'Lagging'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-slate-600">Market Share</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Your Share</span>
                          <span className="font-semibold">{segment.yourShare}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${segment.yourShare * 2}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Competitors</span>
                          <span className="font-semibold">{segment.competitorShare}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-slate-400 h-2 rounded-full"
                            style={{ width: `${segment.competitorShare * 2}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-slate-600">Avg Spending</p>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">Your Customers</span>
                          <span className="font-semibold">${segment.avgSpending}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Competitors</span>
                          <span className="font-semibold">${segment.competitorSpending}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Difference</span>
                          <span className={`font-semibold ${
                            segment.avgSpending > segment.competitorSpending ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {segment.avgSpending > segment.competitorSpending ? '+' : ''}
                            ${segment.avgSpending - segment.competitorSpending}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-slate-600 mb-2">Key Opportunity</p>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        {segment.opportunity}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <Button size="sm" className="w-full">
                        Target Campaign
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        Analyze Further
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
              <CardTitle>Strategic Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">🎯 Target Luxury Segment</h4>
                <p className="text-purple-700 text-sm mb-3">
                  17% market share gap with highest AOV ($640). Develop premium product line.
                </p>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Launch Premium Strategy
                </Button>
              </div>
              <div className="p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-semibold text-emerald-900 mb-2">✨ Expand Premium Position</h4>
                <p className="text-emerald-700 text-sm mb-3">
                  Leading in premium segment (32% vs 26%). Capitalize on service excellence.
                </p>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Strengthen Lead
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Segment Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Addressable Market</span>
                  <span className="text-emerald-600 font-bold">$2.4M</span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Untapped Luxury Potential</span>
                  <span className="text-purple-600 font-bold">$680K</span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Customer Lifetime Value</span>
                  <span className="text-blue-600 font-bold">$1,250</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerSegmentation;
