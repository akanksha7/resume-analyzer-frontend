// components/landing/Features.tsx
import { motion } from 'framer-motion';
import { Brain, Users, LineChart, Sparkles } from 'lucide-react';

const features = [
  { 
    icon: Brain,
    title: "AI-Powered Analysis", 
    desc: "Advanced resume parsing with state-of-the-art AI that provides detailed candidate insights while eliminating unconscious bias.",
    color: "from-blue-400/20 to-blue-600/20" 
  },
  { 
    icon: Users,
    title: "Smart Matching", 
    desc: "Intelligent candidate-job matching that considers both hard skills and cultural fit, supporting human decision-making.",
    color: "from-purple-400/20 to-purple-600/20"
  },
  { 
    icon: LineChart,
    title: "Analytics & Insights", 
    desc: "Comprehensive hiring analytics and actionable insights to help your team make data-driven decisions.",
    color: "from-green-400/20 to-green-600/20"
  },
  { 
    icon: Sparkles,
    title: "Human-Centric Design", 
    desc: "Intuitive interface that enhances recruiter workflow while maintaining the human touch in hiring.",
    color: "from-pink-400/20 to-pink-600/20"
  }
];

export const Features = () => {
  return (
    <div className="relative bg-gray-900/50 py-32">
  {/* <div className="absolute inset-0 bg-grid-pattern opacity-5"></div> */}
  {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-blue-500/5 to-gray-900/0"></div> */}
  
  <div className="container mx-auto px-4">
    <motion.div
      className="text-center max-w-3xl mx-auto mb-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >

      <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
        Powerful Features That Make a{' '}
        <span className="gradient-text">Difference</span>
      </h2>
      <p className="text-gray-300 text-xl leading-relaxed">
        Our comprehensive suite of tools combines AI efficiency with human insight 
        to create a balanced and effective hiring process.
      </p>
    </motion.div>

    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {[
        { 
          icon: Brain,
          title: "AI-Powered Analysis", 
          desc: "Advanced resume parsing with state-of-the-art AI that provides detailed candidate insights while eliminating unconscious bias.",
          color: "from-primary/10 to-primary/20"  
        },
        { 
          icon: Users,
          title: "Smart Matching", 
          desc: "Intelligent candidate-job matching that considers both hard skills and cultural fit, supporting human decision-making.",
          color: "from-primary/10 to-primary/20"  
        },
        { 
          icon: LineChart,
          title: "Analytics & Insights", 
          desc: "Comprehensive hiring analytics and actionable insights to help your team make data-driven decisions.",
          color: "from-primary/10 to-primary/20"  
        },
        { 
          icon: Sparkles,
          title: "Human-Centric Design", 
          desc: "Intuitive interface that enhances recruiter workflow while maintaining the human touch in hiring.",
          color: "from-primary/10 to-primary/20"  
        }
      ].map((feature, index) => (
        <motion.div 
          key={index}
          className="relative group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
          <div className="relative p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm group-hover:border-gray-600/50 transition-all h-full text-center">
            <div className="bg-gray-900/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
              <feature.icon className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-300 leading-relaxed text-justify">
              {feature.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</div>
  );
};