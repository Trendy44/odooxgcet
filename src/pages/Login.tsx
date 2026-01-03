import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Lock, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password. Try: john@dayflow.com or sarah@dayflow.com',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-sidebar-foreground">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow mb-6">
              <span className="text-3xl font-bold text-primary-foreground">D</span>
            </div>
            <h1 className="text-4xl font-bold mb-3">Dayflow</h1>
            <p className="text-xl text-sidebar-foreground/80">Every workday, perfectly aligned.</p>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                <span className="text-sidebar-primary font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-medium">Streamlined Attendance</h3>
                <p className="text-sm text-sidebar-foreground/70">Track check-ins, leaves, and work hours effortlessly.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                <span className="text-sidebar-primary font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-medium">Productivity Insights</h3>
                <p className="text-sm text-sidebar-foreground/70">Daily work logs with automated productivity scoring.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                <span className="text-sidebar-primary font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-medium">Seamless Approvals</h3>
                <p className="text-sm text-sidebar-foreground/70">Manage leave requests and employee data in one place.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          <div className="lg:hidden mb-8 text-center">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center shadow-glow mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-foreground">D</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Dayflow</h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-2">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 text-sm">
            <p className="font-medium text-foreground mb-2">Demo Credentials:</p>
            <p className="text-muted-foreground">Employee: john@dayflow.com</p>
            <p className="text-muted-foreground">Admin: sarah@dayflow.com</p>
            <p className="text-muted-foreground">Password: any 6+ chars</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
