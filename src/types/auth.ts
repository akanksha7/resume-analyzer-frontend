

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
  email: string;
  email_verified: boolean;
  id: string;
  is_active_plan: boolean;
  plan_id: string;
  plan_started_at: string | null;
  plan_type: string;
  remaining_analysis: number;
}

export interface LoginResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  roles: string[];
  token_type: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}