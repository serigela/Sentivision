
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { PlayCircle, RotateCcw, Lightbulb, TrendingUp, TrendingDown } from "lucide-react";

interface WhatIfSimulatorProps {
  currentPattern: string;
  currentSentiment: number;
  currentConfidence: number;
}

const WhatIfSimulator = ({ currentPattern, currentSentiment, currentConfidence }: WhatIfSimulatorProps) => {
  const [selectedPattern, setSelectedPattern] = useState(currentPattern);
  const [sentimentOverride, setSentimentOverride] = useState([currentSentiment]);
  const [customHeadline, setCustomHeadline] = useState("");
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const patterns = [
    "Head and Shoulders", "Double Bottom", "Bull Flag", "Bear Flag",
    "Ascending Triangle", "Descending Triangle", "Cup and Handle",
    "Falling Wedge", "Rising Wedge", "Pennant"
  ];

  const runSimulation = () => {
    const sentiment = sentimentOverride[0];
    const bullishPatterns = ["Bull Flag", "Cup and Handle", "Ascending Triangle", "Double Bottom"];
    const isBullishPattern = bullishPatterns.includes(selectedPattern);
    
    let prediction = "HOLD";
    let confidence = 75;
    let priceTarget = 0;
    
    if (isBullishPattern && sentiment > 0.3) {
      prediction = "BUY";
      confidence = 88;
      priceTarget = 12.5;
    } else if (!isBullishPattern && sentiment < -0.3) {
      prediction = "SELL";
      confidence = 85;
      priceTarget = -8.2;
    } else if (Math.abs(sentiment) > 0.5) {
      prediction = "WATCH";
      confidence = 70;
      priceTarget = sentiment > 0 ? 5.1 : -3.7;
    }

    setSimulationResult({
      prediction,
      confidence,
      priceTarget,
      reasoning: generateReasoning(selectedPattern, sentiment),
      riskLevel: confidence > 80 ? "Low" : confidence > 65 ? "Medium" : "High"
    });
  };

  const generateReasoning = (pattern: string, sentiment: number) => {
    if (sentiment > 0.5) return `Strong positive sentiment amplifies ${pattern} bullish signals`;
    if (sentiment < -0.5) return `Negative sentiment weakens ${pattern} reliability`;
    return `Neutral sentiment provides balanced confirmation for ${pattern}`;
  };

  const resetSimulation = () => {
    setSelectedPattern(currentPattern);
    setSentimentOverride([currentSentiment]);
    setCustomHeadline("");
    setSimulationResult(null);
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-yellow-400" />
          <span>What-If Simulator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pattern Selection */}
        <div className="space-y-2">
          <label className="text-slate-400 text-sm">Test Different Pattern:</label>
          <select 
            value={selectedPattern}
            onChange={(e) => setSelectedPattern(e.target.value)}
            className="w-full bg-slate-700 border-slate-600 text-white rounded-md p-2"
          >
            {patterns.map(pattern => (
              <option key={pattern} value={pattern}>{pattern}</option>
            ))}
          </select>
        </div>

        {/* Sentiment Override */}
        <div className="space-y-3">
          <label className="text-slate-400 text-sm">Adjust Sentiment Score:</label>
          <div className="px-2">
            <Slider
              value={sentimentOverride}
              onValueChange={setSentimentOverride}
              min={-1}
              max={1}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Very Bearish (-1.0)</span>
              <span className="text-slate-300 font-mono">{sentimentOverride[0].toFixed(1)}</span>
              <span>Very Bullish (+1.0)</span>
            </div>
          </div>
        </div>

        {/* Custom Headline */}
        <div className="space-y-2">
          <label className="text-slate-400 text-sm">Test Custom Headline:</label>
          <Textarea
            value={customHeadline}
            onChange={(e) => setCustomHeadline(e.target.value)}
            placeholder="Enter a custom news headline to test sentiment impact..."
            className="bg-slate-700 border-slate-600 text-white"
            rows={2}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button 
            onClick={runSimulation}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
          >
            <PlayCircle className="h-4 w-4 mr-2" />
            Run Simulation
          </Button>
          <Button 
            onClick={resetSimulation}
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Simulation Results */}
        {simulationResult && (
          <div className="mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <h4 className="text-white font-medium mb-3 flex items-center">
              {simulationResult.priceTarget > 0 ? (
                <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-2 text-red-400" />
              )}
              Simulation Result
            </h4>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <span className="text-slate-400 text-sm">Prediction:</span>
                <Badge className={`ml-2 ${
                  simulationResult.prediction === 'BUY' ? 'bg-green-500/20 text-green-400 border-green-500' :
                  simulationResult.prediction === 'SELL' ? 'bg-red-500/20 text-red-400 border-red-500' :
                  'bg-yellow-500/20 text-yellow-400 border-yellow-500'
                }`}>
                  {simulationResult.prediction}
                </Badge>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Confidence:</span>
                <span className="text-white ml-2 font-mono">{simulationResult.confidence}%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <span className="text-slate-400 text-sm">Price Target:</span>
                <span className={`ml-2 font-mono ${simulationResult.priceTarget > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {simulationResult.priceTarget > 0 ? '+' : ''}{simulationResult.priceTarget}%
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Risk:</span>
                <span className={`ml-2 ${
                  simulationResult.riskLevel === 'Low' ? 'text-green-400' :
                  simulationResult.riskLevel === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {simulationResult.riskLevel}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm italic">{simulationResult.reasoning}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WhatIfSimulator;
