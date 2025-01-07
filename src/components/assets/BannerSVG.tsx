import { motion } from 'framer-motion';

const BannerSVG = () => (
  <motion.svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 600 200"
    className="w-full h-auto max-w-2xl"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="blur" operator="over" />
      </filter>
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2563EB', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    
    {/* Background circles */}
    <motion.circle 
      cx={120}
      cy={100}
      initial={{ r: 60 }}
      animate={{ 
        r: [60, 68, 60],
        opacity: [0.2, 0.25, 0.2] 
      }}
      fill="#3B82F6" 
      filter="url(#glow)"
      transition={{ 
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" 
      }}
    />
    
    <motion.circle 
      cx={180}
      cy={100}
      initial={{ r: 50 }}
      animate={{ 
        r: [50, 58, 50],
        opacity: [0.15, 0.2, 0.15] 
      }}
      fill="#3B82F6" 
      filter="url(#glow)"
      transition={{ 
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5 
      }}
    />
    
    {/* Animated wave */}
    <motion.path 
      d="M80 100 Q120 70 160 100 Q200 130 240 100" 
      stroke="url(#waveGradient)" 
      strokeWidth={6}
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ 
        duration: 1.5,
        ease: "easeOut"
      }}
    />

    <motion.text 
      x="260" 
      y="115" 
      fontFamily="Inter, system-ui, sans-serif" 
      fontSize="48" 
      fontWeight="bold" 
      fill="#FFFFFF"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      Talent<tspan fill="#3B82F6">Tuner</tspan>
    </motion.text>
  </motion.svg>
);

export default BannerSVG;