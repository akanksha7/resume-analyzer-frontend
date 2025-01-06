// components/landing/CallToAction.tsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute -inset-1">
          <div className="w-full h-full mx-auto opacity-30 blur-xl filter bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400"></div>
        </div>

        <div className="relative bg-gray-900/50 rounded-2xl p-12 backdrop-blur-sm border border-white/10">
          <h2 className="text-4xl font-bold text-white text-center mb-6">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto text-center">
            Join forward-thinking companies using TalentTuner to enhance their recruitment process 
            while maintaining the human touch in hiring decisions.
          </p>
          
          <div className="flex flex-col items-center gap-6">
            <motion.button
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg group flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/plans')}
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <p className="text-blue-200/80 text-sm">
              No credit card required • Free trial available
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};