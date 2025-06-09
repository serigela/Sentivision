
// Central type definitions for Sentivision

export interface ChartPattern {
  name: string;
  confidence: number;
  description: string;
  bullishness: 'bullish' | 'bearish' | 'neutral';
}

export interface SentimentData {
  score: number;
  label: string;
  confidence: number;
  newsCount: number;
  lastUpdate: string;
  facialSentiment: number;
  truthScore: number;
}

export interface NewsHeadline {
  headline: string;
  sentiment: number;
  confidence: number;
  time: string;
  hasVideo: boolean;
  source?: string;
}

export interface AnalysisMetadata {
  id: string;
  ticker: string;
  timestamp: Date;
  processingTime: number;
  modelVersion: string;
}

export interface UploadProgress {
  percentage: number;
  stage: 'uploading' | 'processing' | 'analyzing' | 'complete';
  message: string;
}

export interface PatternExplanation {
  pattern: string;
  description: string;
  implications: string;
  tradingStrategy: string;
  riskLevel: 'low' | 'medium' | 'high';
}
