import { Plan } from "@/types/types";
import { createContext, useState, useEffect } from "react";
import { RegistrationState } from "@/types/auth";

export const RegistrationContext = createContext<{
    state: RegistrationState;
    setPlan: (plan: Plan) => void;
    setEmail: (email: string) => void;
    setEmailVerified: (verified: boolean) => void;
    setPaymentCompleted: (completed: boolean) => void;
  } | undefined>(undefined);
  
  export function RegistrationProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<RegistrationState>({
      plan: null,
      email: '',
      isEmailVerified: false,
      isPaymentCompleted: false
    });
  
    // Store state in localStorage to persist across page reloads
    useEffect(() => {
      const stored = localStorage.getItem('registration');
      if (stored) {
        setState(JSON.parse(stored));
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem('registration', JSON.stringify(state));
    }, [state]);
  
    return (
      <RegistrationContext.Provider value={{
        state,
        setPlan: (plan) => setState(prev => ({ ...prev, plan })),
        setEmail: (email) => setState(prev => ({ ...prev, email })),
        setEmailVerified: (verified) => setState(prev => ({ ...prev, isEmailVerified: verified })),
        setPaymentCompleted: (completed) => setState(prev => ({ ...prev, isPaymentCompleted: completed }))
      }}>
        {children}
      </RegistrationContext.Provider>
    );
  }