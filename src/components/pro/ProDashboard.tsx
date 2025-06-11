
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, TrendingUp, BarChart3, Download, Upload, Zap } from 'lucide-react';
import BatchUpload from './BatchUpload';
import InsightHistory from './InsightHistory';
import PatternHeatmap from './PatternHeatmap';
import BacktestingModule from './BacktestingModule';

const ProDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Crown className="h-8 w-8 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">Pro Dashboard</h1>
            <Badge className="bg-yellow-500 text-black">Pro Features</Badge>
          </div>
          <p className="text-xl text-slate-300">
            Advanced analytics and exclusive tools for professional traders
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Upload className="h-5 w-5 text-cyan-400" />
                <div>
                  <p className="text-slate-400 text-sm">Charts Analyzed</p>
                  <p className="text-2xl font-bold text-white">247</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-slate-400 text-sm">Accuracy Rate</p>
                  <p className="text-2xl font-bold text-white">84.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-slate-400 text-sm">Patterns Found</p>
                  <p className="text-2xl font-bold text-white">156</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-slate-400 text-sm">Pro Since</p>
                  <p className="text-2xl font-bold text-white">Jan 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Batch Upload */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Upload className="h-5 w-5 text-cyan-400" />
                <span>Batch Upload</span>
                <Badge variant="outline" className="text-cyan-400 border-cyan-500">Pro</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BatchUpload />
            </CardContent>
          </Card>

          {/* Pattern Heatmap */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-400" />
                <span>Pattern Heatmap</span>
                <Badge variant="outline" className="text-purple-400 border-purple-500">Pro</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PatternHeatmap />
            </CardContent>
          </Card>
        </div>

        {/* Insight History */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <span>Insight History</span>
              <Badge variant="outline" className="text-green-400 border-green-500">Pro</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <InsightHistory />
          </CardContent>
        </Card>

        {/* Backtesting Module */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span>Backtesting Analytics</span>
              <Badge variant="outline" className="text-yellow-400 border-yellow-500">Pro</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BacktestingModule />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProDashboard;
