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
    <main className="py-20 md:py-28 bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Support Center</span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-4 leading-tight">
            How can we help you?
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Find answers to frequently asked questions about logbook validation, mentor allotments, and training programs, or connect directly with customer support.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-4 mb-16">
          <h2 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Frequently Asked Questions</h2>
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-zinc-900 bg-zinc-950/60 rounded-xl overflow-hidden transition-colors hover:border-zinc-800"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <span className="text-xs sm:text-sm font-semibold text-zinc-200">{faq.question}</span>
                <span className="text-amber-500 font-bold ml-2">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-zinc-400 leading-relaxed border-t border-zinc-900/40">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 p-8 text-center space-y-6">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="relative space-y-2">
            <span className="text-[10px] font-bold text-amber-400 tracking-widest uppercase">Direct Assistance</span>
            <h2 className="text-xl sm:text-2xl font-black text-white">Still have questions?</h2>
            <p className="text-zinc-400 text-xs max-w-md mx-auto leading-relaxed">
              If you didn't find the answer to your query, please reach out to our Customer Support. Our team is available 24/7.
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg px-6 py-3 transition-colors"
            >
              Contact Support
            </Link>
            <a
              href="tel:+917519956407"
              className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-zinc-300 border border-zinc-800 hover:border-zinc-700 bg-zinc-950 hover:bg-zinc-900 rounded-lg px-6 py-3 transition-colors"
            >
              Call Helpline
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
