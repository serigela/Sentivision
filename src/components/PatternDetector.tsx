
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Image, Zap, CheckCircle, Brain, Eye } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PatternDetectorProps {
  onPatternDetected: (pattern: string, confidence: number, analysisId?: string) => void;
}

const PatternDetector = ({ onPatternDetected }: PatternDetectorProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [detectedPattern, setDetectedPattern] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const patterns = [
    "Head and Shoulders",
    "Double Bottom",
    "Ascending Triangle", 
    "Bull Flag",
    "Cup and Handle",
    "Falling Wedge",
    "Bearish Divergence",
    "Bullish Pennant"
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        toast.success("Chart uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePattern = async () => {
    if (!uploadedImage) {
      toast.error("Please upload a chart first!");
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate CNN analysis with more realistic patterns
      const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
      const randomConfidence = Math.floor(Math.random() * 25) + 75; // 75-99%
      
      // Store analysis in Supabase
      const { data, error } = await supabase
        .from('chart_analyses')
        .insert({
          ticker_symbol: 'DEMO',
          detected_pattern: randomPattern,
          pattern_confidence: randomConfidence / 100,
          sentiment_score: 0,
          sentiment_label: 'pending',
          trading_insight: 'Analysis in progress...',
          image_url: uploadedImage
        })
        .select()
        .single();

      if (error) throw error;

      setDetectedPattern(randomPattern);
      setConfidence(randomConfidence);
      setAnalysisId(data.id);
      onPatternDetected(randomPattern, randomConfidence, data.id);
      
      toast.success(`Pattern detected: ${randomPattern} (${randomConfidence}% confidence)`);
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div 
        className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer group"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        {uploadedImage ? (
          <div className="space-y-4">
            <img 
              src={uploadedImage} 
              alt="Uploaded chart" 
              className="max-h-64 mx-auto rounded-lg border border-slate-600 shadow-lg"
            />
            <p className="text-green-400 flex items-center justify-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Chart ready for AI analysis</span>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="h-12 w-12 text-slate-400 mx-auto group-hover:text-cyan-400 transition-colors" />
            <div>
              <p className="text-white font-medium">Upload Candlestick Chart</p>
              <p className="text-slate-400 text-sm">Drag and drop or click to browse</p>
              <p className="text-slate-500 text-xs mt-2">Supports PNG, JPG, WebP • Best: 800x600px+</p>
            </div>
          </div>
        )}
      </div>

      {/* Analysis Button */}
      <Button 
        onClick={analyzePattern}
        disabled={!uploadedImage || isAnalyzing}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
        size="lg"
      >
        {isAnalyzing ? (
          <>
            <Brain className="h-4 w-4 mr-2 animate-pulse" />
            AI Analyzing Pattern...
          </>
        ) : (
          <>
            <Eye className="h-4 w-4 mr-2" />
            Detect Chart Pattern
          </>
        )}
      </Button>

      {/* Results */}
      {detectedPattern && (
        <Card className="bg-slate-700/50 border-slate-600 p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">AI Detected Pattern:</span>
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500">
                {detectedPattern}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">CNN Confidence:</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${confidence}%` }}
                  />
                </div>
                <span className="text-white font-mono text-sm">{confidence}%</span>
              </div>
            </div>
            {analysisId && (
              <div className="text-xs text-slate-500">
                Analysis ID: {analysisId.slice(0, 8)}...
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default PatternDetector;
