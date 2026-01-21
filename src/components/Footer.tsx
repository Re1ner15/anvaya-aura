import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '@/assets/anvaya-logo.png';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import ParticleBackground from '@/components/animations/ParticleBackground';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-near-black text-white/70 py-16 relative overflow-hidden">
      <ParticleBackground particleColor="teal" particleCount={10} className="opacity-20" />
      
      <div className="container-custom px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link to="/" className="flex items-center gap-3 mb-4">
                <img src={logo} alt="Anvaya EnerTech" className="h-10 w-auto" />
                <div>
                  <span className="text-lg font-semibold text-white">Anvaya</span>
                  <span className="text-lg font-light text-white/70 ml-1">EnerTech</span>
                </div>
              </Link>
            </motion.div>
            <p className="text-white/50 max-w-sm mb-6">
              Making the Invisible, Visible. Neev is the AI Energy Operator for buildings—delivering 10-30% electricity savings with zero compromise.
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

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {[
                { label: 'How it Works', href: '/how-it-works' },
                { label: 'Features', href: '/product' },
                { label: 'Markets', href: '/markets' },
                { label: 'Pilot Program', href: '/pilot-program' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-white/50 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/about#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-white/50 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

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
