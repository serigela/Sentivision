
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";

interface TimelineData {
  time: string;
  sentiment: number;
  price: number;
  source: string;
}

const SentimentTimeline = () => {
  const [timelineData, setTimelineData] = useState<TimelineData[]>([]);

  useEffect(() => {
    // Generate mock timeline data
    const generateData = () => {
      const data = [];
      const baseTime = new Date();
      for (let i = 23; i >= 0; i--) {
        const time = new Date(baseTime.getTime() - (i * 60 * 60 * 1000));
        data.push({
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sentiment: (Math.random() - 0.5) * 2, // -1 to 1
          price: 150 + Math.random() * 20 - 10, // $140-160 range
          source: Math.random() > 0.5 ? 'news' : 'video'
        });
      }
      return data;
    };

    setTimelineData(generateData());
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-800 border border-slate-600 p-3 rounded-lg shadow-lg">
          <p className="text-white font-medium">{label}</p>
          <p className={`text-sm ${data.sentiment > 0 ? 'text-green-400' : 'text-red-400'}`}>
            Sentiment: {data.sentiment.toFixed(3)}
          </p>
          <p className="text-slate-300 text-sm">Price: ${data.price.toFixed(2)}</p>
          <Badge variant="outline" className="text-xs mt-1">
            {data.source}
          </Badge>
        </div>
      );
    }
    return null;
  };

  const averageSentiment = timelineData.reduce((sum, d) => sum + d.sentiment, 0) / timelineData.length;

  return (
    <Card className="bg-slate-700/50 border-slate-600 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium flex items-center space-x-2">
            <Clock className="h-5 w-5 text-cyan-400" />
            <span>24H Sentiment Timeline</span>
          </h3>
          <div className="flex items-center space-x-2">
            <Badge className={`${averageSentiment > 0 ? 'bg-green-500/20 text-green-400 border-green-500' : 'bg-red-500/20 text-red-400 border-red-500'}`}>
              {averageSentiment > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              Avg: {averageSentiment.toFixed(3)}
            </Badge>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                fontSize={12}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                domain={[-1, 1]}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="#6B7280" strokeDasharray="2 2" />
              <Line 
                type="monotone" 
                dataKey="sentiment" 
                stroke="#06B6D4" 
                strokeWidth={2}
                dot={{ fill: "#06B6D4", strokeWidth: 0, r: 3 }}
                activeDot={{ r: 5, fill: "#0891B2" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-slate-400 text-xs">Positive Spikes</p>
            <p className="text-green-400 font-mono text-sm">
              {timelineData.filter(d => d.sentiment > 0.5).length}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-xs">Neutral Range</p>
            <p className="text-yellow-400 font-mono text-sm">
              {timelineData.filter(d => Math.abs(d.sentiment) <= 0.5).length}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-xs">Negative Spikes</p>
            <p className="text-red-400 font-mono text-sm">
              {timelineData.filter(d => d.sentiment < -0.5).length}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SentimentTimeline;
