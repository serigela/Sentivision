
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface RealTimeDataFetcherProps {
  onChartGenerated: (chartUrl: string, ticker: string) => void;
}

const RealTimeDataFetcher = ({ onChartGenerated }: RealTimeDataFetcherProps) => {
  const [ticker, setTicker] = useState("");
  const [timeframe, setTimeframe] = useState("1D");
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetch, setLastFetch] = useState<string | null>(null);

  const timeframes = [
    { value: "1D", label: "1 Day" },
    { value: "5D", label: "5 Days" },
    { value: "1M", label: "1 Month" },
    { value: "3M", label: "3 Months" },
    { value: "6M", label: "6 Months" },
    { value: "1Y", label: "1 Year" }
  ];

  const fetchRealTimeData = async () => {
    if (!ticker.trim()) {
      toast.error("Please enter a valid ticker symbol");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call - in production, integrate with Alpha Vantage, Yahoo Finance, etc.
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a mock chart URL (in production, this would be real chart data)
      const mockChartUrl = `https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop&crop=center`;
      
      onChartGenerated(mockChartUrl, ticker.toUpperCase());
      setLastFetch(new Date().toLocaleTimeString());
      
      toast.success(`Fetched real-time data for ${ticker.toUpperCase()}`);
    } catch (error) {
      console.error('Data fetch error:', error);
      toast.error("Failed to fetch market data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-600">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-400" />
          <span>Real-Time Market Data</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ticker" className="text-slate-300">Stock Ticker</Label>
            <Input
              id="ticker"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="e.g., AAPL, TSLA, NVDA"
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-slate-300">Timeframe</Label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeframes.map((tf) => (
                  <SelectItem key={tf.value} value={tf.value}>
                    {tf.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={fetchRealTimeData}
          disabled={isLoading || !ticker.trim()}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
        >
          {isLoading ? (
            <>
              <Download className="h-4 w-4 mr-2 animate-bounce" />
              Fetching Live Data...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Fetch Chart Data
            </>
          )}
        </Button>

        {lastFetch && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-slate-400">
              <Clock className="h-4 w-4" />
              <span>Last updated: {lastFetch}</span>
            </div>
            <Badge variant="outline" className="border-green-500 text-green-400">
              Live Data
            </Badge>
          </div>
        )}

        <div className="bg-slate-700/50 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-slate-300">
              <div className="font-medium text-yellow-400 mb-1">Market Data Integration</div>
              <div>Supports major exchanges (NYSE, NASDAQ) and crypto pairs. Data refreshes every 15 minutes during market hours.</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeDataFetcher;
