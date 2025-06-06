
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Layers, Target } from "lucide-react";

interface GradCAMOverlayProps {
  chartImage: string;
  detectedPattern: string;
  confidence: number;
}

const GradCAMOverlay = ({ chartImage, detectedPattern, confidence }: GradCAMOverlayProps) => {
  const [showGradCAM, setShowGradCAM] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Simulate Grad-CAM heatmap generation
  const generateGradCAM = async () => {
    setIsGenerating(true);
    // In production, this would call your ML model's Grad-CAM function
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    setShowGradCAM(true);
  };

  return (
    <Card className="bg-slate-800/50 border-slate-600">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-cyan-400" />
            <span>Model Explanation (Grad-CAM)</span>
          </div>
          <Badge variant="outline" className="border-cyan-500 text-cyan-400">
            Confidence: {confidence}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <img 
            src={chartImage} 
            alt="Chart analysis" 
            className="w-full rounded-lg border border-slate-600"
          />
          
          {showGradCAM && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Simulated heatmap overlay - in production this would be actual Grad-CAM output */}
              <div className="relative w-full h-full">
                {/* Head formation area (if Head & Shoulders pattern) */}
                {detectedPattern.includes("Head") && (
                  <div 
                    className="absolute bg-red-500/40 rounded-full"
                    style={{
                      top: "20%",
                      left: "45%",
                      width: "10%",
                      height: "15%",
                    }}
                  />
                )}
                
                {/* Support/Resistance areas */}
                <div 
                  className="absolute bg-yellow-500/30 rounded"
                  style={{
                    bottom: "30%",
                    left: "20%",
                    width: "60%",
                    height: "3%",
                  }}
                />
                
                {/* Pattern-specific focus areas */}
                {detectedPattern.includes("Triangle") && (
                  <>
                    <div 
                      className="absolute bg-cyan-500/30 rounded"
                      style={{
                        top: "25%",
                        left: "30%",
                        width: "40%",
                        height: "2%",
                        transform: "rotate(-5deg)"
                      }}
                    />
                    <div 
                      className="absolute bg-purple-500/30 rounded"
                      style={{
                        bottom: "25%",
                        left: "30%",
                        width: "40%",
                        height: "2%",
                        transform: "rotate(5deg)"
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-400">
            Grad-CAM shows which chart regions influenced the <span className="text-cyan-400">{detectedPattern}</span> prediction
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={generateGradCAM}
              disabled={isGenerating || showGradCAM}
              className="border-slate-600 text-slate-300"
            >
              {isGenerating ? (
                <>
                  <Layers className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Target className="h-4 w-4 mr-2" />
                  Generate Heatmap
                </>
              )}
            </Button>
            
            {showGradCAM && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowGradCAM(!showGradCAM)}
                className="border-slate-600 text-slate-300"
              >
                {showGradCAM ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide Overlay
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Show Overlay
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {showGradCAM && (
          <div className="bg-slate-700/50 rounded-lg p-3 text-sm">
            <div className="text-white font-medium mb-2">Grad-CAM Analysis:</div>
            <div className="space-y-1 text-slate-300">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500/60 rounded-full"></div>
                <span>High activation regions (key pattern features)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500/60 rounded-full"></div>
                <span>Support/resistance levels</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyan-500/60 rounded-full"></div>
                <span>Trend lines and formations</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GradCAMOverlay;
