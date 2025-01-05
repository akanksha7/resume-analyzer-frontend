import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { InputOTPForm } from "@/components/input-otp-form";
import { toast } from "@/components/hooks/use-toast";
import { verifyEmail, verifyOTP } from "@/services/api";

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // Redirect if no email provided
  if (!email) {
    navigate('/register');
    return null;
  }

  // async function onSubmit(otp: string) {
  //   try {
  //     setIsLoading(true);
  //     await verifyOTP(email, otp);
      
  //     toast({
  //       title: "Success",
  //       description: "Email verified successfully",
  //       variant: "default",
  //     });

  //     navigate('/plans');
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Verification failed. Please try again.",
  //       variant: "destructive",
  //     });
  //     throw error; // Re-throw to be handled by the form
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  const handleResendCode = async () => {
    try {
      setIsLoading(true);
      await verifyEmail(email);
      toast({
        title: "Success",
        description: "Verification code resent",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-md bg-background-secondary border-border shadow-2xl">
        <CardHeader className="space-y-3">
          <CardTitle className="text-foreground text-2xl font-bold">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-foreground-muted">
            Enter the verification code sent to {email}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <InputOTPForm 
              email={email} 
            />
          </motion.div>

          <div className="pt-6 border-t border-border">
            <p className="text-center text-foreground-subtle text-sm">
              Didn't receive the code?{" "}
              <button 
                className="text-primary hover:text-primary-hover"
                onClick={handleResendCode}
                disabled={isLoading}
              >
                Resend
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}