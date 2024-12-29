import { FC } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PricingPlan } from '@/types/pricing';

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (planId: string) => void;
  isYearly?: boolean;
}

export const PricingCard: FC<PricingCardProps> = ({ 
  plan, 
  onSelect,
  isYearly = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className={cn(
        "h-full flex flex-col",
        "relative overflow-hidden",
        "transition-shadow duration-300",
        plan.popular && "border-blue-500/50 shadow-lg shadow-blue-500/10",
        !plan.popular && "hover:border-blue-500/30"
      )}>
        {plan.popular && (
          <>
            {/* Popular badge */}
            <div className="absolute top-0 right-0">
              <div className="relative">
                <div className="absolute -right-12 top-8 rotate-45 bg-blue-500 py-1 px-12 text-sm text-white">
                  Popular
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            </div>
          </>
        )}

        <CardHeader className="text-center pb-8 pt-12">
          <div className="mb-4">
            {plan.popular ? (
              <Sparkles className="w-12 h-12 mx-auto text-blue-500 mb-2" />
            ) : (
              <div className="w-12 h-12 mx-auto" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        </CardHeader>

        <CardContent className="flex-1">
          {/* Pricing */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center">
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground ml-2">
                /{isYearly ? 'year' : 'month'}
              </span>
            </div>
            {isYearly && (
              <Badge variant="secondary" className="mt-2">
                Save {Math.round((plan.price * 12 - plan.price) / (plan.price * 12) * 100)}%
              </Badge>
            )}
          </div>

          {/* Features */}
          <div className="space-y-4">
            {plan.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex items-center space-x-3 px-4 py-2 rounded-lg",
                  feature.included && "bg-primary/5"
                )}
              >
                {feature.included ? (
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                ) : (
                  <X className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
                <span className={cn(
                  "text-sm",
                  feature.included ? "text-foreground" : "text-muted-foreground"
                )}>
                  {feature.name}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-8">
          <Button 
            className={cn(
              "w-full rounded-full h-12",
              plan.popular && "bg-blue-500 hover:bg-blue-600"
            )}
            variant={plan.popular ? "default" : "outline"}
            onClick={() => onSelect(plan.id)}
          >
            Get Started
            <motion.div
              className="ml-2"
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.div>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

