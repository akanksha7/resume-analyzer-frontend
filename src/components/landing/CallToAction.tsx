// components/landing/CallToAction.tsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <div className="relative py-24 bg-blue-600">
    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
    <div className="container mx-auto px-4 text-center">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your Hiring?
        </h2>
        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
          Join forward-thinking companies using TalentTuner to enhance their recruitment process 
          while maintaining the human touch in hiring decisions.
        </p>
        <motion.button
          className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg group flex items-center gap-3 mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/plans')}
        >
          Get Started Now
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>

      </motion.div>
    </div>
  </div>
  );
};