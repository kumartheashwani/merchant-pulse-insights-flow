
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, TrendingUp, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentMethod {
  name: string;
  share: number;
  growth: number;
  opportunity: string;
  icon: ReactNode;
  color: string;
}

interface PaymentMethodCardProps {
  className?: string;
}

export const PaymentMethodCard = ({ className }: PaymentMethodCardProps) => {
  const paymentMethods: PaymentMethod[] = [
    {
      name: "Credit Cards",
      share: 45.2,
      growth: -2.1,
      opportunity: "Stable but declining",
      icon: <CreditCard size={16} />,
      color: "bg-blue-100 text-blue-800"
    },
    {
      name: "PayPal",
      share: 28.7,
      growth: 5.3,
      opportunity: "Strong growth potential",
      icon: <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">P</div>,
      color: "bg-blue-100 text-blue-800"
    },
    {
      name: "PayPal BNPL",
      share: 8.1,
      growth: 23.4,
      opportunity: "High growth opportunity",
      icon: <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">B</div>,
      color: "bg-purple-100 text-purple-800"
    },
    {
      name: "Other BNPL",
      share: 12.4,
      growth: 15.2,
      opportunity: "Competitive pressure",
      icon: <div className="w-4 h-4 bg-gray-400 rounded flex items-center justify-center text-white text-xs font-bold">B</div>,
      color: "bg-gray-100 text-gray-800"
    },
    {
      name: "Bank Transfer",
      share: 5.6,
      growth: -1.8,
      opportunity: "Limited growth",
      icon: <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">B</div>,
      color: "bg-green-100 text-green-800"
    }
  ];

  const totalBNPLShare = paymentMethods
    .filter(method => method.name.includes('BNPL'))
    .reduce((sum, method) => sum + method.share, 0);

  const competitorBNPLShare = paymentMethods
    .find(method => method.name === 'Other BNPL')?.share || 0;

  const paypalBNPLShare = paymentMethods
    .find(method => method.name === 'PayPal BNPL')?.share || 0;

  return (
    <Card className={cn("border-0 bg-white/80 backdrop-blur-sm", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="text-blue-600" size={20} />
          Payment Method Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* BNPL Opportunity Highlight */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-purple-600" size={16} />
            <h4 className="font-semibold text-purple-900">BNPL Opportunity</h4>
          </div>
          <p className="text-sm text-purple-700 mb-3">
            BNPL market share: {totalBNPLShare.toFixed(1)}% total. PayPal BNPL growing at 23.4% vs competitors at 15.2%
          </p>
          <div className="flex gap-2">
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
              Enable PayPal BNPL
            </Button>
            <Button size="sm" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* Payment Methods List */}
        <div className="space-y-2">
          <h5 className="font-medium text-gray-900 mb-3">Payment Method Share</h5>
          {paymentMethods.map((method) => (
            <div key={method.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {method.icon}
                <div>
                  <p className="font-medium text-sm">{method.name}</p>
                  <p className="text-xs text-gray-600">{method.opportunity}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm">{method.share}%</span>
                  <div className="flex items-center gap-1">
                    {method.growth > 0 ? (
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
                    )}
                    <span className={cn(
                      "text-xs font-medium",
                      method.growth > 0 ? "text-emerald-600" : "text-red-500"
                    )}>
                      {method.growth > 0 ? '+' : ''}{method.growth}%
                    </span>
                  </div>
                </div>
                <Badge className={method.color} variant="secondary">
                  {method.name.includes('PayPal BNPL') ? 'Opportunity' : 
                   method.name.includes('BNPL') ? 'Competitive' : 'Standard'}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Competitive Analysis */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <h5 className="font-semibold text-blue-900 mb-2">Competitive Position</h5>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-blue-700">Your PayPal BNPL Share</p>
              <p className="font-bold text-blue-900">{paypalBNPLShare}%</p>
            </div>
            <div>
              <p className="text-blue-700">Competitor BNPL Share</p>
              <p className="font-bold text-blue-900">{competitorBNPLShare}%</p>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-2">
            Opportunity to capture {(competitorBNPLShare - paypalBNPLShare).toFixed(1)}% market share with PayPal BNPL
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
