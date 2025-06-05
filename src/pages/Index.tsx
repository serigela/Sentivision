
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, TrendingUp, TrendingDown, BarChart3, Brain, Activity } from "lucide-react";
import PatternDetector from "@/components/PatternDetector";
import SentimentAnalyzer from "@/components/SentimentAnalyzer";
import SignalOverlay from "@/components/SignalOverlay";

const Index = () => {
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [sentimentScore, setSentimentScore] = useState<number>(0);
  const [confidence, setConfidence] = useState<number>(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">PatternSense AI</h1>
                <p className="text-sm text-slate-400">Sentiment-Aware Chart Pattern Detection</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-green-500 text-green-400">
                <Activity className="h-3 w-3 mr-1" />
                Live Analysis
              </Badge>
              <Badge variant="outline" className="border-cyan-500 text-cyan-400">
                CNN Model v2.1
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pattern Detection */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-cyan-400" />
                  <span>Chart Pattern Detection</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PatternDetector 
                  onPatternDetected={(pattern, conf) => {
                    setSelectedPattern(pattern);
                    setConfidence(conf);
                  }}
                />
              </CardContent>
            </Card>

            {/* Signal Overlay */}
            {selectedPattern && (
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    <span>Combined Signal Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SignalOverlay 
                    pattern={selectedPattern}
                    sentiment={sentimentScore}
                    confidence={confidence}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sentiment Analysis */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-400" />
                  <span>Sentiment Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SentimentAnalyzer onSentimentChange={setSentimentScore} />
              </CardContent>
            </Card>

            {/* Live Metrics */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-sm">Live Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Model Accuracy</span>
                  <span className="text-green-400 font-mono">94.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Processing Speed</span>
                  <span className="text-cyan-400 font-mono">1.2s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Patterns Detected</span>
                  <span className="text-white font-mono">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Success Rate</span>
                  <span className="text-yellow-400 font-mono">87.3%</span>
                </div>
              </CardContent>
            </Card>

            {/* Market Status */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-sm">Market Sentiment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Overall</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500">
                    Bullish
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Fear & Greed</span>
                  <span className="text-orange-400 font-mono">72</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">VIX</span>
                  <span className="text-red-400 font-mono">18.4</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
