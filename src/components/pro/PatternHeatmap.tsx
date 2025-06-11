
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const PatternHeatmap = () => {
  const patterns = [
    { name: 'Head & Shoulders', frequency: 23, accuracy: 87 },
    { name: 'Double Top', frequency: 18, accuracy: 82 },
    { name: 'Triangle', frequency: 31, accuracy: 79 },
    { name: 'Cup & Handle', frequency: 12, accuracy: 91 },
    { name: 'Flag', frequency: 27, accuracy: 74 },
    { name: 'Pennant', frequency: 15, accuracy: 88 }
  ];

  const getHeatmapColor = (accuracy: number) => {
    if (accuracy >= 85) return 'bg-green-500';
    if (accuracy >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      <h4 className="text-white font-medium">Pattern Detection Analytics</h4>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {patterns.map((pattern) => (
          <Card key={pattern.name} className="bg-slate-700/50">
            <CardContent className="p-4 text-center">
              <div className={`w-full h-2 rounded-full mb-2 ${getHeatmapColor(pattern.accuracy)}`} />
              <h5 className="text-white font-medium text-sm">{pattern.name}</h5>
              <div className="mt-2 space-y-1">
                <p className="text-slate-400 text-xs">
                  Frequency: <span className="text-white">{pattern.frequency}</span>
                </p>
                <p className="text-slate-400 text-xs">
                  Accuracy: <span className="text-white">{pattern.accuracy}%</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex items-center justify-center space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded" />
          <span className="text-slate-400">High Accuracy (85%+)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-yellow-500 rounded" />
          <span className="text-slate-400">Medium (75-84%)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded" />
          <span className="text-slate-400">Low (<75%)</span>
        </div>
      </div>
    </div>
  );
};

export default PatternHeatmap;
