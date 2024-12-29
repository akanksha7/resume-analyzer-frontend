
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/hooks/useAuth';

export function LoginForm() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const { login, isLoading, error } = useAuth();
 const navigate = useNavigate();

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   
   try {
     await login({ email, password });
     navigate('/dashboard');
   } catch (error) {
     // Error handled by useAuth
   }
 };

 return (
   <Card className="border-border/40 bg-background-secondary">
     <CardHeader>
       <CardTitle className="text-2xl text-foreground">Login</CardTitle>
       <CardDescription className="text-foreground-muted">
         Enter your credentials to access your account
       </CardDescription>
     </CardHeader>
     
     <CardContent>
       <form onSubmit={handleSubmit}>
         <div className="flex flex-col gap-6">
           {error && (
             <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">
               {error}
             </div>
           )}
           
           <div className="grid gap-2">
             <Label htmlFor="email" className="text-foreground">Email</Label>
             <Input
               id="email"
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="name@example.com"
               className="bg-background-tertiary border-border/40"
               required
             />
           </div>

           <div className="grid gap-2">
             <div className="flex items-center">
               <Label htmlFor="password" className="text-foreground">Password</Label>
               <a href="#" className="ml-auto text-sm text-primary hover:text-primary-hover">
                 Forgot password?
               </a>
             </div>
             <Input
               id="password"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="bg-background-tertiary border-border/40"
               required
             />
           </div>

           <Button 
             type="submit" 
             className="w-full"
             disabled={isLoading}
           >
             {isLoading ? 'Logging in...' : 'Login'}
           </Button>

         </div>

         <div className="mt-6 text-center text-sm text-foreground-muted">
           Don't have an account?{' '}
           <a href="/plans" className="text-primary hover:text-primary-hover">
             Sign up
           </a>
         </div>
       </form>
     </CardContent>
   </Card>
 );
}