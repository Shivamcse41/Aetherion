import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      if (isSupabaseConfigured && supabase) {
        const { error: dbError } = await supabase.from('inquiries').insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
        ]);

        if (dbError) throw dbError;
      }

      // 2. Send Email Notification via Web3Forms
      const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (web3Key) {
        const emailResponse = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `New Aetherion Inquiry: ${formData.subject}`,
            from_name: 'Aetherion Portal',
            name: formData.name,
            email: formData.email,
            message: `You have received a new inquiry from ${formData.name} (${formData.email}):\n\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`,
          })
        });

        if (!emailResponse.ok) {
          console.error('Failed to send email notification');
        }
      } else {
        console.warn('VITE_WEB3FORMS_ACCESS_KEY not configured. Email notification skipped.');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <main className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">Connect with Us</span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-3 mb-6 leading-tight">
                Talk to Our Program Mentors
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                Have questions about program structure, fees, university project reports, or daily logs? Reach out and we will clear all your queries.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Support Email', value: 'tech.aetherion@gmail.com', icon: '✉️' },
                { title: 'Mentorship Helpline', value: '+91 7519956407', icon: '📞' },
                { title: 'Corporate HQ', value: 'Munger, Bihar, India', icon: '📍' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 shadow-sm shadow-slate-100/40 dark:shadow-none transition-colors duration-300">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-850 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-0.5">{item.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 rounded-xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-6 sm:p-8 relative shadow-xl shadow-slate-100/40 dark:shadow-none transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent pointer-events-none"></div>
            <h2 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-widest mb-6">Send an Inquiry</h2>
            
            <form onSubmit={handleSubmit} className="relative space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-655 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. Anand Sen"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-655 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. anand@domain.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-655 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="e.g. IoT Syllabus Enquiry, Internship Report submission"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-655 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                  placeholder="Detail your question..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting || submitStatus === 'success'}
                className="w-full inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 rounded-lg py-3 shadow-md transition-colors"
              >
                {submitting ? 'Sending...' : submitStatus === 'success' ? 'Inquiry Sent Successfully!' : 'Send Message'}
              </button>

              {submitStatus === 'error' && (
                <p className="text-red-500 text-xs text-center mt-2 font-semibold">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
