import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/services/authContext';
import { InputOTPForm } from '@/components/input-otp-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function VerifyOtpPage() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!isLoading) {
      // If user is verified, redirect to appropriate page
      if (isAuthenticated && user?.email_verified) {
        navigate(user.is_active_plan ? '/dashboard' : '/plans', { replace: true });
        return;
      }

      // If not authenticated or no email, go back to login
      if (!isAuthenticated || !email) {
        navigate('/login', { replace: true });
      }
    }
  }, [isLoading, isAuthenticated, user, email, navigate]);

  if (isLoading || !email) {
    return null;
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Verify your email
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                We've sent a verification code to {email}

              </p>
            </CardHeader>
            <CardContent>
              
              <InputOTPForm email={email} />
            </CardContent>
          </Card>
        </div>
       
      </div>
    </div>
  );
}