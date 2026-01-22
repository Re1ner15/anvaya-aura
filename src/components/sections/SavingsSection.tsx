import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { Counter } from '@/components/animations/Counter';
import ParticleBackground from '@/components/animations/ParticleBackground';
import { Building2, Hotel, Factory, TrendingUp, Star, Zap } from 'lucide-react';

const scenarios = [
  {
    icon: Star,
    badge: 'Well-Managed',
    title: 'Well-Managed Properties',
    savingsRange: '10-15%',
    savingsValue: 15,
    description: 'Properties with existing energy practices still see significant gains through AI optimization.',
    features: ['Optimized HVAC scheduling', 'Peak demand management', 'Baseline improvements'],
    color: 'from-primary to-primary-light',
    tagColor: 'bg-primary/10 text-primary',
  },
  {
    icon: Hotel,
    badge: 'Most Common',
    title: 'Typical Properties',
    savingsRange: '15-25%',
    savingsValue: 25,
    description: 'The majority of hotels achieve substantial savings through comprehensive waste elimination.',
    features: ['Hidden waste discovery', 'Automated corrections', 'Guest comfort maintained'],
    color: 'from-primary-light to-accent',
    tagColor: 'bg-accent/10 text-accent',
    featured: true,
  },
  {
    icon: Zap,
    badge: 'High Opportunity',
    title: 'High-Opportunity Properties',
    savingsRange: '25-30%+',
    savingsValue: 30,
    description: 'Properties with significant inefficiencies see dramatic transformation in energy costs.',
    features: ['Major leak identification', 'Equipment optimization', 'Dramatic ROI'],
    color: 'from-accent to-cyan-light',
    tagColor: 'bg-cyan/10 text-cyan',
  },
];

const SavingsSection = () => {
  return (
    <section id="results" className="section-padding bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Particle background */}
      <ParticleBackground color="teal" density="low" />
      
      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Proven Results
            </span>
          </ScrollReveal>
          <h2 className="text-display-mobile md:text-display font-bold text-foreground mb-4">
            <motion.span
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="inline-block"
            >
              Proven Savings Across
            </motion.span>
            <br />
            <motion.span
              className="text-gradient inline-block"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            >
              Property Types
            </motion.span>
          </h2>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every property has hidden energy waste. Our AI finds and eliminates it.
            </p>
          </ScrollReveal>
        </div>

        {/* Scenario cards */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.15}>
          {scenarios.map((scenario, index) => (
            <StaggerItem key={scenario.title}>
              <motion.div
                className={`group relative p-8 rounded-2xl bg-card border shadow-card h-full ${
                  scenario.featured 
                    ? 'border-primary/30 ring-2 ring-primary/10' 
                    : 'border-border/50'
                }`}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Featured badge */}
                {scenario.featured && (
                  <motion.div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold rounded-full shadow-teal"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    Most Popular
                  </motion.div>
                )}

                {/* Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${scenario.tagColor} mb-6`}>
                  <scenario.icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{scenario.badge}</span>
                </div>

                {/* Savings display */}
                <div className="mb-6">
                  <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                    <Counter end={scenario.savingsValue} suffix="%" duration={2} />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {scenario.savingsRange} savings potential
                  </div>
                </div>

                {/* Title & description */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {scenario.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {scenario.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {scenario.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-foreground"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + featureIndex * 0.1 }}
                    >
                      <motion.div
                        className={`w-5 h-5 rounded-full bg-gradient-to-br ${scenario.color} flex items-center justify-center flex-shrink-0`}
                        whileHover={{ scale: 1.2 }}
                      >
                        <TrendingUp className="w-3 h-3 text-white" />
                      </motion.div>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Visual indicator bar */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Savings Potential</span>
                    <span>{scenario.savingsRange}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${scenario.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${scenario.savingsValue * 3}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Hover glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${scenario.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`} />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default SavingsSection;
