
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Target, Zap } from 'lucide-react';
import AnimatedCard from '@/components/ui/animated-card';
import InsightBadge from '@/components/ui/insight-badge';
import TradeJournal from '@/components/TradeJournal';

const InsightsPage = () => {
  const recentInsights = [
    {
      id: 1,
      ticker: 'AAPL',
      pattern: 'Bull Flag',
      confidence: 89,
      sentiment: 0.72,
      action: 'BUY',
      timeframe: '2-3 days',
      type: 'bullish' as const
    },
    {
      id: 2,
      ticker: 'TSLA',
      pattern: 'Head & Shoulders',
      confidence: 84,
      sentiment: -0.45,
      action: 'SELL',
      timeframe: '24-48 hours',
      type: 'bearish' as const
    },
    {
      id: 3,
      ticker: 'SPY',
      pattern: 'Triangle',
      confidence: 76,
      sentiment: 0.12,
      action: 'WAIT',
      timeframe: '3-5 days',
      type: 'volatility-alert' as const
    }
  ];

  const marketOverview = {
    bullishSignals: 12,
    bearishSignals: 8,
    neutralSignals: 5,
    avgConfidence: 81.3
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">AI Insights</h1>
          <p className="text-slate-300">Real-time market analysis and recommendations</p>
        </div>

        {/* Market Overview */}
        <AnimatedCard className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-400" />
              <span>Market Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  <span className="text-2xl font-bold text-green-400">{marketOverview.bullishSignals}</span>
                </div>
                <p className="text-slate-400 text-sm">Bullish Signals</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <TrendingDown className="h-5 w-5 text-red-400" />
                  <span className="text-2xl font-bold text-red-400">{marketOverview.bearishSignals}</span>
                </div>
                <p className="text-slate-400 text-sm">Bearish Signals</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-slate-400 text-sm">Average Confidence</p>
              <p className="text-xl font-bold text-cyan-400">{marketOverview.avgConfidence}%</p>
            </div>
          </CardContent>
        </AnimatedCard>

        {/* Recent Insights */}
        <AnimatedCard className="bg-slate-800/50 border-slate-700" delay={0.2}>
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Target className="h-5 w-5 text-cyan-400" />
              <span>Recent Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-700/30 p-4 rounded-lg border border-slate-600"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-cyan-400 border-cyan-500">
                      {insight.ticker}
                    </Badge>
                    <InsightBadge type={insight.type} confidence={insight.confidence} />
                  </div>
                  <Badge className={`${
                    insight.action === 'BUY' ? 'bg-green-500/20 text-green-400 border-green-500' :
                    insight.action === 'SELL' ? 'bg-red-500/20 text-red-400 border-red-500' :
                    'bg-yellow-500/20 text-yellow-400 border-yellow-500'
                  }`}>
                    {insight.action}
                  </Badge>
                </div>
                
                <h4 className="text-white font-medium mb-2">{insight.pattern}</h4>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Confidence:</span>
                    <span className="text-white ml-2">{insight.confidence}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Sentiment:</span>
                    <span className={`ml-2 ${insight.sentiment > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {insight.sentiment.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <p className="text-slate-300 text-sm mt-2">
                  Timeframe: {insight.timeframe}
                </p>
              </motion.div>
            ))}
            
            <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
              <Zap className="h-4 w-4 mr-2" />
              Generate New Insights
            </Button>
          </CardContent>
        </AnimatedCard>

        {/* Trade Journal */}
        <AnimatedCard delay={0.4}>
          <TradeJournal />
        </AnimatedCard>
      </div>
    </motion.div>
  );
};

export default InsightsPage;
