
import { Badge } from '@/components/ui/badge';

const AuthHeader = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white mb-2">
        Senti<span className="text-cyan-400">vision</span>
      </h1>
      <p className="text-slate-300">AI-Powered Trading Insights</p>
      <div className="flex justify-center gap-2 mt-2">
        <Badge variant="outline" className="text-cyan-400 border-cyan-500">
          Pattern Detection
        </Badge>
        <Badge variant="outline" className="text-green-400 border-green-500">
          Sentiment Analysis
        </Badge>
      </div>
    </div>
  );
};

export default AuthHeader;
