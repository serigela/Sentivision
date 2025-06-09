
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PDFPreviewProps {
  ticker: string;
  pattern: string;
  patternConfidence: number;
  recommendation: {
    action: string;
    confidence: number;
    reasoning: string;
    timeframe: string;
  };
}

const PDFPreview = ({ ticker, pattern, patternConfidence, recommendation }: PDFPreviewProps) => {
  return (
    <div className="bg-slate-700/30 p-3 rounded-lg">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-slate-400">Ticker:</span>
          <span className="text-white ml-2">{ticker}</span>
        </div>
        <div>
          <span className="text-slate-400">Pattern:</span>
          <span className="text-cyan-400 ml-2">{pattern}</span>
        </div>
        <div>
          <span className="text-slate-400">Confidence:</span>
          <span className="text-white ml-2">{patternConfidence}%</span>
        </div>
        <div>
          <span className="text-slate-400">Action:</span>
          <span className={`ml-2 ${
            recommendation.action === 'BUY' ? 'text-green-400' : 
            recommendation.action === 'SELL' ? 'text-red-400' : 'text-yellow-400'
          }`}>
            {recommendation.action}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;
