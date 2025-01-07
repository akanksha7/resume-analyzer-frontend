import { createContext, useReducer, useContext, useEffect } from 'react';
import { api } from './api';
import type { AuthState, LoginResponse, User } from '@/types/auth';
import { isValidToken, getUserFromToken } from '@/lib/utils';


type AuthAction =
  | { type: 'AUTH_INIT' }
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: LoginResponse }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_USER'; payload: User };

interface AuthContextType extends Omit<AuthState, 'error'> {
  login: (credentials: { email: string; password: string }) => Promise<LoginResponse>;
  logout: () => void;
  error: string | null;
  checkAuth: () => Promise<void>;
  refreshAccessToken: () => Promise<string>;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_INIT':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    default:
      return state;
  }
}

const storeTokens = (response: LoginResponse) => {
  if (!response.access_token || !response.refresh_token) {
    throw new Error('Invalid token response');
  }

  const expiresAt = Date.now() + (response.expires_in * 1000);
  
  [localStorage, sessionStorage].forEach(storage => {
    storage.setItem('accessToken', response.access_token);
    storage.setItem('refreshToken', response.refresh_token);
    storage.setItem('tokenExpiresAt', expiresAt.toString());
  });
};

const clearTokens = () => {
  [localStorage, sessionStorage].forEach(storage => {
    storage.removeItem('accessToken');
    storage.removeItem('refreshToken');
    storage.removeItem('tokenExpiresAt');
  });
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    ...initialState,
    accessToken: sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken'),
    refreshToken: sessionStorage.getItem('refreshToken') || localStorage.getItem('refreshToken'),
  });

  const checkAuth = async () => {
    dispatch({ type: 'AUTH_INIT' });
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken || !isValidToken(accessToken)) {
      clearTokens();
      dispatch({ type: 'LOGIN_FAILURE', payload: '' });
      return;
    }

    try {
      const userData = getUserFromToken(accessToken);
      if (!userData) {
        throw new Error('Invalid token');
      }
      
      dispatch({ type: 'SET_USER', payload: userData });
    } catch (error) {
      clearTokens();
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Session expired' });
    }
  };

  const login = async ({ email, password }: { email: string; password: string }) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await api.login({ email, password });
      storeTokens(response);
      
      const userData = getUserFromToken(response.access_token);
      if (!userData) {
        throw new Error('Invalid token received during login');
      }
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: { ...response, user: userData } });
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to login';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const logout = () => {
    clearTokens();
    dispatch({ type: 'LOGOUT' });
  };

  const refreshAccessToken = async () => {
    const refresh_token = localStorage.getItem('refreshToken');
    if (!refresh_token) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await api.refreshToken(refresh_token);
      storeTokens(response);
      
      const userData = getUserFromToken(response.access_token);
      if (!userData) {
        throw new Error('Invalid token received during refresh');
      }
      
      dispatch({ type: 'SET_USER', payload: userData });
      return response.access_token;
    } catch (error) {
      logout();
      throw error;
    }
  };

  // Token validation check effect
  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('accessToken');
      if (token && !isValidToken(token)) {
        try {
          await refreshAccessToken();
        } catch (error) {
          logout();
        }
      }
    };

    checkTokenValidity();
    const interval = setInterval(checkTokenValidity, 30000);
    return () => clearInterval(interval);
  }, []);

  // Storage sync check effect
  useEffect(() => {
    const localToken = localStorage.getItem('accessToken');
    const sessionToken = sessionStorage.getItem('accessToken');
    
    if (localToken && !sessionToken) {
      clearTokens();
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  // Initial auth check
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, checkAuth, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};