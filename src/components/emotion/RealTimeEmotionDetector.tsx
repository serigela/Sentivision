
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, VideoOff, Camera, Square } from 'lucide-react';
import { toast } from 'sonner';

interface EmotionData {
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

interface RealTimeEmotionDetectorProps {
  onEmotionDetected: (emotion: EmotionData) => void;
  isRecording: boolean;
  onRecordingChange: (recording: boolean) => void;
}

const RealTimeEmotionDetector = ({ 
  onEmotionDetected, 
  isRecording, 
  onRecordingChange 
}: RealTimeEmotionDetectorProps) => {
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock emotion detection (replace with actual AI model)
  const detectEmotion = useCallback(() => {
    if (!isStreamActive || !isRecording) return;

    // Simulate emotion detection with random values
    const emotions = {
      happy: Math.random() * 0.8,
      sad: Math.random() * 0.3,
      angry: Math.random() * 0.2,
      surprised: Math.random() * 0.4,
      neutral: Math.random() * 0.6,
      fear: Math.random() * 0.1,
      disgust: Math.random() * 0.1
    };

    const emotionData: EmotionData = {
      timestamp: Date.now(),
      emotions,
      confidence: 0.85 + Math.random() * 0.15
    };

    setCurrentEmotion(emotionData);
    onEmotionDetected(emotionData);
  }, [isStreamActive, isRecording, onEmotionDetected]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreamActive(true);
        toast.success('Camera started successfully');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Failed to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreamActive(false);
    onRecordingChange(false);
    toast.info('Camera stopped');
  };

  const toggleRecording = () => {
    if (!isStreamActive) {
      toast.error('Please start camera first');
      return;
    }
    onRecordingChange(!isRecording);
  };

  useEffect(() => {
    if (isRecording && isStreamActive) {
      intervalRef.current = setInterval(detectEmotion, 500); // Analyze every 500ms
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording, isStreamActive, detectEmotion]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const getDominantEmotion = (emotions: EmotionData['emotions']) => {
    return Object.entries(emotions).reduce((max, [emotion, value]) => 
      value > max.value ? { emotion, value } : max, 
      { emotion: 'neutral', value: 0 }
    );
  };

  const getEmotionColor = (emotion: string) => {
    const colors: Record<string, string> = {
      happy: 'text-green-400 border-green-500',
      sad: 'text-blue-400 border-blue-500',
      angry: 'text-red-400 border-red-500',
      surprised: 'text-yellow-400 border-yellow-500',
      neutral: 'text-gray-400 border-gray-500',
      fear: 'text-purple-400 border-purple-500',
      disgust: 'text-orange-400 border-orange-500'
    };
    return colors[emotion] || 'text-gray-400 border-gray-500';
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Camera className="h-5 w-5 text-cyan-400" />
          <span>Real-Time Emotion Detection</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Video Stream */}
        <div className="relative bg-slate-900 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-64 object-cover"
            style={{ transform: 'scaleX(-1)' }} // Mirror effect
          />
          
          {/* Emotion Overlay */}
          {currentEmotion && isRecording && (
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Badge 
                  variant="outline" 
                  className={getEmotionColor(getDominantEmotion(currentEmotion.emotions).emotion)}
                >
                  {getDominantEmotion(currentEmotion.emotions).emotion.toUpperCase()}
                </Badge>
                <span className="text-white text-xs">
                  {(currentEmotion.confidence * 100).toFixed(0)}%
                </span>
              </div>
              <div className="space-y-1">
                {Object.entries(currentEmotion.emotions)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 3)
                  .map(([emotion, value]) => (
                    <div key={emotion} className="flex justify-between text-xs">
                      <span className="text-slate-300 capitalize">{emotion}:</span>
                      <span className="text-cyan-400">{(value * 100).toFixed(0)}%</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Recording Indicator */}
          {isRecording && (
            <div className="absolute top-4 right-4 flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 text-xs font-medium">RECORDING</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          <Button
            onClick={isStreamActive ? stopCamera : startCamera}
            variant={isStreamActive ? "destructive" : "default"}
            size="sm"
            className={isStreamActive ? "" : "bg-cyan-500 hover:bg-cyan-600"}
          >
            {isStreamActive ? (
              <>
                <VideoOff className="h-4 w-4 mr-2" />
                Stop Camera
              </>
            ) : (
              <>
                <Video className="h-4 w-4 mr-2" />
                Start Camera
              </>
            )}
          </Button>

          <Button
            onClick={toggleRecording}
            disabled={!isStreamActive}
            variant={isRecording ? "destructive" : "default"}
            size="sm"
            className={!isRecording && isStreamActive ? "bg-red-500 hover:bg-red-600" : ""}
          >
            {isRecording ? (
              <>
                <Square className="h-4 w-4 mr-2" />
                Stop Recording
              </>
            ) : (
              <>
                <Video className="h-4 w-4 mr-2" />
                Start Recording
              </>
            )}
          </Button>
        </div>

        {/* Current Emotion Summary */}
        {currentEmotion && (
          <div className="bg-slate-700/30 rounded-lg p-3">
            <h4 className="text-white text-sm font-medium mb-2">Current Analysis</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(currentEmotion.emotions).map(([emotion, value]) => (
                <div key={emotion} className="flex justify-between text-xs">
                  <span className="text-slate-300 capitalize">{emotion}:</span>
                  <span className="text-cyan-400">{(value * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeEmotionDetector;
