import { motion } from 'framer-motion';
import logo from '@/assets/logo.jpeg';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-near-black text-white/70 py-16">
      <div className="container-custom px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <img src={logo} alt="Anvaya EnerTech" className="h-10 w-auto" />
              <div>
                <span className="text-lg font-semibold text-white">Anvaya</span>
                <span className="text-lg font-light text-white/70 ml-1">EnerTech</span>
              </div>
            </motion.div>
            <p className="text-white/50 max-w-sm mb-6">
              Making the Invisible, Visible. The AI Energy Operator for Hotels—delivering 10-30% electricity savings with zero compromise.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Linkedin, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Mail, href: 'mailto:hello@anvaya.energy' },
              ].map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {['How it Works', 'Features', 'Case Studies', 'Pricing'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/50 hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/50 hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {currentYear} Anvaya EnerTech. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
