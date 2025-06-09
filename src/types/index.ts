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

export interface EmotionData {
  timestamp: number;
  emotions: {
    happy: number;
    sad: number;
    angry: number;
    surprised: number;
    neutral: number;
    fear: number;
    disgust: number;
  };
  confidence: number;
}

export interface EmotionSession {
  id: string;
  timestamp: number;
  duration: number; // in seconds
  dominantEmotion: string;
  averageConfidence: number;
  emotionData: EmotionData[];
  insights: {
    peaks: Array<{ emotion: string; value: number; timestamp: number }>;
    avgEmotions: Record<string, number>;
  };
}

export interface EmotionAnalysisConfig {
  detectionInterval: number; // milliseconds
  confidenceThreshold: number;
  enableFacialLandmarks: boolean;
  enableHeatmaps: boolean;
}

export interface VideoProcessingStatus {
  stage: 'uploading' | 'processing' | 'analyzing' | 'complete' | 'error';
  progress: number;
  message: string;
  error?: string;
}
