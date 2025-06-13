
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

interface SignupFormProps {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  showPassword: boolean;
  isLoading: boolean;
  error: string;
  message: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SignupForm = ({
  formData,
  showPassword,
  isLoading,
  error,
  message,
  onInputChange,
  onTogglePassword,
  onSubmit
}: SignupFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-email" className="text-slate-300">Email</Label>
        <Input
          id="signup-email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={onInputChange}
          className="bg-slate-700/50 border-slate-600 text-white"
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signup-password" className="text-slate-300">Password</Label>
        <div className="relative">
          <Input
            id="signup-password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={formData.password}
            onChange={onInputChange}
            className="bg-slate-700/50 border-slate-600 text-white pr-10"
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
            onClick={onTogglePassword}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password" className="text-slate-300">Confirm Password</Label>
        <Input
          id="confirm-password"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={onInputChange}
          className="bg-slate-700/50 border-slate-600 text-white"
          disabled={isLoading}
        />
      </div>

      {error && (
        <div className="text-red-400 text-sm">{error}</div>
      )}

      {message && (
        <div className="text-green-400 text-sm">{message}</div>
      )}

      <Button 
        type="submit" 
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={isLoading}
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default SignupForm;
