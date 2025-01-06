import { FC, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PricingCard } from '@/components/pricing-card';
import { Button } from "@/components/ui/button";
import { toast } from '@/components/hooks/use-toast';
import { api } from '@/services/api';
import { LoadingSpinner } from '@/components/loading-spinner';
import { ArrowRight, ArrowRightIcon } from 'lucide-react';
import type { Plan } from '@/types/types';
import { useAuth } from '@/services/authContext';

const PricingPage: FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.getPlans();
        setPlans(response.plans);
      } catch (error) {
        console.error('Failed to fetch plans:', error);
        toast({
          title: "Error",
          description: "Failed to load pricing plans. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanSelect = async (planId: string) => {
    try {
      navigate(`/checkout/${planId}`, { state: { planId } });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to select plan. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h1 
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-6"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Choose Your Perfect Plan
          </motion.h1>
          <motion.p 
            className="text-lg text-foreground/80 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Select the plan that best fits your needs. All plans include our core features.
          </motion.p>
        </motion.div>

        {plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.plan_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PricingCard
                  plan={plan}
                  showSelectButton={isAuthenticated}
                  onSelect={handlePlanSelect}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-foreground/60">
            No pricing plans available at the moment.
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          {!isAuthenticated && (
            <Button 
              size="lg"
              className="px-8 group"
              onClick={() => navigate('/register')}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}

          <div className="text-foreground/60 text-sm mt-8 space-y-2">
            <p>All plans include 24/7 support, regular updates, and our core features.</p>
            <p>
              Need a custom plan?{" "}
              <Button 
                variant="link" 
                className="text-primary hover:text-primary/80"
                onClick={() => window.location.href = 'mailto:support@talenttuner.com'}
              >
                Contact our sales team
              </Button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;