
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, TrendingUp, TrendingDown, Minus, Search } from "lucide-react";
import { toast } from "sonner";

interface SentimentAnalyzerProps {
  onSentimentChange: (sentiment: number) => void;
}

const SentimentAnalyzer = ({ onSentimentChange }: SentimentAnalyzerProps) => {
  const [ticker, setTicker] = useState("AAPL");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sentimentData, setSentimentData] = useState({
    score: 0.65,
    label: "Bullish",
    newsCount: 12,
    lastUpdate: new Date().toLocaleTimeString()
  });

  const mockNews = [
    { headline: "Apple reports strong Q4 earnings, beats expectations", sentiment: 0.8, time: "2h ago" },
    { headline: "iPhone 15 sales exceed analyst projections", sentiment: 0.7, time: "4h ago" },
    { headline: "AAPL stock price target raised by Goldman Sachs", sentiment: 0.6, time: "6h ago" },
    { headline: "Market volatility affects tech sector", sentiment: -0.3, time: "8h ago" },
    { headline: "Apple announces new AI initiatives", sentiment: 0.9, time: "12h ago" }
  ];

  const analyzeSentiment = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const randomScore = (Math.random() * 2 - 1); // -1 to 1
      const label = randomScore > 0.2 ? "Bullish" : randomScore < -0.2 ? "Bearish" : "Neutral";
      
      const newData = {
        score: randomScore,
        label,
        newsCount: Math.floor(Math.random() * 20) + 5,
        lastUpdate: new Date().toLocaleTimeString()
      };
      
      setSentimentData(newData);
      onSentimentChange(randomScore);
      setIsAnalyzing(false);
      
      toast.success(`Sentiment analyzed for ${ticker}`);
    }, 1500);
  };

  const getSentimentColor = (score: number) => {
    if (score > 0.2) return "text-green-400";
    if (score < -0.2) return "text-red-400";
    return "text-yellow-400";
  };

  const getSentimentIcon = (score: number) => {
    if (score > 0.2) return <TrendingUp className="h-4 w-4" />;
    if (score < -0.2) return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  useEffect(() => {
    onSentimentChange(sentimentData.score);
  }, []);

  return (
    <div className="space-y-4">
      {/* Ticker Input */}
      <div className="flex space-x-2">
        <Input
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="Enter ticker..."
          className="bg-slate-700 border-slate-600 text-white"
        />
        <Button
          onClick={analyzeSentiment}
          disabled={isAnalyzing}
          size="icon"
          className="bg-purple-500 hover:bg-purple-600"
        >
          {isAnalyzing ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Sentiment Score */}
      <Card className="bg-slate-700/50 border-slate-600 p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Current Sentiment:</span>
            <Badge className={`${getSentimentColor(sentimentData.score)} bg-slate-600 border-slate-500`}>
              <span className="flex items-center space-x-1">
                {getSentimentIcon(sentimentData.score)}
                <span>{sentimentData.label}</span>
              </span>
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Score:</span>
            <span className={`font-mono ${getSentimentColor(sentimentData.score)}`}>
              {sentimentData.score.toFixed(3)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">News Articles:</span>
            <span className="text-white">{sentimentData.newsCount}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Last Update:</span>
            <span className="text-slate-300 text-sm">{sentimentData.lastUpdate}</span>
          </div>
        </div>
      </Card>

      {/* Recent Headlines */}
      <div className="space-y-2">
        <h4 className="text-white text-sm font-medium">Recent Headlines</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {mockNews.map((news, index) => (
            <Card key={index} className="bg-slate-700/30 border-slate-600 p-3">
              <div className="space-y-2">
                <p className="text-white text-xs leading-relaxed">{news.headline}</p>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs">{news.time}</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getSentimentColor(news.sentiment)}`}
                  >
                    {news.sentiment > 0 ? '+' : ''}{news.sentiment.toFixed(2)}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalyzer;
