import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Mission } from '../components/landing/Mission';
import { Features } from '../components/landing/Features';
import { HowItWorks } from '../components/landing/HowItWorks';
import { CallToAction } from '@/components/landing/CallToAction';
import { Footer } from '@/components/landing/Footer';
import { Hero } from '@/components/landing/Hero';

interface Section {
  id: string;
  component: React.ReactNode;
}

const ScrollIndicator = ({ sectionId }: { sectionId: string }) => {
  return (
    <motion.a
      href={`#${sectionId}`}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-50 
                rounded-full p-2 bg-background/10 backdrop-blur-sm hover:bg-background/20 
                transition-colors duration-200"
      animate={{ y: [0, 10, 0] }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <ChevronDown className="w-6 h-6 text-primary" />
    </motion.a>
  );
};

const LandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections: Section[] = [
    { 
      id: 'hero', 
      component: (
        <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <Hero />
          </motion.div>
          <ScrollIndicator sectionId="mission" />
        </div>
      )
    },
    { 
      id: 'mission', 
      component: (
        <div className="relative min-h-screen">
          <Mission />
          <ScrollIndicator sectionId="features" />
        </div>
      )
    },
    { 
      id: 'features', 
      component: (
        <div className="relative min-h-screen">
          <Features />
          <ScrollIndicator sectionId="how-it-works" />
        </div>
      )
    },
    { 
      id: 'how-it-works', 
      component: (
        <div className="relative min-h-screen">
          <HowItWorks />
          <ScrollIndicator sectionId="cta" />
        </div>
      )
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Main Content */}
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        {sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className="snap-start h-screen w-full"
          >
            {section.component}
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div id="cta">
        <CallToAction />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export const globalStyles = `
.snap-mandatory {
  scroll-snap-type: y mandatory;
}

.snap-start {
  scroll-snap-align: start;
}

.bg-grid-pattern {
  background-size: 30px 30px;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
}

html {
  scroll-behavior: smooth;
}

/* For Firefox */
* {
  scrollbar-width: none;
}

/* For Chrome, Safari, and Opera */
::-webkit-scrollbar {
  display: none;
}
`;

export default LandingPage;