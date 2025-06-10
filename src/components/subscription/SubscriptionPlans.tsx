
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Zap, Crown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
  current?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 5,
    interval: 'month',
    features: [
      '5 emotion analyses per month',
      'Basic emotion detection',
      'Session history',
      'CSV export'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 15,
    interval: 'month',
    popular: true,
    features: [
      'Unlimited emotion analyses',
      'Advanced emotion detection',
      'Real-time processing',
      'PDF & CSV export',
      'Facial landmarks overlay',
      'Detailed insights',
      'Priority support'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 50,
    interval: 'month',
    features: [
      'Everything in Pro',
      'Custom AI models',
      'API access',
      'White-label options',
      'Dedicated support',
      'Custom integrations'
    ]
  }
];

interface SubscriptionPlansProps {
  currentPlan?: string;
  onPlanSelect?: (planId: string) => void;
}

const SubscriptionPlans = ({ currentPlan, onPlanSelect }: SubscriptionPlansProps) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (plan: Plan) => {
    if (!supabase.auth.getSession()) {
      toast.error('Please log in to subscribe');
      return;
    }

    try {
      setLoading(plan.id);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Authentication required');
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan: plan.name },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) throw error;

      if (data.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast.error('Failed to start subscription process');
    } finally {
      setLoading(null);
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'basic':
        return <CheckCircle className="h-6 w-6 text-blue-400" />;
      case 'pro':
        return <Zap className="h-6 w-6 text-yellow-400" />;
      case 'enterprise':
        return <Crown className="h-6 w-6 text-purple-400" />;
      default:
        return <CheckCircle className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <Card 
          key={plan.id} 
          className={`relative bg-slate-800/50 border-slate-700 ${
            plan.popular ? 'ring-2 ring-cyan-500' : ''
          } ${currentPlan === plan.name.toLowerCase() ? 'ring-2 ring-green-500' : ''}`}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-cyan-500 text-white">Most Popular</Badge>
            </div>
          )}
          
          {currentPlan === plan.name.toLowerCase() && (
            <div className="absolute -top-3 right-4">
              <Badge className="bg-green-500 text-white">Current Plan</Badge>
            </div>
          )}

          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              {getPlanIcon(plan.id)}
            </div>
            <CardTitle className="text-white">{plan.name}</CardTitle>
            <div className="text-3xl font-bold text-white">
              ${plan.price}
              <span className="text-lg text-slate-400">/{plan.interval}</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-slate-300">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleSubscribe(plan)}
              disabled={loading === plan.id || currentPlan === plan.name.toLowerCase()}
              className={`w-full ${
                plan.popular
                  ? 'bg-cyan-500 hover:bg-cyan-600'
                  : 'bg-slate-600 hover:bg-slate-700'
              } ${currentPlan === plan.name.toLowerCase() ? 'bg-green-500 hover:bg-green-600' : ''}`}
            >
              {loading === plan.id ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : currentPlan === plan.name.toLowerCase() ? (
                'Current Plan'
              ) : (
                `Subscribe to ${plan.name}`
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
