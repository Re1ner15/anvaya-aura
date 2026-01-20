import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { GradientWipe } from '@/components/animations/AnimatedText';
import { Plug, Brain, TrendingUp, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Plug,
    title: 'Connect in Minutes',
    description: 'Non-invasive installation on existing infrastructure. No rewiring. No downtime. Live in under 30 days.',
    details: [
      'Clamp-on sensors',
      'WiFi connectivity',
      'Zero disruption',
    ],
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI Learns & Optimizes',
    description: 'NILM technology disaggregates every load. Our AI builds a digital twin and identifies optimization opportunities.',
    details: [
      'Load disaggregation',
      'Pattern recognition',
      'Anomaly detection',
    ],
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Savings Compound',
    description: 'Autonomous actions eliminate waste 24/7. Watch savings grow month over month with detailed analytics.',
    details: [
      'Real-time actions',
      'Continuous learning',
      'Monthly reports',
    ],
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-mesh opacity-30" />
      
      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Simple Process
            </span>
          </ScrollReveal>
          <h2 className="text-display-mobile md:text-display font-bold text-foreground mb-4">
            <GradientWipe duration={1.2}>
              <span className="text-gradient">From Invisible Waste</span>
            </GradientWipe>
            <br />
            <GradientWipe delay={0.3} duration={1.2}>
              <span>to Autonomous Savings</span>
            </GradientWipe>
          </h2>
        </div>

        {/* Steps */}
        <StaggerContainer className="relative" staggerDelay={0.2}>
          {/* Connection line */}
          <svg
            className="hidden lg:block absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 z-0"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="16.67%"
              y1="50%"
              x2="83.33%"
              y2="50%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(171, 100%, 33%)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="hsl(171, 100%, 33%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(189, 100%, 42%)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <StaggerItem key={step.number}>
                <motion.div
                  className="group relative"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="relative p-8 rounded-2xl bg-card border border-border/50 shadow-card h-full">
                    {/* Step number */}
                    <motion.div
                      className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-teal"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.15, type: 'spring', stiffness: 200 }}
                    >
                      <span className="text-sm font-bold text-white">{step.number}</span>
                    </motion.div>

                    {/* Icon with draw animation */}
                    <motion.div
                      className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 border border-primary/20"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <step.icon className="w-8 h-8 text-primary" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Detail list */}
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <motion.li
                          key={detail}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + index * 0.1 + detailIndex * 0.05 }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Arrow to next (hidden on last) */}
                    {index < steps.length - 1 && (
                      <motion.div
                        className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 translate-x-full z-20 w-8 h-8 rounded-full bg-primary/10 items-center justify-center"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + index * 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};

export default HowItWorksSection;
