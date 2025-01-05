// pages/PricingPage.tsx
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PricingCard } from '@/components/pricing-card';
import { Button } from "@/components/ui/button";

import { toast } from '@/components/hooks/use-toast';
import { api } from '@/services/api';
import type { Plan } from '@/types/types';

interface PlanResponse {
  plan_id: string;
  plan_type: string;
  basePrice: {
    'per-resume-analysis': number;
  };
  description: string;
  features: {
    analysis: {
      bulk: boolean;
      quick: boolean;
    };
    catalogs: string;
    jobDescriptions: string;
    resumes: string;
  };
}

const PricingPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = location.state || {};
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.getPlans();
        const transformedPlans: Plan[] = response.plans.map((plan: PlanResponse) => ({
          id: plan.plan_id,
          name: plan.plan_type,
          price: plan.basePrice['per-resume-analysis'],
          description: plan.description,
          analysisCount: getResumeCount(plan.features.resumes),
          features: [
            { name: plan.features.catalogs, included: true },
            { name: plan.features.jobDescriptions, included: true },
            { name: plan.features.resumes, included: true },
            { name: "Bulk Analysis", included: plan.features.analysis.bulk },
            { name: "Quick Analysis", included: plan.features.analysis.quick }
          ],
          popular: plan.plan_type === "Professional" // Optional: mark Professional as popular
        }));
        
        setPlans(transformedPlans);
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Helper function to extract number from resume count string
  const getResumeCount = (resumeString: string): number => {
    const match = resumeString.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  if (isLoading) {
    return <div>Loading plans...</div>;
  }

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-lg text-foreground-muted mb-12">
            Select the plan that best fits your needs. All plans include our core features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          {!isAuthenticated && (
            <Button 
              size="lg"
              className="px-8"
              onClick={() => navigate('/register')}
            >
              Get Started Now
            </Button>
          )}

          <p className="text-foreground-muted text-sm mt-8">
            All plans include 24/7 support, regular updates, and our core features.
            <br />
            Need a custom plan?{" "}
            <Button 
              variant="link" 
              className="text-primary hover:text-primary-hover"
            >
              Contact our sales team
            </Button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;