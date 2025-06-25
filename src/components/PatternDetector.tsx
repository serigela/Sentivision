
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Brain, Upload, BarChart3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PatternDetectorProps {
  onPatternDetected: (pattern: any) => void;
}

const PatternDetector: React.FC<PatternDetectorProps> = ({ onPatternDetected }) => {
  const [tickerSymbol, setTickerSymbol] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedPattern, setDetectedPattern] = useState<any>(null);

  const patterns = [
    'Head & Shoulders',
    'Double Top',
    'Double Bottom',
    'Triangle',
    'Cup & Handle',
    'Flag',
    'Pennant'
  ];

  const analyzePattern = async () => {
    if (!tickerSymbol) return;

    setIsAnalyzing(true);
    
    // Simulate pattern detection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    const confidence = Math.random() * 0.4 + 0.6; // 60-100%
    const sentiment = Math.random() * 2 - 1; // -1 to 1
    
    const result = {
      ticker_symbol: tickerSymbol.toUpperCase(),
      detected_pattern: randomPattern,
      pattern_confidence: confidence,
      sentiment_score: sentiment,
      sentiment_label: sentiment > 0.1 ? 'bullish' : sentiment < -0.1 ? 'bearish' : 'neutral',
      trading_insight: `${randomPattern} pattern detected with ${(confidence * 100).toFixed(1)}% confidence. Market sentiment appears ${sentiment > 0.1 ? 'bullish' : sentiment < -0.1 ? 'bearish' : 'neutral'}.`,
      image_url: 'placeholder-chart.jpg'
    };

    try {
      // Try to save to database, but don't fail if it doesn't work
      const { data, error } = await supabase
        .from('chart_analyses')
        .insert([result])
        .select();
      
      if (!error && data && data.length > 0) {
        console.log('Analysis saved to database:', data[0]);
        setDetectedPattern(data[0]);
        onPatternDetected(data[0]);
      } else {
        console.log('Database save failed, using local result:', error);
        setDetectedPattern(result);
        onPatternDetected(result);
      }
    } catch (err) {
      console.log('Database error, using local result:', err);
      setDetectedPattern(result);
      onPatternDetected(result);
    }
    
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Brain className="h-5 w-5 text-cyan-400" />
            <span>Pattern Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="ticker" className="text-slate-300">Ticker Symbol</Label>
            <Input
              id="ticker"
              value={tickerSymbol}
              onChange={(e) => setTickerSymbol(e.target.value)}
              placeholder="Enter ticker symbol (e.g., AAPL)"
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>
          
          <Button
            onClick={analyzePattern}
            disabled={!tickerSymbol || isAnalyzing}
            className="w-full bg-cyan-600 hover:bg-cyan-700"
          >
            {isAnalyzing ? (
              <>
                <Brain className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Pattern...
              </>
            ) : (
              <>
                <BarChart3 className="h-4 w-4 mr-2" />
                Detect Pattern
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {detectedPattern && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Analysis Results</span>
              <Badge 
                variant="outline" 
                className={
                  detectedPattern.sentiment_label === 'bullish' ? 'text-green-400 border-green-500' :
                  detectedPattern.sentiment_label === 'bearish' ? 'text-red-400 border-red-500' :
                  'text-yellow-400 border-yellow-500'
                }
              >
                {detectedPattern.sentiment_label}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-slate-400 text-sm">Pattern</p>
                <p className="text-white font-medium">{detectedPattern.detected_pattern}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Confidence</p>
                <p className="text-white font-medium">{(detectedPattern.pattern_confidence * 100).toFixed(1)}%</p>
              </div>
            </div>
            
            <div>
              <p className="text-slate-400 text-sm">Trading Insight</p>
              <p className="text-slate-300 text-sm mt-1">{detectedPattern.trading_insight}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatternDetector;
