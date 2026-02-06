import Layout from '@/components/layout/Layout';
import ParticleBackground from '@/components/animations/ParticleBackground';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { useState } from 'react';
import NotifyModal from '@/components/NotifyModal';
import { 
  Eye, 
  Zap,
  Users,
  Mail,
  MapPin,
  Linkedin,
  Send,
  CheckCircle2,
  Brain,
  Building2,
  Hotel,
  Factory,
  Home,
  Bell
} from 'lucide-react';

const values = [
  {
    icon: Eye,
    title: 'Visibility',
    description: 'Making the invisible visible—bringing clarity to energy consumption patterns.',
  },
  {
    icon: Zap,
    title: 'Autonomy',
    description: 'AI that acts, not just monitors—delivering results without manual intervention.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'Working alongside property owners to transform energy management together.',
  },
];

const team = [
  {
    name: 'Ranjit',
    role: 'Co-founder',
    focus: '',
    description: 'Leading the development of Neev AI and Advanced Monitoring technology stack.',
  },
  {
    name: 'Aditya Joshi',
    role: 'Co-founder',
    focus: '',
    description: 'Driving business development and partnerships across the building energy sector.',
  },
];

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [notifyModal, setNotifyModal] = useState<{ isOpen: boolean; marketName: string }>({
    isOpen: false,
    marketName: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
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
              About Anvaya EnerTech
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-near-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Making the Invisible,{' '}
              <span className="text-gradient">Visible</span>
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              We believe every building deserves autonomous energy management. Starting with hotels, expanding everywhere.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <ParticleBackground particleColor="teal" particleCount={15} className="opacity-30" />
        
        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground mb-6">
                Buildings consume 40% of global energy, yet most of this consumption is invisible to property owners. Waste happens silently—through inefficient HVAC schedules, forgotten equipment, and unoptimized loads.
              </p>
              <p className="text-muted-foreground mb-6">
                At Anvaya EnerTech, we're building Neev—an AI Energy Operator that makes this invisible waste visible and takes autonomous action to eliminate it. Fast deployment, minimal disruption, just intelligent optimization that works 24/7.
              </p>
              <p className="text-muted-foreground">
                We're starting with hotels because they represent the perfect use case: high energy intensity, 24/7 operations, and critical comfort requirements. But our vision extends to every building—commercial, industrial, and residential.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Hotel, label: 'Hotels', status: 'Now', isAvailable: true },
                  { icon: Building2, label: 'Commercial', status: 'Coming Soon', isAvailable: false },
                  { icon: Factory, label: 'Industrial', status: 'Coming Soon', isAvailable: false },
                  { icon: Home, label: 'Residential', status: 'Coming Soon', isAvailable: false },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className={`p-6 rounded-xl text-center cursor-pointer transition-all ${
                      item.isAvailable 
                        ? 'bg-primary/10 border-2 border-primary/30' 
                        : 'bg-card border border-border hover:border-primary/20'
                    }`}
                    whileHover={{ y: -4 }}
                    onClick={() => {
                      if (!item.isAvailable) {
                        setNotifyModal({ isOpen: true, marketName: item.label });
                      }
                    }}
                  >
                    <item.icon className={`w-8 h-8 mx-auto mb-3 ${
                      item.isAvailable ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <div className="font-semibold text-foreground">{item.label}</div>
                    <div className={`text-sm ${
                      item.isAvailable ? 'text-primary font-medium' : 'text-muted-foreground'
                    }`}>{item.status}</div>
                    {!item.isAvailable && (
                      <div className="mt-2 inline-flex items-center gap-1 text-xs text-primary opacity-70">
                        <Bell className="w-3 h-3" /> Notify Me
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        <ParticleBackground particleColor="teal" particleCount={15} className="opacity-30" />
        
        <div className="container-custom relative z-10">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="p-8 rounded-2xl bg-card border border-border text-center h-full"
                  whileHover={{ y: -8, borderColor: 'hsl(var(--primary) / 0.3)' }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Technology Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <ParticleBackground particleColor="teal" particleCount={15} className="opacity-30" />
        
        <div className="container-custom relative z-10">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <Brain className="w-4 h-4" />
              Our Technology
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built on Advanced Monitoring + Agentic AI
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines two cutting-edge technologies: Advanced Monitoring for energy disaggregation—making the invisible visible, and Agentic AI for autonomous decision-making that acts on your behalf 24/7.
            </p>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  {[
                    { label: 'Device-Level Visibility', description: 'See exactly what is consuming energy' },
                    { label: 'Pattern Recognition', description: 'AI learns your unique usage patterns' },
                    { label: 'Autonomous Optimization', description: 'Takes action without manual intervention' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary font-bold">{i + 1}</span>
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">{item.label}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-near-black text-white relative overflow-hidden">
        <ParticleBackground particleColor="teal" particleCount={15} className="opacity-40" />
        
        <div className="container-custom relative z-10">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Team
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Building the future of autonomous energy management
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <motion.div
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                  whileHover={{ y: -8, borderColor: 'rgba(0, 168, 150, 0.3)' }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-white/70 text-sm">{member.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-background relative overflow-hidden">
        <ParticleBackground particleColor="teal" particleCount={15} className="opacity-30" />
        
        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Get in Touch
              </h2>
              <p className="text-muted-foreground mb-8">
                Have questions about Neev? Want to learn more about our pilot program? We'd love to hear from you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <a href="mailto:director@anvayaenertech.in" className="text-foreground hover:text-primary transition-colors">
                      director@anvayaenertech.in
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="text-foreground">India</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <a 
                    href="https://www.linkedin.com/company/anvaya-enertech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-primary" />
                  </a>
                  <div>
                    <div className="text-sm text-muted-foreground">LinkedIn</div>
                    <a href="https://www.linkedin.com/company/anvaya-enertech" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                      Follow us
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-card border border-border rounded-2xl p-8">
                {submitted ? (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">We will get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="you@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        placeholder="How can we help?"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Message
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
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

export default About;
