import { Plan } from '@/types/types';

export interface LoginCredentials {
  email: string;
  password: string;
}


export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface User {
  id: string;
  email: string;
  email_verified: boolean;
  is_active_plan: boolean;
  plan_id: string | null;
  plan_started_at: string | null;
  plan_type: string;
  remaining_analysis: number;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  roles: string[];
  token_type: string;
  user: User;
}

export interface RegistrationState {
  plan:  Plan | null;
  email: string;
  isEmailVerified: boolean;
  isPaymentCompleted: boolean;
}