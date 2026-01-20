import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import ValuePropSection from '@/components/sections/ValuePropSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import MarketsSection from '@/components/sections/MarketsSection';
import SavingsSection from '@/components/sections/SavingsSection';
import TrustSection from '@/components/sections/TrustSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ValuePropSection />
        <HowItWorksSection />
        <MarketsSection />
        <SavingsSection />
        <TrustSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
