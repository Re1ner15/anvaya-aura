import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-near-black text-white">
      <Header />
      <main className="container-custom px-4 py-24 md:py-32 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-white/50 mb-10 text-sm">Last updated: February 2026</p>

        <p className="text-white/70 mb-8">
          Welcome to Anvaya EnerTech ("Anvaya", "we", "our", or "us"). These Terms of Service ("Terms") govern your access to and use of our website, products, software, dashboards, pilot programs, and related services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
        </p>

        <Section title="1. Use of Our Services">
          <p className="text-white/70 mb-2">
            You may use the Services only in compliance with these Terms and all applicable laws. Our Services are intended for businesses, property owners, operators, and authorized representatives.
          </p>
          <p className="text-white/70 mb-2">You agree not to:</p>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Misuse, interfere with, or disrupt the Services</li>
            <li>Attempt unauthorized access to systems or data</li>
            <li>Reverse engineer, copy, or resell the Services without permission</li>
          </ul>
        </Section>

        <Section title="2. Pilot Program">
          <p className="text-white/70 mb-2">Participation in the Anvaya Pilot Program is voluntary and limited.</p>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Acceptance into the pilot is at Anvaya's sole discretion</li>
            <li>Pilot features may change, be modified, or be discontinued</li>
            <li>Performance metrics, savings estimates, and insights are indicative, not guaranteed</li>
          </ul>
          <p className="text-white/70 mt-2">
            Anvaya makes no guarantees regarding specific cost savings or outcomes during the pilot phase.
          </p>
        </Section>

        <Section title="3. No Guarantees or Warranties">
          <p className="text-white/70 mb-2">The Services are provided on an "as is" and "as available" basis. We do not guarantee:</p>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Specific energy savings</li>
            <li>Continuous or error-free operation</li>
            <li>Compatibility with all hardware or infrastructure</li>
          </ul>
          <p className="text-white/70 mt-2">
            Any projections or estimates shown on the website or dashboard are informational only.
          </p>
        </Section>

        <Section title="4. Data & Insights">
          <p className="text-white/70 mb-2">You retain ownership of your building and operational data. By using the Services, you grant Anvaya permission to:</p>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Process data to deliver insights, analytics, and optimization</li>
            <li>Use anonymized and aggregated data for research, benchmarking, and product improvement</li>
          </ul>
          <p className="text-white/70 mt-2">We will not sell identifiable customer data.</p>
        </Section>

        <Section title="5. Intellectual Property">
          <p className="text-white/70">
            All content, software, designs, trademarks, and materials related to the Services are the property of Anvaya EnerTech or its licensors. You may not copy, modify, or distribute any part of the Services without written consent.
          </p>
        </Section>

        <Section title="6. Limitation of Liability">
          <p className="text-white/70 mb-2">To the maximum extent permitted by law, Anvaya shall not be liable for:</p>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Indirect, incidental, or consequential damages</li>
            <li>Loss of profits, revenue, or data</li>
            <li>Decisions made based on insights from the Services</li>
          </ul>
          <p className="text-white/70 mt-2">Your use of the Services is at your own risk.</p>
        </Section>

        <Section title="7. Termination">
          <p className="text-white/70">
            We may suspend or terminate access to the Services at any time if these Terms are violated or if required for operational, legal, or security reasons.
          </p>
        </Section>

        <Section title="8. Changes to Terms">
          <p className="text-white/70">
            We may update these Terms from time to time. Continued use of the Services after changes indicates acceptance of the updated Terms.
          </p>
        </Section>

        <Section title="9. Governing Law">
          <p className="text-white/70">
            These Terms shall be governed by and interpreted in accordance with the laws of India, without regard to conflict of law principles.
          </p>
        </Section>

        <Section title="10. Contact">
          <p className="text-white/70">
            For questions regarding these Terms, contact:{' '}
            <a href="mailto:director@anvayaenertech.in" className="text-primary hover:underline">
              director@anvayaenertech.in
            </a>
          </p>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
    {children}
  </section>
);

export default TermsOfService;
