
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WordCloudProps {
  words: { text: string; value: number; sentiment: 'positive' | 'negative' | 'neutral' }[];
  productName: string;
}

export const WordCloud: React.FC<WordCloudProps> = ({ words, productName }) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-emerald-600';
      case 'negative': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  const getFontSize = (value: number) => {
    const minSize = 12;
    const maxSize = 32;
    const normalizedValue = Math.min(Math.max(value / 10, 0.5), 3);
    return minSize + (maxSize - minSize) * normalizedValue;
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Review Sentiment - {productName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 p-4 bg-slate-50 rounded-lg min-h-[200px] items-center justify-center">
          {words.map((word, index) => (
            <span
              key={index}
              className={`font-medium transition-all hover:scale-110 cursor-pointer ${getSentimentColor(word.sentiment)}`}
              style={{ fontSize: `${getFontSize(word.value)}px` }}
              title={`Sentiment: ${word.sentiment}, Frequency: ${word.value}`}
            >
              {word.text}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
