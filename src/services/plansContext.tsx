import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/services/api';

interface Plan {
  plan_type: string;
  plan_id: string;
  description: string;
  price: number;
  perResumeAnalysis: number;
  features: { name: string; included: boolean; }[];
  "hidden-features": { name: string; included: boolean; }[];
  max_resumes: number;
  max_catalogs: number;
  max_job_descriptions_per_catalog: number;
}

interface PlansContextType {
  plans: Plan[];
  isLoading: boolean;
  error: string | null;
  refetchPlans: () => Promise<void>;
}

const PlansContext = createContext<PlansContextType | undefined>(undefined);

export function PlansProvider({ children }: { children: React.ReactNode }) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.getPlans();
      setPlans(response.plans);
    
    } catch (err) {
      console.error('Failed to fetch plans:', err);
      setError('Failed to load plans');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <PlansContext.Provider value={{ 
      plans, 
      isLoading, 
      error,
      refetchPlans: fetchPlans 
    }}>
      {children}
    </PlansContext.Provider>
  );
}

export const usePlans = () => {
  const context = useContext(PlansContext);
  if (context === undefined) {
    throw new Error('usePlans must be used within a PlansProvider');
  }
  return context;
};