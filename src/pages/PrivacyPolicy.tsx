import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-near-black text-white">
      <Header />
      <main className="container-custom px-4 py-24 md:py-32 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-white/50 mb-10 text-sm">Last updated: February 2026</p>

        <p className="text-white/70 mb-8">
          Anvaya EnerTech ("Anvaya", "we", "our", or "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect information when you use our website and services.
        </p>

        <Section title="1. Information We Collect">
          <h4 className="text-white font-medium mb-2">a. Information You Provide</h4>
          <ul className="list-disc list-inside text-white/70 mb-4 space-y-1">
            <li>Name, email address, company details</li>
            <li>Pilot program applications and contact forms</li>
            <li>Communications sent to us</li>
          </ul>
          <h4 className="text-white font-medium mb-2">b. Usage & Technical Data</h4>
          <ul className="list-disc list-inside text-white/70 mb-4 space-y-1">
            <li>Device and browser information</li>
            <li>IP address</li>
            <li>Website usage and interaction data</li>
          </ul>
          <h4 className="text-white font-medium mb-2">c. Energy & Operational Data (Pilot Users)</h4>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Energy consumption data</li>
            <li>Equipment and system metadata</li>
            <li>Occupancy or operational signals (where applicable)</li>
          </ul>
        </Section>

        <Section title="2. How We Use Information">
          <p className="text-white/70 mb-2">We use collected information to:</p>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Provide and improve our Services</li>
            <li>Operate and analyze the Pilot Program</li>
            <li>Communicate updates and respond to inquiries</li>
            <li>Improve product performance and reliability</li>
          </ul>
        </Section>

        <Section title="3. Data Sharing">
          <p className="text-white/70 mb-2">We do not sell personal data. We may share data:</p>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>With trusted service providers (hosting, analytics, communications)</li>
            <li>When required by law or legal process</li>
            <li>In anonymized and aggregated form for research or benchmarking</li>
          </ul>
        </Section>

        <Section title="4. Data Security">
          <p className="text-white/70">
            We implement reasonable technical and organizational measures to protect data. However, no system is 100% secure, and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section title="5. Data Retention">
          <p className="text-white/70 mb-2">We retain data only as long as necessary to:</p>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Provide Services</li>
            <li>Meet legal or regulatory obligations</li>
            <li>Improve our products</li>
          </ul>
          <p className="text-white/70 mt-2">Pilot data may be retained in anonymized form after pilot completion.</p>
        </Section>

        <Section title="6. Your Rights">
          <p className="text-white/70 mb-2">You may:</p>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            <li>Request access to your data</li>
            <li>Request correction or deletion</li>
            <li>Withdraw consent where applicable</li>
          </ul>
          <p className="text-white/70 mt-2">
            Requests can be sent to{' '}
            <a href="mailto:director@anvayaenertech.in" className="text-primary hover:underline">
              director@anvayaenertech.in
            </a>.
          </p>
        </Section>

        <Section title="7. Cookies">
          <p className="text-white/70">
            We may use cookies and similar technologies to improve website performance and user experience. You can control cookies through your browser settings.
          </p>
        </Section>

        <Section title="8. Third-Party Links">
          <p className="text-white/70">
            Our website may contain links to third-party websites. We are not responsible for their privacy practices.
          </p>
        </Section>

        <Section title="9. Changes to This Policy">
          <p className="text-white/70">
            We may update this Privacy Policy periodically. Updates will be posted on this page with a revised date.
          </p>
        </Section>

        <Section title="10. Contact Us">
          <p className="text-white/70">
            For privacy-related questions or requests:{' '}
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

export default PrivacyPolicy;
