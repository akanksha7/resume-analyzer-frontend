import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mission } from '../components/landing/Mission';
import { Features } from '../components/landing/Features';
import { HowItWorks } from '../components/landing/HowItWorks';
import { CallToAction } from '@/components/landing/CallToAction';
import { Footer } from '@/components/landing/Footer';
import { Hero } from '@/components/landing/Hero';

interface Section {
  id: string;
  component: React.ReactNode;
  title: string;
}

const LandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections: Section[] = [
    { 
      id: 'hero', 
      title: 'Home',
      component: (
        <motion.div
          className="min-h-screen flex flex-col items-center justify-center text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
            <Hero />
        </motion.div>
      )
    },
    { id: 'mission', title: 'Mission', component: <Mission /> },
    { id: 'features', title: 'Features', component: <Features /> },
    { id: 'how-it-works', title: 'How It Works', component: <HowItWorks /> },
    // { id: 'testimonials', title: 'Testimonials', component: <Testimonials /> },
    //{ id: 'cta', title: 'Get Started', component: <CallToAction /> }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col gap-4">
          {sections.map((section, index) => (
            <div key={section.id} className="group relative flex items-center">
              <a
                href={`#${section.id}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  'bg-gray-400 hover:bg-blue-300'
                }`}
                aria-label={`Go to ${section.title} section`}
              />
              <span className="absolute left-0 transform -translate-x-full -translate-y-1/2 top-1/2 mr-2 px-2 py-1 bg-gray-800 rounded text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {section.title}
              </span>
            </div>
          ))}
        </div>
      </div>

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
      <CallToAction />
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