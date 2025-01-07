import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { api } from "@/services/api";

export default function ReturnPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      navigate('/plans', { replace: true });
      return;
    }

    const checkStatus = async () => {
      try {
        const response = await api.getCheckoutSession(sessionId);
        setStatus(response.status);
        setCustomerEmail(response.customer_email);
      } catch (error) {
        console.error('Failed to check session status:', error);
        setError('Failed to verify payment status. Please contact support.');
      }
    };

    checkStatus();
  }, [searchParams, navigate]);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-background flex items-center justify-center p-4"
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-red-500">
              Payment Verification Failed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-muted-foreground">{error}</p>
            <div className="flex flex-col space-y-3">
              <Button variant="outline" onClick={() => window.location.href = 'mailto:support@talenttuner.com'}>
                Contact Support
              </Button>
              <Button onClick={() => navigate('/plans')}>
                Return to Plans
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (!status || status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === 'open') {
    navigate('/checkout', { replace: true });
    return null;
  }

  if (status === 'complete') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-background flex items-center justify-center p-4"
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center mb-6">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Payment Successful!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-muted-foreground">
              Thank you for your subscription. A confirmation email has been sent to{" "}
              <span className="font-medium text-foreground">{customerEmail}</span>.
            </p>
            <div className="flex flex-col space-y-3">
              <Button onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = 'mailto:support@talenttuner.com'}
              >
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return null;
}