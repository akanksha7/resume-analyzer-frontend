
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  roles: string[];
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  roles: string[];
  token_type: string;
}

