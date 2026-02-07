import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Hotel, Building2, Factory, Home, Bell, ArrowRight } from 'lucide-react';

interface MarketItem {
  id: string;
  icon: typeof Hotel;
  title: string;
  description: string;
  status: 'available' | 'coming-soon';
  ctaType: 'learn-more' | 'notify';
}

const markets: MarketItem[] = [
  {
    id: 'hotels',
    icon: Hotel,
    title: 'Hotels & Hospitality',
    description: 'Autonomous energy optimization delivering 10–30% savings with zero guest comfort compromise.',
    status: 'available',
    ctaType: 'learn-more',
  },
  {
    id: 'commercial',
    icon: Building2,
    title: 'Commercial Spaces',
    description: 'Office buildings, retail centers, and mixed-use properties.',
    status: 'coming-soon',
    ctaType: 'notify',
  },
  {
    id: 'industrial',
    icon: Factory,
    title: 'Industrial Facilities',
    description: 'Manufacturing plants, warehouses, and production facilities.',
    status: 'coming-soon',
    ctaType: 'notify',
  },
  {
    id: 'residential',
    icon: Home,
    title: 'Residential Buildings',
    description: 'Apartments, condos, and multi-family housing.',
    status: 'coming-soon',
    ctaType: 'notify',
  },
];

interface OrbitGalleryProps {
  onNotifyClick: (marketName: string) => void;
}

const OrbitGallery = ({ onNotifyClick }: OrbitGalleryProps) => {
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const autoRotateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const RADIUS = 320;
  const CARD_COUNT = markets.length;
  const ANGLE_STEP = 360 / CARD_COUNT;

  // Auto-rotate loop
  useEffect(() => {
    if (!isAutoRotating) return;

    const animate = (time: number) => {
      if (lastTimeRef.current) {
        const delta = time - lastTimeRef.current;
        setRotation(prev => prev + delta * 0.008); // slow rotation
      }
      lastTimeRef.current = time;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = 0;
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isAutoRotating]);

  const resumeAutoRotate = useCallback(() => {
    if (autoRotateTimer.current) clearTimeout(autoRotateTimer.current);
    autoRotateTimer.current = setTimeout(() => {
      setIsAutoRotating(true);
    }, 2500);
  }, []);

  // Scroll-driven rotation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // Only capture horizontal-like scroll intent
      const absDeltaY = Math.abs(e.deltaY);
      if (absDeltaY < 4) return;
      
      e.preventDefault();
      setIsAutoRotating(false);
      setRotation(prev => prev + e.deltaY * 0.15);
      resumeAutoRotate();
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [resumeAutoRotate]);

  // Touch support
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      setIsAutoRotating(false);
    };
    const onTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - startX;
      startX = e.touches[0].clientX;
      setRotation(prev => prev - dx * 0.3);
    };
    const onTouchEnd = () => resumeAutoRotate();

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [resumeAutoRotate]);

  const renderCard = (market: MarketItem, index: number) => {
    const angle = rotation + index * ANGLE_STEP;
    const rad = (angle * Math.PI) / 180;
    
    // Calculate depth for opacity/scale — tighter curve for 4 items
    const cosVal = Math.cos(rad);
    const zIndex = Math.round(cosVal * 100) + 100;
    const opacity = market.status === 'available'
      ? 0.65 + cosVal * 0.35
      : 0.6 + cosVal * 0.25;
    const scale = market.status === 'available'
      ? 0.85 + cosVal * 0.15
      : 0.8 + cosVal * 0.12;
    const Icon = market.icon;
    const isAvailable = market.status === 'available';

    return (
      <div
        key={market.id}
        className="absolute left-1/2 top-1/2"
        style={{
          transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${RADIUS}px)`,
          zIndex,
          opacity,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className={`w-[200px] p-4 rounded-2xl border text-center transition-all ${
            isAvailable
              ? 'bg-card border-primary/30 shadow-lg scale-105'
              : 'bg-card/80 border-border/50 shadow-md grayscale-[30%]'
          }`}
          style={{ transform: `scale(${scale})` }}
        >
          {/* Status badge */}
          {isAvailable ? (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-[#02C39A] text-white text-xs font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Available Now
            </div>
          ) : (
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold mb-4">
              Coming Soon
            </div>
          )}

          {/* Icon */}
          <div className={`w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center ${
            isAvailable ? 'bg-primary/10' : 'bg-muted/50'
          }`}>
            <Icon className={`w-7 h-7 ${isAvailable ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>

          {/* Title */}
          <h3 className={`text-base font-semibold mb-2 ${isAvailable ? 'text-foreground' : 'text-muted-foreground'}`}>
            {market.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground mb-4 line-clamp-3">
            {market.description}
          </p>

          {/* CTA */}
          {isAvailable ? (
            <a
              href="/markets#hotels-detail"
              className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:gap-2 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNotifyClick(market.title);
              }}
              className="inline-flex items-center gap-1 text-primary text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
            >
              <Bell className="w-3.5 h-3.5" /> Notify Me
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Desktop 3D ring */}
      <div
        ref={containerRef}
        className="hidden md:block relative mx-auto"
        style={{ height: '340px', perspective: '900px' }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {markets.map((m, i) => renderCard(m, i))}
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/60 flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span>Scroll to rotate</span>
        </motion.div>
      </div>

      {/* Mobile vertical stack */}
      <div className="md:hidden space-y-4">
        {markets.map((market) => {
          const Icon = market.icon;
          const isAvailable = market.status === 'available';

          return isAvailable ? (
            <motion.a
              key={market.id}
              href="/markets#hotels-detail"
              className="block p-6 rounded-2xl bg-card border-2 border-primary/30 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-[#02C39A] text-white text-xs font-semibold mb-3">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Available Now
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{market.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{market.description}</p>
              <span className="inline-flex items-center gap-1 text-primary font-medium text-sm">
                Learn More <ArrowRight className="w-4 h-4" />
              </span>
            </motion.a>
          ) : (
            <motion.button
              key={market.id}
              onClick={() => onNotifyClick(market.title)}
              className="w-full p-5 rounded-xl bg-card border border-border/50 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{market.title}</h4>
                    <span className="text-xs text-muted-foreground">Coming Soon</span>
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
