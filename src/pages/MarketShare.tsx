
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, TrendingUp, Navigation } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import GeographicMap from '@/components/GeographicMap';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

const marketShareData = [
  { name: 'TechHub', value: 23, color: '#ef4444' },
  { name: 'ElectroMax', value: 18, color: '#f97316' },
  { name: 'GadgetWorld', value: 15, color: '#eab308' },
  { name: 'Your Store', value: 12.3, color: '#22c55e' },
  { name: 'Others', value: 31.7, color: '#94a3b8' },
];

// State-level data for D2C merchants
const stateGeographyData = [
  { id: 'ny', name: 'New York', share: 18.5, trend: 4.1, coordinates: [-74.0059, 40.7128] as [number, number], level: 'state' as const },
  { id: 'ca', name: 'California', share: 15.2, trend: 2.3, coordinates: [-119.4179, 36.7783] as [number, number], level: 'state' as const },
  { id: 'tx', name: 'Texas', share: 12.8, trend: -0.5, coordinates: [-99.9018, 31.9686] as [number, number], level: 'state' as const },
  { id: 'fl', name: 'Florida', share: 11.7, trend: -1.2, coordinates: [-81.7609, 27.8333] as [number, number], level: 'state' as const },
  { id: 'il', name: 'Illinois', share: 9.3, trend: 1.8, coordinates: [-89.3985, 40.6331] as [number, number], level: 'state' as const },
];

// Zip code/radius data for in-store merchants
const zipCodeGeographyData = [
  { id: 'zip-10001', name: 'NYC 10001', share: 22.1, trend: 5.2, coordinates: [-73.9967, 40.7505] as [number, number], level: 'zipcode' as const },
  { id: 'zip-10002', name: 'NYC 10002', share: 18.4, trend: 3.1, coordinates: [-73.9876, 40.7156] as [number, number], level: 'zipcode' as const },
  { id: 'zip-90210', name: 'Beverly Hills 90210', share: 19.8, trend: 4.7, coordinates: [-118.4065, 34.0901] as [number, number], level: 'zipcode' as const },
  { id: 'zip-90211', name: 'Beverly Hills 90211', share: 16.2, trend: 2.9, coordinates: [-118.4010, 34.0836] as [number, number], level: 'zipcode' as const },
  { id: 'radius-downtown', name: '2mi Downtown LA', share: 21.5, trend: 6.3, coordinates: [-118.2437, 34.0522] as [number, number], level: 'radius' as const },
  { id: 'radius-mall', name: '1mi Mall District', share: 14.7, trend: 1.8, coordinates: [-118.3642, 34.0522] as [number, number], level: 'radius' as const },
];

const MarketShare = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [selectedGeography, setSelectedGeography] = useState('all');
  const [radiusFilter, setRadiusFilter] = useState('all');
  
  const storeParam = searchParams.get('store') || 'all';
  const merchantType = searchParams.get('type') as 'd2c' | 'instore' || 'd2c';

  // Choose data based on merchant type
  const geographyData = merchantType === 'd2c' ? stateGeographyData : zipCodeGeographyData;
  
  // Filter data based on radius for in-store merchants
  const filteredGeographyData = merchantType === 'instore' && radiusFilter !== 'all' 
    ? geographyData.filter(item => item.level === radiusFilter)
    : geographyData;

  // Get geography-specific data
  const getGeographySpecificData = () => {
    if (selectedGeography === 'all') {
      return {
        marketShare: marketShareData,
        topAreas: filteredGeographyData.slice(0, 3),
        recommendations: {
          primary: merchantType === 'd2c' ? 'Expand to New York' : 'Expand to High-Density Zip Codes',
          primaryDesc: merchantType === 'd2c' 
            ? 'Highest state market share (18.5%) with strong growth trend (+4.1%).'
            : 'Focus on zip codes with highest foot traffic and market share potential.',
          secondary: merchantType === 'd2c' ? 'Defend California Position' : 'Optimize Store Radius Coverage',
          secondaryDesc: merchantType === 'd2c'
            ? 'Strong market share but slower growth. Focus on customer retention.'
            : 'Analyze 1-2 mile radius performance and adjust coverage strategy.'
        }
      };
    }

    // Find selected geography data
    const selectedArea = filteredGeographyData.find(area => area.id === selectedGeography);
    if (!selectedArea) return getGeographySpecificData(); // fallback

    // Adjust market share data for selected geography
    const adjustedMarketShare = marketShareData.map(item => ({
      ...item,
      value: item.name === 'Your Store' 
        ? selectedArea.share 
        : item.value + (Math.random() - 0.5) * 5 // simulate variation
    }));

    return {
      marketShare: adjustedMarketShare,
      topAreas: [selectedArea],
      recommendations: {
        primary: `Optimize ${selectedArea.name}`,
        primaryDesc: `Current market share: ${selectedArea.share}%. Trend: ${selectedArea.trend > 0 ? '+' : ''}${selectedArea.trend}%.`,
        secondary: `Expand from ${selectedArea.name}`,
        secondaryDesc: merchantType === 'd2c'
          ? 'Identify adjacent states with similar demographics for expansion.'
          : 'Analyze neighboring zip codes or expand radius coverage from this location.'
      }
    };
  };

  const currentData = getGeographySpecificData();

  const handleLocationSelect = (location: any) => {
    console.log('Selected location:', location);
    setSelectedGeography(location.id);
  };

  const handlePieClick = (data: any) => {
    if (data.name === 'Your Store') {
      navigate('/product-insights');
    } else {
      toast({
        title: "Feature Not Available",
        description: `Further drill down for ${data.name} is not supported yet.`,
        variant: "destructive",
      });
    }
  };

  const getGeographyLabel = () => {
    if (merchantType === 'd2c') return 'State';
    return radiusFilter === 'zipcode' ? 'Zip Code' : radiusFilter === 'radius' ? 'Radius' : 'Location';
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
            <h1 className="text-3xl font-bold text-slate-900">Market Share Analysis</h1>
            <p className="text-slate-600">
              Track your competitive position across different {merchantType === 'd2c' ? 'states' : 'locations'}
            </p>
          </div>
        </div>

        {/* Geography Selection Controls */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation size={20} />
              Geography Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-center flex-wrap">
              {merchantType === 'instore' && (
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">View Type:</label>
                  <Select value={radiusFilter} onValueChange={setRadiusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="zipcode">Zip Codes</SelectItem>
                      <SelectItem value="radius">Radius Areas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Select {getGeographyLabel()}:</label>
                <Select value={selectedGeography} onValueChange={setSelectedGeography}>
                  <SelectTrigger className="w-60">
                    <SelectValue placeholder={`Select ${getGeographyLabel()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All {getGeographyLabel()}s</SelectItem>
                    {filteredGeographyData.map((area) => (
                      <SelectItem key={area.id} value={area.id}>
                        {area.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>
                Overall Market Position
                {selectedGeography !== 'all' && (
                  <span className="text-sm font-normal text-slate-600 ml-2">
                    - {filteredGeographyData.find(a => a.id === selectedGeography)?.name}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentData.marketShare}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                      onClick={handlePieClick}
                      className="cursor-pointer"
                    >
                      {currentData.marketShare.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                <p className="text-emerald-800 font-semibold">
                  You rank #{currentData.marketShare.findIndex(item => item.name === 'Your Store') + 1} in selected geography
                </p>
                <p className="text-emerald-600 text-sm">
                  {currentData.marketShare.find(item => item.name === 'Your Store')?.value.toFixed(1)}% market share
                </p>
                <p className="text-emerald-600 text-xs mt-2">💡 Click on "Your Store" segment for detailed insights</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={20} />
                Interactive Geographic Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GeographicMap 
                data={filteredGeographyData} 
                onLocationSelect={handleLocationSelect}
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentData.topAreas.map((area) => (
            <Card key={area.name} className="border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{area.name}</h3>
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
                <h4 className="font-semibold text-blue-900 mb-2">{currentData.recommendations.primary}</h4>
                <p className="text-blue-700 text-sm mb-3">
                  {currentData.recommendations.primaryDesc}
                </p>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  View {merchantType === 'd2c' ? 'Expansion' : 'Optimization'} Plan
                </Button>
              </div>
              <div className="p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-semibold text-emerald-900 mb-2">{currentData.recommendations.secondary}</h4>
                <p className="text-emerald-700 text-sm mb-3">
                  {currentData.recommendations.secondaryDesc}
                </p>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Launch Strategy
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
