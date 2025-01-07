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
  );
};