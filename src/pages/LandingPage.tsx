import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LineChart, Users, Brain} from 'lucide-react';
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
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            transition={{ duration: 0.8 }}
          >
            <BannerSVG />
            
            <motion.h1 
              className="mt-12 text-5xl font-bold text-white leading-tight"
              variants={containerVariants}
            >
              Transform Your <span className="text-blue-400">Hiring Process</span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto"
              variants={containerVariants}
            >
              Leverage the power of AI to streamline your recruitment process and find the perfect candidates faster than ever before.
            </motion.p>
            
            <motion.div 
              className="mt-10 flex flex-wrap gap-4 justify-center"
              variants={containerVariants}
            >
              <motion.button 
                className="px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/25"
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Log In
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button 
                className="px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all border border-gray-700"
                onClick={() => navigate('/plans')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Plans
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

      {/* Features Section */}
      <div className="bg-gray-900/50 py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Powerful Features
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              { 
                icon: Brain,
                title: "AI-Powered Analysis", 
                desc: "Advanced resume parsing and candidate screening with state-of-the-art AI technology" 
              },
              { 
                icon: Users,
                title: "Smart Matching", 
                desc: "Intelligent candidate-job matching using sophisticated algorithms and deep learning" 
              },
              { 
                icon: LineChart,
                title: "Analytics & Insights", 
                desc: "Comprehensive hiring analytics and actionable insights to optimize your recruitment" 
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-b from-gray-800 to-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 transition-all shadow-lg"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)" 
                }}
              >
                <feature.icon className="w-12 h-12 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Upload Resumes", desc: "Easily upload candidate resumes to our platform" },
              { step: "2", title: "AI Analysis", desc: "Our AI analyzes and scores each resume" },
              { step: "3", title: "Match & Hire", desc: "Review top matches and make informed hiring decisions" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            What Our Clients Say
          </motion.h2>
          <motion.div
            className="bg-gray-800 p-8 rounded-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gray-300 text-lg italic mb-4">
              "TalentTuner has revolutionized our hiring process. We've reduced time-to-hire by 40% and improved the quality of our candidates significantly."
            </p>
            <div className="flex items-center">
              <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Client" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="text-white font-semibold">Sarah Johnson</p>
                <p className="text-gray-400">HR Director, Tech Innovators Inc.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Ready to Transform Your Hiring?
          </motion.h2>
          <motion.p
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join thousands of companies already using TalentTuner to find their perfect candidates.
          </motion.p>
          <motion.button
            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            onClick={() => navigate('/plans')}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Get Started Now
          </motion.button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">TalentTuner</h3>
              <p className="mb-4">Optimizing hiring with AI</p>
              <div className="flex space-x-4">
                {/* Add social media icons here */}
              </div>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="/plans" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
            <h4 className="text-white text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p>&copy; 2024 TalentTuner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
