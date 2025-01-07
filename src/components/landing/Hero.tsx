// components/landing/Hero.tsx
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import BannerSVG from '../assets/BannerSVG';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };
  

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
    {/* Animated Background */}
    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
    
    <motion.div
      className="relative z-10 text-center px-4 max-w-5xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.8 }}
    >
          <div className="w-full max-w-3xl mx-auto mb-12">
    <BannerSVG />
  </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-6"
      >
        <h1 className="text-7xl font-extrabold text-white leading-tight tracking-tight">
          Transform Your{" "}
          <span className="relative">
            <span className="gradient-text">Hiring Process</span>
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-blue-400/30"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            ></motion.span>
          </span>
        </h1>
        
        <p className="text-2xl text-gray-300 mx-auto leading-relaxed">
          Leverage advanced AI technology to streamline your recruitment process,
          <br className="hidden md:block" />
          while keeping the human touch at the heart of hiring decisions.
        </p>
        
        <motion.div 
          className="flex flex-wrap gap-6 justify-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button 
            className="group px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold flex items-center gap-3 hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/25 glow animated-border"
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Log In
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.button 
            className="group px-8 py-4 bg-gray-800/50 text-white rounded-xl font-semibold hover:bg-gray-700/50 transition-all border border-gray-700/50 flex items-center gap-3 backdrop-blur-sm"
            onClick={() => navigate('/plans')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Plans
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  </div>

  );
};