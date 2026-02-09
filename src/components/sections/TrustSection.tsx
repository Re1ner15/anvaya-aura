import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import ParticleBackground from '@/components/animations/ParticleBackground';
import { Building2, Factory, Home, Hotel } from 'lucide-react';

const buildingTypes = [
  { icon: Hotel, label: 'Hotels' },
  { icon: Building2, label: 'Offices' },
  { icon: Factory, label: 'Factories' },
  { icon: Home, label: 'Apartments' },
];

const TrustSection = () => {
  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      {/* Particle background */}
      <ParticleBackground color="teal" density="low" />
      
      {/* Background */}
      <div className="absolute inset-0 bg-mesh opacity-40" />
      
      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Building the Future
            </span>
          </ScrollReveal>
          <h2 className="text-display-mobile md:text-display font-bold text-foreground mb-4">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Pioneering Autonomous
            </motion.span>
            <br />
            <motion.span
              className="text-gradient inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Energy Management
            </motion.span>
          </h2>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Starting with hotels in March 2025, expanding across commercial, industrial, and residential sectors.
            </p>
          </ScrollReveal>
        </div>

        {/* Building types icons */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-12">
            {buildingTypes.map((type, index) => (
              <motion.div
                key={type.label}
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-primary/20"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <type.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <span className="text-sm font-medium text-muted-foreground">{type.label}</span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Pilot launch badge */}
        <ScrollReveal delay={0.5}>
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20">
              <motion.div
                className="w-3 h-3 rounded-full bg-primary"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-lg font-semibold text-foreground">
                Pilot Program Launching March 2025
              </span>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TrustSection;
