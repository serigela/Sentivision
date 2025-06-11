
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const BacktestingModule = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);

  const runBacktest = async () => {
    setIsRunning(true);
    
    // Simulate backtesting
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setResults({
      totalTrades: 47,
      winRate: 68.1,
      avgReturn: 4.3,
      maxDrawdown: -12.5,
      sharpeRatio: 1.82
    });
    
    setIsRunning(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-white font-medium">Strategy Performance</h4>
        <Button 
          onClick={runBacktest} 
          disabled={isRunning}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          <Play className="h-4 w-4 mr-2" />
          {isRunning ? 'Running...' : 'Run Backtest'}
        </Button>
      </div>

      {isRunning && (
        <Card className="bg-slate-700/50">
          <CardContent className="p-4 text-center">
            <div className="animate-pulse">
              <p className="text-slate-300">Analyzing 1000+ historical patterns...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {results && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-slate-700/50">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-slate-400 text-xs">Total Trades</p>
              <p className="text-white font-bold text-lg">{results.totalTrades}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-700/50">
            <CardContent className="p-4 text-center">
              <Badge className="bg-green-500 text-white mb-2">Win Rate</Badge>
              <p className="text-white font-bold text-lg">{results.winRate}%</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-700/50">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <p className="text-slate-400 text-xs">Avg Return</p>
              <p className="text-white font-bold text-lg">+{results.avgReturn}%</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-700/50">
            <CardContent className="p-4 text-center">
              <TrendingDown className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <p className="text-slate-400 text-xs">Max Drawdown</p>
              <p className="text-white font-bold text-lg">{results.maxDrawdown}%</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-700/50">
            <CardContent className="p-4 text-center">
              <Badge className="bg-purple-500 text-white mb-2">Sharpe</Badge>
              <p className="text-white font-bold text-lg">{results.sharpeRatio}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BacktestingModule;
