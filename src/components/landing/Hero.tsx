// components/landing/Hero.tsx
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import BannerSVG from '../assets/BannerSVG';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen py-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <motion.div
        className="text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
     
          <BannerSVG />
      
        <h1 className="mt-12 text-6xl font-bold text-white leading-tight tracking-tight">
          Transform Your{" "}
          <span className="text-blue-400 relative">
            Hiring Process
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-400/30" />
          </span>
        </h1>

        <p className="mt-8 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Leverage advanced AI technology to streamline your recruitment process, 
          while keeping the human touch at the heart of hiring decisions.
        </p>

        <div className="mt-12 flex flex-wrap gap-6 justify-center">
          <motion.button 
            className="group px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold 
                       flex items-center gap-3 hover:bg-blue-600 transition-all 
                       shadow-lg hover:shadow-blue-500/25"
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Log In
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button 
            className="group px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold 
                       hover:bg-gray-700 transition-all border border-gray-700 
                       flex items-center gap-3"
            onClick={() => navigate('/plans')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Plans
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 
                                   group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};