
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Zap } from 'lucide-react';
import SubscriptionPlans from './SubscriptionPlans';
import SubscriptionStatus from './SubscriptionStatus';

const SubscriptionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Crown className="h-8 w-8 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">Sentivision Pro</h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Unlock the full power of emotion AI with advanced features and unlimited analysis
          </p>
        </div>

        {/* Current Subscription Status */}
        <div className="max-w-md mx-auto">
          <SubscriptionStatus />
        </div>

        {/* Features Highlight */}
        <Card className="bg-slate-800/30 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-center flex items-center justify-center space-x-2">
              <Zap className="h-6 w-6 text-cyan-400" />
              <span>Why Choose Sentivision Pro?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl">🎯</div>
                <h3 className="text-white font-semibold">Advanced AI</h3>
                <p className="text-slate-400 text-sm">
                  State-of-the-art emotion detection with facial landmarks and micro-expressions
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">⚡</div>
                <h3 className="text-white font-semibold">Real-Time Processing</h3>
                <p className="text-slate-400 text-sm">
                  Live emotion analysis from webcam feeds and instant insights
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">📊</div>
                <h3 className="text-white font-semibold">Detailed Reports</h3>
                <p className="text-slate-400 text-sm">
                  Comprehensive emotion timelines, PDF exports, and analytics
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Plans */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Choose Your Plan</h2>
            <p className="text-slate-400">Start with a free trial or upgrade for unlimited access</p>
          </div>
          <SubscriptionPlans />
        </div>

        {/* FAQ Section */}
        <Card className="bg-slate-800/30 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-center">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-2">Can I cancel anytime?</h4>
                <p className="text-slate-400 text-sm">
                  Yes, you can cancel your subscription at any time through the customer portal.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Is there a free trial?</h4>
                <p className="text-slate-400 text-sm">
                  Yes, all new users get 5 free emotion analyses to try our service.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">What payment methods do you accept?</h4>
                <p className="text-slate-400 text-sm">
                  We accept all major credit cards and debit cards through Stripe.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Do you offer refunds?</h4>
                <p className="text-slate-400 text-sm">
                  We offer a 30-day money-back guarantee for all subscription plans.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionPage;
