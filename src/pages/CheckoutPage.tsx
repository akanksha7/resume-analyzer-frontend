import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { api } from "@/services/api";
import { Loader2 } from "lucide-react";

// Initialize Stripe outside component with public key
const stripePromise = loadStripe(
  "pk_test_51QPg5VH0gqnHYygLquXYNEodur6uMqMAUzYF4E8l6QQ7GIzfSxpCpXoTOgdYgHV2J8XrLsRa6Lk9qDTvZSBAk1DM00sEenteNt"
);

interface LocationState {
  planId: string;
}

interface CheckoutResponse {
  client_secret: string;
  session_id: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutData, setCheckoutData] = useState<CheckoutResponse | null>(null);
  
  // Type assertion for location.state
  const { planId } = (location.state as LocationState) || {};

  // Create checkout session on mount
  useEffect(() => {
    const initializeCheckout = async () => {
      if (!planId) {
        navigate('/plans', { replace: true });
        return;
      }

      try {
        setError(null);
        const response = await api.createCheckoutSession(planId);
        console.log('Checkout session response:', response); // Debug log
        
        if (!response?.client_secret) {
          throw new Error('No client secret received');
        }

        setCheckoutData(response);
      } catch (error) {
        console.error('Failed to create checkout session:', error);
        setError('Failed to initialize checkout. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeCheckout();
  }, [planId, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !checkoutData?.client_secret) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-background flex items-center justify-center p-4"
      >
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center space-y-4">
            <p className="text-red-500">{error || 'Unable to initialize checkout'}</p>
            <button
              onClick={() => navigate('/plans')}
              className="text-primary hover:underline"
            >
              Return to Plans
            </button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-3xl bg-background-secondary border-border shadow-2xl">
        <CardHeader className="space-y-3">
          <CardTitle className="text-foreground text-2xl font-bold">
            Complete Payment
          </CardTitle>
          <CardDescription className="text-foreground-muted">
            Enter your payment details to activate your subscription
          </CardDescription>
        </CardHeader>

        <CardContent className="min-h-[500px]">
          <div id="checkout" className="w-full h-full">
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{
                clientSecret: checkoutData.client_secret,
              }}
            > 
              <EmbeddedCheckout 
                className="w-full h-full" 
              />
            </EmbeddedCheckoutProvider>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}