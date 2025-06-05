
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, AlertTriangle, Target, DollarSign } from "lucide-react";

interface SignalOverlayProps {
  pattern: string;
  sentiment: number;
  confidence: number;
}

const SignalOverlay = ({ pattern, sentiment, confidence }: SignalOverlayProps) => {
  const getSignalStrength = () => {
    const combinedScore = (confidence / 100) * 0.6 + Math.abs(sentiment) * 0.4;
    if (combinedScore > 0.8) return "Strong";
    if (combinedScore > 0.6) return "Moderate";
    return "Weak";
  };

  const getActionRecommendation = () => {
    const bullishPatterns = ["Bull Flag", "Cup and Handle", "Ascending Triangle", "Double Bottom"];
    const isBullishPattern = bullishPatterns.includes(pattern);
    const isBullishSentiment = sentiment > 0.2;
    
    if (isBullishPattern && isBullishSentiment) return { action: "BUY", color: "text-green-400", bg: "bg-green-500/20" };
    if (!isBullishPattern && sentiment < -0.2) return { action: "SELL", color: "text-red-400", bg: "bg-red-500/20" };
    return { action: "WATCH", color: "text-yellow-400", bg: "bg-yellow-500/20" };
  };

  const recommendation = getActionRecommendation();
  const signalStrength = getSignalStrength();

  return (
    <div className="space-y-6">
      {/* Signal Summary */}
      <Card className="bg-slate-700/50 border-slate-600 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center space-y-2">
            <div className="p-3 bg-cyan-500/20 rounded-lg inline-block">
              <Target className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Pattern</p>
              <p className="text-white font-semibold">{pattern}</p>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="p-3 bg-purple-500/20 rounded-lg inline-block">
              {sentiment > 0 ? (
                <TrendingUp className="h-6 w-6 text-green-400" />
              ) : sentiment < 0 ? (
                <TrendingDown className="h-6 w-6 text-red-400" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
              )}
            </div>
            <div>
              <p className="text-slate-400 text-sm">Sentiment</p>
              <p className={`font-semibold ${sentiment > 0 ? 'text-green-400' : sentiment < 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                {sentiment > 0 ? 'Bullish' : sentiment < 0 ? 'Bearish' : 'Neutral'}
              </p>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <div className={`p-3 ${recommendation.bg} rounded-lg inline-block`}>
              <DollarSign className={`h-6 w-6 ${recommendation.color}`} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Action</p>
              <p className={`font-semibold ${recommendation.color}`}>{recommendation.action}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-slate-700/50 border-slate-600 p-4">
          <h4 className="text-white font-medium mb-3">Signal Strength</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Pattern Confidence:</span>
              <Badge variant="outline" className="text-cyan-400 border-cyan-500">
                {confidence}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Sentiment Score:</span>
              <Badge variant="outline" className={`${sentiment > 0 ? 'text-green-400 border-green-500' : sentiment < 0 ? 'text-red-400 border-red-500' : 'text-yellow-400 border-yellow-500'}`}>
                {sentiment.toFixed(3)}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Overall Strength:</span>
              <Badge variant="outline" className={`${signalStrength === 'Strong' ? 'text-green-400 border-green-500' : signalStrength === 'Moderate' ? 'text-yellow-400 border-yellow-500' : 'text-red-400 border-red-500'}`}>
                {signalStrength}
              </Badge>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-700/50 border-slate-600 p-4">
          <h4 className="text-white font-medium mb-3">Risk Assessment</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Risk Level:</span>
              <Badge variant="outline" className="text-orange-400 border-orange-500">
                {signalStrength === 'Strong' ? 'Low' : signalStrength === 'Moderate' ? 'Medium' : 'High'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Stop Loss:</span>
              <span className="text-white font-mono">-5.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Take Profit:</span>
              <span className="text-green-400 font-mono">+12.8%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button 
          className={`flex-1 ${recommendation.action === 'BUY' ? 'bg-green-500 hover:bg-green-600' : recommendation.action === 'SELL' ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-white`}
        >
          {recommendation.action} Signal
        </Button>
        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
          Save Analysis
        </Button>
        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
          Backtest
        </Button>
      </div>
    </div>
  );
};

export default SignalOverlay;
