import { FC, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Clock, ShieldCheck } from 'lucide-react';

interface ImpactItem {
  title: string;
  value: number;
  icon: React.ElementType;
  description: string;
  color: string;
}

const ImpactCard: FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { 
    amount: 0.3,
    once: false // This ensures the animation triggers every time
  });

  const impactData: ImpactItem[] = [
    {
      title: "Time-to-hire Reduction",
      value: 40,
      icon: Clock,
      description: "Reduce time-to-hire by up to 40%",
      color: "bg-blue-500/80"  
    },
    {
      title: "Quality Score Improvement",
      value: 85,
      icon: TrendingUp,
      description: "Improve candidate quality scores by 85%",
      color: "bg-blue-600/80"  
    },
    {
      title: "Human Oversight",
      value: 100,
      icon: Users,
      description: "Maintain 100% human oversight in decisions",
      color: "bg-blue-500/80"  
    },
    {
      title: "Process Efficiency",
      value: 90,
      icon: ShieldCheck,
      description: "Scale your hiring process with 90% efficiency",
      color: "bg-blue-500/80"  
    }
  ];

  return (
    <div className="relative" ref={cardRef}>
      {/* Gradient background effect */}
      <div className="absolute -inset-1">
        <div className="w-full h-full mx-auto opacity-30 blur-lg filter bg-gradient-to-r from-blue-400/50 via-slate-600/50 to-slate-800/50" />
      </div>
      
      <motion.div 
        className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <BarChart3 className="w-12 h-12 text-blue-400" />
          <div>
            <h3 className="text-2xl font-bold text-white">Real Impact</h3>
            <p className="text-gray-400">Measurable results for your recruitment</p>
          </div>
        </div>

        <div className="space-y-6">
          {impactData.map((item, index) => (
            <motion.div
              key={item.title}
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isInView ? 1 : 0, 
                x: isInView ? 0 : -20 
              }}
              transition={{ 
                duration: 0.5,
                delay: isInView ? index * 0.2 : 0 
              }}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-gray-300" />
                  <span className="text-gray-300 font-medium">{item.title}</span>
                </div>
                <span className="text-white font-bold">{item.value}%</span>
              </div>
              
              <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className={`absolute left-0 top-0 h-full ${item.color} rounded-full`}
                  initial={{ width: "0%" }}
                  animate={{ width: isInView ? `${item.value}%` : "0%" }}
                  transition={{ 
                    duration: 1, 
                    delay: isInView ? index * 0.2 + 0.3 : 0, 
                    ease: "easeOut" 
                  }}
                />
              </div>
              
              <p className="text-sm text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-8 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: isInView ? 1.2 : 0 }}
        >
          <p className="text-gray-300 text-sm">
            "TalentTuner has revolutionized our hiring process, making it significantly more efficient while maintaining the crucial human element in decision-making."
          </p>
          <div className="mt-2 text-blue-400 text-sm font-medium">
            - HR Director, Fortune 500 Company
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ImpactCard;