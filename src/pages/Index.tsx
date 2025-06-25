
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Brain, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DragDropUpload from "@/components/DragDropUpload";
import PatternDetector from "@/components/PatternDetector";
import SentimentAnalyzer from "@/components/SentimentAnalyzer";
import TruthMeter from "@/components/TruthMeter";
import EmotionAnalysisPage from "@/components/emotion/EmotionAnalysisPage";
import UserMenu from "@/components/UserMenu";
import { SentimentData } from "@/types";

const Index = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [sentimentData, setSentimentData] = useState<SentimentData>({
    score: 0,
    label: "neutral",
    confidence: 0,
    newsCount: 0,
    lastUpdate: new Date().toISOString(),
    facialSentiment: 0,
    truthScore: 0.5
  });

  const handleFileProcessed = (data: any) => {
    console.log("File processed:", data);
  };

  const handleSentimentChange = (sentiment: number) => {
    setSentimentData(prev => ({
      ...prev,
      score: sentiment,
      lastUpdate: new Date().toISOString()
    }));
  };

  const handlePatternDetected = (pattern: any) => {
    console.log("Pattern detected:", pattern);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Senti<span className="text-cyan-400">vision</span>
            </h1>
            <p className="text-xl text-slate-300 mb-6">
              AI-Powered Chart Pattern Recognition + Sentiment Analysis
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Badge variant="outline" className="text-cyan-400 border-cyan-500">
                CNN Pattern Detection
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-500">
                NLP Sentiment Analysis
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-500">
                Truth Meter
              </Badge>
              <Badge variant="outline" className="text-yellow-400 border-yellow-500">
                Emotion AI
              </Badge>
            </div>
          </div>
          
          {/* User Menu */}
          <div className="absolute top-6 right-6">
            <UserMenu />
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Market Analysis</span>
              <span className="sm:hidden">Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="sentiment" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Sentiment</span>
              <span className="sm:hidden">Sentiment</span>
            </TabsTrigger>
            <TabsTrigger value="truth" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Truth Meter</span>
              <span className="sm:hidden">Truth</span>
            </TabsTrigger>
            <TabsTrigger value="emotion" className="flex items-center space-x-2">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Emotion AI</span>
              <span className="sm:hidden">Emotion</span>
            </TabsTrigger>
          </TabsList>

          {/* Market Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-cyan-400" />
                    <span>Chart Upload & Pattern Detection</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DragDropUpload 
                    onFileUpload={setUploadedFile} 
                    onFileProcessed={handleFileProcessed}
                  />
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-green-400" />
                    <span>AI Pattern Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PatternDetector onPatternDetected={handlePatternDetected} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sentiment Analysis Tab */}
          <TabsContent value="sentiment" className="space-y-6">
            <SentimentAnalyzer onSentimentChange={handleSentimentChange} />
          </TabsContent>

          {/* Truth Meter Tab */}
          <TabsContent value="truth" className="space-y-6">
            <TruthMeter 
              headlineSentiment={sentimentData.score}
              facialSentiment={sentimentData.facialSentiment}
              consistencyScore={sentimentData.truthScore}
            />
          </TabsContent>

          {/* Emotion AI Tab */}
          <TabsContent value="emotion" className="space-y-6">
            <EmotionAnalysisPage />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
