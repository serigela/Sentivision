
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUserTier } from '@/hooks/useUserTier';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthForm from '@/components/auth/AuthForm';

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { tier, loading } = useUserTier();

  const defaultTab = searchParams.get('mode') === 'signup' ? 'signup' : 'login';

  // Redirect authenticated users
  useEffect(() => {
    if (!loading && tier !== 'free') {
      if (tier === 'pro' || tier === 'enterprise') {
        navigate('/pro-dashboard');
      } else {
        navigate('/');
      }
    }
  }, [tier, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <AuthHeader />
        <AuthForm defaultTab={defaultTab} />
        
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-white"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
