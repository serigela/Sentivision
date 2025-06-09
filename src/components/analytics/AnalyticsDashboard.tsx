
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, BarChart3, Target, Clock } from "lucide-react";
import PerformanceMetrics from "./PerformanceMetrics";
import PatternAccuracy from "./PatternAccuracy";
import TradingHistory from "./TradingHistory";
import BacktestResults from "./BacktestResults";

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
            <span>Trading Analytics Dashboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="performance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-slate-700/50">
              <TabsTrigger value="performance">
                <TrendingUp className="h-4 w-4 mr-2" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="accuracy">
                <Target className="h-4 w-4 mr-2" />
                Accuracy
              </TabsTrigger>
              <TabsTrigger value="history">
                <Clock className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
              <TabsTrigger value="backtest">
                <BarChart3 className="h-4 w-4 mr-2" />
                Backtest
              </TabsTrigger>
            </TabsList>

            <TabsContent value="performance">
              <PerformanceMetrics />
            </TabsContent>

            <TabsContent value="accuracy">
              <PatternAccuracy />
            </TabsContent>

            <TabsContent value="history">
              <TradingHistory />
            </TabsContent>

            <TabsContent value="backtest">
              <BacktestResults />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
