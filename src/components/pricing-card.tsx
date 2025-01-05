import { FC } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from './ui/button';

// interface PricingFeature {
//   name: string;
//   included: boolean;
// }

// interface PricingPlan {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   analysisCount: number | 'Unlimited';
//   features: PricingFeature[];
//   popular?: boolean;
// }

interface PricingCardProps {
  plan: {
    id: string;
    name: string;
    price: number;
    description: string;
    analysisCount: number;
    features: { name: string; included: boolean }[];
    popular?: boolean;
  };
  showSelectButton?: boolean;
  onSelect?: (planId: string) => void;
}


export const PricingCard: FC<PricingCardProps> = ({ 
  plan,
  showSelectButton = false,
  onSelect
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
                <div className="absolute -right-10 top-6 rotate-45 bg-blue-500 py-1 px-12 text-sm text-white">
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
          {/* <div className="mb-4">
            
              <div className="w-12 h-12 mx-auto" />

          </div> */}
          <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        </CardHeader>

        <CardContent className="flex-1">
          {/* Pricing */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-sm text-muted-foreground">/package</span>
            </div>
            <Badge variant="secondary" className="mt-2">
              {typeof plan.analysisCount === 'number' 
                ? `${plan.analysisCount} Resume Analysis` 
                : 'Unlimited Analysis'}
            </Badge>
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
      <CardFooter>
        {showSelectButton && (
          <Button
            className={cn(
              "w-full",
              plan.popular && "bg-blue-500 hover:bg-blue-600"
            )}
            variant={plan.popular ? "default" : "outline"}
            onClick={() => onSelect?.(plan.id)}
          >
            Select Plan
          </Button>
        )}
      </CardFooter>
    </Card>
    </motion.div>
  );
};