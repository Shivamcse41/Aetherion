import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <main className="py-12 md:py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-soft-md space-y-8">
          <div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 tracking-widest uppercase flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4" /> Legal & Compliance
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Privacy Policy
            </h1>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">1. Introduction</h2>
              <p>
                Welcome to Aetherion. We value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our website, apply for technical internships, register for courses, or interact with our services.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">2. Information We Collect</h2>
              <p>
                We collect information that you voluntarily provide to us when registering, submitting inquiries, or applying for training programs:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>Personal identifiers (Name, Email Address, Phone Number).</li>
                <li>Academic and vocational details (College Name, Year of Study).</li>
                <li>Application attachments (Resume / Portfolio Links).</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">3. How We Use Your Information</h2>
              <p>
                The information we collect is used solely to facilitate internship allocations, manage curriculum logbooks, respond to inquiries, send verified completion certificates, and optimize your overall experience.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">4. Third-Party Integrations</h2>
              <p>
                Our application uses verified third-party systems for seamless service delivery:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li><strong>Supabase:</strong> For secure database hosting, profile authentication, and user data storage.</li>
                <li><strong>PayU & Web3Forms:</strong> For secure payment processing and inquiry notifications.</li>
              </ul>
            </section>

            <section className="space-y-2 pt-6 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">Refund & Cancellation Policy</h2>
              <p>
                The internship registration fee is non-refundable once the participant has received access to the portal or orientation materials. If Aetherion cancels a program due to unforeseen circumstances, participants will be eligible for a 100% refund.
              </p>
            </section>
          </div>
        </div>

      </div>
    </main>
  );
}
