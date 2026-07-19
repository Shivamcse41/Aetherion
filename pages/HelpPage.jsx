import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HelpPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      question: "Is the industrial training AICTE & DTE compliant?",
      answer: "Yes, all our training structures, daily logbook signatures, and project evaluations are fully aligned with the requirements set by the AICTE (All India Council for Technical Education) and DTE (Department of Technical Education)."
    },
    {
      question: "How do I get my daily logbook signed?",
      answer: "Once you are allocated a project and mentor, you will submit your weekly logbook directly in your dashboard or via email. Your designated mentor will review and sign/verify it digitally."
    },
    {
      question: "What is the procedure after applying for an internship?",
      answer: "After submitting your application, our program mentors review your profile and resume. If selected, you will receive an invitation email within 3-5 business days details the orientation session and mentor allotment."
    },
    {
      question: "Are these internships paid or unpaid?",
      answer: "Stipends vary depending on the partner company and role. Each listing specifies the exact stipend, perks, and direct placement offer (PPO) criteria."
    },
    {
      question: "How do I receive my verified certificate of completion?",
      answer: "Upon successful completion of the training duration and submission of your final project report, Aetherion issues an MSME-certified, verifiable digital certificate of work."
    }
  ];

  return (
    <main className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">Support Center</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-3 mb-4 leading-tight">
            How can we help you?
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Find answers to frequently asked questions about logbook validation, mentor allotments, and training programs, or connect directly with customer support.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-4 mb-16">
          <h2 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-widest mb-6">Frequently Asked Questions</h2>
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 rounded-xl overflow-hidden shadow-sm hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">{faq.question}</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold ml-2">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-850">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-8 text-center space-y-6 shadow-xl shadow-slate-100/40 dark:shadow-none transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="relative space-y-2">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">Direct Assistance</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Still have questions?</h2>
            <p className="text-slate-550 dark:text-slate-400 text-xs max-w-md mx-auto leading-relaxed">
              If you didn't find the answer to your query, please reach out to our Customer Support. Our team is available 24/7.
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg px-6 py-3 transition-colors shadow-md shadow-indigo-600/10 dark:shadow-none"
            >
              Contact Support
            </Link>
            <a
              href="tel:+917519956407"
              className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-slate-750 dark:text-slate-350 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 bg-white dark:bg-slate-950 rounded-lg px-6 py-3 transition-colors"
            >
              Call Helpline
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
