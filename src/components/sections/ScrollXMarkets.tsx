import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Hotel, Building2, Factory, Home, Bell, ArrowRight } from 'lucide-react';
import NotifyModal from '@/components/NotifyModal';

import marketHotels from '@/assets/market-hotels.jpg';
import marketCommercial from '@/assets/market-commercial.jpg';
import marketIndustrial from '@/assets/market-industrial.jpg';
import marketResidential from '@/assets/market-residential.jpg';

interface MarketCard {
  id: string;
  icon: typeof Hotel;
  title: string;
  status: 'available' | 'coming-soon';
  description: string;
  image: string;
  ctaType: 'learn-more' | 'notify';
}

const markets: MarketCard[] = [
  {
    id: 'hotels',
    icon: Hotel,
    title: 'Hotels & Hospitality',
    status: 'available',
    description: 'Autonomous energy optimization delivering 10–30% electricity bill savings with zero guest comfort compromise.',
    image: marketHotels,
    ctaType: 'learn-more',
  },
  {
    id: 'commercial',
    icon: Building2,
    title: 'Commercial Spaces',
    status: 'coming-soon',
    description: 'Office buildings, retail centers, and mixed-use properties.',
    image: marketCommercial,
    ctaType: 'notify',
  },
  {
    id: 'industrial',
    icon: Factory,
    title: 'Industrial Facilities',
    status: 'coming-soon',
    description: 'Manufacturing plants, warehouses, and production facilities.',
    image: marketIndustrial,
    ctaType: 'notify',
  },
  {
    id: 'residential',
    icon: Home,
    title: 'Residential Buildings',
    status: 'coming-soon',
    description: 'Apartments, condos, and multi-family housing.',
    image: marketResidential,
    ctaType: 'notify',
  },
];

const CARD_WIDTH = 380;
const CARD_GAP = 24;

const ScrollXMarkets = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [notifyModal, setNotifyModal] = useState<{ isOpen: boolean; marketName: string }>({
    isOpen: false,
    marketName: '',
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Total horizontal travel: enough to show all cards
  const totalTravel = (markets.length - 1) * (CARD_WIDTH + CARD_GAP);
  const x = useTransform(scrollYProgress, [0.1, 0.9], [0, -totalTravel]);

  // Track progress for card animations
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setProgress(v));

  return (
    <>
      {/* Sticky scroll container — height controls how long user scrolls */}
      <section
        ref={sectionRef}
        id="markets"
        className="relative"
        style={{ height: '130vh' }}
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {/* Section header */}
          <div className="text-center mb-8 md:mb-10 px-4">
            <motion.span
              className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Markets We Serve
            </motion.span>
            <motion.h2
              className="text-display-mobile md:text-display font-bold text-foreground mb-3"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Energy Intelligence Across Every Space
            </motion.h2>
            <motion.p
              className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Starting with hotels, expanding to transform energy management everywhere
            </motion.p>
          </div>

          {/* Desktop horizontal carousel */}
          <div className="hidden md:block">
            <motion.div
              className="flex items-stretch pl-[calc(50vw-190px)]"
              style={{
                x,
                gap: `${CARD_GAP}px`,
              }}
            >
              {markets.map((market) => (
                <MarketCardComponent
                  key={market.id}
                  market={market}
                  onNotifyClick={(name) => setNotifyModal({ isOpen: true, marketName: name })}
                />
              ))}
            </motion.div>
          </div>

          {/* Mobile: standard vertical cards */}
          <div className="md:hidden px-4 space-y-4 overflow-y-auto max-h-[60vh] pb-4">
            {markets.map((market) => (
              <MobileMarketCard
                key={market.id}
                market={market}
                onNotifyClick={(name) => setNotifyModal({ isOpen: true, marketName: name })}
              />
            ))}
          </div>

          {/* Scroll progress indicator (desktop) */}
          <div className="hidden md:flex justify-center mt-6">
            <div className="flex gap-2">
              {markets.map((_, i) => {
                const cardProgress = (i / (markets.length - 1));
                const isActive = progress >= cardProgress * 0.8 && progress <= (cardProgress + 0.3);
                return (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isActive ? 'w-8 bg-primary' : 'w-2 bg-border'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <NotifyModal
        isOpen={notifyModal.isOpen}
        onClose={() => setNotifyModal({ isOpen: false, marketName: '' })}
        marketName={notifyModal.marketName}
      />
    </>
  );
};

// Desktop card component
const MarketCardComponent = ({
  market,
  onNotifyClick,
}: {
  market: MarketCard;
  onNotifyClick: (name: string) => void;
}) => {
  const Icon = market.icon;
  const isAvailable = market.status === 'available';

  return (
    <div
      className="flex-shrink-0 rounded-2xl border bg-card shadow-card overflow-hidden transition-shadow duration-300 hover:shadow-card-hover"
      style={{ width: `${CARD_WIDTH}px` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={market.image}
          alt={market.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        {/* Status badge over image */}
        <div className="absolute top-3 left-3">
          {isAvailable ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />
              Available Now
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted/90 text-muted-foreground text-xs font-semibold backdrop-blur-sm">
              Coming Soon
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isAvailable ? 'bg-primary/10' : 'bg-muted'
            }`}
          >
            <Icon className={`w-5 h-5 ${isAvailable ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{market.title}</h3>
        </div>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {market.description}
        </p>

        {isAvailable ? (
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-1.5 text-primary font-medium text-sm hover:gap-2.5 transition-all"
          >
            Learn More <ArrowRight className="w-4 h-4" />
          </a>
        ) : (
          <button
            onClick={() => onNotifyClick(market.title)}
            className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:opacity-80 transition-opacity"
          >
            <Bell className="w-3.5 h-3.5" /> Notify Me
          </button>
        )}
      </div>
    </div>
  );
};

// Mobile card component
const MobileMarketCard = ({
  market,
  onNotifyClick,
}: {
  market: MarketCard;
  onNotifyClick: (name: string) => void;
}) => {
  const Icon = market.icon;
  const isAvailable = market.status === 'available';

  return (
    <motion.div
      className={`rounded-2xl border bg-card overflow-hidden shadow-card ${
        isAvailable ? 'border-primary/30' : 'border-border/50'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="relative h-32 overflow-hidden">
        <img
          src={market.image}
          alt={market.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        <div className="absolute top-2 left-2">
          {isAvailable ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />
              Available Now
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-muted/90 text-muted-foreground text-xs font-semibold">
              Coming Soon
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              isAvailable ? 'bg-primary/10' : 'bg-muted'
            }`}
          >
            <Icon className={`w-4.5 h-4.5 ${isAvailable ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <h3 className="text-base font-semibold text-foreground">{market.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{market.description}</p>
        {isAvailable ? (
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-1 text-primary font-medium text-sm"
          >
            Learn More <ArrowRight className="w-4 h-4" />
          </a>
        ) : (
          <button
            onClick={() => onNotifyClick(market.title)}
            className="inline-flex items-center gap-1 text-primary text-sm font-medium"
          >
            <Bell className="w-3.5 h-3.5" /> Notify Me
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ScrollXMarkets;
