
import React from 'react';
import { motion } from 'framer-motion';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';

const AnalyticsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-slate-300">Comprehensive trading performance metrics</p>
        </div>
        <AnalyticsDashboard />
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;
