import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { SplitReveal } from '@/components/animations/AnimatedText';
import ParticleBackground from '@/components/animations/ParticleBackground';
import { Eye, Cpu, TrendingDown } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Make Invisible Visible',
    description: 'Our NILM technology sees every watt flowing through your building—identifying waste others miss.',
    gradient: 'from-primary to-primary-light',
  },
  {
    icon: Cpu,
    title: 'AI Takes Action',
    description: 'Not just insights—autonomous optimization that acts 24/7, eliminating waste without manual intervention.',
    gradient: 'from-primary-light to-accent',
  },
  {
    icon: TrendingDown,
    title: 'Savings Stack Up',
    description: '10-30% electricity reduction with zero compromise on occupant comfort or operational efficiency.',
    gradient: 'from-accent to-cyan-light',
  },
];

const ValuePropSection = () => {
  return (
    <section id="product" className="section-padding bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
      {/* Particle background */}
      <ParticleBackground color="teal" density="low" />
      
      <div className="container-custom relative z-10">
        {/* Section headline */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              The Neev Difference
            </span>
          </ScrollReveal>
          <h2 className="text-display-mobile md:text-display font-bold text-foreground mb-4">
            <SplitReveal>One Platform. Complete Energy Autonomy for Every Building.</SplitReveal>
          </h2>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From hotels to offices, Neev makes energy waste visible and takes autonomous action.
            </p>
          </ScrollReveal>
        </div>

        {/* Feature cards */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.15}>
          {features.map((feature, index) => (
            <StaggerItem key={feature.title}>
              <motion.div
                className="group relative p-8 rounded-2xl bg-card border border-border/50 shadow-card card-hover h-full"
                whileHover={{ y: -12 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                
                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-teal`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Stats bar */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-primary/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '10-30%', label: 'Energy Savings' },
                { value: '24/7', label: 'Autonomous Operation' },
                { value: '<30 days', label: 'Deployment Time' },
                { value: '100%', label: 'Comfort Maintained' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ValuePropSection;
