import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Feature {
  name: string;
  included: boolean;
}

interface Plan {
  plan_type: string;
  plan_id: string;
  description: string;
  price: number;
  perResumeAnalysis: number;
  features: Feature[];
  max_resumes: number;
  max_catalogs: number;
  max_job_descriptions_per_catalog: number;
}

interface PricingCardProps {
  plan: Plan;
  showSelectButton: boolean;
  onSelect: (planId: string) => void;
}

export const PricingCard = ({ plan, showSelectButton, onSelect }: PricingCardProps) => {
  const isPopular = plan.plan_type === "Professional";
  const features = Array.isArray(plan.features) ? plan.features : [];

  // Format numbers safely
  const formatNumber = (num: number | undefined | null) => {
    if (num === undefined || num === null) return '0';
    return num.toLocaleString();
  };

  // Format price safely
  const formatPrice = (price: number | undefined | null) => {
    if (price === undefined || price === null) return '0';
    return Math.floor(price).toLocaleString();
  };

  // Format per resume analysis price
  const formatPerResumePrice = (price: number | undefined | null) => {
    if (price === undefined || price === null) return '0.00';
    return price.toFixed(2);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card 
  className={`relative h-full bg-background/50 backdrop-blur-sm border-2 transition-all overflow-hidden
    ${isPopular ? 'border-primary shadow-lg shadow-primary/20' : 'hover:border-primary/50'}`}
>
  {isPopular && (
    <div className="absolute -right-[40px] top-[32px] rotate-45 w-[170px] text-center py-1 
                    bg-primary text-primary-foreground text-sm font-medium shadow-sm">
      Popular
    </div>
  )}

        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold mb-2">{plan.plan_type}</CardTitle>
          <CardDescription className="min-h-12 text-sm">{plan.description}</CardDescription>
          <div className="mt-6 space-y-2">
            <div className="flex items-baseline justify-center">
              <span className="text-4xl font-bold">₹{formatPrice(plan.price)}</span>
              {/* <span className="text-sm text-muted-foreground ml-2">/month</span> */}
            </div>
            <div className="text-sm text-muted-foreground">
              ₹{formatPerResumePrice(plan.perResumeAnalysis)} per resume analysis
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Limits Section
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground/80">Plan Limits</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-sm">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-foreground/80">
                  {plan.max_resumes === -1 ? "Unlimited" : formatNumber(plan.max_resumes)} Resume Uploads
                </span>
              </li>
              {/* <li className="flex items-center text-sm">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div> */}
                {/* <span className="text-foreground/80">
                  {plan.max_catalogs === -1 ? "Unlimited" : formatNumber(plan.max_catalogs)} Catalogs
                </span> */}
              {/* </li> */}
              {/* <li className="flex items-center text-sm">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-foreground/80">
                  {plan.max_job_descriptions_per_catalog === -1 
                    ? "Unlimited" 
                    : formatNumber(plan.max_job_descriptions_per_catalog)
                  } Job Descriptions per Catalog
                </span>
              </li>
            </ul>
          </div> */} 

          {/* Features Section */}
          {features.length > 0 && (
            <div className="space-y-3">
              {/* <h4 className="text-sm font-semibold text-foreground/80">Features Included</h4> */}
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3
                      ${feature.included ? 'bg-primary/10' : 'bg-destructive/10'}`}
                    >
                      {feature.included ? (
                        <Check className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-destructive" />
                      )}
                    </div>
                    <span className={`${feature.included ? 'text-foreground/80' : 'text-foreground/60'}`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showSelectButton && (
            <Button
              className="w-full group"
              variant={isPopular ? "default" : "outline"}
              onClick={() => onSelect(plan.plan_id)}
            >
              Select Plan
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};