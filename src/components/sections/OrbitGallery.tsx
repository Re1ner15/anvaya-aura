import { motion } from 'framer-motion';
import { Hotel, Building2, Factory, Home, Bell, ArrowRight } from 'lucide-react';

interface OrbitGalleryProps {
  onNotifyClick: (marketName: string) => void;
}

const centerMarket = {
  icon: Hotel,
  title: 'Hotels & Hospitality',
  description: 'Autonomous energy optimization delivering 10-30% savings with zero guest comfort compromise.',
  statusLabel: 'Available Now',
  ctaLink: '#results',
};

const orbitingMarkets = [
  {
    id: 'commercial',
    icon: Building2,
    title: 'Commercial Spaces',
    description: 'Office buildings, retail centers, and mixed-use properties.',
    statusLabel: 'Coming Soon',
    angle: -90,
  },
  {
    id: 'industrial',
    icon: Factory,
    title: 'Industrial Facilities',
    description: 'Manufacturing plants, warehouses, and production facilities.',
    statusLabel: 'Coming Soon',
    angle: 30,
  },
  {
    id: 'residential',
    icon: Home,
    title: 'Residential Buildings',
    description: 'Apartments, condos, and multi-family housing.',
    statusLabel: 'Coming Soon',
    angle: 150,
  },
];

const OrbitGallery = ({ onNotifyClick }: OrbitGalleryProps) => {
  const orbitRadius = 220;
  const CenterIcon = centerMarket.icon;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Desktop orbit layout */}
      <div className="hidden md:flex items-center justify-center relative" style={{ height: '560px' }}>
        {/* Orbit ring */}
        <motion.div
          className="absolute rounded-full border border-dashed border-primary/20"
          style={{ width: orbitRadius * 2 + 80, height: orbitRadius * 2 + 80 }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Center card - Hotels */}
        <motion.a
          href={centerMarket.ctaLink}
          className="absolute z-10 w-72 p-6 rounded-2xl bg-card border-2 border-primary/30 shadow-lg text-center group"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 40px hsla(171, 100%, 33%, 0.15)' }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-primary-light text-white text-xs font-semibold mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            {centerMarket.statusLabel}
          </motion.div>
          <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
            <CenterIcon className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {centerMarket.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{centerMarket.description}</p>
          <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
            Learn More <ArrowRight className="w-4 h-4" />
          </span>
        </motion.a>

        {/* Orbiting markets */}
        {orbitingMarkets.map((market, index) => {
          const angle = market.angle * (Math.PI / 180);
          const x = Math.cos(angle) * orbitRadius;
          const y = Math.sin(angle) * orbitRadius;
          const MarketIcon = market.icon;

          return (
            <motion.div
              key={market.id}
              className="absolute z-20"
              style={{
                left: `calc(50% + ${x}px - 100px)`,
                top: `calc(50% + ${y}px - 72px)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.15, type: 'spring' }}
            >
              <motion.button
                onClick={() => onNotifyClick(market.title)}
                className="w-[200px] p-5 rounded-xl bg-card border border-border/50 shadow-md text-center hover:border-primary/30 transition-all cursor-pointer group"
                whileHover={{ scale: 1.08, y: -4 }}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  y: { duration: 3 + index * 0.5, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-semibold mb-3">
                  {market.statusLabel}
                </div>
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-muted/50 flex items-center justify-center">
                  <MarketIcon className="w-5 h-5 text-muted-foreground" />
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{market.title}</h4>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{market.description}</p>
                <span className="inline-flex items-center gap-1 text-primary text-xs font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                  <Bell className="w-3 h-3" /> Notify Me
                </span>
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile layout */}
      <div className="md:hidden space-y-4">
        <motion.a
          href={centerMarket.ctaLink}
          className="block p-6 rounded-2xl bg-card border-2 border-primary/30 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-primary-light text-white text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            {centerMarket.statusLabel}
          </div>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <CenterIcon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{centerMarket.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{centerMarket.description}</p>
          <span className="inline-flex items-center gap-1 text-primary font-medium text-sm">
            Learn More <ArrowRight className="w-4 h-4" />
          </span>
        </motion.a>

        {orbitingMarkets.map((market, index) => {
          const MarketIcon = market.icon;
          return (
            <motion.button
              key={market.id}
              onClick={() => onNotifyClick(market.title)}
              className="w-full p-5 rounded-xl bg-card border border-border/50 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                    <MarketIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{market.title}</h4>
                    <span className="text-xs text-muted-foreground">{market.statusLabel}</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                  <Bell className="w-4 h-4" /> Notify Me
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default OrbitGallery;
