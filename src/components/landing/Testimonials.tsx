// components/landing/Testimonials.tsx
import { motion } from 'framer-motion';

export const Testimonials = () => {
  return (
    <div className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Trusted by Leading Companies
          </motion.h2>
          <motion.div
            className="relative bg-gray-800 p-8 rounded-2xl max-w-3xl mx-auto border border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute -inset-1">
              <div className="w-full h-full mx-auto opacity-30 blur-lg filter bg-gradient-to-r from-blue-400 to-purple-500"></div>
            </div>
            <div className="relative">
              <p className="text-gray-300 text-lg italic mb-8">
                "TalentTuner has revolutionized our hiring process. The AI analysis helps us quickly identify promising candidates, 
                while keeping our team in control of the final decisions. We've reduced time-to-hire by 40% while maintaining our 
                high hiring standards. The insights provided have been invaluable for making informed decisions."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/women/65.jpg" 
                  alt="Sarah Johnson" 
                  className="w-12 h-12 rounded-full border-2 border-blue-400 mr-4" 
                />
                <div>
                  <p className="text-white font-semibold">Sarah Johnson</p>
                  <p className="text-gray-400">HR Director, Tech Innovators Inc.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
  );
};