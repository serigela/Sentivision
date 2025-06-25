
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useUserTier } from '@/hooks/useUserTier';
import { User, Crown, LogOut, Settings, ExternalLink } from 'lucide-react';

const UserMenu = () => {
  const navigate = useNavigate();
  const { tier, loading, subscription } = useUserTier();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="animate-pulse bg-slate-700 h-9 w-24 rounded"></div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          onClick={() => navigate('/auth')}
          className="text-slate-300 hover:text-white"
        >
          Sign In
        </Button>
        <Button
          onClick={() => navigate('/auth?mode=signup')}
          className="bg-cyan-600 hover:bg-cyan-700"
        >
          Sign Up
        </Button>
      </div>
    );
  }

  const getTierBadgeColor = () => {
    switch (tier) {
      case 'pro':
        return 'bg-yellow-500 text-black';
      case 'enterprise':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-slate-600 text-slate-200';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 text-slate-300 hover:text-white">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">{user.email?.split('@')[0]}</span>
          <Badge className={getTierBadgeColor()}>
            {tier === 'free' ? 'Free' : tier.charAt(0).toUpperCase() + tier.slice(1)}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700" align="end">
        <DropdownMenuLabel className="text-slate-300">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.email}</p>
            <p className="text-xs text-slate-400">
              {tier === 'free' ? 'Free Plan' : `${tier.charAt(0).toUpperCase() + tier.slice(1)} Plan`}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-700" />
        
        {(tier === 'pro' || tier === 'enterprise') && (
          <DropdownMenuItem 
            onClick={() => navigate('/pro-dashboard')}
            className="text-slate-300 hover:bg-slate-700 cursor-pointer"
          >
            <Crown className="h-4 w-4 mr-2" />
            Pro Dashboard
            <ExternalLink className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        <DropdownMenuItem 
          onClick={() => navigate('/settings')}
          className="text-slate-300 hover:bg-slate-700 cursor-pointer"
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-700" />
        
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="text-red-400 hover:bg-slate-700 cursor-pointer"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
