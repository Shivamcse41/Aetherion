import React from 'react';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="py-12 md:py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-soft-md space-y-8">
          <div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 tracking-widest uppercase flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4" /> Legal & Compliance
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Terms & Conditions
            </h1>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">1. Agreement to Terms</h2>
              <p>
                By accessing and using Aetherion, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">2. Account Registration</h2>
              <p>
                To access your student dashboard, logbooks, and certificates, you must authenticate through our Supabase identity system. You are responsible for maintaining the confidentiality of your credentials.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">3. Internship Compliance</h2>
              <p>
                Our industrial training structures, mentor reviews, and daily worksheets are designed to align with AICTE and DTE guidelines.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">4. Academic Certifications</h2>
              <p>
                Certificates of completion are issued based on performance, project evaluations, and logbook approvals by designated mentors.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">5. Contact Information</h2>
              <p>
                For any clarifications concerning these Terms & Conditions, contact us at: <span className="font-mono font-bold text-purple-600">tech.aetherion@gmail.com</span>
              </p>
            </section>
          </div>
        </div>

      </div>
    </main>
  );
}
