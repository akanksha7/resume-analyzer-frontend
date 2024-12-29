// src/components/StripeButton.tsx
import React, { useEffect } from "react";

interface StripeButtonProps {
  planId: string; // Plan ID to identify the specific product
  className?: string; // Additional class names for styling
}

export const StripeButton: React.FC<StripeButtonProps> = ({ planId, className }) => {
  useEffect(() => {
    // Load the Stripe script dynamically
    const scriptId = "stripe-buy-button-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://js.stripe.com/v3/buy-button.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log("Stripe script loaded");
      };

      script.onerror = () => {
        console.error("Failed to load Stripe script");
      };
    }
  }, []);

  // Replace with your actual Stripe Buy Button IDs
  const stripeBuyButtonIds = {
    basic: "buy_btn_1QaMhjH0gqnHYygLiy0tvOFf",
    pro: "buy_btn_1QaMhjH0gqnHYygLiy0tvOFf",
    enterprise: "buy_btn_1QaMhjH0gqnHYygLiy0tvOFf",
  };

  return (
    <div className={className}>
      <stripe-buy-button
        buy-button-id={stripeBuyButtonIds[planId as keyof typeof stripeBuyButtonIds] || stripeBuyButtonIds.basic}
        publishable-key="pk_test_51QPg5VH0gqnHYygLquXYNEodur6uMqMAUzYF4E8l6QQ7GIzfSxpCpXoTOgdYgHV2J8XrLsRa6Lk9qDTvZSBAk1DM00sEenteNt" // Replace with your Stripe publishable key
        success-url="http://localhost:5177/success" // Replace with your success URL
        cancel-url="http://localhost:5177/plans" // Replace with your cancel URL
      >
      </stripe-buy-button>
    </div>
  );
};
