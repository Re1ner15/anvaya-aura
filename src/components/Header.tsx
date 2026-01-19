import { motion } from 'framer-motion';
import logo from '@/assets/logo.jpeg';

const Header = () => {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 glass"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 px-4 md:px-8">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <img 
              src={logo} 
              alt="Anvaya EnerTech" 
              className="h-10 w-auto"
            />
            <div className="hidden sm:block">
              <span className="text-lg font-semibold text-foreground">Anvaya</span>
              <span className="text-lg font-light text-muted-foreground ml-1">EnerTech</span>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['Product', 'How it Works', 'Results', 'About'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors link-underline"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              className="hidden sm:inline-flex px-5 py-2.5 text-sm font-medium text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact
            </motion.a>
            <motion.a
              href="#demo"
              className="btn-primary !px-5 !py-2.5 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Demo
            </motion.a>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
