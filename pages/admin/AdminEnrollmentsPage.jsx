import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { Search, Briefcase, Award, CheckCircle2, RefreshCw, Eye } from 'lucide-react';

export default function AdminEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    setLoading(true);

    const localEnrollments = JSON.parse(localStorage.getItem('student_enrollments') || '[]');
    let combined = [...localEnrollments];

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('enrollments')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          combined = [...data, ...localEnrollments].filter(
            (v, i, a) => a.findIndex(t => t.id === v.id || t.payu_txnid === v.payu_txnid) === i
          );
        }
      } catch (err) {
        console.warn('Supabase fetch error:', err);
      }
    }

    if (combined.length === 0) {
      combined = [
        {
          id: 1,
          name: 'Ayush Kumar Verma',
          email: 'ayush@example.com',
          courseTitle: 'Full-Stack Web Development (MERN Stack)',
          price: 499,
          payment_status: 'paid',
          date: '2026-07-20',
          completion_percentage: 100,
          certificate_status: 'issued',
        },
        {
          id: 2,
          name: 'Prince Raj',
          email: 'prince@example.com',
          courseTitle: 'Python Programming & Generative AI',
          price: 499,
          payment_status: 'paid',
          date: '2026-07-22',
          completion_percentage: 100,
          certificate_status: 'pending',
        }
      ];
    }

    setEnrollments(combined);
    setLoading(false);
  };

  const filteredEnrollments = enrollments.filter((item) => {
    const name = (item.name || item.student_name || '').toLowerCase();
    const email = (item.email || '').toLowerCase();
    const course = (item.courseTitle || item.course_title || '').toLowerCase();
    const query = searchQuery.toLowerCase();

    return name.includes(query) || email.includes(query) || course.includes(query);
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-xl font-black font-serif uppercase tracking-wider text-white">Enrollments & Revenue</h1>
          <p className="text-xs text-slate-400">Track paid course registrations, completion status & payment verification</p>
        </div>

        <button
          onClick={loadEnrollments}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search enrollment by student name, email, or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Enrollments Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Enrolled Course</th>
                <th className="py-3.5 px-4">Paid Amount</th>
                <th className="py-3.5 px-4">Enrollment Date</th>
                <th className="py-3.5 px-4">Completion</th>
                <th className="py-3.5 px-4">Certificate Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredEnrollments.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {(item.name || item.student_name || 'S').charAt(0)}
                      </div>
                      <div>
                        <span className="block font-bold text-white">{item.name || item.student_name || 'Student'}</span>
                        <span className="block text-[10px] text-slate-500">{item.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-200">{item.courseTitle || item.course_title}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-purple-400">
                    ₹{item.amount || item.price || 499}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {new Date(item.date || item.created_at || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[9px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      100% Completed
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[9px] font-bold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {item.certificate_status || 'Issued'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to="/admin/certificates"
                      className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold uppercase transition inline-flex items-center gap-1"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Manage Cert</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
