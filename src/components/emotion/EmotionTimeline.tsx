
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp } from 'lucide-react';

interface EmotionTimelineData {
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

interface EmotionTimelineProps {
  data: EmotionTimelineData[];
  startTime?: number;
}

const EmotionTimeline = ({ data, startTime }: EmotionTimelineProps) => {
  // Transform data for chart
  const chartData = data.map((point, index) => ({
    time: startTime ? (point.timestamp - startTime) / 1000 : index * 0.5, // Convert to seconds
    ...point.emotions,
    confidence: point.confidence * 100
  }));

  const emotionColors = {
    happy: '#10B981',
    sad: '#3B82F6',
    angry: '#EF4444',
    surprised: '#F59E0B',
    neutral: '#6B7280',
    fear: '#8B5CF6',
    disgust: '#F97316'
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const timeFormatted = `${Math.floor(Number(label) / 60)}:${(Number(label) % 60).toFixed(0).padStart(2, '0')}`;
      
      return (
        <div className="bg-slate-800 border border-slate-600 p-3 rounded-lg shadow-lg">
          <p className="text-white font-medium mb-2">Time: {timeFormatted}</p>
          <div className="space-y-1">
            {payload
              .filter((entry: any) => entry.dataKey !== 'confidence')
              .sort((a: any, b: any) => b.value - a.value)
              .slice(0, 4)
              .map((entry: any) => (
                <p key={entry.dataKey} className="text-sm">
                  <span className="capitalize" style={{ color: entry.color }}>
                    {entry.dataKey}:
                  </span>
                  <span className="text-white ml-2">{(entry.value * 100).toFixed(0)}%</span>
                </p>
              ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const getEmotionInsights = () => {
    if (data.length === 0) return null;

    const avgEmotions = Object.keys(data[0].emotions).reduce((acc, emotion) => {
      acc[emotion] = data.reduce((sum, point) => sum + point.emotions[emotion as keyof typeof point.emotions], 0) / data.length;
      return acc;
    }, {} as Record<string, number>);

    const dominantEmotion = Object.entries(avgEmotions).reduce((max, [emotion, value]) => 
      value > max.value ? { emotion, value } : max, 
      { emotion: 'neutral', value: 0 }
    );

    const peaks = Object.keys(avgEmotions).map(emotion => {
      const maxPoint = data.reduce((max, point, index) => {
        const value = point.emotions[emotion as keyof typeof point.emotions];
        return value > max.value ? { value, index, timestamp: point.timestamp } : max;
      }, { value: 0, index: 0, timestamp: 0 });

      return { emotion, ...maxPoint };
    }).filter(peak => peak.value > 0.3); // Only show significant peaks

    return { dominantEmotion, peaks, avgEmotions };
  };

  const insights = getEmotionInsights();

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Clock className="h-5 w-5 text-cyan-400" />
          <span>Emotion Timeline Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length > 0 ? (
          <>
            {/* Timeline Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickFormatter={(value) => `${Math.floor(value / 60)}:${(value % 60).toFixed(0).padStart(2, '0')}`}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    fontSize={12}
                    domain={[0, 1]}
                    tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  
                  {Object.entries(emotionColors).map(([emotion, color]) => (
                    <Line
                      key={emotion}
                      type="monotone"
                      dataKey={emotion}
                      stroke={color}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: color }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Insights */}
            {insights && (
              <div className="space-y-4">
                <h4 className="text-white font-medium flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-cyan-400" />
                  <span>Analysis Insights</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Dominant Emotion */}
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <h5 className="text-slate-300 text-sm mb-2">Dominant Emotion</h5>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        style={{ 
                          color: emotionColors[insights.dominantEmotion.emotion as keyof typeof emotionColors],
                          borderColor: emotionColors[insights.dominantEmotion.emotion as keyof typeof emotionColors]
                        }}
                      >
                        {insights.dominantEmotion.emotion.toUpperCase()}
                      </Badge>
                      <span className="text-white text-sm">
                        {(insights.dominantEmotion.value * 100).toFixed(1)}% avg
                      </span>
                    </div>
                  </div>

                  {/* Emotion Peaks */}
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <h5 className="text-slate-300 text-sm mb-2">Significant Peaks</h5>
                    <div className="space-y-1 max-h-20 overflow-y-auto">
                      {insights.peaks.slice(0, 3).map((peak, index) => (
                        <div key={index} className="flex justify-between text-xs">
                          <span 
                            className="capitalize"
                            style={{ color: emotionColors[peak.emotion as keyof typeof emotionColors] }}
                          >
                            {peak.emotion}:
                          </span>
                          <span className="text-white">
                            {(peak.value * 100).toFixed(0)}% at {startTime ? 
                              `${Math.floor((peak.timestamp - startTime) / 60000)}:${((peak.timestamp - startTime) % 60000 / 1000).toFixed(0).padStart(2, '0')}` : 
                              `${peak.index * 0.5}s`
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Average Emotions */}
                <div className="bg-slate-700/30 rounded-lg p-3">
                  <h5 className="text-slate-300 text-sm mb-2">Average Emotion Breakdown</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {Object.entries(insights.avgEmotions)
                      .sort(([,a], [,b]) => b - a)
                      .map(([emotion, value]) => (
                        <div key={emotion} className="flex justify-between text-xs">
                          <span 
                            className="capitalize"
                            style={{ color: emotionColors[emotion as keyof typeof emotionColors] }}
                          >
                            {emotion}:
                          </span>
                          <span className="text-white">{(value * 100).toFixed(0)}%</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-64 text-slate-400">
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Start recording to see emotion timeline</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmotionTimeline;
