import { useEffect } from "react";

const useStripeScript = () => {
  useEffect(() => {
    const scriptId = "stripe-buy-button-script";

    // Check if the script already exists
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
};

export default useStripeScript;
