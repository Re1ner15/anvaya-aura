import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { Shield, Clock, Leaf, Award } from 'lucide-react';

const pillars = [
  {
    icon: Shield,
    title: 'Zero Compromise',
    description: 'Guest comfort is sacred. Our AI optimizes invisibly—no temperature complaints, no disruption, just savings.',
    highlight: '100%',
    highlightLabel: 'Comfort Score',
  },
  {
    icon: Clock,
    title: '24/7 Autonomous',
    description: 'While you sleep, Niva watches every watt. Continuous optimization without manual intervention.',
    highlight: '24/7',
    highlightLabel: 'Active Monitoring',
  },
  {
    icon: Leaf,
    title: 'Sustainability Built-In',
    description: 'Reduce your carbon footprint while improving profitability. ESG reporting included.',
    highlight: '30%',
    highlightLabel: 'Emission Reduction',
  },
  {
    icon: Award,
    title: 'Proven Technology',
    description: 'NILM technology backed by decades of research. Now accessible through modern AI.',
    highlight: 'Y Combinator',
    highlightLabel: 'Backed',
  },
];

const TrustSection = () => {
  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-mesh opacity-40" />
      
      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Why Niva
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
              Why Forward-Thinking Hotels
            </motion.span>
            <br />
            <motion.span
              className="text-gradient inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Choose Niva
            </motion.span>
          </h2>
        </div>

        {/* Trust pillars grid */}
        <StaggerContainer className="grid md:grid-cols-2 gap-6 lg:gap-8" staggerDelay={0.1}>
          {pillars.map((pillar, index) => (
            <StaggerItem key={pillar.title}>
              <motion.div
                className="group relative p-8 rounded-2xl bg-card border border-border/50 shadow-card h-full"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0 border border-primary/20"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <pillar.icon className="w-7 h-7 text-primary" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {pillar.description}
                    </p>

                    {/* Highlight metric */}
                    <div className="flex items-center gap-3">
                      <motion.span
                        className="text-2xl font-bold text-gradient"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        {pillar.highlight}
                      </motion.span>
                      <span className="text-sm text-muted-foreground">
                        {pillar.highlightLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover underline */}
                <motion.div
                  className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Background glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Logo cloud placeholder */}
        <ScrollReveal delay={0.3}>
          <div className="mt-20 text-center">
            <p className="text-sm text-muted-foreground mb-8">
              Trusted by forward-thinking hospitality leaders
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              {['Hotel Group A', 'Resort Chain B', 'Boutique Hotels', 'Luxury Resorts'].map((name, index) => (
                <motion.div
                  key={name}
                  className="px-6 py-3 rounded-lg bg-muted/50 text-muted-foreground font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                >
                  {name}
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TrustSection;
