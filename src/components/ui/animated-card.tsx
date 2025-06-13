
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface AnimatedCardProps {
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

const AnimatedCard = ({ delay = 0, children, className, ...props }: AnimatedCardProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={className} {...props}>
        {children}
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;
