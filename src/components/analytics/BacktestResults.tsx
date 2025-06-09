
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Play, RotateCcw, Download } from "lucide-react";

const BacktestResults = () => {
  const backtestData = [
    { date: '2023-07', portfolio: 10000, benchmark: 10000, drawdown: 0 },
    { date: '2023-08', portfolio: 10450, benchmark: 10200, drawdown: -2.1 },
    { date: '2023-09', portfolio: 10890, benchmark: 10150, drawdown: -1.5 },
    { date: '2023-10', portfolio: 11200, benchmark: 10050, drawdown: -3.2 },
    { date: '2023-11', portfolio: 11680, benchmark: 10380, drawdown: -1.8 },
    { date: '2023-12', portfolio: 12100, benchmark: 10650, drawdown: -0.9 },
    { date: '2024-01', portfolio: 12550, benchmark: 10890, drawdown: -2.5 }
  ];

  const metrics = [
    { label: "Total Return", value: "25.5%", benchmark: "8.9%" },
    { label: "Annual Return", value: "18.2%", benchmark: "6.1%" },
    { label: "Max Drawdown", value: "-3.2%", benchmark: "-8.5%" },
    { label: "Sharpe Ratio", value: "1.42", benchmark: "0.87" },
    { label: "Win Rate", value: "72%", benchmark: "N/A" },
    { label: "Trades", value: "156", benchmark: "N/A" }
  ];

  return (
    <div className="space-y-6">
      {/* Backtest Controls */}
      <Card className="bg-slate-700/50 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center justify-between">
            <span>Backtest Configuration</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-slate-600">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                <Play className="h-4 w-4 mr-2" />
                Run Backtest
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-slate-400 text-sm">Time Period</label>
              <p className="text-white">July 2023 - January 2024</p>
            </div>
            <div>
              <label className="text-slate-400 text-sm">Initial Capital</label>
              <p className="text-white">$10,000</p>
            </div>
            <div>
              <label className="text-slate-400 text-sm">Benchmark</label>
              <p className="text-white">S&P 500 (SPY)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="bg-slate-700/50 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white text-lg">Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {metrics.map((metric, index) => (
              <div key={index} className="p-3 bg-slate-600/30 rounded-lg">
                <p className="text-slate-400 text-sm">{metric.label}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-white font-bold">{metric.value}</span>
                  {metric.benchmark !== "N/A" && (
                    <Badge variant="outline" className="text-xs text-slate-400 border-slate-500">
                      SPY: {metric.benchmark}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-700/50 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white text-lg">Portfolio vs Benchmark</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={backtestData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#334155', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="portfolio" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Sentivision Strategy"
                />
                <Line 
                  type="monotone" 
                  dataKey="benchmark" 
                  stroke="#6b7280" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="S&P 500"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-700/50 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white text-lg">Drawdown Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={backtestData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#334155', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="drawdown" 
                  stroke="#ef4444" 
                  fill="#ef4444" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BacktestResults;
