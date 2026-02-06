import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/anvaya-logo.png';

const navItems = [
  { label: 'Product', href: '/product' },
  { label: 'Markets', href: '/markets' },
  { label: 'How it Works', href: '/how-it-works' },
   
  { label: 'Pilot Program', href: '/pilot-program' },
  { label: 'About', href: '/about' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 glass"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 px-4 md:px-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Link to="/" className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    src={logo} 
                    alt="Anvaya EnerTech" 
                    className="h-10 w-auto relative z-10"
                  />
                  <span 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-primary/30 pointer-events-none"
                    style={{ animation: 'logo-ring 3s ease-out infinite' }}
                  />
                  <span 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-primary/20 pointer-events-none"
                    style={{ animation: 'logo-ring 3s ease-out infinite', animationDelay: '0.5s' }}
                  />
                  <span 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-primary/10 pointer-events-none"
                    style={{ animation: 'logo-ring 3s ease-out infinite', animationDelay: '1s' }}
                  />
                </div>
                <div className="hidden sm:block">
                  <span className="text-lg font-semibold text-foreground">Anvaya</span>
                  <span className="text-lg font-light text-muted-foreground ml-1">EnerTech</span>
                </div>
              </Link>
            </motion.div>

            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition-colors link-underline ${
                      location.pathname === item.href 
                        ? 'text-primary' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/about#contact"
                  className="hidden sm:inline-flex px-5 py-2.5 text-sm font-medium text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-all"
                >
                  Contact
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/pilot-program"
                  className="btn-primary !px-5 !py-2.5 text-sm"
                >
                  Join Pilot Program
                </Link>
              </motion.div>
              
              <motion.button
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-near-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.nav
              className="absolute top-0 right-0 h-full w-72 bg-card border-l border-border/50 shadow-2xl pt-24 px-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                        location.pathname === item.href
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground hover:bg-primary/10 hover:text-primary'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="h-px bg-border my-4" />
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Link
                    to="/about#contact"
                    className="block px-4 py-3 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
