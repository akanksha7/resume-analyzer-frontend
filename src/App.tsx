import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import './index.css';
import LoginPage from './pages/LoginPage';
import PricingPage from './pages/PricingPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import DashboardPage from './pages/DashboardPage';
import ResumeAnalysisPage from './pages/ResumeAnalysisPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/plans" element={<PricingPage />} />
        <Route path="/checkout/:planId" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/resume-analysis" element={<ResumeAnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;