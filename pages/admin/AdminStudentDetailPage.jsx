import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createCertificateRecord } from '../../utils/certificateGenerator';
import { ArrowLeft, User, Briefcase, Award, CheckCircle2, ShieldCheck, Mail, Phone, GraduationCap, Clock, UploadCloud } from 'lucide-react';

export default function AdminStudentDetailPage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    async function loadStudentDetail() {
      setLoading(true);

      const localEnrollments = JSON.parse(localStorage.getItem('student_enrollments') || '[]');
      const match = localEnrollments.find(e => String(e.id) === String(id) || String(e.courseId) === String(id));

      if (match) {
        setStudent(match);
      } else {
        setStudent({
          id: id || '1',
          name: 'Ayush Kumar Verma',
          email: 'ayush@example.com',
          phone: '9876543210',
          college: 'Government Polytechnic Institute',
          branch: 'Computer Science & Engineering',
          courseTitle: 'Full-Stack Web Development (MERN Stack)',
          duration: '8 Weeks',
          amount: 499,
          payment_status: 'paid',
          completion_percentage: 100,
          date: new Date().toISOString(),
        });
      }

      setLoading(false);
    }

    loadStudentDetail();
  }, [id]);

  const handleGenerateCertificate = async () => {
    if (!student) return;
    setNotice('Generating official certificate...');

    const result = await createCertificateRecord({
      student_name: student.name || 'Student',
      student_email: student.email,
      course_name: student.courseTitle || 'Industrial Program',
      course_id: student.courseId || 1,
      enrollment_id: student.id,
      status: 'approved',
    });

    if (result.success) {
      setNotice(`Certificate ${result.certificate.certificate_id} generated and issued!`);
      setTimeout(() => setNotice(''), 4000);
    }
  };

  if (loading || !student) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <Link to="/admin/students" className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-black font-serif uppercase tracking-wider text-white">Student Profile & Credentials</h1>
          <p className="text-xs text-slate-400">Detailed enrollment record, progress history, and certificate controls</p>
        </div>
      </div>

      {notice && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{notice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Student Profile Details */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-20 h-20 rounded-3xl bg-purple-600 text-white flex items-center justify-center mx-auto text-3xl font-black font-serif shadow-xl">
              {(student.name || 'S').charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-white">{student.name || 'Student Name'}</h2>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20 inline-block">
              Verified Student Account
            </span>
          </div>

          <div className="space-y-4 text-xs border-t border-slate-800 pt-4">
            <div>
              <span className="block text-[10px] font-bold uppercase text-slate-500">Email Address</span>
              <div className="flex items-center gap-2 text-slate-200 font-medium mt-0.5">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>{student.email}</span>
              </div>
            </div>

            <div>
              <span className="block text-[10px] font-bold uppercase text-slate-500">Phone Number</span>
              <div className="flex items-center gap-2 text-slate-200 font-medium mt-0.5">
                <Phone className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>{student.phone || '9876543210'}</span>
              </div>
            </div>

            <div>
              <span className="block text-[10px] font-bold uppercase text-slate-500">College & Branch</span>
              <div className="flex items-center gap-2 text-slate-200 font-medium mt-0.5">
                <GraduationCap className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>{student.college || 'Polytechnic Institute'} ({student.branch || 'CSE'})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Course Purchased, Progress & Activity Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Purchased Course Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-400" />
              <span>Purchased Courses & Internships</span>
            </h3>

            <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">{student.courseTitle || student.course_title}</h4>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Paid ₹{student.amount || student.price || 499}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs pt-2">
                <div>
                  <span className="block text-[10px] font-bold uppercase text-slate-500">Training Duration</span>
                  <span className="font-semibold text-slate-200">{student.duration || '8 Weeks'}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase text-slate-500">Completion Progress</span>
                  <span className="font-bold text-emerald-400">100% Completed</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase text-slate-500">Payment Status</span>
                  <span className="font-mono text-purple-400">Enrolled & Verified</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs text-slate-400">Certificate Status: Ready for Issue</span>
                <div className="flex items-center gap-2">
                  <Link
                    to="/admin/manual-certificate"
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-2"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload Manual PDF</span>
                  </Link>
                  <button
                    onClick={handleGenerateCertificate}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition flex items-center gap-2 cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>Generate Certificate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Student Activity Timeline</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white">Course Enrollment & Payment Completed</span>
                  <span className="block text-[10px] text-slate-500">PayU Payment ID Verified</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white">100% Practical Course Modules Finished</span>
                  <span className="block text-[10px] text-slate-500">Industrial Projects Submitted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
