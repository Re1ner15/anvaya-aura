import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ArrowRight } from 'lucide-react';
import ParticleBackground from '@/components/animations/ParticleBackground';

const CTASection = () => {
  return (
    <section id="demo" className="py-12 md:py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Teal gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-accent" />
      
      {/* White particle background */}
      <ParticleBackground color="white" density="medium" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <ScrollReveal>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Stop Monitoring Energy.
            </motion.h2>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Start Running It.
            </motion.h2>
          </ScrollReveal>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span>Designed for </span>
            <span className="font-semibold">operators</span>
            <span>. Trusted by </span>
            <span className="font-semibold">engineers</span>
            <span>. Built for </span>
            <span className="font-semibold">scale</span>
            <span>.</span>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href="/pilot-program"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-primary font-semibold text-lg rounded-xl shadow-[0_4px_24px_rgba(255,255,255,0.3)] hover:bg-white/95 transition-colors"
              whileHover={{ scale: 1.05, boxShadow: '0 6px 32px rgba(255,255,255,0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              Join Pilot Program
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
