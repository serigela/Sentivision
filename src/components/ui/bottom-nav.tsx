
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, BarChart3, Brain, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Brain, label: 'Insights', path: '/insights' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 md:hidden z-50"
    >
      <div className="flex justify-around items-center py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 ${
                isActive ? 'text-cyan-400' : 'text-slate-400'
              }`}
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                animate={{ scale: isActive ? 1.1 : 1 }}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomNav;
