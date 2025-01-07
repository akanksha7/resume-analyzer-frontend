import { useCallback } from "react";
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
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { api } from "@/services/api";

// Initialize Stripe outside component
//const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { planId } = location.state || {};

  if (!planId) {
    navigate('/plans');
    return null;
  }

  const fetchClientSecret = useCallback(async () => {
    try {
      const response = await api.createCheckoutSession(planId);
      return response.clientSecret;
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      navigate('/plans');
      return null;
    }
  }, [planId, navigate]);

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

        <CardContent>
          <div id="checkout" className="min-h-[500px] w-full">
            {/* <EmbeddedCheckoutProvider
              // stripe={stripePromise}
              options={{ fetchClientSecret }}
            > */}
              {/* <EmbeddedCheckout 
                className="min-h-[500px] w-full" 
              />
            </EmbeddedCheckoutProvider> */}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}