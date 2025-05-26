
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { WordCloud } from './WordCloud';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SentimentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  sentimentScore: number;
  wordCloudData: { text: string; value: number; sentiment: 'positive' | 'negative' | 'neutral' }[];
  sentimentBreakdown: { positive: number; negative: number; neutral: number };
}

export const SentimentModal: React.FC<SentimentModalProps> = ({
  isOpen,
  onClose,
  productName,
  sentimentScore,
  wordCloudData,
  sentimentBreakdown
}) => {
  const getSentimentIcon = (score: number) => {
    if (score > 0.6) return <TrendingUp size={16} className="text-emerald-600" />;
    if (score < 0.4) return <TrendingDown size={16} className="text-red-600" />;
    return <Minus size={16} className="text-slate-600" />;
  };

  const getSentimentColor = (score: number) => {
    if (score > 0.6) return 'bg-emerald-100 text-emerald-800';
    if (score < 0.4) return 'bg-red-100 text-red-800';
    return 'bg-slate-100 text-slate-800';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getSentimentIcon(sentimentScore)}
            Sentiment Analysis - {productName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Badge className={getSentimentColor(sentimentScore)}>
                Overall: {(sentimentScore * 100).toFixed(1)}%
              </Badge>
            </div>
            <div className="text-center">
              <Badge className="bg-emerald-100 text-emerald-800">
                Positive: {sentimentBreakdown.positive}%
              </Badge>
            </div>
            <div className="text-center">
              <Badge className="bg-red-100 text-red-800">
                Negative: {sentimentBreakdown.negative}%
              </Badge>
            </div>
            <div className="text-center">
              <Badge className="bg-slate-100 text-slate-800">
                Neutral: {sentimentBreakdown.neutral}%
              </Badge>
            </div>
          </div>

          <WordCloud words={wordCloudData} productName={productName} />
          
          <div className="text-sm text-slate-600 text-center">
            Based on analysis of 1,247 reviews from public forums and review sites
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
