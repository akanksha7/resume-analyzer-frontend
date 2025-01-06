// components/landing/Footer.tsx
import { Twitter, Facebook, Linkedin, Mail } from 'lucide-react';

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "/plans" },
    { label: "Case Studies", href: "#testimonials" },
    { label: "Sign Up", href: "/register" }
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" }
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Documentation", href: "/docs" },
    { label: "Support", href: "/support" }
  ],
  social: [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@talenttuner.com', label: 'Email' }
  ]
};

export const Footer = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">TalentTuner</h3>
          <p className="text-gray-400 mb-6">
            Optimizing hiring with AI, empowering human decisions
          </p>
          <div className="flex space-x-4">
            {footerLinks.social.map((social, index) => (
              <a 
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
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
            {footerLinks.product.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-3">
            {footerLinks.company.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Resources</h4>
          <ul className="space-y-3">
            {footerLinks.resources.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
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
  );
};