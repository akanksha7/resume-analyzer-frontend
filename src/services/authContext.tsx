// import { createContext, useReducer, useContext, useEffect } from 'react';
// import { api } from './api';
// import type { AuthState, LoginResponse, User } from '@/types/auth';
// import { getUserFromToken } from '@/lib/jwt';

// type AuthAction =
//   | { type: 'LOGIN_START' }
//   | { type: 'LOGIN_SUCCESS'; payload: { accessToken: string; refreshToken: string; user: User } }
//   | { type: 'LOGIN_FAILURE'; payload: string }
//   | { type: 'LOGOUT' };

// interface AuthContextType extends Omit<AuthState, 'error'> {
//   login: (credentials: { email: string; password: string }) => Promise<void>;
//   logout: () => void;
//   error: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   accessToken: null,
//   refreshToken: null,
//   isAuthenticated: false,
//   isLoading: false,
//   error: null,
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// function authReducer(state: AuthState, action: AuthAction): AuthState {
//   switch (action.type) {
//     case 'LOGIN_START':
//       return {
//         ...state,
//         isLoading: true,
//         error: null,
//       };
//     case 'LOGIN_SUCCESS':
//       return {
//         ...state,
//         user: action.payload.user,
//         accessToken: action.payload.accessToken,
//         refreshToken: action.payload.refreshToken,
//         isAuthenticated: true,
//         isLoading: false,
//         error: null,
//       };
//     case 'LOGIN_FAILURE':
//       return {
//         ...state,
//         user: null,
//         accessToken: null,
//         refreshToken: null,
//         isAuthenticated: false,
//         isLoading: false,
//         error: action.payload,
//       };
//     case 'LOGOUT':
//       return initialState;
//     default:
//       return state;
//   }
// }

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   useEffect(() => {
//     const accessToken = localStorage.getItem('accessToken');
//     const refreshToken = localStorage.getItem('refreshToken');
    
//     if (accessToken) {
//       const user = getUserFromToken(accessToken);
//       if (user) {
//         dispatch({ 
//           type: 'LOGIN_SUCCESS', 
//           payload: { 
//             accessToken,
//             refreshToken: refreshToken || '',
//             user
//           } 
//         });
//       } else {
//         // Token is invalid or expired
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//       }
//     }
//   }, []);

//   const login = async ({ email, password }: { email: string; password: string }) => {
//     dispatch({ type: 'LOGIN_START' });

//     try {
//       const response: LoginResponse = await api.login({ email, password });
      
//       const { access_token, refresh_token } = response;
//       const user = getUserFromToken(access_token);
      
//       if (!user) {
//         throw new Error('Invalid token received');
//       }

//       localStorage.setItem('accessToken', access_token);
//       localStorage.setItem('refreshToken', refresh_token);
      
//       dispatch({ 
//         type: 'LOGIN_SUCCESS', 
//         payload: { 
//           accessToken: access_token,
//           refreshToken: refresh_token,
//           user
//         } 
//       });
//     } catch (error) {
//       dispatch({ 
//         type: 'LOGIN_FAILURE', 
//         payload: error instanceof Error ? error.message : 'Failed to login' 
//       });
//       throw error;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     dispatch({ type: 'LOGOUT' });
//   };

//   return (
//     <AuthContext.Provider value={{ ...state, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// services/authContext.tsx
import { createContext, useReducer, useContext, useEffect } from 'react';
import { api } from './api';
import type { AuthState, LoginResponse, User } from '@/types/auth';

type AuthAction =
  | { type: 'AUTH_INIT' }
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: LoginResponse }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

interface AuthContextType extends Omit<AuthState, 'error'> {
  login: (credentials: { email: string; password: string }) => Promise<LoginResponse>;
  logout: () => void;
  error: string | null;
  checkAuth: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true
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
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const checkAuth = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'No token found' });
      return;
    }

    try {
      // Get user data using token
      const response = await api.login({ email: 'test@test.com', password: 'test' });
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: {
          access_token: accessToken,
          refresh_token: localStorage.getItem('refreshToken') || '',
          user: response.user,
          expires_in: 3600,
          roles: [],
          token_type: 'Bearer'
        }
      });
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: 'Session expired' 
      });
    }
  };

  // Check auth state on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const login = async ({ email, password }: { email: string; password: string }) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await api.login({ email, password });
      
      localStorage.setItem('accessToken', response.access_token);
      localStorage.setItem('refreshToken', response.refresh_token);
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: response
      });

      return response;
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error instanceof Error ? error.message : 'Failed to login' 
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, checkAuth }}>
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