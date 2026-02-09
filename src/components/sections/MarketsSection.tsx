import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitReveal } from '@/components/animations/AnimatedText';
import ParticleBackground from '@/components/animations/ParticleBackground';
import OrbitGallery from '@/components/sections/OrbitGallery';
import NotifyModal from '@/components/NotifyModal';
import { useState } from 'react';

const MarketsSection = () => {
  const [notifyModal, setNotifyModal] = useState<{ isOpen: boolean; marketName: string }>({
    isOpen: false,
    marketName: '',
  });

  return (
    <section id="markets" className="py-12 md:py-16 px-4 md:px-8 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      <ParticleBackground color="white" density="medium" />
      <div className="absolute inset-0 bg-mesh opacity-40" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-8">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Markets We Serve
            </span>
          </ScrollReveal>
          <h2 className="text-display-mobile md:text-display font-bold text-foreground mb-4">
            <SplitReveal>Energy Intelligence Across Every Space</SplitReveal>
          </h2>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Starting with hotels, expanding to transform energy management everywhere
            </p>
          </ScrollReveal>
        </div>

        {/* Orbit Gallery */}
        <OrbitGallery
          onNotifyClick={(name) => setNotifyModal({ isOpen: true, marketName: name })}
        />
      </div>

      {/* Notify Modal */}
      <NotifyModal
        isOpen={notifyModal.isOpen}
        onClose={() => setNotifyModal({ isOpen: false, marketName: '' })}
        marketName={notifyModal.marketName}
      />
    </section>
  );
};

export default MarketsSection;
