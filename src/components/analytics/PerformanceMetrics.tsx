
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react";

const PerformanceMetrics = () => {
  // Mock performance data
  const performanceData = [
    { month: 'Jan', profit: 2400, winRate: 68 },
    { month: 'Feb', profit: 1398, winRate: 72 },
    { month: 'Mar', profit: 3800, winRate: 65 },
    { month: 'Apr', profit: 3908, winRate: 78 },
    { month: 'May', profit: 4800, winRate: 71 },
    { month: 'Jun', profit: 3490, winRate: 69 },
  ];

  const metrics = [
    {
      title: "Total Profit",
      value: "$19,796",
      change: "+12.5%",
      icon: DollarSign,
      positive: true
    },
    {
      title: "Win Rate",
      value: "70.5%",
      change: "+2.1%",
      icon: Percent,
      positive: true
    },
    {
      title: "Avg. Return",
      value: "8.3%",
      change: "-0.4%",
      icon: TrendingUp,
      positive: false
    },
    {
      title: "Sharpe Ratio",
      value: "1.42",
      change: "+0.08",
      icon: TrendingUp,
      positive: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-slate-700/50 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{metric.title}</p>
                  <p className="text-white text-xl font-bold">{metric.value}</p>
                </div>
                <metric.icon className="h-8 w-8 text-cyan-400" />
              </div>
              <div className="mt-2">
                <Badge variant={metric.positive ? "default" : "destructive"} className="text-xs">
                  {metric.positive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {metric.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-700/50 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white text-lg">Profit Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#334155', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#06b6d4" 
                  strokeWidth={2}
                  dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-700/50 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white text-lg">Win Rate by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#334155', 
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="winRate" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
