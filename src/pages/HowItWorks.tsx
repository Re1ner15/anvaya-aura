import Layout from '@/components/layout/Layout';
import ParticleBackground from '@/components/animations/ParticleBackground';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { Counter } from '@/components/animations/Counter';
import { 
  Plug, 
  Brain, 
  TrendingUp,
  CheckCircle2,
  Zap,
  Clock,
  Settings,
  BarChart3
} from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Plug,
    title: 'Connect in Minutes',
    subtitle: 'Zero Hardware Installation',
    description: 'Neev integrates directly with your existing building management systems and smart meters. No new hardware, no complex installations, no disruption to operations.',
    features: [
      'Direct API integration with existing systems',
      'Compatible with major BMS platforms',
      'Setup completed remotely',
      'No downtime required',
    ],
    metric: { value: 30, label: 'Minutes to Connect', suffix: '' },
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI Learns & Optimizes',
    subtitle: 'Continuous Intelligence',
    description: 'Our NILM (Non-Intrusive Load Monitoring) technology disaggregates your total energy consumption into individual device-level usage. The AI learns your building unique patterns and identifies optimization opportunities.',
    features: [
      'Device-level energy disaggregation',
      'Pattern recognition across seasons',
      'Anomaly detection and alerts',
      'Predictive demand forecasting',
    ],
    metric: { value: 7, label: 'Days to Learn', suffix: '' },
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Savings Compound',
    subtitle: 'Autonomous Action',
    description: 'Neev does not just monitor - it takes action. The system autonomously optimizes HVAC schedules, manages peak loads, and adjusts settings in real-time while maintaining 100% occupant comfort.',
    features: [
      'Autonomous HVAC optimization',
      'Peak demand management',
      'Real-time load balancing',
      'Continuous improvement over time',
    ],
    metric: { value: 25, label: 'Average Savings', suffix: '%' },
  },
];

const faqs = [
  {
    q: 'How long does installation take?',
    a: 'Installation is typically completed within 30 minutes. We integrate directly with your existing systems—no new hardware required.',
  },
  {
    q: 'Will this affect occupant comfort?',
    a: 'Never. Neev is designed to maintain 100% occupant comfort. The AI optimizes around comfort parameters, never compromising the experience.',
  },
  {
    q: 'What systems does Neev integrate with?',
    a: 'Neev integrates with major BMS platforms, smart meters, and HVAC systems. We handle all integration work during setup.',
  },
  {
    q: 'How quickly will I see savings?',
    a: 'Most properties see measurable savings within the first week. The AI continues to optimize and improve results over the first 30 days.',
  },
  {
    q: 'What happens if something goes wrong?',
    a: 'Neev includes 24/7 monitoring and automatic failsafes. If any issue is detected, the system immediately reverts to safe defaults.',
  },
];

const HowItWorks = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-off-white pt-24">
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
              How It Works
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-near-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              From Invisible Waste to{' '}
              <span className="text-gradient">Autonomous Savings</span>
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Three simple steps to transform your building's energy efficiency
            </motion.p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <ParticleBackground particleColor="teal" particleCount={15} className="opacity-30" />
        
        <div className="container-custom relative z-10">
          {steps.map((step, index) => (
            <ScrollReveal 
              key={step.number} 
              className={`mb-20 last:mb-0`}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}>
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-6xl md:text-7xl font-bold text-primary/20">{step.number}</span>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {step.title}
                  </h2>
                  <p className="text-lg text-primary font-medium mb-4">{step.subtitle}</p>
                  <p className="text-muted-foreground mb-6">{step.description}</p>
                  
                  <ul className="space-y-3">
                    {step.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <motion.div
                    className="relative bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-center">
                      <div className="text-6xl md:text-7xl font-bold text-primary mb-2">
                        {step.metric.suffix === '%' ? (
                          <><Counter end={step.metric.value} duration={2} />{step.metric.suffix}</>
                        ) : (
                          <><Counter end={step.metric.value} duration={2} /></>
                        )}
                      </div>
                      <div className="text-lg text-muted-foreground">{step.metric.label}</div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-primary/10 blur-xl" />
                    <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-accent/10 blur-xl" />
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Technology Deep Dive */}
      <section className="section-padding bg-near-black text-white relative overflow-hidden">
        <ParticleBackground particleColor="teal" particleCount={15} className="opacity-40" />
        
        <div className="container-custom relative z-10">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary text-sm font-semibold mb-4">
              <Zap className="w-4 h-4" />
              Technology
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              NILM: The Brain Behind Neev
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Non-Intrusive Load Monitoring technology allows us to disaggregate your building's total energy consumption into individual device-level usage—without any additional sensors.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: 'Energy Disaggregation',
                description: 'Identify exactly which devices and systems are consuming energy, down to individual equipment.',
              },
              {
                icon: Brain,
                title: 'Pattern Learning',
                description: 'AI recognizes usage patterns across time of day, occupancy levels, seasons, and special events.',
              },
              {
                icon: Clock,
                title: 'Real-Time Optimization',
                description: 'Continuous monitoring enables instant adjustments to maximize efficiency.',
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <motion.div
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                  whileHover={{ y: -8, borderColor: 'rgba(0, 168, 150, 0.3)' }}
                >
                  <item.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/60">{item.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <ParticleBackground particleColor="teal" particleCount={15} className="opacity-30" />
        
        <div className="container-custom relative z-10">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about how Neev works
            </p>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              See Neev in action with a personalized demo for your property.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="/pilot-program"
                className="px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule a Demo
              </motion.a>
              <motion.a
                href="/product"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Features
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
