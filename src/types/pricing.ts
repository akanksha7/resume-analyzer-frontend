export interface PricingFeature {
    name: string;
    included: boolean;
  }
  
  export interface PricingPlan {
    id: string;
    name: string;
    description: string;
    price: number;
    billingPeriod: 'monthly' | 'yearly';
    features: PricingFeature[];
    popular?: boolean;
  }