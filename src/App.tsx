import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/services/authContext';
import { Toaster } from '@/components/ui/toaster';
import { LoadingSpinner } from '@/components/loading-spinner';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import PricingPage from './pages/PricingPage';
import CheckoutPage from './pages/CheckoutPage';
import ReturnPage from './pages/ReturnPage';
import DashboardPage from './pages/DashboardPage';
import ResumeAnalysisPage from './pages/ResumeAnalysisPage';
import LandingPage from './pages/LandingPage';
import UsageDashboard from './pages/UsageDashboard';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

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


function VerifyOTPRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user?.email) {
    debugger;
    return <Navigate to="/login" replace />;
  }

  // If already verified, redirect to appropriate page
  if (user.email_verified) {
    return <Navigate to={user.is_active_plan ? '/dashboard' : '/plans'} replace />;
  }

  return <>{children}</>;
}

function ReturnPageRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.email_verified) {
    return <Navigate to="/verify-otp" replace />;
  }

  return <>{children}</>;
}

// function ReturnPageRoute({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated, isLoading, user } = useAuth();

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   // Redirect to login if not authenticated
//   if (!isAuthenticated || !user?.email) {
//     return <Navigate to="/login" replace />;
//   }

//   // If already verified, redirect to appropriate page
//   if (user.email_verified) {
//     return <Navigate to={user.is_active_plan ? '/dashboard' : '/plans'} replace />;
//   }

//   return <>{children}</>;
// }

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Verification route with special protection */}
      <Route path="/verify-otp" element={
        <VerifyOTPRoute>
          <VerifyOtpPage />
        </VerifyOTPRoute>
      } />
      <Route path="/plans" element={<PricingPage />} />
      <Route path="/checkout/:planId" element={<CheckoutPage />} />
      
      {/* Protected routes */}
      <Route path="/success" element={<ReturnPage />} />
      {/* Protected routes */}
      <Route path="/return" element={
        <ReturnPageRoute>
          <ReturnPage />
        </ReturnPageRoute>
      } />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/resume-analysis" element={<ProtectedRoute><ResumeAnalysisPage /></ProtectedRoute>} />
      <Route path="/usage" element={<ProtectedRoute><UsageDashboard /></ProtectedRoute>} />
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