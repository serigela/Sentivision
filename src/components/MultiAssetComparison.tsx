
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BarChart, GitCompare, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

const MultiAssetComparison = () => {
  const [asset1, setAsset1] = useState("AAPL");
  const [asset2, setAsset2] = useState("MSFT");
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonData, setComparisonData] = useState<any>(null);

  const mockAssetData = {
    AAPL: { pattern: "Bull Flag", sentiment: 0.65, confidence: 87, price: 175.20 },
    MSFT: { pattern: "Ascending Triangle", sentiment: 0.42, confidence: 79, price: 338.50 },
    TSLA: { pattern: "Head and Shoulders", sentiment: -0.23, confidence: 92, price: 248.80 },
    NVDA: { pattern: "Cup and Handle", sentiment: 0.78, confidence: 85, price: 875.30 },
    BTC: { pattern: "Double Bottom", sentiment: 0.34, confidence: 73, price: 43250.00 },
    ETH: { pattern: "Falling Wedge", sentiment: 0.12, confidence: 68, price: 2680.50 }
  };

  const runComparison = async () => {
    setIsComparing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const data1 = mockAssetData[asset1 as keyof typeof mockAssetData] || mockAssetData.AAPL;
    const data2 = mockAssetData[asset2 as keyof typeof mockAssetData] || mockAssetData.MSFT;
    
    const correlation = (Math.random() * 0.8 - 0.4).toFixed(3); // -0.4 to 0.4
    const recommendation = generateRecommendation(data1, data2, parseFloat(correlation));
    
    setComparisonData({
      asset1: { ...data1, ticker: asset1 },
      asset2: { ...data2, ticker: asset2 },
      correlation,
      recommendation,
      spreadAnalysis: {
        sentimentSpread: Math.abs(data1.sentiment - data2.sentiment),
        confidenceSpread: Math.abs(data1.confidence - data2.confidence),
        priceRatio: (data1.price / data2.price).toFixed(4)
      }
    });
    
    setIsComparing(false);
  };

  const generateRecommendation = (data1: any, data2: any, correlation: number) => {
    if (data1.sentiment > data2.sentiment && data1.confidence > data2.confidence) {
      return {
        preferred: data1.ticker,
        action: "BUY",
        reasoning: `${data1.ticker} shows stronger sentiment and higher pattern confidence`,
        strategy: "Long/Short Pair Trade"
      };
    } else if (data2.sentiment > data1.sentiment && data2.confidence > data1.confidence) {
      return {
        preferred: data2.ticker,
        action: "BUY", 
        reasoning: `${data2.ticker} demonstrates superior fundamentals and technical setup`,
        strategy: "Relative Strength Play"
      };
    } else {
      return {
        preferred: "Neither",
        action: "HOLD",
        reasoning: "Mixed signals - consider diversified approach",
        strategy: "Portfolio Balance"
      };
    }
  };

  const getAssetCard = (data: any, ticker: string) => (
    <div className="bg-slate-700/30 p-4 rounded-lg space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-white font-bold text-lg">{ticker}</h4>
        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500">
          ${data.price.toLocaleString()}
        </Badge>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm">Pattern:</span>
          <span className="text-white text-sm">{data.pattern}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm">Confidence:</span>
          <span className="text-green-400 text-sm font-mono">{data.confidence}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm">Sentiment:</span>
          <span className={`text-sm font-mono ${data.sentiment > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {data.sentiment > 0 ? '+' : ''}{data.sentiment.toFixed(3)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <GitCompare className="h-5 w-5 text-blue-400" />
          <span>Multi-Asset Comparison</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Asset Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-slate-400 text-sm">Asset 1:</label>
            <Input
              value={asset1}
              onChange={(e) => setAsset1(e.target.value.toUpperCase())}
              placeholder="Enter ticker..."
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-slate-400 text-sm">Asset 2:</label>
            <Input
              value={asset2}
              onChange={(e) => setAsset2(e.target.value.toUpperCase())}
              placeholder="Enter ticker..."
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>
        </div>

        <Button 
          onClick={runComparison}
          disabled={isComparing}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          {isComparing ? (
            <>
              <BarChart className="h-4 w-4 mr-2 animate-pulse" />
              Analyzing Assets...
            </>
          ) : (
            <>
              <GitCompare className="h-4 w-4 mr-2" />
              Compare Assets
            </>
          )}
        </Button>

        {/* Comparison Results */}
        {comparisonData && (
          <div className="space-y-4">
            {/* Asset Cards */}
            <div className="grid grid-cols-2 gap-4">
              {getAssetCard(comparisonData.asset1, comparisonData.asset1.ticker)}
              {getAssetCard(comparisonData.asset2, comparisonData.asset2.ticker)}
            </div>

            {/* Correlation & Analysis */}
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
              <h4 className="text-white font-medium mb-3">Comparative Analysis</h4>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-slate-400 text-sm">Correlation</p>
                  <p className={`font-mono text-lg ${parseFloat(comparisonData.correlation) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {comparisonData.correlation}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-slate-400 text-sm">Sentiment Spread</p>
                  <p className="text-cyan-400 font-mono text-lg">
                    {comparisonData.spreadAnalysis.sentimentSpread.toFixed(3)}
                  </p>
                </div>
              </div>

              {/* Recommendation */}
              <div className={`p-3 rounded-lg ${
                comparisonData.recommendation.preferred !== 'Neither' ? 'bg-green-500/10 border border-green-500/30' : 'bg-yellow-500/10 border border-yellow-500/30'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Recommendation:</span>
                  <Badge className={`${
                    comparisonData.recommendation.preferred !== 'Neither' ? 'bg-green-500/20 text-green-400 border-green-500' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
                  }`}>
                    {comparisonData.recommendation.action} {comparisonData.recommendation.preferred}
                  </Badge>
                </div>
                <p className="text-slate-300 text-sm mb-1">{comparisonData.recommendation.reasoning}</p>
                <p className="text-slate-400 text-xs">Strategy: {comparisonData.recommendation.strategy}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MultiAssetComparison;
