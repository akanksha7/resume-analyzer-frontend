import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/services/authContext';
import { Toaster } from '@/components/ui/toaster';
import { LoadingSpinner } from '@/components/loading-spinner';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import PricingPage from './pages/PricingPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import DashboardPage from './pages/DashboardPage';
import ResumeAnalysisPage from './pages/ResumeAnalysisPage';


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  debugger;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.email_verified) {
    return <Navigate to="/verify-otp" replace />;
  }

  if (!user?.is_active_plan) {
    return <Navigate to="/plans" replace />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated && user) {
    if (!user.email_verified) {
      return <Navigate to="/verify-otp" replace />;
    }

    if (!user.is_active_plan) {
      return <Navigate to="/plans" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path="/verify-otp" element={<PublicRoute><VerifyOtpPage /></PublicRoute>} />
      {/* <Route path="/about" element={<PublicRoute><AboutPage /></PublicRoute>} /> */}
      
      {/* Semi-protected routes */}
      <Route path="/plans" element={<PricingPage />} />
      <Route path="/checkout/:planId" element={<CheckoutPage />} />
      
      {/* Protected routes */}
      <Route path="/success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/resume-analysis" element={<ProtectedRoute><ResumeAnalysisPage /></ProtectedRoute>} />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

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