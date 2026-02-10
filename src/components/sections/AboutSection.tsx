import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import ParticleBackground from '@/components/animations/ParticleBackground';
import { Eye, Zap, Users } from 'lucide-react';

const values = [
  {
    icon: Eye,
    title: 'Visibility',
    description: 'Making the invisible visible—bringing clarity to energy consumption patterns.',
  },
  {
    icon: Zap,
    title: 'Autonomy',
    description: 'AI that acts, not just monitors—delivering results without manual intervention.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'Working alongside property owners to transform energy management together.',
  },
];

const AboutSection = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 bg-secondary/30 relative overflow-hidden">
      <ParticleBackground color="teal" density="low" />

      <div className="container-custom relative z-10">
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Building the Future
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Building the Future of{' '}
            <span className="text-gradient">Autonomous Energy</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Anvaya EnerTech is pioneering AI-powered energy management for buildings everywhere.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="p-8 rounded-2xl bg-card border border-border text-center h-full"
                whileHover={{ y: -8, borderColor: 'hsl(var(--primary) / 0.3)' }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default AboutSection;
