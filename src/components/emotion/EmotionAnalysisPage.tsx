
import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Brain, Camera, BarChart3, History, Download } from 'lucide-react';
import RealTimeEmotionDetector from './RealTimeEmotionDetector';
import EmotionTimeline from './EmotionTimeline';
import SessionHistory, { useSessionHistory } from './SessionHistory';
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

interface EmotionSession {
  id: string;
  timestamp: number;
  duration: number;
  dominantEmotion: string;
  averageConfidence: number;
  emotionData: EmotionData[];
  insights: {
    peaks: Array<{ emotion: string; value: number; timestamp: number }>;
    avgEmotions: Record<string, number>;
  };
}

const EmotionAnalysisPage = () => {
  const [currentSessionData, setCurrentSessionData] = useState<EmotionData[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [selectedHistorySession, setSelectedHistorySession] = useState<EmotionSession | null>(null);
  const { saveSession } = useSessionHistory();

  const handleEmotionDetected = useCallback((emotion: EmotionData) => {
    setCurrentSessionData(prev => [...prev, emotion]);
  }, []);

  const handleRecordingChange = useCallback((recording: boolean) => {
    setIsRecording(recording);
    
    if (recording) {
      // Start new session
      setSessionStartTime(Date.now());
      setCurrentSessionData([]);
      setSelectedHistorySession(null);
      toast.info('Started new emotion recording session');
    } else if (sessionStartTime && currentSessionData.length > 0) {
      // End session and save
      const duration = (Date.now() - sessionStartTime) / 1000;
      
      // Calculate insights
      const avgEmotions = Object.keys(currentSessionData[0].emotions).reduce((acc, emotion) => {
        acc[emotion] = currentSessionData.reduce((sum, point) => 
          sum + point.emotions[emotion as keyof typeof point.emotions], 0
        ) / currentSessionData.length;
        return acc;
      }, {} as Record<string, number>);

      const dominantEmotion = Object.entries(avgEmotions).reduce((max, [emotion, value]) => 
        value > max.value ? { emotion, value } : max, 
        { emotion: 'neutral', value: 0 }
      ).emotion;

      const averageConfidence = currentSessionData.reduce((sum, point) => sum + point.confidence, 0) / currentSessionData.length;

      const peaks = Object.keys(avgEmotions).map(emotion => {
        const maxPoint = currentSessionData.reduce((max, point, index) => {
          const value = point.emotions[emotion as keyof typeof point.emotions];
          return value > max.value ? { value, index, timestamp: point.timestamp } : max;
        }, { value: 0, index: 0, timestamp: 0 });

        return { emotion, ...maxPoint };
      }).filter(peak => peak.value > 0.3);

      const sessionData = {
        timestamp: sessionStartTime,
        duration,
        dominantEmotion,
        averageConfidence,
        emotionData: currentSessionData,
        insights: { peaks, avgEmotions }
      };

      saveSession(sessionData);
      toast.success(`Session saved! Duration: ${Math.floor(duration / 60)}:${(duration % 60).toFixed(0).padStart(2, '0')}`);
    }
  }, [sessionStartTime, currentSessionData, saveSession]);

  const handleSessionSelect = useCallback((session: EmotionSession) => {
    setSelectedHistorySession(session);
    setCurrentSessionData(session.emotionData);
    setSessionStartTime(session.timestamp);
    setIsRecording(false);
  }, []);

  const exportCurrentSession = () => {
    if (currentSessionData.length === 0) {
      toast.error('No data to export');
      return;
    }

    const headers = ['Timestamp', 'Happy', 'Sad', 'Angry', 'Surprised', 'Neutral', 'Fear', 'Disgust', 'Confidence'];
    const csvContent = [
      headers.join(','),
      ...currentSessionData.map(point => [
        new Date(point.timestamp).toISOString(),
        ...Object.values(point.emotions).map(v => (v * 100).toFixed(2)),
        (point.confidence * 100).toFixed(2)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emotion-analysis-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success('Data exported as CSV');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Real-Time Emotion Analysis</h1>
            <p className="text-sm text-slate-400">
              Advanced facial emotion detection with timeline analysis and session history
            </p>
          </div>
        </div>
        
        {currentSessionData.length > 0 && (
          <Button
            onClick={exportCurrentSession}
            variant="outline"
            size="sm"
            className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        )}
      </div>

      <Tabs defaultValue="live" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-slate-700">
          <TabsTrigger value="live" className="data-[state=active]:bg-slate-700">
            <Camera className="h-4 w-4 mr-2" />
            Live Detection
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-slate-700">
            <BarChart3 className="h-4 w-4 mr-2" />
            Timeline Analysis
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-slate-700">
            <History className="h-4 w-4 mr-2" />
            Session History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <RealTimeEmotionDetector
              onEmotionDetected={handleEmotionDetected}
              isRecording={isRecording}
              onRecordingChange={handleRecordingChange}
            />
            
            {/* Session Info */}
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <div className="space-y-4">
                <h3 className="text-white font-medium">Current Session</h3>
                
                {selectedHistorySession ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Viewing History:</span>
                      <span className="text-cyan-400">
                        {new Date(selectedHistorySession.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Duration:</span>
                      <span className="text-white">
                        {Math.floor(selectedHistorySession.duration / 60)}:
                        {(selectedHistorySession.duration % 60).toFixed(0).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Data Points:</span>
                      <span className="text-white">{selectedHistorySession.emotionData.length}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className={isRecording ? "text-red-400" : "text-slate-400"}>
                        {isRecording ? 'Recording' : 'Idle'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Data Points:</span>
                      <span className="text-white">{currentSessionData.length}</span>
                    </div>
                    {sessionStartTime && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Duration:</span>
                        <span className="text-white">
                          {Math.floor((Date.now() - sessionStartTime) / 60000)}:
                          {((Date.now() - sessionStartTime) % 60000 / 1000).toFixed(0).padStart(2, '0')}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {currentSessionData.length > 0 && (
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <h4 className="text-white text-sm font-medium mb-2">Latest Reading</h4>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {Object.entries(currentSessionData[currentSessionData.length - 1]?.emotions || {})
                        .sort(([,a], [,b]) => b - a)
                        .slice(0, 4)
                        .map(([emotion, value]) => (
                          <div key={emotion} className="flex justify-between">
                            <span className="text-slate-400 capitalize">{emotion}:</span>
                            <span className="text-cyan-400">{(value * 100).toFixed(0)}%</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <EmotionTimeline 
            data={currentSessionData} 
            startTime={sessionStartTime || undefined}
          />
        </TabsContent>

        <TabsContent value="history">
          <SessionHistory onSessionSelect={handleSessionSelect} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmotionAnalysisPage;
