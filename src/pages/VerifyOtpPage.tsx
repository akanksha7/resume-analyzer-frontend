// VerifyOtpPage.tsx
import { useState } from 'react';
import { useAuth } from '@/services/authContext';
import { InputOTPForm } from '@/components/input-otp-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { verifyEmail } from '@/services/api';
import { useToast } from '@/components/hooks/use-toast';

export default function VerifyOtpPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const handleResendOTP = async () => {
    if (resendTimer > 0 || !user?.email) return;
    
    setIsResending(true);
    try {
      await verifyEmail(user.email);
      setResendTimer(30);
      const timer = setInterval(() => {
        setResendTimer(prev => prev <= 1 ? (clearInterval(timer), 0) : prev - 1);
      }, 1000);

      toast({
        title: "Code sent",
        description: "A new verification code has been sent to your email",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  if (!user?.email) return null;

  return (
    // <div className="min-h-screen bg-background">
    //   <main className="container mx-auto py-8">
      // <div className="flex min-h-svh w-full bg-muted/10">
      <div className="flex flex-1 flex-col justify-center items-center px-4 mt-16">
        <div className="w-full max-w-[400px]">
          <Card className="border shadow-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Please Verify Your Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <InputOTPForm email={user.email}/>
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-sm text-muted-foreground">Didn't receive the code?</span>
                <Button 
                  variant="link" 
                  onClick={handleResendOTP} 
                  disabled={resendTimer > 0 || isResending}
                  className="h-auto p-0"
                >
                  {resendTimer > 0 ? (
                    <span className="text-sm text-muted-foreground">
                      Resend in {resendTimer}s
                    </span>
                  ) : (
                    <span className="text-xs">Resend Code</span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    // </div>
    //   </main>
    // </div>
    
  );
}