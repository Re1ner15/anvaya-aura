import Layout from '@/components/layout/Layout';
import ParticleBackground from '@/components/animations/ParticleBackground';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { Counter } from '@/components/animations/Counter';
import { 
  Eye, 
  Brain, 
  TrendingUp, 
  Zap, 
  Shield, 
  Clock, 
  BarChart3, 
  Settings,
  CheckCircle2
} from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Real-Time Visibility',
    description: 'Monitor every watt consumed across your entire building with device-level precision.',
  },
  {
    icon: Brain,
    title: 'AI-Powered Optimization',
    description: 'Machine learning algorithms continuously optimize energy usage patterns.',
  },
  {
    icon: Zap,
    title: 'Autonomous Action',
    description: 'Neev takes action automatically, reducing waste without manual intervention.',
  },
  {
    icon: Shield,
    title: 'Zero Compromise',
    description: 'Maintain 100% occupant comfort while achieving significant savings.',
  },
  {
    icon: Clock,
    title: '24/7 Monitoring',
    description: 'Continuous surveillance ensures no energy waste goes unnoticed.',
  },
  {
    icon: BarChart3,
    title: 'Actionable Insights',
    description: 'Clear dashboards and reports help you understand your energy profile.',
  },
];

const techSteps = [
  {
    step: '01',
    title: 'Advanced Monitoring',
    description: 'Advanced Monitoring technology disaggregates total energy consumption into individual device-level usage with minimal setup.',
  },
  {
    step: '02',
    title: 'Pattern Recognition',
    description: 'AI learns your building unique energy signatures and identifies optimization opportunities.',
  },
  {
    step: '03',
    title: 'Predictive Analytics',
    description: 'Anticipate demand spikes and optimize preemptively to reduce peak charges.',
  },
];

const Product = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-off-white pt-24">
        <ParticleBackground particleColor="teal" particleCount={20} />
        
        <div className="relative z-10 container-custom px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Settings className="w-4 h-4" />
              The Neev Platform
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-near-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Complete Energy Autonomy for{' '}
              <span className="text-gradient">Every Building</span>
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Neev makes invisible energy waste visible and takes autonomous action—delivering 10-30% savings with fast deployment and minimal disruption.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-background relative overflow-hidden">
        <ParticleBackground particleColor="teal" particleCount={15} className="opacity-30" />
        
        <div className="container-custom relative z-10">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Platform Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for complete energy management
            </p>
          </ScrollReveal>
          
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all card-hover"
                  whileHover={{ y: -8 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Technology Section */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <ParticleBackground particleColor="teal" particleCount={15} className="opacity-50" />
        
        <div className="container-custom relative z-10">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Our Technology
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built on Advanced Monitoring + Agentic AI
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8">
            {techSteps.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <div className="relative">
                  <span className="text-8xl font-bold text-primary/10 absolute -top-4 -left-2">
                    {item.step}
                  </span>
                  <div className="relative pt-12">
                    <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <ParticleBackground particleColor="teal" particleCount={15} className="opacity-30" />
        
        <div className="container-custom relative z-10">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Real Savings, Real Results
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what Neev can deliver for your property
            </p>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { savings: 15, label: 'Conservative', description: 'Basic optimization with minimal changes' },
              { savings: 25, label: 'Standard', description: 'Full AI optimization across all systems' },
              { savings: 30, label: 'Maximum', description: 'Complete autonomous management' },
            ].map((tier, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <motion.div
                  className={`p-8 rounded-2xl border-2 ${index === 1 ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="text-center">
                    <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                      <Counter end={tier.savings} duration={2} />%
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-2">{tier.label}</div>
                    <p className="text-muted-foreground text-sm">{tier.description}</p>
                    
                    <div className="mt-6 pt-6 border-t border-border">
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Fast deployment
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary-dark to-accent relative overflow-hidden">
        <ParticleBackground particleColor="white" particleCount={20} />
        
        <div className="container-custom relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to See Neev in Action?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Schedule a personalized demo and discover how much you could save.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="/pilot-program"
                className="px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Join Pilot Program
              </motion.a>
              <motion.a
                href="/how-it-works"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Product;
