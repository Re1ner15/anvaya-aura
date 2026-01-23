import Layout from '@/components/layout/Layout';
import ParticleBackground from '@/components/animations/ParticleBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { Counter } from '@/components/animations/Counter';
import { useState } from 'react';
import { 
  Hotel, 
  Building2, 
  Factory, 
  Home,
  CheckCircle2,
  Clock,
  Zap,
  Users,
  ThermometerSun,
  BarChart3,
  X
} from 'lucide-react';

const markets = [
  {
    id: 'hotels',
    icon: Hotel,
    title: 'Hotels & Hospitality',
    status: 'available',
    statusLabel: 'Available Now',
    description: 'Autonomous energy optimization delivering 10-30% savings with zero guest comfort compromise. Launching February 2025.',
    features: [
      'HVAC optimization across all rooms',
      'Peak demand management',
      '24/7 autonomous operation',
      'Guest comfort maintained at 100%',
    ],
  },
  {
    id: 'commercial',
    icon: Building2,
    title: 'Commercial Spaces',
    status: 'coming-soon',
    statusLabel: 'Coming Soon',
    description: 'Office buildings, retail centers, and mixed-use properties.',
    features: [
      'Multi-tenant optimization',
      'Smart scheduling',
      'Occupancy-based control',
    ],
  },
  {
    id: 'industrial',
    icon: Factory,
    title: 'Industrial Facilities',
    status: 'coming-soon',
    statusLabel: 'Coming Soon',
    description: 'Manufacturing plants, warehouses, and production facilities.',
    features: [
      'Production-aligned optimization',
      'Heavy equipment monitoring',
      'Shift-based scheduling',
    ],
  },
  {
    id: 'residential',
    icon: Home,
    title: 'Residential Buildings',
    status: 'coming-soon',
    statusLabel: 'Coming Soon',
    description: 'Apartments, condos, and multi-family housing.',
    features: [
      'Common area optimization',
      'Tenant comfort priority',
      'Shared system management',
    ],
  },
];

const hotelBenefits = [
  { icon: ThermometerSun, title: 'HVAC Optimization', description: 'Smart control of heating, cooling, and ventilation across all rooms and common areas.' },
  { icon: Zap, title: 'Load Management', description: 'Intelligent load balancing to reduce peak demand charges.' },
  { icon: Users, title: 'Occupancy Sensing', description: 'Real-time occupancy detection for optimal energy allocation.' },
  { icon: BarChart3, title: 'Real-Time Analytics', description: 'Live dashboards showing consumption, savings, and optimization status.' },
];

const Markets = () => {
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = (marketId: string) => {
    setSelectedMarket(marketId);
    setShowNotifyModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowNotifyModal(false);
      setSubmitted(false);
      setEmail('');
    }, 2000);
  };

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

      {/* Markets Grid */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <ParticleBackground particleColor="white" particleCount={15} className="opacity-30" />
        
        <div className="container-custom relative z-10">
          <StaggerContainer className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {markets.map((market, index) => (
              <StaggerItem key={market.id}>
                <motion.div
                  className={`relative p-8 rounded-2xl border-2 transition-all ${
                    market.status === 'available'
                      ? 'bg-white border-primary shadow-lg'
                      : 'bg-white border-border opacity-70 grayscale-[50%]'
                  }`}
                  whileHover={{ 
                    y: market.status === 'available' ? -12 : -8,
                    scale: market.status === 'available' ? 1.02 : 1.01,
                  }}
                  animate={market.status === 'coming-soon' ? {
                    scale: [1, 1.02, 1],
                  } : {}}
                  transition={market.status === 'coming-soon' ? {
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                  } : {}}
                >
                  {/* Status Badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold mb-4 ${
                    market.status === 'available'
                      ? 'bg-gradient-to-r from-primary/20 to-primary-light/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {market.status === 'available' && (
                      <motion.span
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    {market.status === 'coming-soon' && <Clock className="w-3 h-3" />}
                    {market.statusLabel}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                    market.status === 'available' ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <market.icon className={`w-8 h-8 ${
                      market.status === 'available' ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-foreground mb-2">{market.title}</h3>
                  <p className="text-muted-foreground mb-6">{market.description}</p>

                  {/* Features */}
                  {market.features && (
                    <ul className="space-y-2 mb-6">
                      {market.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className={`w-4 h-4 ${
                            market.status === 'available' ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  {market.status === 'available' ? (
                    <motion.a
                      href="#hotels-detail"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Learn More
                      <span>→</span>
                    </motion.a>
                  ) : (
                    <motion.button
                      onClick={() => handleNotify(market.id)}
                      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-dashed border-primary/50 text-primary font-semibold rounded-xl hover:bg-primary/5 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Notify Me
                    </motion.button>
                  )}

                  {/* Coming Soon Overlay */}
                  {market.status === 'coming-soon' && (
                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>
                  )}
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Hotels Detail Section */}
      <section id="hotels-detail" className="section-padding bg-background relative overflow-hidden">
        <ParticleBackground particleColor="teal" particleCount={15} className="opacity-30" />
        
        <div className="container-custom relative z-10">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <CheckCircle2 className="w-4 h-4" />
              Available Now - Launching February 2025
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
                { value: 30, suffix: ' min', label: 'Setup Time', prefix: '<' },
                { value: 100, suffix: '%', label: 'Comfort Maintained' },
                { value: 30, suffix: ' days', label: 'Time to Deploy', prefix: '<' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.prefix && <span>{stat.prefix}</span>}
                    {!stat.prefix && <Counter end={stat.value} duration={2} />}
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
      <AnimatePresence>
        {showNotifyModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-near-black/60 backdrop-blur-sm"
              onClick={() => setShowNotifyModal(false)}
            />
            <motion.div
              className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setShowNotifyModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">You're on the list!</h3>
                  <p className="text-muted-foreground">We'll notify you when this market becomes available.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-2">Get Notified</h3>
                  <p className="text-muted-foreground mb-6">
                    Be the first to know when Neev expands to {selectedMarket} properties.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                    <motion.button
                      type="submit"
                      className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Notify Me
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Markets;
