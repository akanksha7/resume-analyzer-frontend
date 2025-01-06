// components/landing/HowItWorks.tsx
import { motion } from 'framer-motion';
import { Upload, Search, CheckCircle } from 'lucide-react';

const steps = [
  { 
    icon: Upload,
    step: "1",
    title: "Upload Resumes",
    desc: "Easily upload candidate resumes in bulk. Our system supports multiple formats and provides instant processing."
  },
  { 
    icon: Search,
    step: "2",
    title: "AI Analysis",
    desc: "Our advanced AI analyzes each resume, matching skills, experience, and potential cultural fit with your requirements."
  },
  { 
    icon: CheckCircle,
    step: "3",
    title: "Make Informed Decisions",
    desc: "Review AI-powered insights and recommendations to make data-driven hiring decisions with confidence."
  }
];

export const HowItWorks = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        className="text-center max-w-3xl mx-auto mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-white mb-6">
          Simple Yet Powerful Process
        </h2>
        <p className="text-gray-300 text-lg">
          Our streamlined workflow combines AI efficiency with human expertise 
          to help you make better hiring decisions, faster.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
        {/* Connecting Lines */}
        <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-px bg-gradient-to-r from-blue-500/50 via-blue-500/25 to-transparent"></div>
        <div className="hidden md:block absolute top-24 left-2/4 right-1/4 h-px bg-gradient-to-r from-blue-500/50 via-blue-500/25 to-transparent"></div>

        {steps.map((item, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <div className="relative z-10 text-center">
              <motion.div 
                className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-500/20"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {item.step}
              </motion.div>
              <motion.div 
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm"
                whileHover={{ translateY: -5 }}
              >
                <item.icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};