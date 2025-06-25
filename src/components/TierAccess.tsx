
import React from 'react';

interface TierAccessProps {
  children: React.ReactNode;
  requiredTier: 'pro' | 'enterprise';
  feature: string;
  description?: string;
}

const TierAccess: React.FC<TierAccessProps> = ({ children }) => {
  // Always show content - no tier restrictions
  return <>{children}</>;
};

export default TierAccess;
