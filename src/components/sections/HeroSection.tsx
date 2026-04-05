import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedWords, Typewriter } from '@/components/animations/AnimatedText';
import ParticleBackground from '@/components/animations/ParticleBackground';
import { ArrowRight, CheckCircle } from 'lucide-react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-secondary/30"
    >
      <ParticleBackground color="teal" density="medium" />
      <div className="absolute inset-0 bg-mesh opacity-60" />

      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 container-custom px-4 pt-24 pb-16"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Autonomous AI Energy Operator
            </span>
          </motion.div>

          <h1 className="text-hero-mobile md:text-hero font-bold text-foreground mb-4">
            <AnimatedWords delay={0.15} staggerDelay={0.06}>
              The Future of Energy is
            </AnimatedWords>
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,168,150,0.4)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              Autonomous
            </motion.span>
          </h1>

          <motion.p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            <Typewriter
              text="Neev eliminates building energy waste through intelligent, real-time monitoring."
              delay={0.9}
              speed={20}
              showCursor={false}
            />
          </motion.p>

          <motion.p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <span className="text-primary font-semibold">10–30% energy savings</span>
            <span className="text-muted-foreground"> · </span>
            <span className="text-primary font-semibold">Reduced carbon footprint</span>
            <span className="text-muted-foreground"> · </span>
            <span className="text-primary font-semibold">Fully autonomous</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.4 }}
          >
            <motion.a
              href="/pilot-program"
              className="group btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Join Pilot Program
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.a>
            <motion.button
              onClick={() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.4 }}
          >
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Pilot Program Now Live — Apply Today
            </span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.4 }}
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
