// components/landing/Testimonials.tsx
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "TalentTuner has revolutionized our hiring process. The AI analysis helps us quickly identify promising candidates, while keeping our team in control of the final decisions. We've reduced time-to-hire by 40% while maintaining our high hiring standards.",
    author: "Sarah Johnson",
    role: "HR Director",
    company: "Tech Innovators Inc.",
    image: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

export const Testimonials = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <motion.h2
        className="text-4xl font-bold text-white text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Trusted by Leading Companies
      </motion.h2>

      <div className="grid gap-8 max-w-4xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="relative bg-gray-800 p-8 rounded-2xl border border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4">
              <Quote className="w-8 h-8 text-blue-400" />
            </div>
            <div className="absolute -inset-1">
              <div className="w-full h-full mx-auto opacity-30 blur-lg filter bg-gradient-to-r from-blue-400 to-purple-500"></div>
            </div>

            {/* Content */}
            <div className="relative">
              <p className="text-gray-300 text-lg italic mb-8 leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full border-2 border-blue-400 mr-4"
                />
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-gray-400">
                    {testimonial.role} • {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};