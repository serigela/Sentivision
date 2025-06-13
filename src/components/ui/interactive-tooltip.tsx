
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface InteractiveTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
}

const InteractiveTooltip = ({ children, content, side = 'top', delay = 300 }: InteractiveTooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger
          asChild
          onMouseEnter={() => setTimeout(() => setIsOpen(true), delay)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {children}
        </TooltipTrigger>
        <AnimatePresence>
          {isOpen && (
            <TooltipContent side={side} asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="bg-slate-800 border-slate-700 text-white p-3 rounded-lg shadow-lg"
              >
                {content}
              </motion.div>
            </TooltipContent>
          )}
        </AnimatePresence>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InteractiveTooltip;
