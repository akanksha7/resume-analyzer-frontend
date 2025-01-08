// pages/RegisterPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/hooks/use-toast";
import { registerEmail, verifyEmail } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const passwordsMatch = password === confirmPassword;
  const isValidForm = email && password && confirmPassword && passwordsMatch;

  const handleRegister = async () => {
    if (!passwordsMatch) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      await registerEmail(email, password);
      await verifyEmail(email);
      toast({
        title: "Success",
        description: "Registration successful, Please verify your email",
        variant: "default",
      });
      setTimeout(() => {
      navigate('/verify-otp', { state: { email } });
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Registration failed, Try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-md bg-background-secondary border-border shadow-2xl">
        <CardHeader className="space-y-3">
          <CardTitle className="text-foreground text-2xl font-bold">
            Create Account
          </CardTitle>
          <CardDescription className="text-foreground-muted">
            Register to get started
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-foreground mb-2 font-medium">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background-tertiary border-border/40"
              />
            </div>
            
            {/* Password Field */}
            <div className="grid gap-2">
              <label htmlFor="password" className="text-foreground">Password</label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter your password"
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

            {/* Confirm Password Field */}
            <div className="grid gap-2">
              <label htmlFor="confirmPassword" className="text-foreground">Confirm Password</label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  placeholder="Re-enter your password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={cn(
                    "bg-background-tertiary border-border/40 pr-10",
                    confirmPassword && !passwordsMatch && "border-red-500"
                  )}
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  )}
                  <span className="sr-only">
                    {showConfirmPassword ? 'Hide password' : 'Show password'}
                  </span>
                </Button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-sm text-red-500">
                  Passwords do not match
                </p>
              )}
            </div>

            <Button
              onClick={handleRegister}
              disabled={isLoading || !isValidForm}
              className="w-full"
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </motion.div>

          <div className="pt-6 border-t border-border">
            <p className="text-center text-foreground-subtle text-sm">
              Already have an account? <Button variant="link" onClick={() => navigate('/login')}>Login</Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}