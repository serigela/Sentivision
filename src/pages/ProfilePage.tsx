
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { User, Settings, Bell, Shield, TrendingUp, BarChart3, Brain } from 'lucide-react';
import AnimatedCard from '@/components/ui/animated-card';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<any>(null);
  const [notifications, setNotifications] = useState({
    tradingAlerts: true,
    patternDetection: true,
    sentimentUpdates: false,
    weeklyReports: true
  });
  
  const [preferences, setPreferences] = useState({
    defaultConfidenceThreshold: 75,
    autoExecuteTrades: false,
    riskLevel: 'medium'
  });

  React.useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const stats = {
    totalAnalyses: 247,
    accuracyRate: 84.2,
    profitableSignals: 156,
    joinDate: 'Jan 2024'
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Card className="bg-slate-800/50 border-slate-700 p-8">
          <CardContent>
            <p className="text-white text-center">Please sign in to view your profile</p>
            <Button onClick={() => navigate('/auth')} className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-slate-300">Manage your account and preferences</p>
        </div>

        {/* User Info */}
        <AnimatedCard className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <User className="h-5 w-5 text-cyan-400" />
              <span>Account Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">{user.email}</h3>
                <p className="text-slate-400 text-sm">Member since {stats.joinDate}</p>
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        {/* Statistics */}
        <AnimatedCard className="bg-slate-800/50 border-slate-700" delay={0.2}>
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-400" />
              <span>Your Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-cyan-400" />
                  <span className="text-2xl font-bold text-white">{stats.totalAnalyses}</span>
                </div>
                <p className="text-slate-400 text-sm">Charts Analyzed</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Brain className="h-4 w-4 text-green-400" />
                  <span className="text-2xl font-bold text-white">{stats.accuracyRate}%</span>
                </div>
                <p className="text-slate-400 text-sm">Accuracy Rate</p>
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        {/* Notification Settings */}
        <AnimatedCard className="bg-slate-800/50 border-slate-700" delay={0.3}>
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Bell className="h-5 w-5 text-yellow-400" />
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <Label htmlFor={key} className="text-slate-300 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Label>
                <Switch
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, [key]: checked }))
                  }
                />
              </div>
            ))}
          </CardContent>
        </AnimatedCard>

        {/* Trading Preferences */}
        <AnimatedCard className="bg-slate-800/50 border-slate-700" delay={0.4}>
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Settings className="h-5 w-5 text-purple-400" />
              <span>Trading Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="confidence" className="text-slate-300">
                Default Confidence Threshold: {preferences.defaultConfidenceThreshold}%
              </Label>
              <input
                type="range"
                id="confidence"
                min="50"
                max="95"
                value={preferences.defaultConfidenceThreshold}
                onChange={(e) => setPreferences(prev => ({ 
                  ...prev, 
                  defaultConfidenceThreshold: parseInt(e.target.value) 
                }))}
                className="w-full mt-2 accent-cyan-400"
              />
            </div>
            
            <div>
              <Label htmlFor="risk" className="text-slate-300">Risk Level</Label>
              <select
                id="risk"
                value={preferences.riskLevel}
                onChange={(e) => setPreferences(prev => ({ ...prev, riskLevel: e.target.value }))}
                className="w-full mt-1 bg-slate-700 border-slate-600 text-white rounded-md p-2"
              >
                <option value="low">Conservative</option>
                <option value="medium">Moderate</option>
                <option value="high">Aggressive</option>
              </select>
            </div>
          </CardContent>
        </AnimatedCard>

        {/* Account Actions */}
        <AnimatedCard className="bg-slate-800/50 border-slate-700" delay={0.5}>
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-400" />
              <span>Account Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
              Export Data
            </Button>
            <Button 
              onClick={handleSignOut}
              variant="outline" 
              className="w-full border-red-600 text-red-400 hover:bg-red-500/10"
            >
              Sign Out
            </Button>
          </CardContent>
        </AnimatedCard>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
