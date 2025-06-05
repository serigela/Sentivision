
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Upload, TrendingUp, TrendingDown, Brain, AlertCircle } from "lucide-react";

interface Trade {
  id: string;
  ticker: string;
  action: 'BUY' | 'SELL';
  price: number;
  date: string;
  sentiment: number;
  pattern: string;
  outcome: 'profit' | 'loss' | 'pending';
  notes: string;
}

const TradeJournal = () => {
  const [trades, setTrades] = useState<Trade[]>([
    {
      id: '1',
      ticker: 'AAPL',
      action: 'BUY',
      price: 175.20,
      date: '2024-01-15',
      sentiment: 0.65,
      pattern: 'Bull Flag',
      outcome: 'profit',
      notes: 'Strong earnings report momentum'
    },
    {
      id: '2', 
      ticker: 'TSLA',
      action: 'SELL',
      price: 248.80,
      date: '2024-01-10',
      sentiment: -0.32,
      pattern: 'Head and Shoulders',
      outcome: 'loss',
      notes: 'Ignored bearish sentiment signals'
    }
  ]);

  const [newTrade, setNewTrade] = useState({
    ticker: '',
    action: 'BUY' as 'BUY' | 'SELL',
    price: '',
    sentiment: '',
    pattern: '',
    notes: ''
  });

  const [analysis, setAnalysis] = useState<any>(null);

  const addTrade = () => {
    if (!newTrade.ticker || !newTrade.price) return;

    const trade: Trade = {
      id: Date.now().toString(),
      ticker: newTrade.ticker.toUpperCase(),
      action: newTrade.action,
      price: parseFloat(newTrade.price),
      date: new Date().toISOString().split('T')[0],
      sentiment: parseFloat(newTrade.sentiment) || 0,
      pattern: newTrade.pattern || 'Unknown',
      outcome: 'pending',
      notes: newTrade.notes
    };

    setTrades([...trades, trade]);
    setNewTrade({ ticker: '', action: 'BUY', price: '', sentiment: '', pattern: '', notes: '' });
  };

  const analyzeBehavior = () => {
    const profitTrades = trades.filter(t => t.outcome === 'profit');
    const lossTrades = trades.filter(t => t.outcome === 'loss');
    
    const avgProfitSentiment = profitTrades.reduce((sum, t) => sum + t.sentiment, 0) / profitTrades.length;
    const avgLossSentiment = lossTrades.reduce((sum, t) => sum + t.sentiment, 0) / lossTrades.length;
    
    const patternSuccess = trades.reduce((acc, trade) => {
      if (!acc[trade.pattern]) acc[trade.pattern] = { total: 0, profits: 0 };
      acc[trade.pattern].total++;
      if (trade.outcome === 'profit') acc[trade.pattern].profits++;
      return acc;
    }, {} as any);

    const biases = [];
    
    if (avgLossSentiment > avgProfitSentiment) {
      biases.push("Tendency to ignore negative sentiment signals");
    }
    
    if (lossTrades.length > profitTrades.length) {
      biases.push("Higher loss rate suggests risk management issues");
    }

    const bestPattern = Object.entries(patternSuccess).reduce((best, [pattern, data]: [string, any]) => {
      const successRate = data.profits / data.total;
      return successRate > best.rate ? { pattern, rate: successRate } : best;
    }, { pattern: '', rate: 0 });

    setAnalysis({
      totalTrades: trades.length,
      winRate: (profitTrades.length / trades.length * 100).toFixed(1),
      avgProfitSentiment: avgProfitSentiment.toFixed(3),
      avgLossSentiment: avgLossSentiment.toFixed(3),
      bestPattern: bestPattern.pattern,
      bestPatternRate: (bestPattern.rate * 100).toFixed(1),
      biases,
      patternSuccess
    });
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-green-400" />
          <span>Trade Journal & Behavior Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Trade */}
        <div className="bg-slate-700/30 p-4 rounded-lg space-y-4">
          <h4 className="text-white font-medium">Log New Trade</h4>
          
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Ticker (e.g., AAPL)"
              value={newTrade.ticker}
              onChange={(e) => setNewTrade({...newTrade, ticker: e.target.value})}
              className="bg-slate-700 border-slate-600 text-white"
            />
            <select
              value={newTrade.action}
              onChange={(e) => setNewTrade({...newTrade, action: e.target.value as 'BUY' | 'SELL'})}
              className="bg-slate-700 border-slate-600 text-white rounded-md p-2"
            >
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Price"
              type="number"
              value={newTrade.price}
              onChange={(e) => setNewTrade({...newTrade, price: e.target.value})}
              className="bg-slate-700 border-slate-600 text-white"
            />
            <Input
              placeholder="Sentiment (-1 to 1)"
              type="number"
              step="0.1"
              min="-1"
              max="1"
              value={newTrade.sentiment}
              onChange={(e) => setNewTrade({...newTrade, sentiment: e.target.value})}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <Input
            placeholder="Chart Pattern"
            value={newTrade.pattern}
            onChange={(e) => setNewTrade({...newTrade, pattern: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white"
          />

          <Textarea
            placeholder="Trade notes..."
            value={newTrade.notes}
            onChange={(e) => setNewTrade({...newTrade, notes: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white"
            rows={2}
          />

          <Button onClick={addTrade} className="w-full bg-green-500 hover:bg-green-600 text-white">
            <Upload className="h-4 w-4 mr-2" />
            Log Trade
          </Button>
        </div>

        {/* Trade History */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-medium">Recent Trades</h4>
            <Button onClick={analyzeBehavior} size="sm" className="bg-purple-500 hover:bg-purple-600">
              <Brain className="h-4 w-4 mr-2" />
              Analyze
            </Button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {trades.map((trade) => (
              <div key={trade.id} className="bg-slate-700/30 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge className={`${trade.action === 'BUY' ? 'bg-green-500/20 text-green-400 border-green-500' : 'bg-red-500/20 text-red-400 border-red-500'}`}>
                      {trade.action}
                    </Badge>
                    <span className="text-white font-medium">{trade.ticker}</span>
                    <span className="text-slate-400">${trade.price}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {trade.outcome === 'profit' ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : trade.outcome === 'loss' ? (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-400" />
                    )}
                    <span className="text-slate-400 text-sm">{trade.date}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <span className="text-slate-400">Pattern: <span className="text-white">{trade.pattern}</span></span>
                  <span className="text-slate-400">Sentiment: <span className={trade.sentiment > 0 ? 'text-green-400' : 'text-red-400'}>{trade.sentiment.toFixed(2)}</span></span>
                </div>
                {trade.notes && (
                  <p className="text-slate-300 text-xs mt-2 italic">{trade.notes}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Behavior Analysis */}
        {analysis && (
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
            <h4 className="text-white font-medium mb-3 flex items-center">
              <Brain className="h-4 w-4 mr-2 text-purple-400" />
              Behavioral Analysis
            </h4>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="text-slate-400 text-sm">Win Rate</p>
                <p className="text-green-400 font-mono text-lg">{analysis.winRate}%</p>
              </div>
              <div className="text-center">
                <p className="text-slate-400 text-sm">Total Trades</p>
                <p className="text-white font-mono text-lg">{analysis.totalTrades}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-slate-300 text-sm">
                <strong>Best Pattern:</strong> {analysis.bestPattern} ({analysis.bestPatternRate}% success rate)
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Profit Sentiment Avg:</strong> {analysis.avgProfitSentiment}
              </p>
              <p className="text-slate-300 text-sm">
                <strong>Loss Sentiment Avg:</strong> {analysis.avgLossSentiment}
              </p>
            </div>

            {analysis.biases.length > 0 && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg">
                <h5 className="text-yellow-400 font-medium text-sm mb-2">Identified Biases:</h5>
                <ul className="text-slate-300 text-xs space-y-1">
                  {analysis.biases.map((bias: string, index: number) => (
                    <li key={index}>• {bias}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TradeJournal;
