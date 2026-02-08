import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { GradientWipe } from '@/components/animations/AnimatedText';
import ParticleBackground from '@/components/animations/ParticleBackground';
import FeatureCarousel from '@/components/sections/FeatureCarousel';

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding bg-background relative overflow-hidden">
      <ParticleBackground color="teal" density="low" />
      <div className="absolute inset-0 bg-mesh opacity-30" />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Simple Process
            </span>
          </ScrollReveal>
          <h2 className="text-display-mobile md:text-display font-bold text-foreground mb-4 leading-none">
            <GradientWipe duration={1.2}>
              <span className="text-gradient">From Invisible Waste</span>
            </GradientWipe>
            <br />
            <GradientWipe delay={0.3} duration={1.2}>
              <span>to Autonomous Savings</span>
            </GradientWipe>
          </h2>
        </div>

        {/* Interactive feature carousel */}
        <FeatureCarousel />
      </div>
    </section>
  );
};

export default HowItWorksSection;
