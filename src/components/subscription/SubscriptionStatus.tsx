
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, RefreshCw, Settings, Calendar, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier?: string;
  subscription_end?: string;
}

const SubscriptionStatus = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const checkSubscription = async () => {
    try {
      setRefreshing(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setSubscription({ subscribed: false });
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) throw error;
      setSubscription(data);
    } catch (error) {
      console.error('Error checking subscription:', error);
      toast.error('Failed to check subscription status');
    } finally {
      setRefreshing(false);
    }
  };

  const openCustomerPortal = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Please log in to manage subscription');
        return;
      }

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) throw error;

      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast.error('Failed to open subscription management');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSubscription();
  }, []);

  if (!subscription) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="flex items-center justify-center h-32">
          <div className="text-slate-400">Loading subscription status...</div>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTierColor = (tier: string) => {
    switch (tier?.toLowerCase()) {
      case 'basic':
        return 'text-blue-400 border-blue-500';
      case 'pro':
        return 'text-yellow-400 border-yellow-500';
      case 'enterprise':
        return 'text-purple-400 border-purple-500';
      default:
        return 'text-gray-400 border-gray-500';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <CreditCard className="h-5 w-5 text-cyan-400" />
          <span>Subscription Status</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={checkSubscription}
            disabled={refreshing}
            className="ml-auto"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {subscription.subscribed ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Current Plan:</span>
              <Badge 
                variant="outline" 
                className={getTierColor(subscription.subscription_tier || '')}
              >
                <Zap className="h-3 w-3 mr-1" />
                {subscription.subscription_tier || 'Unknown'}
              </Badge>
            </div>
            
            {subscription.subscription_end && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Next Billing:</span>
                <div className="flex items-center text-white">
                  <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                  {formatDate(subscription.subscription_end)}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-600">
              <Button
                onClick={openCustomerPortal}
                disabled={loading}
                className="w-full bg-slate-600 hover:bg-slate-700"
              >
                <Settings className="h-4 w-4 mr-2" />
                {loading ? 'Loading...' : 'Manage Subscription'}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="text-slate-400 mb-4">
              No active subscription found
            </div>
            <div className="text-sm text-slate-500">
              Subscribe to unlock premium features and unlimited usage
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionStatus;
