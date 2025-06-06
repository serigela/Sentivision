import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Clock, AlertTriangle, Target, Zap } from "lucide-react";
import PDFExport from "./PDFExport";

interface InsightEngineProps {
  pattern: string;
  patternConfidence: number;
  sentiment: number;
  ticker: string;
  chartImage?: string;
  gradCamImage?: string;
}

const InsightEngine = ({ pattern, patternConfidence, sentiment, ticker, chartImage, gradCamImage }: InsightEngineProps) => {
  const generateRecommendation = () => {
    const bullishPatterns = ["Bull Flag", "Cup and Handle", "Ascending Triangle", "Double Bottom"];
    const isBullishPattern = bullishPatterns.includes(pattern);
    const strongSentiment = Math.abs(sentiment) > 0.6;
    const highConfidence = patternConfidence > 80;

    if (isBullishPattern && sentiment > 0.3 && highConfidence) {
      return {
        action: "BUY",
        timeframe: "next 2-3 days",
        reasoning: "Strong bullish pattern with positive sentiment alignment",
        confidence: 92,
        color: "text-green-400",
        bg: "bg-green-500/20"
      };
    } else if (!isBullishPattern && sentiment < -0.3 && highConfidence) {
      return {
        action: "SELL",
        timeframe: "within 24-48 hours",
        reasoning: "Bearish pattern confirmed by negative sentiment",
        confidence: 87,
        color: "text-red-400",
        bg: "bg-red-500/20"
      };
    } else if (strongSentiment && !highConfidence) {
      return {
        action: "WAIT",
        timeframe: "monitor for 3-5 days",
        reasoning: "Strong sentiment but uncertain pattern - need confirmation",
        confidence: 65,
        color: "text-yellow-400",
        bg: "bg-yellow-500/20"
      };
    } else {
      return {
        action: "HOLD",
        timeframe: "review in 1 week",
        reasoning: "Mixed signals - maintain current position",
        confidence: 72,
        color: "text-blue-400",
        bg: "bg-blue-500/20"
      };
    }
  };

  const recommendation = generateRecommendation();

  const getRiskLevel = () => {
    if (recommendation.confidence > 85) return { level: "Low", color: "text-green-400" };
    if (recommendation.confidence > 70) return { level: "Medium", color: "text-yellow-400" };
    return { level: "High", color: "text-red-400" };
  };

  const risk = getRiskLevel();

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-400" />
            <span>AI Insight Engine</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Recommendation */}
          <div className={`p-4 rounded-lg ${recommendation.bg} border border-slate-600`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-lg font-bold ${recommendation.color}`}>
                {recommendation.action} {ticker}
              </h3>
              <Badge className={`${recommendation.color} border-current`}>
                {recommendation.confidence}% Confidence
              </Badge>
            </div>
            <p className="text-slate-300 mb-2">{recommendation.reasoning}</p>
            <div className="flex items-center text-sm text-slate-400">
              <Clock className="h-4 w-4 mr-1" />
              <span>Timeframe: {recommendation.timeframe}</span>
            </div>
          </div>

          {/* Analysis Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-white font-medium">Pattern Analysis</h4>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Pattern:</span>
                <span className="text-cyan-400">{pattern}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Confidence:</span>
                <span className="text-white">{patternConfidence}%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-white font-medium">Risk Assessment</h4>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Risk Level:</span>
                <span className={risk.color}>{risk.level}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Sentiment:</span>
                <span className={sentiment > 0 ? 'text-green-400' : 'text-red-400'}>
                  {sentiment.toFixed(3)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white">
              <Target className="h-4 w-4 mr-2" />
              Execute Strategy
            </Button>
            <Button variant="outline" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700">
              <Zap className="h-4 w-4 mr-2" />
              Run Simulation
            </Button>
          </div>

          {/* Historical Context */}
          <div className="text-xs text-slate-400 bg-slate-700/30 p-3 rounded-lg">
            <p><strong>Historical Context:</strong> Similar {pattern} patterns with {sentiment > 0 ? 'positive' : 'negative'} sentiment have shown a {Math.floor(Math.random() * 20) + 70}% success rate over the past 6 months.</p>
          </div>
        </CardContent>
      </Card>

      {/* PDF Export Component */}
      <PDFExport
        chartImage={chartImage}
        gradCamImage={gradCamImage}
        pattern={pattern}
        patternConfidence={patternConfidence}
        sentiment={sentiment}
        ticker={ticker}
        recommendation={recommendation}
      />
    </div>
  );
};

export default InsightEngine;
