import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <main className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">Legal & Compliance</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-3 mb-8 leading-tight">
          Privacy Policy
        </h1>
        
        <div className="space-y-8 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">1. Introduction</h2>
            <p>
              Welcome to Aetherion. We value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our website, apply for technical internships, register for courses, or interact with our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">2. Information We Collect</h2>
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
            <h2 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">3. How We Use Your Information</h2>
            <p>
              The information we collect is used solely to facilitate internship allocations, manage curriculum logbooks, respond to inquiries, send verified completion certificates, and optimize your overall experience. We do not sell or lease your personal information to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">4. Third-Party Integrations</h2>
            <p>
              Our application uses verified third-party systems for seamless service delivery:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li><strong>Supabase:</strong> For secure database hosting, profile authentication, and user data storage.</li>
              <li><strong>Web3Forms:</strong> To safely transmit contact forms and application inquiries to our program mentors.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">5. Data Security & Storage</h2>
            <p>
              We apply industry-standard security measures to prevent unauthorized access, alteration, or disclosure of your data. However, please note that no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">6. Contact Information</h2>
            <p>
              For any questions regarding this privacy policy or your personal data, please contact our privacy compliance officer at:
            </p>
            <p className="text-indigo-650 dark:text-indigo-400 font-bold mt-1 font-mono">
              tech.aetherion@gmail.com
            </p>
          </section>

          {/* Divider */}
          <div className="border-t border-slate-200 dark:border-slate-800 my-10"></div>

          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">Refunds & Cancellations</span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-3 mb-6">
              Refund & Cancellation Policy
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              At Aetherion, we strive to provide high-quality internship programs and online learning experiences. Please read our Refund & Cancellation Policy carefully before making a purchase.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">1. Internship Programs</h2>
            <ul className="list-disc list-inside pl-4 space-y-1.5">
              <li>The internship registration fee is non-refundable once the participant has received access to the internship portal, orientation session, learning materials, or any program resources.</li>
              <li>If Aetherion cancels an internship program due to unforeseen circumstances, participants will be eligible for a 100% refund of the amount paid.</li>
              <li>In the event of a duplicate payment, the excess amount will be refunded after verification. Approved refunds will be processed within 7–10 business days.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">2. Online Courses</h2>
            <ul className="list-disc list-inside pl-4 space-y-1.5">
              <li>Refund requests may be submitted within 48 hours of purchase, provided that less than 20% of the course content has been accessed or completed.</li>
              <li>Refunds will not be issued if more than 20% of the course content has been accessed.</li>
              <li>Any downloadable resources, digital materials, or bonus content included with the course are non-refundable.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">3. Live & Mentor-Led Programs</h2>
            <ul className="list-disc list-inside pl-4 space-y-1.5">
              <li>Participants who cancel before the official program start date are eligible for an 80% refund of the program fee.</li>
              <li>Once the program has commenced, no refunds will be issued.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">4. Certificate Fees</h2>
            <p>
              Fees paid for certificate generation, verification, or reissuance are non-refundable once the certificate has been issued or processed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">5. Refund Process</h2>
            <p>
              To request a refund, please contact our support team with the following details:
            </p>
            <div className="bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 p-4 rounded-xl font-mono text-[11px] text-slate-700 dark:text-slate-350 space-y-2 mt-2">
              <p><strong className="text-slate-900 dark:text-white font-sans">Email:</strong> support@aetherion.in</p>
              <p><strong className="text-slate-900 dark:text-white font-sans">Subject Line:</strong> Refund Request – Order ID</p>
              <p className="mt-1 font-sans">
                Please include your Full Name, Order ID, Registered Email Address, and the Reason for the Refund Request.
              </p>
            </div>
            <p className="mt-2">
              After verification, if your request is approved, the refund will be processed to the original payment method within 7–10 business days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">6. Contact Us</h2>
            <p>
              If you have any questions regarding this Refund & Cancellation Policy, please contact us:
            </p>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 mt-1">
              <p className="text-slate-850 dark:text-slate-200 font-bold">Aetherion</p>
              <p>Email: <span className="text-indigo-650 dark:text-indigo-400 font-mono font-semibold">tech.aetherion@gmail.com</span></p>
              <p>Website: <a href="https://aetherionn.in" target="_blank" rel="noopener noreferrer" className="text-indigo-650 dark:text-indigo-400 hover:underline">https://aetherionn.in</a></p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
