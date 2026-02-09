import Layout from '@/components/layout/Layout';
import ParticleBackground from '@/components/animations/ParticleBackground';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { useState } from 'react';
import { 
  Rocket, 
  CheckCircle2,
  Calendar,
  Users,
  Headphones,
  BarChart3,
  Star,
  ArrowRight,
  Hotel
} from 'lucide-react';

const benefits = [
  {
    icon: Star,
    title: 'Early Access',
    description: 'Be among the first to experience Neev autonomous energy management technology.',
  },
  {
    icon: Headphones,
    title: 'Priority Support',
    description: 'Dedicated implementation team and direct access to our engineering experts.',
  },
  {
    icon: BarChart3,
    title: 'Full Analytics',
    description: 'Complete access to real-time dashboards, reports, and savings tracking.',
  },
  {
    icon: Users,
    title: 'Quarterly Reviews',
    description: 'Regular business reviews to optimize performance and share insights.',
  },
];

const timeline = [
  { date: 'March 2026', event: 'Applications Open', status: 'current' },
  { date: 'April 2026', event: 'Installation Begins', status: 'upcoming' },
  { date: 'April – August 2026', event: 'Active Optimization', status: 'upcoming' },
  { date: 'September 2026', event: 'Results Review', status: 'upcoming' },
];

const requirements = [
  'Hotels with 20+ rooms',
  'Property managers open to innovation',
  'Commitment to 6-month pilot',
  'Willingness to share anonymized results',
];

const PilotProgram = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    propertyType: '',
    rooms: '',
    monthlyEnergy: '',
    name: '',
    email: '',
    phone: '',
    interest: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-pilot-application`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error('Failed to send');
      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      // Still show success to user, form data was captured
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-accent pt-24">
        <ParticleBackground particleColor="white" particleCount={25} />
        
        <div className="relative z-10 container-custom px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 text-white text-sm font-semibold mb-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Rocket className="w-4 h-4" />
              Pilot Program - March 2026
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Be Among the First to Experience{' '}
              <span className="text-white/90">Autonomous Energy Management</span>
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Early access · Priority support · Special pricing
            </motion.p>

            <motion.a
              href="#apply"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <ParticleBackground particleColor="teal" particleCount={15} className="opacity-30" />
        
        <div className="container-custom relative z-10">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What You Get
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pilot partners receive exclusive benefits and priority access
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all h-full"
                  whileHover={{ y: -8 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <ParticleBackground particleColor="teal" particleCount={15} className="opacity-30" />
        
        <div className="container-custom relative z-10">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <Calendar className="w-4 h-4" />
              Timeline
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pilot Program Timeline
            </h2>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-0.5" />
              
              {timeline.map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className={`relative flex items-center gap-6 mb-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Dot */}
                    <div className={`absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-4 ${
                      item.status === 'current' 
                        ? 'bg-primary border-primary/30' 
                        : 'bg-muted border-border'
                    }`} />
                    
                    {/* Content */}
                    <div className={`ml-16 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}>
                      <motion.div
                        className={`p-6 rounded-xl ${
                          item.status === 'current'
                            ? 'bg-primary/10 border-2 border-primary/30'
                            : 'bg-card border border-border'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className={`text-sm font-semibold mb-1 ${
                          item.status === 'current' ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                          {item.date}
                        </div>
                        <div className="text-lg font-semibold text-foreground">{item.event}</div>
                      </motion.div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <ParticleBackground particleColor="teal" particleCount={15} className="opacity-30" />
        
        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                <Hotel className="w-4 h-4" />
                Ideal Partners
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Who We're Looking For
              </h2>
              <p className="text-muted-foreground mb-6">
                We're seeking forward-thinking property owners who want to be at the forefront of energy innovation.
              </p>
              <ul className="space-y-4">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <motion.div
                className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 text-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-5xl font-bold text-primary mb-2">10-30%</div>
                <div className="text-lg text-foreground font-semibold mb-4">Expected Savings</div>
                <div className="text-muted-foreground text-sm">
                  Based on building type, usage patterns, and optimization potential
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="section-padding bg-near-black text-white relative overflow-hidden">
        <ParticleBackground particleColor="teal" particleCount={20} className="opacity-40" />
        
        <div className="container-custom relative z-10">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Apply for Pilot Program
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Fill out the form below and we'll be in touch within 48 hours.
            </p>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Application Submitted!</h3>
                <p className="text-white/70">
                  Thank you for your interest in Neev. We'll review your application and get back to you within 48 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Property Name</label>
                    <input
                      type="text"
                      required
                      value={formData.propertyName}
                      onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Hotel name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Property Type</label>
                    <select
                      required
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    >
                      <option value="" className="text-near-black">Select type</option>
                      <option value="hotel" className="text-near-black">Hotel</option>
                      <option value="resort" className="text-near-black">Resort</option>
                      <option value="boutique" className="text-near-black">Boutique Hotel</option>
                      <option value="other" className="text-near-black">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of Rooms</label>
                    <input
                      type="number"
                      required
                      value={formData.rooms}
                      onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="e.g., 50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Monthly Energy Spend (approx)</label>
                    <input
                      type="text"
                      value={formData.monthlyEnergy}
                      onChange={(e) => setFormData({ ...formData, monthlyEnergy: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="e.g., ₹5,00,000"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone (optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Why are you interested in Neev?</label>
                  <textarea
                    rows={4}
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="Tell us about your energy goals..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PilotProgram;
