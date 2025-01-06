import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/services/authContext';
import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.email_verified && user.is_active_plan) {
        navigate('/dashboard', { replace: true });
      } else if (!user.email_verified) {
        navigate('/verify-otp', { 
          replace: true, 
          state: { email: user.email } 
        });
      } else {
        navigate('/plans', { replace: true });
      }
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
