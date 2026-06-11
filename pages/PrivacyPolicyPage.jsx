import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <main className="py-20 md:py-28 bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Legal & Compliance</span>
        <h1 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-8 leading-tight">
          Privacy Policy
        </h1>
        
        <div className="space-y-8 text-zinc-400 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">1. Introduction</h2>
            <p>
              Welcome to Aetherion. We value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our website, apply for technical internships, register for courses, or interact with our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">2. Information We Collect</h2>
            <p>
              We collect information that you voluntarily provide to us when registering, submitting inquiries, or applying for training programs. This includes:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Personal identifiers (Name, Email Address).</li>
              <li>Academic and vocational details (College Name, Year of Study).</li>
              <li>Application attachments (Resume / Portfolio Links).</li>
              <li>Inquiry details (Subject, Custom Messages).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">3. How We Use Your Information</h2>
            <p>
              The information we collect is used solely to facilitate internship allocations, manage curriculum logbooks, respond to inquiries, send verified completion certificates, and optimize your overall experience. We do not sell or lease your personal information to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">4. Third-Party Integrations</h2>
            <p>
              Our application uses verified third-party systems for seamless service delivery:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li><strong>Supabase:</strong> For secure database hosting, profile authentication, and user data storage.</li>
              <li><strong>Web3Forms:</strong> To safely transmit contact forms and application inquiries to our program mentors.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">5. Data Security & Storage</h2>
            <p>
              We apply industry-standard security measures to prevent unauthorized access, alteration, or disclosure of your data. However, please note that no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">6. Contact Information</h2>
            <p>
              For any questions regarding this privacy policy or your personal data, please contact our privacy compliance officer at:
            </p>
            <p className="text-amber-400 font-medium mt-1">
              tech.aetherion@gmail.com
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
