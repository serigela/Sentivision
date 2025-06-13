
import { Button } from '@/components/ui/button';
import { Chrome, Github } from 'lucide-react';

interface OAuthButtonsProps {
  onOAuthLogin: (provider: 'google' | 'github') => Promise<void>;
  isLoading: boolean;
}

const OAuthButtons = ({ onOAuthLogin, isLoading }: OAuthButtonsProps) => {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-600" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-800 px-2 text-slate-400">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => onOAuthLogin('google')}
          disabled={isLoading}
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          <Chrome className="h-4 w-4 mr-2" />
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => onOAuthLogin('github')}
          disabled={isLoading}
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          <Github className="h-4 w-4 mr-2" />
          GitHub
        </Button>
      </div>
    </>
  );
};

export default OAuthButtons;
