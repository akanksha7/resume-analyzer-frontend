import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PricingCard } from '@/components/pricing-card';
import { Button } from "@/components/ui/button";
import { plans } from '@/components/assets/MockPlans';
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { RegistrationContext } from '@/services/registrationContext';
import { useContext } from 'react';
import { Plan } from '@/types/types';

const PricingPage: FC = () => {
    const [isYearly, setIsYearly] = useState(false);
    const navigate = useNavigate();
   
    const _plans = isYearly ? plans.yearly : plans.monthly;
    const context = useContext(RegistrationContext);
    if (!context) throw new Error("Must be used within RegistrationProvider");
    const { setPlan } = context;
   
    const handleSelectPlan = (plan: Plan) => {
      setPlan(plan);
      navigate(`/checkout/${plan.id}`);
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
            
            <div className="flex items-center justify-center gap-8">
              <span className={cn(
                "text-sm font-medium",
                !isYearly && "text-foreground",
                isYearly && "text-foreground-subtle"
              )}>
                Monthly
              </span>
              <div className="flex items-center gap-2">
                <Switch
                  checked={isYearly}
                  onCheckedChange={setIsYearly}
                  className="data-[state=checked]:bg-primary"
                />
                {isYearly && (
                  <Badge 
                    variant="secondary" 
                    className="bg-background-tertiary text-foreground-muted font-semibold"
                  >
                    Save up to 20%
                  </Badge>
                )}
              </div>
              <span className={cn(
                "text-sm font-medium",
                isYearly && "text-foreground",
                !isYearly && "text-foreground-subtle"
              )}>
                Yearly
              </span>
            </div>
          </motion.div>
   
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {_plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PricingCard
                  plan={plan}
                  onSelect={() => handleSelectPlan(plan)}
                  isYearly={isYearly}
                />
              </motion.div>
            ))}
          </div>
   
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-20"
          >
            <p className="text-foreground-muted text-sm">
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