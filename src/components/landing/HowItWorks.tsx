import { motion } from 'framer-motion';
import { Upload, Search, CheckCircle } from 'lucide-react';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const steps = [
    { 
      icon: Upload,
      title: "Upload Resumes",
      desc: "Easily upload candidate resumes in bulk. Our system supports multiple formats and provides instant processing."
    },
    { 
      icon: Search,
      title: "AI Analysis",
      desc: "Our advanced AI analyzes each resume, matching skills, experience, and potential cultural fit with your requirements."
    },
    { 
      icon: CheckCircle,
      title: "Make Informed Decisions",
      desc: "Review AI-powered insights and recommendations to make data-driven hiring decisions with confidence."
    }
  ];

  return (
    <section ref={ref} className="relative h-screen flex items-center bg-[#0F1629]">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Simple Yet Powerful Process
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Our streamlined workflow combines AI efficiency with human expertise 
            to help you make better hiring decisions, faster.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto relative">
          {/* Connection Lines */}
          <div className="hidden md:flex absolute left-0 right-0 justify-center" style={{ top: '6rem' }}>
            <div className="w-2/3 h-[1px] bg-blue-500/30" />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isInView ? 1 : 0, 
                y: isInView ? 0 : 20 
              }}
              transition={{ 
                duration: 0.5,
                delay: isInView ? index * 0.2 : 0 
              }}
            >
              <div className="relative flex flex-col items-center">
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  <step.icon className="w-16 h-16 text-white" />
                </div>
                {/* Step Number */}
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 mt-6 text-center">
                {step.title}
              </h3>
              <p className="text-gray-300 text-center leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;