
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { useUserTier } from '@/hooks/useUserTier';

interface TierAccessProps {
  children: React.ReactNode;
  requiredTier: 'pro' | 'enterprise';
  feature: string;
  description?: string;
}

const TierAccess: React.FC<TierAccessProps> = ({ 
  children, 
  requiredTier, 
  feature, 
  description 
}) => {
  const { tier, loading, isProUser } = useUserTier();
  
  if (loading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="flex items-center justify-center h-32">
          <div className="text-slate-400">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  // Check access based on tier hierarchy
  const hasAccess = 
    (requiredTier === 'pro' && (tier === 'pro' || tier === 'enterprise')) ||
    (requiredTier === 'enterprise' && tier === 'enterprise');

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 relative">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
        <div className="text-center space-y-4 p-6">
          <div className="flex items-center justify-center">
            <Lock className="h-8 w-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{feature}</h3>
            <p className="text-slate-400 text-sm mt-1">
              {description || `This feature requires ${requiredTier} access`}
            </p>
          </div>
        </div>
      </div>
      <div className="opacity-30 pointer-events-none">
        {children}
      </div>
    </Card>
  );
};

export default TierAccess;
