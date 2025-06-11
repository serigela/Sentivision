
import React from 'react';
import { useUserTier } from '@/hooks/useUserTier';
import ProDashboard from '@/components/pro/ProDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProDashboardPage = () => {
  const { isProUser, loading } = useUserTier();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  if (!isProUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <Card className="bg-slate-800/50 border-slate-700 max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-white flex items-center justify-center space-x-2">
              <Crown className="h-6 w-6 text-yellow-400" />
              <span>Pro Access Required</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-slate-300">
              This dashboard is exclusive to Pro subscribers. Upgrade to access advanced features.
            </p>
            <div className="space-y-2">
              <Button 
                onClick={() => navigate('/?tab=subscription')} 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Pro
              </Button>
              <Button 
                onClick={() => navigate('/')} 
                variant="outline" 
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <ProDashboard />;
};

export default ProDashboardPage;
