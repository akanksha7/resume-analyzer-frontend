import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/services/authContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import PricingPage from './pages/PricingPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import DashboardPage from './pages/DashboardPage';
import ResumeAnalysisPage from './pages/ResumeAnalysisPage';
import './index.css';
import { LoadingSpinner } from './components/loading-spinner';
import RegisterPage from './pages/RegisterPage';
import { Toaster } from './components/ui/toaster';
import VerifyOtpPage from './pages/VerifyOtpPage';



// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user} = useAuth();
  debugger;
  if (isLoading) {
    return <LoadingSpinner /> 
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if(!user?.email_verified) {
    return <Navigate to="/verify-otp" state={{ email: user?.email }} replace />;
  }
  if(!user?.is_active_plan) {
    return <Navigate to="/plans" state={{ isAuthenticated: true }} replace />;
  }


  return <>{children}</>;
}

// Public Route Component - redirects to dashboard if already authenticated
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingSpinner /> 
  }

  if (isAuthenticated && user?.email_verified && user?.is_active_plan) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

// App Routes Component
function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />
       <Route path="/register" element={
         <PublicRoute>
            <RegisterPage />
        </PublicRoute>
      } />
      
      <Route path="/verify-otp" element={
        <PublicRoute>
          <VerifyOtpPage />
        </PublicRoute>
      } />

      <Route path="/plans" element={
         <PublicRoute>
            <PricingPage />
        </PublicRoute>
      } />
      <Route 
        path="/checkout/:planId" 
        element={
          <PublicRoute>
            <CheckoutPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/success" 
        element={
          <ProtectedRoute>
            <SuccessPage />
          </ProtectedRoute>
        } 
      />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resume-analysis"
        element={
          <ProtectedRoute>
            <ResumeAnalysisPage />
          </ProtectedRoute>
        }
      />

      {/* Catch all route - redirect to landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster />
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;