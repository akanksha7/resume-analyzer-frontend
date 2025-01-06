// components/landing/Stats.tsx
import { motion } from 'framer-motion';
import { Clock, Users, Award } from 'lucide-react';

const stats = [
  { number: "40%", label: "Time Saved in Hiring", icon: Clock },
  { number: "2x", label: "More Quality Candidates", icon: Users },
  { number: "90%", label: "Client Satisfaction", icon: Award }
];

export const Stats = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            className="text-center p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50 
                       backdrop-blur-sm hover:bg-gray-800/40 transition-all"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
            <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};