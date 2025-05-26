
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const marketShareData = [
  { name: 'TechHub', value: 23, color: '#ef4444' },
  { name: 'ElectroMax', value: 18, color: '#f97316' },
  { name: 'GadgetWorld', value: 15, color: '#eab308' },
  { name: 'Your Store', value: 12.3, color: '#22c55e' },
  { name: 'Others', value: 31.7, color: '#94a3b8' },
];

const geographyData = [
  { name: '10001', share: 15.2, trend: 2.3 },
  { name: '10002', share: 12.8, trend: -0.5 },
  { name: '10003', share: 18.5, trend: 4.1 },
  { name: '10004', share: 9.3, trend: 1.8 },
  { name: '10005', share: 11.7, trend: -1.2 },
];

const MarketShare = () => {
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
            <h1 className="text-3xl font-bold text-slate-900">Market Share Analysis</h1>
            <p className="text-slate-600">Track your competitive position across different geographies</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Overall Market Position</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketShareData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {marketShareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                <p className="text-emerald-800 font-semibold">You rank #4 in your market</p>
                <p className="text-emerald-600 text-sm">2.1% growth from last quarter</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={20} />
                Geographic Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={geographyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [`${value}%`, 'Market Share']}
                      labelFormatter={(label) => `Zip Code: ${label}`}
                    />
                    <Bar 
                      dataKey="share" 
                      fill="url(#colorGradient)"
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {geographyData.map((area) => (
            <Card key={area.name} className="border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">Zip {area.name}</h3>
                    <p className="text-2xl font-bold text-blue-600">{area.share}%</p>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
                    area.trend > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <TrendingUp size={14} />
                    {area.trend > 0 ? '+' : ''}{area.trend}%
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Competition Level</span>
                    <span className="font-medium">
                      {area.share > 15 ? 'High' : area.share > 10 ? 'Medium' : 'Low'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Opportunity</span>
                    <span className="font-medium">
                      {area.trend > 2 ? 'High Growth' : area.trend > 0 ? 'Stable' : 'Declining'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Strategic Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Expand to 10003</h4>
                <p className="text-blue-700 text-sm mb-3">
                  Highest market share (18.5%) with strong growth trend (+4.1%). 
                  Consider increasing inventory and marketing spend.
                </p>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  View Expansion Plan
                </Button>
              </div>
              <div className="p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-semibold text-emerald-900 mb-2">Defend 10001 Position</h4>
                <p className="text-emerald-700 text-sm mb-3">
                  Strong market share but slower growth. Focus on customer retention 
                  and competitive pricing strategies.
                </p>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Launch Defense Strategy
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default MarketShare;
