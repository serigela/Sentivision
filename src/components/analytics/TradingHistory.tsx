
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";

const TradingHistory = () => {
  const trades = [
    {
      id: "T001",
      date: "2024-01-15",
      ticker: "AAPL",
      pattern: "Bull Flag",
      action: "BUY",
      confidence: 92,
      sentiment: 0.75,
      result: "WIN",
      profit: "+$450",
      duration: "2 days"
    },
    {
      id: "T002", 
      date: "2024-01-12",
      ticker: "TSLA",
      pattern: "Head & Shoulders",
      action: "SELL",
      confidence: 87,
      sentiment: -0.45,
      result: "WIN",
      profit: "+$320",
      duration: "1 day"
    },
    {
      id: "T003",
      date: "2024-01-10",
      ticker: "SPY",
      pattern: "Double Bottom",
      action: "BUY",
      confidence: 89,
      sentiment: 0.65,
      result: "LOSS",
      profit: "-$150",
      duration: "3 days"
    },
    {
      id: "T004",
      date: "2024-01-08",
      ticker: "NVDA",
      pattern: "Ascending Triangle",
      action: "BUY",
      confidence: 84,
      sentiment: 0.80,
      result: "WIN",
      profit: "+$680",
      duration: "4 days"
    },
    {
      id: "T005",
      date: "2024-01-05",
      ticker: "MSFT",
      pattern: "Cup & Handle",
      action: "BUY",
      confidence: 91,
      sentiment: 0.55,
      result: "WIN",
      profit: "+$290",
      duration: "2 days"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-slate-700/50 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center justify-between">
            <span>Recent Trading Decisions</span>
            <Button variant="outline" size="sm" className="border-slate-600">
              <Download className="h-4 w-4 mr-2" />
              Export History
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trades.map((trade, index) => (
              <div key={index} className="p-4 bg-slate-600/30 rounded-lg border border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="text-slate-300 border-slate-500">
                      {trade.id}
                    </Badge>
                    <span className="text-white font-medium text-lg">{trade.ticker}</span>
                    <Badge 
                      variant={trade.action === 'BUY' ? 'default' : 'destructive'}
                      className={trade.action === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                    >
                      {trade.action}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={trade.result === 'WIN' ? 'default' : 'destructive'}
                      className={trade.result === 'WIN' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                    >
                      {trade.result}
                    </Badge>
                    <span className={`font-mono text-sm ${trade.result === 'WIN' ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.profit}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Date</p>
                    <p className="text-white">{trade.date}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Pattern</p>
                    <p className="text-cyan-400">{trade.pattern}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Confidence</p>
                    <p className="text-white">{trade.confidence}%</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Sentiment</p>
                    <p className={trade.sentiment > 0 ? 'text-green-400' : 'text-red-400'}>
                      {trade.sentiment.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Duration</p>
                    <p className="text-white">{trade.duration}</p>
                  </div>
                </div>

                <div className="mt-3 flex justify-end">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradingHistory;
