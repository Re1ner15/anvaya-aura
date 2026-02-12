import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plug, Brain, TrendingUp } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { GradientWipe } from '@/components/animations/AnimatedText';
import ParticleBackground from '@/components/animations/ParticleBackground';

const steps = [
  {
    number: '01',
    icon: Plug,
    title: 'Connect in Minutes',
    description:
      'Non-invasive deployment using clamp-on sensors. No rewiring. No downtime. Live quickly on existing infrastructure.',
    details: ['Clamp-on sensors', 'WiFi connectivity', 'Zero disruption'],
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI Learns & Optimizes',
    description:
      'Neev continuously learns demand patterns and autonomously optimizes HVAC, lighting, and major loads in real time.',
    details: ['Load disaggregation', 'Pattern recognition', 'Anomaly detection'],
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Savings Compound',
    description:
      'Savings improve month over month through continuous learning, automated actions, and performance tracking.',
    details: ['Real-time actions', 'Continuous learning', 'Monthly reports'],
  },
];

const HowItWorksCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="how-it-works"
      className="py-16 md:py-20 px-4 md:px-8 bg-background relative overflow-hidden"
    >
      <ParticleBackground color="teal" density="low" />
      <div className="absolute inset-0 bg-mesh opacity-30" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-8">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 mb-3 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Simple Process
            </span>
          </ScrollReveal>
          <h2 className="text-display-mobile md:text-display font-bold text-foreground leading-normal">
            <GradientWipe duration={1.2}>
              <span className="text-gradient block" style={{ WebkitTextFillColor: 'transparent' }}>From Invisible Waste</span>
            </GradientWipe>
            <GradientWipe delay={0.3} duration={1.2}>
              <span className="block text-foreground">to Autonomous Savings</span>
            </GradientWipe>
          </h2>
        </div>

        {/* Hover carousel cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                className="relative rounded-2xl border border-border bg-card overflow-hidden cursor-pointer"
                style={{ boxShadow: 'var(--shadow-sm)' }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  flex: isHovered ? 1.6 : 1,
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Top accent bar */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-primary to-accent"
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />

                <div className="p-6 pt-7">
                  {/* Number + icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-bold text-primary/10">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-teal">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-2 leading-normal">
                    {step.title}
                  </h3>

                  {/* Description - always visible */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Details - reveal on hover */}
                  <motion.ul
                    className="space-y-1.5 overflow-hidden"
                    animate={{
                      height: isHovered ? 'auto' : 0,
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.details.map((detail, i) => (
                      <motion.li
                        key={detail}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                        initial={{ opacity: 0, x: -8 }}
                        animate={
                          isHovered
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -8 }
                        }
                        transition={{ delay: isHovered ? i * 0.08 : 0 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {detail}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: swipe hint */}
        <div className="flex justify-center mt-4 md:hidden">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  hoveredIndex === i ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksCarousel;
