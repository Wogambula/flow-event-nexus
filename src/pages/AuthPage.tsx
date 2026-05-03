import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Github, Chrome, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner';

interface AuthPageProps {
  onNavigate: (page: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(mode === 'login' ? 'Welcome back!' : 'Account created successfully!');
      onNavigate('landing');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-background p-4 pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white mb-4 shadow-lg shadow-indigo-500/20">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
            {mode === 'login' ? 'Welcome Back' : 'Join Ventify'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {mode === 'login' 
              ? 'Enter your details to access your account' 
              : 'Start discovering and hosting unforgettable events'}
          </p>
        </div>

        <Card className="border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Alex Rivera" className="pl-10 h-11" required />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="email" placeholder="alex@example.com" className="pl-10 h-11" required />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Password</label>
                  {mode === 'login' && (
                    <button type="button" className="text-xs text-indigo-600 hover:underline">Forgot password?</button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="password" placeholder="••••••••" className="pl-10 h-11" required />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 mt-6"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-900 px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-11 border-zinc-200 dark:border-zinc-800">
                <Chrome className="h-4 w-4 mr-2" /> Google
              </Button>
              <Button variant="outline" className="h-11 border-zinc-200 dark:border-zinc-800">
                <Github className="h-4 w-4 mr-2" /> GitHub
              </Button>
            </div>
          </CardContent>
          
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 text-center">
            <p className="text-sm text-muted-foreground">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-indigo-600 font-semibold hover:underline"
              >
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </Card>

        <div className="mt-8 flex items-center justify-center text-xs text-muted-foreground gap-4">
          <div className="flex items-center"><ShieldCheck className="h-3 w-3 mr-1" /> Secure Auth</div>
          <div className="flex items-center"><Sparkles className="h-3 w-3 mr-1" /> Best-in-class UI</div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;