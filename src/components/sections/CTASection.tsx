import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ArrowRight, Calendar, CheckCircle, Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <section id="demo" className="section-padding relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-near-black via-charcoal to-near-black" />
      
      {/* Animated mesh overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, hsla(171, 100%, 33%, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, hsla(189, 100%, 42%, 0.2) 0%, transparent 50%)',
        }}
        animate={{
          background: [
            'radial-gradient(ellipse at 30% 50%, hsla(171, 100%, 33%, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, hsla(189, 100%, 42%, 0.2) 0%, transparent 50%)',
            'radial-gradient(ellipse at 70% 30%, hsla(171, 100%, 33%, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 30% 70%, hsla(189, 100%, 42%, 0.2) 0%, transparent 50%)',
            'radial-gradient(ellipse at 30% 50%, hsla(171, 100%, 33%, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, hsla(189, 100%, 42%, 0.2) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Sparkle icon */}
          <ScrollReveal>
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-8 shadow-teal"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
          </ScrollReveal>

          {/* Headline */}
          <motion.h2
            className="text-display-mobile md:text-display font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
          >
            Ready to Make Energy
            <br />
            <span className="text-gradient">Waste Visible?</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join forward-thinking hotels achieving 10-30% savings with zero compromise on guest experience.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href="#schedule"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-xl shadow-teal-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <Calendar className="w-5 h-5" />
              Schedule a Demo
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.a>

            <motion.a
              href="#pilot"
              className="group relative inline-flex items-center gap-3 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Join Pilot Program
            </motion.a>
          </motion.div>

          {/* Trust element */}
          <motion.div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle className="w-5 h-5 text-primary" />
            </motion.div>
            <span className="text-sm text-white/80">
              2 Pilots Launching February 2025
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
