import { User } from "@/types/auth";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const getUserFromToken = (token: string): User | null => {
  try {
    const decoded = parseJwt(token);
    if (!decoded || !decoded.user) return null;

    return {
      id: decoded.user.id,
      email: decoded.user.email,
      plan_id: decoded.user.plan_id,
      plan_type: decoded.user.plan_type,
      plan_started_at: decoded.user.plan_started_at,
      remaining_analysis: decoded.user.remaining_analysis,
      is_active_plan: decoded.user.is_active_plan,
      email_verified: decoded.user.email_verified
    };
  } catch (error) {
    return null;
  }
};

export const isValidToken = (token: string | null): boolean => {
  if (!token) return false;
  
  try {
    const decoded = parseJwt(token);
    if (!decoded || !decoded.exp) return false;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};
