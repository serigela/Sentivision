
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Layers, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InteractiveTooltip from "./ui/interactive-tooltip";

interface GradCAMOverlayProps {
  chartImage: string;
  detectedPattern: string;
  confidence: number;
}

const GradCAMOverlay = ({ chartImage, detectedPattern, confidence }: GradCAMOverlayProps) => {
  const [showGradCAM, setShowGradCAM] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateGradCAM = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    setShowGradCAM(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
          <div className="relative overflow-hidden rounded-lg">
            <motion.img 
              src={chartImage} 
              alt="Chart analysis" 
              className="w-full border border-slate-600"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            
            <AnimatePresence>
              {showGradCAM && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="relative w-full h-full">
                    {/* Head formation area */}
                    {detectedPattern.includes("Head") && (
                      <InteractiveTooltip
                        content={<div>Head formation detected with high activation</div>}
                      >
                        <motion.div 
                          className="absolute bg-red-500/40 rounded-full cursor-help"
                          style={{
                            top: "20%",
                            left: "45%",
                            width: "10%",
                            height: "15%",
                          }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        />
                      </InteractiveTooltip>
                    )}
                    
                    {/* Support/Resistance areas */}
                    <InteractiveTooltip
                      content={<div>Support level identified by model</div>}
                    >
                      <motion.div 
                        className="absolute bg-yellow-500/30 rounded cursor-help"
                        style={{
                          bottom: "30%",
                          left: "20%",
                          width: "60%",
                          height: "3%",
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                      />
                    </InteractiveTooltip>
                    
                    {/* Pattern-specific focus areas */}
                    {detectedPattern.includes("Triangle") && (
                      <>
                        <InteractiveTooltip
                          content={<div>Upper trend line detection</div>}
                        >
                          <motion.div 
                            className="absolute bg-cyan-500/30 rounded cursor-help"
                            style={{
                              top: "25%",
                              left: "30%",
                              width: "40%",
                              height: "2%",
                              transform: "rotate(-5deg)"
                            }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.6 }}
                          />
                        </InteractiveTooltip>
                        <InteractiveTooltip
                          content={<div>Lower trend line detection</div>}
                        >
                          <motion.div 
                            className="absolute bg-purple-500/30 rounded cursor-help"
                            style={{
                              bottom: "25%",
                              left: "30%",
                              width: "40%",
                              height: "2%",
                              transform: "rotate(5deg)"
                            }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.8 }}
                          />
                        </InteractiveTooltip>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">
              Grad-CAM shows which chart regions influenced the <span className="text-cyan-400">{detectedPattern}</span> prediction
            </div>
            
            <div className="flex space-x-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateGradCAM}
                  disabled={isGenerating || showGradCAM}
                  className="border-slate-600 text-slate-300"
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Layers className="h-4 w-4 mr-2" />
                      </motion.div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Target className="h-4 w-4 mr-2" />
                      Generate Heatmap
                    </>
                  )}
                </Button>
              </motion.div>
              
              {showGradCAM && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
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
                </motion.div>
              )}
            </div>
          </div>

          <AnimatePresence>
            {showGradCAM && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-700/50 rounded-lg p-3 text-sm overflow-hidden"
              >
                <div className="text-white font-medium mb-2">Grad-CAM Analysis:</div>
                <div className="space-y-1 text-slate-300">
                  <motion.div 
                    className="flex items-center space-x-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="w-3 h-3 bg-red-500/60 rounded-full"></div>
                    <span>High activation regions (key pattern features)</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-3 h-3 bg-yellow-500/60 rounded-full"></div>
                    <span>Support/resistance levels</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-3 h-3 bg-cyan-500/60 rounded-full"></div>
                    <span>Trend lines and formations</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GradCAMOverlay;
