
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, TrendingUp, TrendingDown, Minus, Search, Brain, Video } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
    lastUpdate: new Date().toLocaleTimeString(),
    facialSentiment: 0.0,
    truthScore: 0.0
  });

  const mockNews = [
    { headline: "Apple reports strong Q4 earnings, beats expectations", sentiment: 0.8, time: "2h ago", hasVideo: true },
    { headline: "iPhone 15 sales exceed analyst projections", sentiment: 0.7, time: "4h ago", hasVideo: false },
    { headline: "AAPL stock price target raised by Goldman Sachs", sentiment: 0.6, time: "6h ago", hasVideo: true },
    { headline: "Market volatility affects tech sector", sentiment: -0.3, time: "8h ago", hasVideo: false },
    { headline: "Apple announces new AI initiatives", sentiment: 0.9, time: "12h ago", hasVideo: true }
  ];

  const analyzeSentiment = async () => {
    setIsAnalyzing(true);
    
    try {
      // Call our AI sentiment analysis edge function
      const { data, error } = await supabase.functions.invoke('analyze-sentiment', {
        body: {
          ticker,
          headlines: mockNews.map(n => n.headline),
          videoUrls: mockNews.filter(n => n.hasVideo).map(n => `https://youtube.com/watch?v=${Math.random()}`)
        }
      });

      if (error) throw error;

      const facialScore = data.facial_sentiments.length > 0 
        ? data.facial_sentiments.reduce((sum: number, f: any) => sum + f.emotions.positive - f.emotions.negative, 0) / data.facial_sentiments.length 
        : 0;

      // Calculate truth meter score
      const truthResponse = await supabase.functions.invoke('truth-meter', {
        body: {
          analysisId: null,
          headlineSentiment: data.overall_sentiment,
          facialSentiment: facialScore
        }
      });

      const newData = {
        score: data.overall_sentiment,
        label: data.overall_sentiment > 0.2 ? "Bullish" : data.overall_sentiment < -0.2 ? "Bearish" : "Neutral",
        newsCount: data.headline_sentiments.length,
        lastUpdate: new Date().toLocaleTimeString(),
        facialSentiment: facialScore,
        truthScore: truthResponse.data?.consistency_score || 0
      };
      
      setSentimentData(newData);
      onSentimentChange(data.overall_sentiment);
      
      toast.success(`AI sentiment analyzed for ${ticker}`);
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      toast.error("Sentiment analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
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
            <Brain className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* AI Sentiment Score */}
      <Card className="bg-slate-700/50 border-slate-600 p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">AI Sentiment:</span>
            <Badge className={`${getSentimentColor(sentimentData.score)} bg-slate-600 border-slate-500`}>
              <span className="flex items-center space-x-1">
                {getSentimentIcon(sentimentData.score)}
                <span>{sentimentData.label}</span>
              </span>
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-slate-400">FinBERT Score:</span>
            <span className={`font-mono ${getSentimentColor(sentimentData.score)}`}>
              {sentimentData.score.toFixed(3)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Facial Sentiment:</span>
            <span className={`font-mono ${getSentimentColor(sentimentData.facialSentiment)}`}>
              {sentimentData.facialSentiment.toFixed(3)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Truth Score:</span>
            <Badge variant="outline" className={`${sentimentData.truthScore > 0.7 ? 'text-green-400 border-green-500' : sentimentData.truthScore > 0.4 ? 'text-yellow-400 border-yellow-500' : 'text-red-400 border-red-500'}`}>
              {(sentimentData.truthScore * 100).toFixed(0)}%
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Sources:</span>
            <span className="text-white">{sentimentData.newsCount} articles</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Last Update:</span>
            <span className="text-slate-300 text-sm">{sentimentData.lastUpdate}</span>
          </div>
        </div>
      </Card>

      {/* Recent Headlines with Video Indicators */}
      <div className="space-y-2">
        <h4 className="text-white text-sm font-medium">Recent Headlines & Video Analysis</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {mockNews.map((news, index) => (
            <Card key={index} className="bg-slate-700/30 border-slate-600 p-3">
              <div className="space-y-2">
                <p className="text-white text-xs leading-relaxed">{news.headline}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 text-xs">{news.time}</span>
                    {news.hasVideo && (
                      <Badge variant="outline" className="text-purple-400 border-purple-500 text-xs">
                        <Video className="h-3 w-3 mr-1" />
                        Video
                      </Badge>
                    )}
                  </div>
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
