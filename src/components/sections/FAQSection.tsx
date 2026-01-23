import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import ParticleBackground from '@/components/animations/ParticleBackground';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How quickly can Neev be installed?',
    answer: 'Installation is non-invasive and typically completed within 1-2 days. Our clamp-on sensors require no rewiring or downtime. Most properties are fully operational with Neev within 30 days of signing.',
  },
  {
    question: 'Will this affect guest comfort?',
    answer: 'Absolutely not. Guest comfort is our top priority. Our AI optimizes energy usage during unoccupied periods and makes micro-adjustments that are imperceptible to guests. We maintain a 100% comfort score across all deployments.',
  },
  {
    question: 'How are the savings calculated?',
    answer: 'We use a rigorous baseline methodology comparing your energy usage before and after deployment, adjusted for occupancy, weather, and seasonal factors. You receive detailed monthly reports with transparent calculations.',
  },
  {
    question: 'What if we already have an energy management system?',
    answer: 'Neev complements existing systems by adding AI-powered autonomous optimization. Our NILM technology provides granular insights that traditional systems miss, typically finding an additional 10-15% savings on top of existing measures.',
  },
  {
    question: 'Is there a minimum property size requirement?',
    answer: 'Neev works best for properties with 50+ rooms, though we evaluate each opportunity individually. Our technology scales from boutique hotels to large resorts.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Particle background */}
      <ParticleBackground color="teal" density="low" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
                FAQ
              </span>
            </ScrollReveal>
            <h2 className="text-display-mobile md:text-display font-bold text-foreground">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                Everything
              </motion.span>{' '}
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                You Need
              </motion.span>{' '}
              <motion.span
                className="inline-block text-gradient"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                to Know
              </motion.span>
            </h2>
          </div>

          {/* FAQ items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="rounded-xl overflow-hidden bg-card border border-border/50 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-primary" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Still have questions?
              </p>
              <motion.a
                href="mailto:director@anvayaenertech.in"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                whileHover={{ x: 5 }}
              >
                Contact us →
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
