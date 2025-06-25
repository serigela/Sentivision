
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SubscriptionData } from '@/types';

export const useUserTier = () => {
  const [tier, setTier] = useState<'free' | 'pro' | 'enterprise'>('pro'); // Default to pro for free access
  const [loading, setLoading] = useState(false); // No loading needed
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);

  useEffect(() => {
    // Set everything to pro tier immediately - no restrictions
    setTier('pro');
    setLoading(false);
    setSubscription({
      subscribed: true,
      subscription_tier: 'pro',
      subscription_end: null
    });
  }, []);

  const checkUserTier = async () => {
    // Always return pro tier
    setTier('pro');
    setLoading(false);
  };

  return {
    tier: 'pro' as const, // Always return pro
    loading: false,
    subscription: {
      subscribed: true,
      subscription_tier: 'pro',
      subscription_end: null
    } as SubscriptionData,
    isProUser: true, // Always true
    refreshTier: checkUserTier
  };
};
