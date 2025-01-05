export const plans = {
    monthly: [
      {
        id: "basic",
        name: "Basic",
        description: "Perfect for small teams",
        price: 29,
        billingPeriod: "monthly" as const,
        features: [
          { name: "Up to 10 job postings", included: true },
          { name: "Basic AI matching", included: true },
          { name: "Email support", included: true },
          { name: "Advanced analytics", included: false },
          { name: "Custom branding", included: false }
        ]
      },
      {
        id: "pro",
        name: "Professional",
        description: "Ideal for growing companies",
        price: 99,
        billingPeriod: "monthly" as const,
        popular: true,
        features: [
          { name: "Unlimited job postings", included: true },
          { name: "Advanced AI matching", included: true },
          { name: "Priority support", included: true },
          { name: "Advanced analytics", included: true },
          { name: "Custom branding", included: true }
        ]
      },
      {
        id: "enterprise",
        name: "Enterprise",
        description: "For large organizations",
        price: 299,
        billingPeriod: "monthly" as const,
        features: [
          { name: "Everything in Pro", included: true },
          { name: "Custom AI models", included: true },
          { name: "Dedicated support", included: true },
          { name: "API access", included: true },
          { name: "Custom integrations", included: true }
        ]
      }
    ],
    yearly: [
      {
        id: "basic-yearly",
        name: "Basic",
        description: "Perfect for small teams",
        price: 290,
        billingPeriod: "yearly" as const,
        features: [
          { name: "Up to 10 job postings", included: true },
          { name: "Basic AI matching", included: true },
          { name: "Email support", included: true },
          { name: "Advanced analytics", included: false },
          { name: "Custom branding", included: false }
        ]
      },
      {
        id: "pro-yearly",
        name: "Professional",
        description: "Ideal for growing companies",
        price: 990,
        billingPeriod: "yearly" as const,
        popular: true,
        features: [
          { name: "Unlimited job postings", included: true },
          { name: "Advanced AI matching", included: true },
          { name: "Priority support", included: true },
          { name: "Advanced analytics", included: true },
          { name: "Custom branding", included: true }
        ]
      },
      {
        id: "enterprise-yearly",
        name: "Enterprise",
        description: "For large organizations",
        price: 2990,
        billingPeriod: "yearly" as const,
        features: [
          { name: "Everything in Pro", included: true },
          { name: "Custom AI models", included: true },
          { name: "Dedicated support", included: true },
          { name: "API access", included: true },
          { name: "Custom integrations", included: true }
        ]
      }
    ]
  };



