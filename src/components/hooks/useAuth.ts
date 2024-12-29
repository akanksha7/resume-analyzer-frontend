import { useState } from 'react';
import { LoginCredentials } from '@/types/auth';

export const useAuth = () => {
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const login = async (credentials: LoginCredentials) => {
   setIsLoading(true);
   setError(null);
   
   try {
     const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(credentials)
     });

     if (!response.ok) {
       throw new Error('Login failed');
     }

     const data = await response.json();
     localStorage.setItem('token', data.token);
     
     return data;
   } catch (err) {
     setError(err instanceof Error ? err.message : 'Login failed');
     throw err;
   } finally {
     setIsLoading(false);
   }
 };

 return { login, isLoading, error };
};
