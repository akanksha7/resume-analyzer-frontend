import { motion } from 'framer-motion';

const BannerSVG = () => (
  <motion.svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 600 200"
    className="w-full h-auto max-w-2xl"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
  >
    {/* Gradient definitions (optional, if you want gradients elsewhere) */}
    <defs>
      <filter id="blur">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2B6CB0', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    
    <motion.circle 
      cx={100}
      cy={100}
      initial={{ r: 80 }}
      animate={{ 
        r: [80, 88, 80],
        opacity: [0.15, 0.2, 0.15] 
      }}
      fill="#60A5FA" 
      opacity={0.15}
      filter="url(#blur)"
      transition={{ 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" 
      }}
    />
    <motion.circle 
      cx={160}
      cy={100}
      initial={{ r: 70 }}
      animate={{ 
        r: [70, 78, 70],
        opacity: [0.2, 0.25, 0.2] 
      }}
      fill="#60A5FA" 
      opacity={0.2}
      filter="url(#blur)"
      transition={{ 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5 
      }}
    />
    
    <motion.path 
      d="M60 100 Q80 60 100 100 Q120 140 140 100 Q160 60 180 100" 
      stroke="url(#waveGradient)" 
      strokeWidth="8" 
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ 
        duration: 2,
        ease: "easeInOut"
      }}
    />
    
    <motion.text 
      x="240" y="90" 
      fontFamily="Inter, sans-serif" 
      fontSize="52" 
      fontWeight="bold" 
      fill="#FFFFFF"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      Talent<tspan fill="#60A5FA">Tuner</tspan>
    </motion.text>
    
    <motion.text 
      x="240" y="130" 
      fontFamily="Inter, sans-serif" 
      fontSize="28" 
      fill="#E5E7EB"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1 }}
    >
      Optimize Your Hiring with AI
    </motion.text>
  </motion.svg>
);

export default BannerSVG;
