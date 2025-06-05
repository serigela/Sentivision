
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, CheckCircle, Eye, MessageSquare } from "lucide-react";

interface TruthMeterProps {
  headlineSentiment: number;
  facialSentiment: number;
  consistencyScore: number;
}

const TruthMeter = ({ headlineSentiment, facialSentiment, consistencyScore }: TruthMeterProps) => {
  const getTruthRating = () => {
    if (consistencyScore > 0.8) return { rating: "High Truth", color: "text-green-400", bg: "bg-green-500/20", icon: CheckCircle };
    if (consistencyScore > 0.6) return { rating: "Moderate Truth", color: "text-yellow-400", bg: "bg-yellow-500/20", icon: AlertTriangle };
    return { rating: "Low Truth", color: "text-red-400", bg: "bg-red-500/20", icon: Shield };
  };

  const truth = getTruthRating();
  const IconComponent = truth.icon;

  return (
    <Card className="bg-slate-700/50 border-slate-600 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium flex items-center space-x-2">
            <Shield className="h-5 w-5 text-purple-400" />
            <span>Truth Meter™</span>
          </h3>
          <Badge className={`${truth.color} ${truth.bg} border-current`}>
            <IconComponent className="h-3 w-3 mr-1" />
            {truth.rating}
          </Badge>
        </div>

        {/* Consistency Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Consistency Score</span>
            <span className={`font-mono ${truth.color}`}>{(consistencyScore * 100).toFixed(0)}%</span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${
                consistencyScore > 0.8 ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
                consistencyScore > 0.6 ? 'bg-gradient-to-r from-yellow-500 to-orange-400' :
                'bg-gradient-to-r from-red-500 to-red-400'
              }`}
              style={{ width: `${consistencyScore * 100}%` }}
            />
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center space-y-2">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-400 mx-auto" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Headline Sentiment</p>
              <p className={`font-mono text-sm ${headlineSentiment > 0 ? 'text-green-400' : headlineSentiment < 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                {headlineSentiment.toFixed(3)}
              </p>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Eye className="h-6 w-6 text-purple-400 mx-auto" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Facial Expression</p>
              <p className={`font-mono text-sm ${facialSentiment > 0 ? 'text-green-400' : facialSentiment < 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                {facialSentiment.toFixed(3)}
              </p>
            </div>
          </div>
        </div>

        {/* Analysis */}
        <div className="text-xs text-slate-400 bg-slate-800/50 p-3 rounded-lg">
          {consistencyScore > 0.8 ? 
            "✅ High alignment between written sentiment and visual expressions suggests authentic reporting." :
            consistencyScore > 0.6 ?
            "⚠️ Moderate discrepancy detected. Consider multiple sources for validation." :
            "🚨 Significant inconsistency between text and facial expressions. Exercise caution with this analysis."
          }
        </div>

        <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
          View Detailed Analysis
        </Button>
      </div>
    </Card>
  );
};

export default TruthMeter;
