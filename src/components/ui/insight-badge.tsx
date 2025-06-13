
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Brain, AlertTriangle, Eye, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

type BadgeType = 'high-confidence' | 'volatility-alert' | 'multi-signal' | 'bullish' | 'bearish';

interface InsightBadgeProps {
  type: BadgeType;
  confidence?: number;
}

const badgeConfig = {
  'high-confidence': {
    icon: Brain,
    label: 'High Confidence',
    className: 'bg-purple-500/20 text-purple-400 border-purple-500',
  },
  'volatility-alert': {
    icon: AlertTriangle,
    label: 'Volatility Alert',
    className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
  },
  'multi-signal': {
    icon: Eye,
    label: 'Multi-Signal Confirmed',
    className: 'bg-cyan-500/20 text-cyan-400 border-cyan-500',
  },
  'bullish': {
    icon: TrendingUp,
    label: 'Bullish Signal',
    className: 'bg-green-500/20 text-green-400 border-green-500',
  },
  'bearish': {
    icon: Zap,
    label: 'Bearish Signal',
    className: 'bg-red-500/20 text-red-400 border-red-500',
  },
};

const InsightBadge = ({ type, confidence }: InsightBadgeProps) => {
  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Badge variant="outline" className={`${config.className} flex items-center space-x-1`}>
        <Icon className="h-3 w-3" />
        <span>{config.label}</span>
        {confidence && <span className="ml-1">({confidence}%)</span>}
      </Badge>
    </motion.div>
  );
};

export default InsightBadge;
