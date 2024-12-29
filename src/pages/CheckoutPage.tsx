import { useState } from "react";
import { motion } from "framer-motion";
import {
 Card,
 CardContent,
 CardHeader,
 CardTitle,
 CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTPForm } from "@/components/input-otp-form";
import { StripeButton } from "@/components/stripe-button";
import { toast } from "@/components/hooks/use-toast";
import { verifyEmail } from "@/services/api";

export default function CheckoutPage() {
 const [email, setEmail] = useState("");
 const [isEmailVerified, setIsEmailVerified] = useState(false);
 const [otpVerified, setOtpVerified] = useState(false);
 const [isLoading, setIsLoading] = useState(false);

 const handleVerifyEmail = async () => {
   try {
     setIsLoading(true);
     await verifyEmail(email);
     setIsEmailVerified(true);
     toast({
       title: "Success",
       description: "Verification code sent to your email",
       variant: "default",
     });
   } catch (error) {
     toast({
       title: "Error",
       description: error instanceof Error ? error.message : "Failed to send code",
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
     <Card className="w-full max-w-md bg-background-secondary border-border shadow-2xl justify-center">
       <CardHeader className="space-y-3">
         <CardTitle className="text-foreground text-2xl font-bold">
           Secure Checkout
         </CardTitle>
         <CardDescription className="text-foreground-muted">
           Complete verification to proceed with payment
         </CardDescription>
       </CardHeader>

       <CardContent className="space-y-6">
         {!isEmailVerified && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="space-y-4"
           >
             <div>
               <label className="block text-foreground mb-2 font-medium">
                 Email Address
               </label>
               <Input
                 type="email"
                 placeholder="Enter your email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="bg-input border-border text-foreground 
                        placeholder:text-foreground-subtle
                        focus:border-primary focus:ring-1 focus:ring-primary"
               />
             </div>
             <Button
               onClick={handleVerifyEmail}
               disabled={isLoading || !email}
               className="w-full bg-primary hover:bg-primary-hover active:bg-primary-active 
                      text-primary-foreground shadow-lg transition-all duration-200"
             >
               {isLoading ? "Sending..." : "Verify Email"}
             </Button>
           </motion.div>
         )}

         {isEmailVerified && !otpVerified && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-background-tertiary rounded-lg p-6 space-y-4"
           >
             {/* <h3 className="text-foreground font-medium">Verification Code</h3> */}
             <InputOTPForm 
               email={email}
               onOtpVerified={() => setOtpVerified(true)} 
             />
           </motion.div>
         )}

         {otpVerified && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="space-y-4"
           >
             <h3 className="text-foreground font-semibold">Complete Payment</h3>
             {/* <div className="bg-background-tertiary rounded-lg p-6"> */}
               <StripeButton planId="basic" className="w-full" />
             {/* </div> */}
           </motion.div>
         )}

         <div className="pt-6 border-t border-border">
           <p className="text-center text-foreground-subtle text-sm">
             Your data is encrypted and secure
           </p>
         </div>
       </CardContent>
     </Card>
   </motion.div>
 );
};