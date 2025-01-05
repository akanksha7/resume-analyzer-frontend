import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/services/authContext';
import { Eye, EyeOff } from 'lucide-react'; 
import { toast } from "./hooks/use-toast";
import { api } from "@/services/api";
import { LoginResponse } from "@/types/auth";

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      setIsLoading(true);
      const response: LoginResponse = await api.login({ email, password });
  
        if (!response.user.email_verified) {
          // User needs to verify email
          navigate('/verify-otp', { 
            state: { email }  
          });
          return;
        }
  
        if (!response.user.is_active_plan) {
          // User needs to complete payment
          navigate('/plans', { state: { isAuthenticated: true } });
          return;
        }

        // User is verified and has paid
        if (response.user.email_verified && response.user.is_active_plan) {
          navigate('/dashboard', { state: { isAuthenticated: true, user: response.user } });
          return;
        }
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Registration failed, Try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border/40 bg-background-secondary">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground">Login</CardTitle>
        <CardDescription className="text-foreground-muted">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="bg-background-tertiary border-border/40"
                required
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="ml-auto text-sm text-primary hover:text-primary-hover"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background-tertiary border-border/40 pr-10"
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  )}
                  <span className="sr-only">
                    {showPassword ? 'Hide password' : 'Show password'}
                  </span>
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-foreground-muted">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:text-primary-hover">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}