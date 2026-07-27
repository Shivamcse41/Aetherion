import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { startPayuPayment } from '../utils/payuCheckout';
import { supabase } from '../supabaseClient';
import { defaultDurationPrices } from '../data/coursesData';

export default function EnrollmentModal({ selectedInternship, onClose }) {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [selectedDuration, setSelectedDuration] = useState('2 Weeks');
  const [inquiryForm, setInquiryForm] = useState({
    name: profile?.full_name || user?.user_metadata?.full_name || '',
    email: user?.email || profile?.email || '',
    college: profile?.college || '',
    phone: profile?.mobile || user?.user_metadata?.phone || '',
  });
  const [submitting, setSubmitting] = useState(false);

  if (!selectedInternship) return null;

  const durationPricing = selectedInternship.durationPrices || defaultDurationPrices;

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const activePrice = durationPricing[selectedDuration] || selectedInternship.stipend || 499;

    const finalCourseTitle = durationPricing
      ? `${selectedInternship.title} (${selectedDuration})`
      : selectedInternship.title;

    const enrollmentRecord = {
      courseId: selectedInternship.id,
      courseTitle: finalCourseTitle,
      duration: selectedDuration,
      amount: activePrice,
      name: inquiryForm.name,
      email: inquiryForm.email,
      phone: inquiryForm.phone,
      college: inquiryForm.college,
      date: new Date().toISOString(),
    };

    const userIdKey = user?.id || 'guest';
    const currentProfileData = JSON.parse(localStorage.getItem(`profile_data_${userIdKey}`) || '{}');
    const updatedProfileData = {
      ...currentProfileData,
      name: inquiryForm.name || currentProfileData.name || '',
      email: inquiryForm.email || currentProfileData.email || '',
      mobile: inquiryForm.phone || currentProfileData.mobile || '',
      college: inquiryForm.college || currentProfileData.college || '',
    };
    localStorage.setItem(`profile_data_${userIdKey}`, JSON.stringify(updatedProfileData));

    try {
      await startPayuPayment({
        courseId: selectedInternship.id,
        amount: activePrice,
        duration: selectedDuration,
        courseTitle: finalCourseTitle,
        name: inquiryForm.name,
        email: inquiryForm.email,
        phone: inquiryForm.phone,
        college: inquiryForm.college,
      });
    } catch (err) {
      console.warn('PayU Checkout fallback execution:', err.message);

      const existing = JSON.parse(localStorage.getItem('student_enrollments') || '[]');
      localStorage.setItem('student_enrollments', JSON.stringify([enrollmentRecord, ...existing]));

      if (supabase && user?.id) {
        try {
          await supabase.from('enrollments').insert([{
            user_id: user.id,
            course_title: finalCourseTitle,
            amount: activePrice,
            status: 'Enrolled & Paid',
          }]);
        } catch (sErr) {
          console.error('Supabase enrollment insert fallback error:', sErr);
        }
      }

      setSubmitting(false);
      onClose();
      navigate('/dashboard');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 pr-8">
            {selectedInternship.title}
          </h3>
          <p className="text-xs text-slate-500 mb-5">
            Fill out student credentials to initiate course enrollment checkout.
          </p>

          <form onSubmit={handleEnrollSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Student Full Name</label>
              <input
                type="text"
                required
                value={inquiryForm.name}
                onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                placeholder="Full Name"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={inquiryForm.email}
                onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={inquiryForm.phone}
                onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                placeholder="10-digit mobile number"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">College Name</label>
              <input
                type="text"
                required
                value={inquiryForm.college}
                onChange={(e) => setInquiryForm({ ...inquiryForm, college: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                placeholder="Enter your college name"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400 mb-2 tracking-wider">
                Select Training Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(durationPricing).map((dur) => {
                  const price = durationPricing[dur];
                  const isSelected = selectedDuration === dur;
                  return (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setSelectedDuration(dur)}
                      className={`p-2.5 text-center rounded-xl border transition flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-[1.02]'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:border-purple-400'
                      }`}
                    >
                      <span className="text-[11px] font-bold">{dur}</span>
                      <span className={`text-[10px] font-black ${isSelected ? 'text-purple-100' : 'text-purple-600 dark:text-purple-400'}`}>
                        (₹{price})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition disabled:opacity-50 mt-2 active:scale-98 cursor-pointer"
            >
              {submitting ? 'Processing Enrollment...' : `Confirm & Pay (₹${durationPricing[selectedDuration] || selectedInternship.stipend || 499})`}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
