import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, Phone, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      answer: "After submitting your application, our program mentors review your profile and resume. If selected, you will receive an invitation email within 3-5 business days detailing the orientation session and mentor allotment."
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
    <main className="py-12 md:py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400 tracking-widest uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Support Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-4 mb-4">
            How can we help you?
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            Find answers to frequently asked questions about logbook validation, mentor allotments, and training programs.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-4 mb-16">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Frequently Asked Questions
          </h2>

          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-soft-sm transition"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-purple-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5 text-xs text-slate-500 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Contact Assistance Box */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-soft-md space-y-4">
          <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
            Direct Mentorship Support
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Still have queries?</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Our engineering and academic support team is ready to clear all your doubts.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2"
            >
              <span>Contact Support</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+917519956407"
              className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-purple-600" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
