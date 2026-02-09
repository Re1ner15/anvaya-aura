import Layout from '@/components/layout/Layout';
import ParticleBackground from '@/components/animations/ParticleBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Counter } from '@/components/animations/Counter';
import { useState } from 'react';
import OrbitGallery from '@/components/sections/OrbitGallery';
import NotifyModal from '@/components/NotifyModal';
import { 
  CheckCircle2,
  ThermometerSun,
  Zap,
  Users,
  BarChart3,
} from 'lucide-react';

const hotelBenefits = [
  { icon: ThermometerSun, title: 'HVAC Optimization', description: 'Smart control of heating, cooling, and ventilation across all rooms and common areas.' },
  { icon: Zap, title: 'Load Management', description: 'Intelligent load balancing to reduce peak demand charges.' },
  { icon: Users, title: 'Occupancy Sensing', description: 'Real-time occupancy detection for optimal energy allocation.' },
  { icon: BarChart3, title: 'Real-Time Analytics', description: 'Live dashboards showing consumption, savings, and optimization status.' },
];

const Markets = () => {
  const [notifyModal, setNotifyModal] = useState<{ isOpen: boolean; marketName: string }>({
    isOpen: false,
    marketName: '',
  });

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
              Markets We Serve
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-near-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Energy Intelligence Across{' '}
              <span className="text-gradient">Every Space</span>
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Starting with hotels, expanding to transform energy management everywhere
            </motion.p>
          </div>
        </div>
      </section>

      {/* Markets - Orbit Gallery */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <ParticleBackground particleColor="white" particleCount={15} className="opacity-30" />
        
        <div className="container-custom relative z-10">
          <OrbitGallery onNotifyClick={(name) => setNotifyModal({ isOpen: true, marketName: name })} />
        </div>
      </section>

      {/* Hotels Detail Section */}
      <section id="hotels-detail" className="section-padding bg-background relative overflow-hidden">
        <ParticleBackground particleColor="teal" particleCount={15} className="opacity-30" />
        
        <div className="container-custom relative z-10">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <CheckCircle2 className="w-4 h-4" />
              Available Now - Launching March 2025
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Autonomous Energy Management for Hotels
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hotels are the perfect fit for Neev: high energy intensity, 24/7 operation, and critical guest comfort requirements.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Why Hotels First?</h3>
                <ul className="space-y-4">
                  {[
                    'High energy intensity per square meter',
                    '24/7 operation with variable occupancy',
                    'Guest comfort is non-negotiable',
                    'Seasonal and daily demand variations',
                    'Multiple systems to optimize (HVAC, lighting, equipment)',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-4">
                {hotelBenefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                    whileHover={{ y: -4 }}
                  >
                    <benefit.icon className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Results Preview */}
          <ScrollReveal className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Expected Results</h3>
              <p className="text-muted-foreground">Based on our technology and industry benchmarks</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: 25, suffix: '%', label: 'Average Savings' },
                { value: 30, suffix: ' mins', label: 'Setup Time', prefix: '<' },
                { value: 100, suffix: '%', label: 'Comfort Maintained' },
                { value: 30, suffix: ' days', label: 'Time to Deploy', prefix: '<' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.prefix && <span>{stat.prefix}</span>}
                    <Counter end={stat.value} duration={2} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary-dark to-accent relative overflow-hidden">
        <ParticleBackground particleColor="white" particleCount={20} />
        
        <div className="container-custom relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Property?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Join our pilot program and be among the first to experience autonomous energy management.
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
                How It Works
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Notify Modal */}
      <NotifyModal
        isOpen={notifyModal.isOpen}
        onClose={() => setNotifyModal({ isOpen: false, marketName: '' })}
        marketName={notifyModal.marketName}
      />
    </Layout>
  );
};

export default Markets;
