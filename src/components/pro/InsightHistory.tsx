
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, TrendingUp, TrendingDown } from 'lucide-react';

const InsightHistory = () => {
  const insights = [
    {
      id: 1,
      date: '2024-01-15',
      ticker: 'AAPL',
      pattern: 'Head & Shoulders',
      sentiment: 0.72,
      confidence: 0.89,
      outcome: 'bullish'
    },
    {
      id: 2,
      date: '2024-01-14',
      ticker: 'TSLA',
      pattern: 'Double Bottom',
      sentiment: 0.84,
      confidence: 0.76,
      outcome: 'bullish'
    },
    {
      id: 3,
      date: '2024-01-13',
      ticker: 'SPY',
      pattern: 'Descending Triangle',
      sentiment: 0.31,
      confidence: 0.92,
      outcome: 'bearish'
    }
  ];

  const exportToCSV = () => {
    const headers = ['Date', 'Ticker', 'Pattern', 'Sentiment', 'Confidence', 'Outcome'];
    const csvData = insights.map(insight => [
      insight.date,
      insight.ticker,
      insight.pattern,
      insight.sentiment.toFixed(2),
      insight.confidence.toFixed(2),
      insight.outcome
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sentivision-insights.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-white font-medium">Recent Insights</h4>
        <Button onClick={exportToCSV} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>
      
      <div className="space-y-3">
        {insights.map((insight) => (
          <Card key={insight.id} className="bg-slate-700/50">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-cyan-400 border-cyan-500">
                      {insight.ticker}
                    </Badge>
                    <span className="text-slate-300 text-sm">{insight.date}</span>
                  </div>
                  <h5 className="text-white font-medium">{insight.pattern}</h5>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-slate-400">
                      Sentiment: <span className="text-white">{(insight.sentiment * 100).toFixed(0)}%</span>
                    </span>
                    <span className="text-slate-400">
                      Confidence: <span className="text-white">{(insight.confidence * 100).toFixed(0)}%</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  {insight.outcome === 'bullish' ? (
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-400" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InsightHistory;
