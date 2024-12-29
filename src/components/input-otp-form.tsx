import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";



import { verifyOTP } from "@/services/api";

const FormSchema = z.object({
 pin: z.string().length(6, {
   message: "The OTP must be exactly 6 characters.",
 }),
});

interface InputOTPFormProps {
 email: string;
 onOtpVerified: () => void;
}

export function InputOTPForm({ email, onOtpVerified }: InputOTPFormProps) {
 const [isVerifying, setIsVerifying] = useState(false);

 const form = useForm<z.infer<typeof FormSchema>>({
   resolver: zodResolver(FormSchema),
   defaultValues: {
     pin: "",
   },
 });

 async function onSubmit(data: z.infer<typeof FormSchema>) {
   try {
     setIsVerifying(true);
     await verifyOTP(email, data.pin);
     onOtpVerified();
     toast({
       title: "Success",
       description: "Email verified successfully",
       variant: "default",
     });
   } catch (error) {
     toast({
       title: "Error",
       description: error instanceof Error ? error.message : "Invalid code",
       variant: "destructive",
     });
     form.reset();
   } finally {
     setIsVerifying(false);
   }
 }

 return (
   <Form {...form}>
     <form
       onSubmit={form.handleSubmit(onSubmit)}
       className="space-y-6"
     >
       <FormField
         control={form.control}
         name="pin"
         render={({ field }) => (
           <FormItem>
             <FormLabel>Verification Code</FormLabel>
             <FormControl>
               <InputOTP maxLength={6} {...field}>
                 <InputOTPGroup>
                   {[...Array(6)].map((_, i) => (
                     <InputOTPSlot key={i} index={i} />
                   ))}
                 </InputOTPGroup>
               </InputOTP>
             </FormControl>
             <FormDescription>
               Enter the 6-digit code sent to your email
             </FormDescription>
             <FormMessage />
           </FormItem>
         )}
       />

       <Button
         type="submit"
         disabled={isVerifying}
         className="w-full bg-primary hover:bg-primary-hover"
       >
         {isVerifying ? "Verifying..." : "Verify Code"}
       </Button>
     </form>
   </Form>
 );
}