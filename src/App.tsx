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

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner /> 
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Public Route Component - redirects to dashboard if already authenticated
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner /> 
  }

  if (isAuthenticated) {
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
      <Route path="/plans" element={<PricingPage />} />
      <Route 
        path="/checkout/:planId" 
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
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
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;