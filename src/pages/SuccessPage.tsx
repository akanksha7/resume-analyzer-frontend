// pages/CheckoutSuccessPage.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { api } from "@/services/api";

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      navigate('/plans');
      return;
    }

    const verifySession = async () => {
      try {
        const response = await api.getCheckoutSession(sessionId);
        if (response.status === 'complete') {
          setStatus('success');
          setCustomerEmail(response.customer_email);
        } else {
          navigate('/checkout');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    verifySession();
  }, [searchParams, navigate]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
            <Button variant="outline" onClick={() => window.location.href = 'mailto:support@talenttuner.com'}>
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}