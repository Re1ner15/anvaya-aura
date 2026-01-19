import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { AnimatedWords, Typewriter } from '@/components/animations/AnimatedText';
import { Floating } from '@/components/animations/ScrollReveal';
import { ArrowRight, Zap, BarChart3, Shield } from 'lucide-react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const yMouse = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 50);
      mouseY.set((clientY - innerHeight / 2) / 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-secondary/30"
    >
      {/* Animated background mesh */}
      <div className="absolute inset-0 bg-mesh opacity-60" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 container-custom px-4 pt-32 pb-20"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary/10 border border-primary/20"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">Backed by Y Combinator</span>
          </motion.div>

          {/* Main headline with word-by-word animation */}
          <h1 className="text-hero-mobile md:text-hero font-bold text-foreground mb-6">
            <AnimatedWords delay={0.3} staggerDelay={0.1}>
              The Future of Operator
            </AnimatedWords>
            <br />
            <span className="text-gradient">
              <AnimatedWords delay={0.9} staggerDelay={0.1}>
                for Hotels
              </AnimatedWords>
            </span>
          </h1>

          {/* Subheadline with typewriter effect */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            style={{ x, y: yMouse }}
          >
            <Typewriter
              text="10-30% Electricity Savings, Zero Compromise"
              delay={1.8}
              speed={40}
              showCursor={true}
            />
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.6 }}
          >
            <motion.a
              href="#demo"
              className="group btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule a Demo
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.a>
            <motion.a
              href="#pilot"
              className="btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Join Pilot Program
            </motion.a>
          </motion.div>

          {/* Floating dashboard mockup */}
          <Floating duration={8} distance={15}>
            <motion.div
              className="relative mx-auto max-w-4xl"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.8 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="max-w-md mx-auto px-4 py-1 rounded-md bg-background/50 text-xs text-muted-foreground text-center">
                      niva.anvaya.energy
                    </div>
                  </div>
                </div>
                
                {/* Dashboard content */}
                <div className="p-6 bg-gradient-to-br from-background to-secondary/30">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {[
                      { icon: Zap, label: 'Energy Saved', value: '23%', trend: '+5%' },
                      { icon: BarChart3, label: 'Cost Reduction', value: '₹2.4L', trend: '+12%' },
                      { icon: Shield, label: 'Uptime', value: '99.9%', trend: 'Stable' },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="p-4 rounded-xl bg-card shadow-sm border border-border/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3.5 + index * 0.1 }}
                      >
                        <stat.icon className="w-5 h-5 text-primary mb-2" />
                        <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                        <div className="text-xs text-primary font-medium mt-1">{stat.trend}</div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Chart placeholder */}
                  <div className="h-32 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-border/30 flex items-end px-4 pb-4 gap-2">
                    {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 70, 95].map((height, index) => (
                      <motion.div
                        key={index}
                        className="flex-1 bg-gradient-to-t from-primary to-primary-light rounded-t"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 3.8 + index * 0.05, duration: 0.5, ease: 'easeOut' }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl scale-110 opacity-50" />
            </motion.div>
          </Floating>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
