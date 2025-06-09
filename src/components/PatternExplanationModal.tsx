
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, AlertTriangle, Target, DollarSign } from 'lucide-react';
import { PatternExplanation } from '@/types';

interface PatternExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  pattern: string;
  confidence: number;
}

const patternData: Record<string, PatternExplanation> = {
  "Head and Shoulders": {
    pattern: "Head and Shoulders",
    description: "A bearish reversal pattern with three peaks, where the middle peak (head) is higher than the other two (shoulders).",
    implications: "Indicates potential trend reversal from bullish to bearish. Volume typically decreases during formation.",
    tradingStrategy: "Enter short position after neckline break with stop-loss above right shoulder.",
    riskLevel: "medium"
  },
  "Double Bottom": {
    pattern: "Double Bottom",
    description: "A bullish reversal pattern forming two distinct lows at approximately the same level.",
    implications: "Suggests strong support level and potential upward price movement.",
    tradingStrategy: "Enter long position after resistance break with stop-loss below the lows.",
    riskLevel: "low"
  },
  "Bull Flag": {
    pattern: "Bull Flag",
    description: "A bullish continuation pattern with a sharp price rise followed by a slight downward consolidation.",
    implications: "Indicates brief pause in uptrend before continuation. High probability of success.",
    tradingStrategy: "Enter long position on breakout above flag resistance with tight stop-loss.",
    riskLevel: "low"
  },
  "Ascending Triangle": {
    pattern: "Ascending Triangle",
    description: "A bullish pattern with horizontal resistance and rising support trendline.",
    implications: "Shows increasing buying pressure and potential breakout above resistance.",
    tradingStrategy: "Enter long on resistance break with stop-loss below the trendline.",
    riskLevel: "medium"
  }
};

const PatternExplanationModal = ({ isOpen, onClose, pattern, confidence }: PatternExplanationModalProps) => {
  const data = patternData[pattern] || {
    pattern,
    description: "Chart pattern detected by AI analysis.",
    implications: "Requires further analysis for trading implications.",
    tradingStrategy: "Consult additional indicators before making trading decisions.",
    riskLevel: "high" as const
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400 border-green-500';
      case 'medium': return 'text-yellow-400 border-yellow-500';
      case 'high': return 'text-red-400 border-red-500';
      default: return 'text-slate-400 border-slate-500';
    }
  };

  const getPatternIcon = () => {
    if (data.pattern.toLowerCase().includes('bull') || data.pattern.toLowerCase().includes('ascending')) {
      return <TrendingUp className="h-5 w-5 text-green-400" />;
    } else if (data.pattern.toLowerCase().includes('bear') || data.pattern.toLowerCase().includes('head')) {
      return <TrendingDown className="h-5 w-5 text-red-400" />;
    }
    return <Target className="h-5 w-5 text-cyan-400" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            {getPatternIcon()}
            <span>{data.pattern}</span>
            <Badge variant="outline" className="text-cyan-400 border-cyan-500">
              {confidence}% confidence
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <Card className="bg-slate-700/50 border-slate-600 p-4">
            <h3 className="text-lg font-medium mb-2 text-cyan-400">What is this pattern?</h3>
            <p className="text-slate-300 leading-relaxed">{data.description}</p>
          </Card>

          {/* Market Implications */}
          <Card className="bg-slate-700/50 border-slate-600 p-4">
            <h3 className="text-lg font-medium mb-2 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-400">Market Implications</span>
            </h3>
            <p className="text-slate-300 leading-relaxed">{data.implications}</p>
          </Card>

          {/* Trading Strategy */}
          <Card className="bg-slate-700/50 border-slate-600 p-4">
            <h3 className="text-lg font-medium mb-2 flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              <span className="text-green-400">Trading Strategy</span>
            </h3>
            <p className="text-slate-300 leading-relaxed">{data.tradingStrategy}</p>
          </Card>

          {/* Risk Assessment */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Risk Level:</span>
            <Badge variant="outline" className={getRiskColor(data.riskLevel)}>
              {data.riskLevel.toUpperCase()} RISK
            </Badge>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-slate-500 bg-slate-800/50 p-3 rounded-lg border border-slate-600">
            ⚠️ <strong>Disclaimer:</strong> This analysis is for educational purposes only. 
            Always conduct your own research and consider multiple factors before making trading decisions. 
            Past performance does not guarantee future results.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatternExplanationModal;
