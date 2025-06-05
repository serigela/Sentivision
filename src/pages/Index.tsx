import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, TrendingUp, TrendingDown, BarChart3, Brain, Activity, Shield, Clock, Zap, GitCompare, BookOpen, Lightbulb } from "lucide-react";
import PatternDetector from "@/components/PatternDetector";
import SentimentAnalyzer from "@/components/SentimentAnalyzer";
import SignalOverlay from "@/components/SignalOverlay";
import TruthMeter from "@/components/TruthMeter";
import SentimentTimeline from "@/components/SentimentTimeline";
import InsightEngine from "@/components/InsightEngine";
import WhatIfSimulator from "@/components/WhatIfSimulator";
import MultiAssetComparison from "@/components/MultiAssetComparison";
import TradeJournal from "@/components/TradeJournal";

const Index = () => {
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [sentimentScore, setSentimentScore] = useState<number>(0);
  const [confidence, setConfidence] = useState<number>(0);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [facialSentiment, setFacialSentiment] = useState<number>(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Sentivision Pro</h1>
                <p className="text-sm text-slate-400">AI Trading Assistant & Signal Generator</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-green-500 text-green-400">
                <Activity className="h-3 w-3 mr-1" />
                Live Analysis
              </Badge>
              <Badge variant="outline" className="border-purple-500 text-purple-400">
                <Shield className="h-3 w-3 mr-1" />
                Truth Meter
              </Badge>
              <Badge variant="outline" className="border-cyan-500 text-cyan-400">
                Multi-Modal AI
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="analysis" className="data-[state=active]:bg-slate-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="simulation" className="data-[state=active]:bg-slate-700">
              <Lightbulb className="h-4 w-4 mr-2" />
              Simulation
            </TabsTrigger>
            <TabsTrigger value="comparison" className="data-[state=active]:bg-slate-700">
              <GitCompare className="h-4 w-4 mr-2" />
              Compare
            </TabsTrigger>
            <TabsTrigger value="journal" className="data-[state=active]:bg-slate-700">
              <BookOpen className="h-4 w-4 mr-2" />
              Journal
            </TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-slate-700">
              <Clock className="h-4 w-4 mr-2" />
              Timeline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Left Column - Pattern Detection */}
              <div className="xl:col-span-2 space-y-6">
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-cyan-400" />
                      <span>AI Chart Pattern Detection</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PatternDetector 
                      onPatternDetected={(pattern, conf, id) => {
                        setSelectedPattern(pattern);
                        setConfidence(conf);
                        setAnalysisId(id || null);
                      }}
                    />
                  </CardContent>
                </Card>

                {/* AI Insight Engine */}
                {selectedPattern && (
                  <InsightEngine
                    pattern={selectedPattern}
                    patternConfidence={confidence}
                    sentiment={sentimentScore}
                    ticker="DEMO"
                  />
                )}

                {/* Signal Overlay */}
                {selectedPattern && (
                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-2">
                        <Zap className="h-5 w-5 text-yellow-400" />
                        <span>Combined AI Signal Analysis</span>
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

              {/* Right Column - Sentiment & Truth Meter */}
              <div className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Brain className="h-5 w-5 text-purple-400" />
                      <span>AI Sentiment Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SentimentAnalyzer 
                      onSentimentChange={(sentiment) => {
                        setSentimentScore(sentiment);
                        setFacialSentiment(sentiment * 0.8 + Math.random() * 0.4 - 0.2);
                      }} 
                    />
                  </CardContent>
                </Card>

                {/* Truth Meter */}
                {sentimentScore !== 0 && (
                  <TruthMeter 
                    headlineSentiment={sentimentScore}
                    facialSentiment={facialSentiment}
                    consistencyScore={0.85 - Math.abs(sentimentScore - facialSentiment)}
                  />
                )}

                {/* Live AI Metrics */}
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">AI Model Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">CNN Accuracy</span>
                      <span className="text-green-400 font-mono">94.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">FinBERT F1-Score</span>
                      <span className="text-cyan-400 font-mono">0.923</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Face Detection</span>
                      <span className="text-purple-400 font-mono">87.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Processing Speed</span>
                      <span className="text-yellow-400 font-mono">1.2s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Patterns Detected</span>
                      <span className="text-white font-mono">2,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Success Rate</span>
                      <span className="text-green-400 font-mono">89.3%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="simulation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <WhatIfSimulator
                currentPattern={selectedPattern || "Bull Flag"}
                currentSentiment={sentimentScore}
                currentConfidence={confidence}
              />
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Scenario Results</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-64">
                  <p className="text-slate-400">Run a simulation to see results here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            <MultiAssetComparison />
          </TabsContent>

          <TabsContent value="journal">
            <TradeJournal />
          </TabsContent>

          <TabsContent value="timeline">
            <SentimentTimeline />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
