import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { SplitReveal, Typewriter } from '@/components/animations/AnimatedText';
import { Hotel, Building2, Factory, Home, ArrowRight, Bell } from 'lucide-react';
import { useState } from 'react';

const markets = [
  {
    id: 'hotels',
    icon: Hotel,
    title: 'Hotels & Hospitality',
    description: 'Autonomous energy optimization delivering 10-30% savings with zero guest comfort compromise. 2 pilots launching Feb 2025.',
    status: 'available',
    statusLabel: 'Available Now',
    ctaText: 'Learn More',
    ctaLink: '#results',
  },
  {
    id: 'commercial',
    icon: Building2,
    title: 'Commercial Spaces',
    description: 'Office buildings, retail centers, and mixed-use properties.',
    status: 'coming-soon',
    statusLabel: 'Coming Soon',
    animationDelay: 0,
  },
  {
    id: 'industrial',
    icon: Factory,
    title: 'Industrial Facilities',
    description: 'Manufacturing plants, warehouses, and production facilities.',
    status: 'coming-soon',
    statusLabel: 'Coming Soon',
    animationDelay: 0.3,
  },
  {
    id: 'residential',
    icon: Home,
    title: 'Residential Buildings',
    description: 'Apartments, condos, and multi-family housing.',
    status: 'coming-soon',
    statusLabel: 'Coming Soon',
    animationDelay: 0.6,
  },
];

interface NotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  marketName: string;
}

const NotifyModal = ({ isOpen, onClose, marketName }: NotifyModalProps) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setEmail('');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-near-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-card border border-border/50 shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {!submitted ? (
          <>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Get notified about {marketName}
            </h3>
            <p className="text-muted-foreground mb-6">
              Be the first to know when we launch energy solutions for {marketName.toLowerCase()}.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white font-medium"
                >
                  Notify Me
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <Bell className="w-8 h-8 text-primary" />
            </motion.div>
            <h3 className="text-xl font-semibold text-foreground mb-2">You're on the list!</h3>
            <p className="text-muted-foreground">We'll notify you when we launch.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const MarketsSection = () => {
  const [notifyModal, setNotifyModal] = useState<{ isOpen: boolean; marketName: string }>({
    isOpen: false,
    marketName: '',
  });

  return (
    <section id="markets" className="section-padding bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-mesh opacity-40" />
      
      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Markets We Serve
            </span>
          </ScrollReveal>
          <h2 className="text-display-mobile md:text-display font-bold text-foreground mb-4">
            <SplitReveal>Energy Intelligence Across Every Space</SplitReveal>
          </h2>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Starting with hotels, expanding to transform energy management everywhere
            </p>
          </ScrollReveal>
        </div>

        {/* Market cards */}
        <StaggerContainer className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto" staggerDelay={0.15}>
          {markets.map((market) => (
            <StaggerItem key={market.id}>
              {market.status === 'available' ? (
                <AvailableCard market={market} />
              ) : (
                <ComingSoonCard 
                  market={market} 
                  onNotifyClick={() => setNotifyModal({ isOpen: true, marketName: market.title })}
                />
              )}
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Notify Modal */}
      <NotifyModal
        isOpen={notifyModal.isOpen}
        onClose={() => setNotifyModal({ isOpen: false, marketName: '' })}
        marketName={notifyModal.marketName}
      />
    </section>
  );
};

interface AvailableCardProps {
  market: typeof markets[0];
}

const AvailableCard = ({ market }: AvailableCardProps) => {
  return (
    <motion.a
      href={market.ctaLink}
      className="group relative p-8 rounded-2xl bg-card border-2 border-primary/30 shadow-card h-full block"
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Gradient border glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
      
      {/* Status badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-primary-light text-white text-xs font-semibold mb-6"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        {market.statusLabel}
      </motion.div>

      {/* Icon */}
      <motion.div
        className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 border border-primary/20"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
      >
        <market.icon className="w-8 h-8 text-primary" />
      </motion.div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
        {market.title}
      </h3>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {market.description}
      </p>

      {/* CTA Button */}
      <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
        {market.ctaText}
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />
    </motion.a>
  );
};

interface ComingSoonCardProps {
  market: typeof markets[0];
  onNotifyClick: () => void;
}

const ComingSoonCard = ({ market, onNotifyClick }: ComingSoonCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative p-8 rounded-2xl bg-card border border-border/50 shadow-card h-full opacity-70"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      animate={{ scale: [1, 1.01, 1] }}
      style={{ animationDelay: `${market.animationDelay}s` }}
    >
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
        />
      </motion.div>

      {/* Coming Soon overlay */}
      <div className="absolute inset-0 rounded-2xl bg-white/70 dark:bg-background/70 backdrop-blur-[2px] flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-gradient text-lg font-semibold">
            <Typewriter text="Coming Soon" delay={0.8 + (market.animationDelay || 0)} speed={60} showCursor={false} />
          </span>
        </motion.div>
      </div>

      {/* Status badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold mb-6">
        {market.statusLabel}
      </div>

      {/* Icon */}
      <motion.div
        className="w-16 h-16 rounded-xl bg-muted/50 flex items-center justify-center mb-6 border border-border/50 grayscale"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: market.animationDelay || 0 }}
      >
        <market.icon className="w-8 h-8 text-muted-foreground" />
      </motion.div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-muted-foreground mb-3">
        {market.title}
      </h3>
      <p className="text-muted-foreground/70 mb-6 leading-relaxed">
        {market.description}
      </p>

      {/* Notify Me button (appears on hover) */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          onNotifyClick();
        }}
        className="relative z-20 px-5 py-2.5 rounded-lg border border-dashed border-primary text-primary text-sm font-medium bg-primary/10 hover:bg-primary/20 transition-colors"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        transition={{ duration: 0.2 }}
      >
        <span className="flex items-center gap-2">
          <Bell className="w-4 h-4" />
          Notify Me
        </span>
      </motion.button>
    </motion.div>
  );
};

export default MarketsSection;
