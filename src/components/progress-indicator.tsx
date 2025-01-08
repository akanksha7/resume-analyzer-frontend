import { cn } from '@/lib/utils';
import { useAuth } from '@/services/authContext';
import { Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface Step {
  id: number;
  title: string;
  description: string;
  path: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Email Verification",
    description: "Verify your email address",
    path: "/verify-otp"
  },
  {
    id: 2,
    title: "Select Plan",
    description: "Choose your subscription",
    path: "/plans"
  },
  {
    id: 3,
    title: "Payment",
    description: "Complete payment",
    path: "/checkout/:planId"
  }
];

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: number[];
}

export function StepIndicator({ currentStep, completedSteps }: StepIndicatorProps) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <nav aria-label="Progress">
          <ol className="flex items-center relative">
            {steps.map((step, index) => (
              <li 
                key={step.id} 
                className="relative flex-1 flex flex-col items-center"
              >
                {/* Connector Line - Now placed before the circle */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute h-[2px] top-4 -right-1/2 w-full",
                      completedSteps.includes(step.id)
                        ? "bg-primary"
                        : "bg-border"
                    )}
                  />
                )}
  
                {/* Step Circle */}
                <div 
                  className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-full border-2 z-10 bg-background",
                    completedSteps.includes(step.id)
                      ? "border-primary bg-primary"
                      : currentStep === step.id
                      ? "border-primary"
                      : "border-muted-foreground/30"
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      completedSteps.includes(step.id)
                        ? "text-primary-foreground"
                        : currentStep === step.id
                        ? "text-primary"
                        : "text-muted-foreground/50"
                    )}
                  >
                    {completedSteps.includes(step.id) ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      step.id
                    )}
                  </span>
                </div>
  
                {/* Step Content */}
                <div className="mt-4 text-center">
                  <span
                    className={cn(
                      "text-sm font-medium block",
                      currentStep === step.id
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                  <span 
                    className={cn(
                      "text-sm mt-1 hidden sm:block",
                      currentStep === step.id
                        ? "text-muted-foreground"
                        : "text-muted-foreground/50"
                    )}
                  >
                    {step.description}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    );
  }
export function StepIndicatorContainer() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  const getCurrentStep = (): number => {
    if (!user?.email_verified) return 1;
    if (!user?.is_active_plan && !location.pathname.includes('checkout')) return 2;
    if (!user?.is_active_plan) return 3;
    return 3;
  };

  const getCompletedSteps = (): number[] => {
    const completed: number[] = [];
    if (user?.email_verified) completed.push(1);
    if (location.pathname.includes('checkout') || location.search.includes('planId=')) completed.push(2);
    if (user?.is_active_plan) {
      completed.push(3);
    }
    return completed;
  };

  // Only show on relevant pages
  const shouldShowSteps = ['/verify-otp', '/plans', '/checkout'].some(path => 
    location.pathname.includes(path)
  );

  if(!isAuthenticated || !user) return null; 

  if (!shouldShowSteps) return null;

  return <StepIndicator currentStep={getCurrentStep()} completedSteps={getCompletedSteps()} />;
}