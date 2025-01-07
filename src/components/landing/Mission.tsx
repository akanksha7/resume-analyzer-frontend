// components/landing/Mission.tsx
import { motion } from 'framer-motion';
import { Clock, Target, Shield, Award, ChartBar } from 'lucide-react';
import ImpactCard from './ImpactCard';

const benefits = [
  { icon: Clock, text: "Faster Screening" },
  { icon: Target, text: "Better Matches" },
  { icon: Shield, text: "Reduced Bias" },
  { icon: Award, text: "Quality Hires" }
];

const impacts = [
  "Reduce time-to-hire by up to 40%",
  "Improve candidate quality scores by 85%",
  "Maintain human oversight in decisions",
  "Scale your hiring process efficiently"
];

export const Mission = () => {
  return (
    <div className="relative bg-gray-900/50 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4">
          <motion.div
            className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Empowering Human Decisions with Advanced AI
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                At TalentTuner, we believe in enhancing, not replacing, the human element in recruitment. 
                Our AI technology is designed to support hiring professionals by streamlining the screening 
                process while ensuring crucial decision-making remains in experienced hands.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Clock, text: "Faster Screening" },
                  { icon: Target, text: "Better Matches" },
                  { icon: Shield, text: "Reduced Bias" },
                  { icon: Award, text: "Quality Hires" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-1">
                <div className="w-full h-full mx-auto opacity-30 blur-lg filter bg-gradient-to-r from-blue-400 to-purple-500"></div>
              </div>
              {/* <div className="relative bg-gray-800 rounded-2xl p-8 border border-gray-700/50">
                <ChartBar className="w-16 h-16 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Real Impact</h3>
                <ul className="space-y-4">
                  {[
                    "Reduce time-to-hire by up to 40%",
                    "Improve candidate quality scores by 85%",
                    "Maintain human oversight in decisions",
                    "Scale your hiring process efficiently"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-blue-400/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div> */}
              <ImpactCard />
            </div>
          </motion.div>
        </div>
          {/* <motion.div 
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              {[
                { number: "40%", label: "Time Saved in Hiring", icon: Clock },
                { number: "2x", label: "More Quality Candidates", icon: Users },
                { number: "90%", label: "Client Satisfaction", icon: Award }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/40 transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div> */}
      </div>
  );
};