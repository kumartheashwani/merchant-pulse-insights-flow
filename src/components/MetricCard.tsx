
import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeLabel,
  icon,
  onClick,
  className 
}: MetricCardProps) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card 
      className={cn(
        "cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">{title}</CardTitle>
        {icon && <div className="text-slate-400">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
        {change !== undefined && (
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            ) : isNegative ? (
              <TrendingDown className="w-4 h-4 text-red-500" />
            ) : null}
            <span
              className={cn(
                "text-sm font-medium",
                isPositive && "text-emerald-600",
                isNegative && "text-red-500",
                change === 0 && "text-slate-500"
              )}
            >
              {change > 0 ? '+' : ''}{change}%
            </span>
            {changeLabel && (
              <span className="text-sm text-slate-500 ml-1">{changeLabel}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
