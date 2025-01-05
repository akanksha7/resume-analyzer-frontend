import { useContext, useState } from "react";
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
import { registerEmail, verifyEmail } from "@/services/api";
import { RegistrationContext } from '@/services/registrationContext';
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";

export default function CheckoutPage() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState('');
 const [showPassword, setShowPassword] = useState(false);
 const [isEmailVerified, setIsEmailVerified] = useState(false);
 const [otpVerified, setOtpVerified] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const navigate = useNavigate();
 const context = useContext(RegistrationContext);

 if (!context) throw new Error("Must be used within RegistrationProvider");
 const { state: { plan } } = context;

 if (!plan) {
   navigate('/pricing');
   return;
 }

 const handleVerifyEmail = async () => {
   try {
     setIsLoading(true);
    //  await veri(email, password, plan.id);
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

 const handleRegister = async () => {
  try {
    setIsLoading(true);
    await registerEmail(email, password, plan.id);
    await verifyEmail(email);
    setIsEmailVerified(true);
    toast({
      title: "Success",
      description: "Registration successful",
      variant: "default",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Registration failed",
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
           Complete registration to proceed with payment
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
             <div className="grid gap-2">
             <label htmlFor="password" className="text-foreground">Password</label>
             <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background-tertiary border-border/40 pr-10"
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  )}
                  <span className="sr-only">
                    {showPassword ? 'Hide password' : 'Show password'}
                  </span>
                </Button>
              </div>
            </div>
             <Button
               onClick={handleRegister}
               disabled={isLoading || !email || !password}
               className="w-full bg-primary hover:bg-primary-hover active:bg-primary-active 
                      text-primary-foreground shadow-lg transition-all duration-200"
             >
               {isLoading ? "Registering..." : "Register"}
             </Button>
             {/* <Button
               onClick={handleVerifyEmail}
               disabled={isLoading || !email}
               className="w-full bg-primary hover:bg-primary-hover active:bg-primary-active 
                      text-primary-foreground shadow-lg transition-all duration-200"
             >
               {isLoading ? "Sending..." : "Verify Email"}
             </Button> */}
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