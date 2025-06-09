
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const PatternAccuracy = () => {
  const patternData = [
    { pattern: "Bull Flag", accuracy: 94, count: 45, avgConfidence: 87 },
    { pattern: "Head & Shoulders", accuracy: 89, count: 32, avgConfidence: 82 },
    { pattern: "Double Bottom", accuracy: 92, count: 28, avgConfidence: 85 },
    { pattern: "Ascending Triangle", accuracy: 87, count: 21, avgConfidence: 79 },
    { pattern: "Cup & Handle", accuracy: 91, count: 18, avgConfidence: 84 },
    { pattern: "Falling Wedge", accuracy: 85, count: 15, avgConfidence: 76 }
  ];

  const confidenceDistribution = [
    { range: "90-100%", count: 68, color: "#10b981" },
    { range: "80-89%", count: 45, color: "#06b6d4" },
    { range: "70-79%", count: 32, color: "#f59e0b" },
    { range: "60-69%", count: 14, color: "#ef4444" }
  ];

  const COLORS = ['#10b981', '#06b6d4', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Pattern Performance Table */}
      <Card className="bg-slate-700/50 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white text-lg">Pattern Detection Accuracy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patternData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-600/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                  <span className="text-white font-medium">{item.pattern}</span>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Accuracy</p>
                    <Badge variant="default" className="bg-green-500/20 text-green-400">
                      {item.accuracy}%
                    </Badge>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Detections</p>
                    <span className="text-white">{item.count}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Avg Confidence</p>
                    <span className="text-cyan-400">{item.avgConfidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-700/50 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white text-lg">Confidence Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={confidenceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ range, count }) => `${range}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {confidenceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#334155', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-700/50 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white text-lg">Pattern Detection Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={patternData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis 
                  dataKey="pattern" 
                  stroke="#94a3b8" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#334155', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatternAccuracy;
