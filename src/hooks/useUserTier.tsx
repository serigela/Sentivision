
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SubscriptionData } from '@/types';

export const useUserTier = () => {
  const [tier, setTier] = useState<'free' | 'pro' | 'enterprise'>('free');
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);

  useEffect(() => {
    checkUserTier();
  }, []);

  const checkUserTier = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setTier('free');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) throw error;
      
      setSubscription(data);
      
      if (data.subscribed && data.subscription_tier) {
        setTier(data.subscription_tier.toLowerCase() as 'free' | 'pro' | 'enterprise');
      } else {
        setTier('free');
      }
    } catch (error) {
      console.error('Error checking user tier:', error);
      setTier('free');
    } finally {
      setLoading(false);
    }
  };

  return {
    tier,
    loading,
    subscription,
    isProUser: tier === 'pro' || tier === 'enterprise',
    refreshTier: checkUserTier
  };
};
