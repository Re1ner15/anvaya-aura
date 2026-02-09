import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import ParticleBackground from '@/components/animations/ParticleBackground';
import { Users } from 'lucide-react';

const team = [
  {
    name: 'Ranjit Jail',
    role: 'Co-founder',
    description: 'Leading Product Development and Operations at Anvaya',
  },
  {
    name: 'Aditya Joshi',
    role: 'Co-founder',
    description: 'Leading Product Refinement and Business Development at Anvaya',
  },
];

const TeamSection = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-near-black text-white relative overflow-hidden">
      <ParticleBackground color="teal" density="low" />

      <div className="container-custom relative z-10">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Building the future of autonomous energy management
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {team.map((member, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <motion.div
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm h-full"
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
  );
};

export default TeamSection;
