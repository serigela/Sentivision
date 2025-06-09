
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, Download, Eye, Trash2, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface EmotionSession {
  id: string;
  timestamp: number;
  duration: number; // in seconds
  dominantEmotion: string;
  averageConfidence: number;
  emotionData: Array<{
    timestamp: number;
    emotions: Record<string, number>;
    confidence: number;
  }>;
  insights: {
    peaks: Array<{ emotion: string; value: number; timestamp: number }>;
    avgEmotions: Record<string, number>;
  };
}

interface SessionHistoryProps {
  onSessionSelect: (session: EmotionSession) => void;
}

const SessionHistory = ({ onSessionSelect }: SessionHistoryProps) => {
  const [sessions, setSessions] = useState<EmotionSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  // Load sessions from localStorage on component mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('emotion-sessions');
    if (savedSessions) {
      try {
        setSessions(JSON.parse(savedSessions));
      } catch (error) {
        console.error('Error loading sessions:', error);
      }
    }
  }, []);

  // Save sessions to localStorage whenever sessions change
  useEffect(() => {
    localStorage.setItem('emotion-sessions', JSON.stringify(sessions));
  }, [sessions]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toFixed(0).padStart(2, '0')}`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  const deleteSession = (sessionId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (selectedSession === sessionId) {
      setSelectedSession(null);
    }
    toast.success('Session deleted');
  };

  const exportSession = (session: EmotionSession, event: React.MouseEvent) => {
    event.stopPropagation();
    
    // Create CSV content
    const headers = ['Timestamp', 'Happy', 'Sad', 'Angry', 'Surprised', 'Neutral', 'Fear', 'Disgust', 'Confidence'];
    const csvContent = [
      headers.join(','),
      ...session.emotionData.map(point => [
        new Date(point.timestamp).toISOString(),
        ...Object.values(point.emotions).map(v => (v * 100).toFixed(2)),
        (point.confidence * 100).toFixed(2)
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emotion-session-${formatDate(session.timestamp).replace(/[,\s:]/g, '-')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success('Session exported as CSV');
  };

  const viewSession = (session: EmotionSession) => {
    setSelectedSession(session.id);
    onSessionSelect(session);
    toast.info(`Viewing session from ${formatDate(session.timestamp)}`);
  };

  // Add a function to save new sessions (to be called from parent component)
  const saveSession = (sessionData: Omit<EmotionSession, 'id'>) => {
    const newSession: EmotionSession = {
      ...sessionData,
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setSessions(prev => [newSession, ...prev]);
    return newSession;
  };

  // Expose saveSession through a ref or callback
  React.useImperativeHandle(React.forwardRef(() => null), () => ({
    saveSession
  }));

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <History className="h-5 w-5 text-cyan-400" />
          <span>Session History</span>
          {sessions.length > 0 && (
            <Badge variant="outline" className="text-cyan-400 border-cyan-500">
              {sessions.length} sessions
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-slate-400">
            <div className="text-center">
              <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No sessions recorded yet</p>
              <p className="text-xs">Start recording to build your emotion history</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedSession === session.id
                    ? 'bg-cyan-500/10 border-cyan-500'
                    : 'bg-slate-700/30 border-slate-600 hover:bg-slate-700/50'
                }`}
                onClick={() => viewSession(session)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="text-white text-sm font-medium">
                      {formatDate(session.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => exportSession(session, e)}
                      className="h-6 w-6 p-0 text-slate-400 hover:text-cyan-400"
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => deleteSession(session.id, e)}
                      className="h-6 w-6 p-0 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration:</span>
                    <span className="text-white">{formatDuration(session.duration)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Confidence:</span>
                    <span className="text-white">{(session.averageConfidence * 100).toFixed(0)}%</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getEmotionColor(session.dominantEmotion)}`}
                  >
                    {session.dominantEmotion.toUpperCase()}
                  </Badge>
                  <span className="text-slate-400 text-xs">
                    {session.emotionData.length} data points
                  </span>
                </div>

                {/* Mini emotion breakdown */}
                <div className="mt-2 grid grid-cols-4 gap-1">
                  {Object.entries(session.insights.avgEmotions)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 4)
                    .map(([emotion, value]) => (
                      <div key={emotion} className="text-xs">
                        <span className="text-slate-400 capitalize">{emotion.slice(0, 3)}:</span>
                        <span className="text-cyan-400 ml-1">{(value * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SessionHistory;

// Export the saveSession function for parent components
export const useSessionHistory = () => {
  const saveSession = (sessionData: Omit<EmotionSession, 'id'>) => {
    const sessions = JSON.parse(localStorage.getItem('emotion-sessions') || '[]');
    const newSession: EmotionSession = {
      ...sessionData,
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    const updatedSessions = [newSession, ...sessions];
    localStorage.setItem('emotion-sessions', JSON.stringify(updatedSessions));
    return newSession;
  };

  return { saveSession };
};
