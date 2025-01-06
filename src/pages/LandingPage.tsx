import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  LineChart, 
  Users, 
  Brain, 
  Sparkles, 
  Clock, 
  Target, 
  Award,
  Shield,
  ChartBar,
  ArrowUpRight,
  Upload,
  Search,
  CheckCircle,
  Facebook,
  Twitter,
  Linkedin,
  Mail
} from 'lucide-react';
import BannerSVG from '../components/assets/BannerSVG';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col">

      {/* Hero Section */}
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
            {/* <motion.div 
              className="mb-8 floating-element"
              variants={containerVariants}
            > */}
              <BannerSVG />
            {/* </motion.div> */}
            
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
              
              <p className="text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
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

            {/* Stats Section with Enhanced Animation */}
            <motion.div 
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
            </motion.div>
          </motion.div>
        </div>
    

      {/* Mission Section */}
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
              <div className="relative bg-gray-800 rounded-2xl p-8 border border-gray-700/50">
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
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      {/* Features Section */}
<div className="relative bg-gray-900/50 py-32">
  <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-blue-500/5 to-gray-900/0"></div>
  
  <div className="container mx-auto px-4">
    <motion.div
      className="text-center max-w-3xl mx-auto mb-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <span className="text-blue-400 font-semibold tracking-wider uppercase mb-4 block">
        Features
      </span>
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {[
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
      ].map((feature, index) => (
        <motion.div 
          key={index}
          className="relative group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
          <div className="relative p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm group-hover:border-gray-600/50 transition-all h-full">
            <div className="bg-gray-900/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <feature.icon className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {feature.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</div>

      {/* How It Works Section */}
      <div className="relative py-24 bg-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
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
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-500/20">
                    {item.step}
                  </div>
                  <item.icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-24 left-full w-full h-px bg-gradient-to-r from-blue-500/50 to-transparent transform -translate-x-16"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Trusted by Leading Companies
          </motion.h2>
          <motion.div
            className="relative bg-gray-800 p-8 rounded-2xl max-w-3xl mx-auto border border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute -inset-1">
              <div className="w-full h-full mx-auto opacity-30 blur-lg filter bg-gradient-to-r from-blue-400 to-purple-500"></div>
            </div>
            <div className="relative">
              <p className="text-gray-300 text-lg italic mb-8">
                "TalentTuner has revolutionized our hiring process. The AI analysis helps us quickly identify promising candidates, 
                while keeping our team in control of the final decisions. We've reduced time-to-hire by 40% while maintaining our 
                high hiring standards. The insights provided have been invaluable for making informed decisions."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/women/65.jpg" 
                  alt="Sarah Johnson" 
                  className="w-12 h-12 rounded-full border-2 border-blue-400 mr-4" 
                />
                <div>
                  <p className="text-white font-semibold">Sarah Johnson</p>
                  <p className="text-gray-400">HR Director, Tech Innovators Inc.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 bg-blue-600">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Join forward-thinking companies using TalentTuner to enhance their recruitment process 
              while maintaining the human touch in hiring decisions.
            </p>
            <motion.button
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg group flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/plans')}
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <p className="mt-6 text-blue-100 text-sm">
              No credit card required • Free trial available
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4">
          {/* Main Footer */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">TalentTuner</h3>
              <p className="mb-4 text-gray-400">
                Optimizing hiring with AI, empowering human decisions
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Twitter, href: '#' },
                  { icon: Facebook, href: '#' },
                  { icon: Linkedin, href: '#' },
                  { icon: Mail, href: 'mailto:contact@talenttuner.com' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/plans" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="/register" className="text-gray-400 hover:text-white transition-colors">
                    Sign Up
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/blog" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/docs" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="/support" className="text-gray-400 hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="py-6 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} TalentTuner. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Add this CSS to your global styles
const globalStyles = `
.bg-grid-pattern {
  background-size: 30px 30px;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
}
`;

export default LandingPage;