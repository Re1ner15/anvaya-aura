import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import ParticleBackground from '@/components/animations/ParticleBackground';
import dashboardImage from '@/assets/dashboard.png';

const DashboardSection = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      <ParticleBackground color="teal" density="low" />

      <div className="container-custom relative z-10">
        <ScrollReveal className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            The Neev Dashboard
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Complete Visibility.{' '}
            <span className="text-gradient">Zero Guesswork.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time energy monitoring, AI-driven insights, and autonomous optimization — all in one place.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <motion.div
            className="relative mx-auto max-w-5xl"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 transition-transform duration-500 ease-out hover:scale-105 cursor-pointer">
              <img
                src={dashboardImage}
                alt="Neev Energy Dashboard showing real-time building energy consumption and savings"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl scale-110 opacity-40" />
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DashboardSection;
