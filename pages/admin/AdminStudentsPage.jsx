import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { createCertificateRecord } from '../../utils/certificateGenerator';
import { 
  Search, 
  Filter, 
  Award, 
  Eye, 
  CheckCircle2, 
  UploadCloud, 
  Trash2, 
  Edit3, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight,
  User
} from 'lucide-react';

export default function AdminStudentsPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('search') || '';

  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [statusFilter, setStatusFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [actionNotice, setActionNotice] = useState('');
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 8;

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
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
        console.warn('Supabase fetch warning:', err);
      }
    }

    if (combined.length === 0) {
      combined = [
        {
          id: 1,
          name: 'Ayush Kumar Verma',
          email: 'ayush@example.com',
          phone: '9876543210',
          college: 'Government Polytechnic',
          branch: 'Computer Science',
          courseTitle: 'Full-Stack Web Development (MERN Stack)',
          price: 499,
          payment_status: 'paid',
          completion_percentage: 100,
          certificate_status: 'issued',
          date: '2026-07-20',
        },
        {
          id: 2,
          name: 'Prince Raj',
          email: 'prince@example.com',
          phone: '9876543211',
          college: 'IIT Patna',
          branch: 'Artificial Intelligence',
          courseTitle: 'Python, Machine Learning & AI',
          price: 499,
          payment_status: 'paid',
          completion_percentage: 100,
          certificate_status: 'pending',
          date: '2026-07-22',
        },
        {
          id: 3,
          name: 'Dipu Sharma',
          email: 'dipu@example.com',
          phone: '9876543212',
          college: 'NIT Patna',
          branch: 'Information Technology',
          courseTitle: 'Web Development Basics (HTML, CSS & JavaScript)',
          price: 499,
          payment_status: 'paid',
          completion_percentage: 100,
          certificate_status: 'none',
          date: '2026-07-25',
        }
      ];
    }

    setStudents(combined);
    setLoading(false);
  };

  const handleApproveCertificate = async (student) => {
    setActionNotice(`Generating certificate for ${student.name || 'Student'}...`);

    const result = await createCertificateRecord({
      student_name: student.name || student.student_name || 'Student',
      student_email: student.email,
      course_name: student.courseTitle || student.course_title || 'Industrial Program',
      course_id: student.course_id || 1,
      enrollment_id: student.id,
      status: 'approved',
    });

    if (result.success) {
      setActionNotice(`Certificate ${result.certificate.certificate_id} created for ${student.name}!`);
      setTimeout(() => setActionNotice(''), 4000);
      loadStudents();
    }
  };

  const handleDeleteStudent = (studentId) => {
    const updated = students.filter(s => s.id !== studentId);
    setStudents(updated);
    localStorage.setItem('student_enrollments', JSON.stringify(updated));
    setActionNotice('Student record removed.');
    setTimeout(() => setActionNotice(''), 3000);
  };

  // Search & Filter Logic
  const filteredStudents = students.filter((item) => {
    const name = (item.name || item.student_name || '').toLowerCase();
    const email = (item.email || '').toLowerCase();
    const phone = (item.phone || '').toLowerCase();
    const course = (item.courseTitle || item.course_title || '').toLowerCase();
    const certId = (item.certificate_id || '').toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch = name.includes(query) || email.includes(query) || phone.includes(query) || course.includes(query) || certId.includes(query);
    
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Paid' && (item.payment_status === 'paid' || item.status === 'Enrolled & Paid')) ||
      (statusFilter === 'Pending' && item.certificate_status === 'pending') ||
      (statusFilter === 'Issued' && (item.certificate_status === 'issued' || item.certificate_status === 'approved'));

    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-xl font-black font-serif uppercase tracking-wider text-white">Student Management Directory</h1>
          <p className="text-xs text-slate-400">View enrolled students, progress, payment status, and certificate controls</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/manual-certificate"
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-purple-600/20"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Manual Certificate</span>
          </Link>
          <button
            onClick={loadStudents}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {actionNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Global Search & Filters Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search Name, Email, Phone, Course, Certificate ID..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          {['All', 'Paid', 'Pending', 'Issued'].map((filter) => (
            <button
              key={filter}
              onClick={() => { setStatusFilter(filter); setCurrentPage(1); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase transition cursor-pointer ${
                statusFilter === filter
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Student SaaS Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">College & Branch</th>
                <th className="py-3.5 px-4">Course Program</th>
                <th className="py-3.5 px-4">Enrollment Date</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Progress</th>
                <th className="py-3.5 px-4">Certificate</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedStudents.map((student, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  {/* Photo & Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {(student.name || student.student_name || 'S').charAt(0)}
                      </div>
                      <div>
                        <span className="block font-bold text-white">{student.name || student.student_name || 'Student'}</span>
                      </div>
                    </div>
                  </td>

                  {/* Email & Phone */}
                  <td className="py-3.5 px-4">
                    <span className="block text-slate-300">{student.email}</span>
                    <span className="block text-[10px] text-slate-500 font-mono">{student.phone || '9876543210'}</span>
                  </td>

                  {/* College & Branch */}
                  <td className="py-3.5 px-4">
                    <span className="block font-medium text-slate-300">{student.college || 'Polytechnic College'}</span>
                    <span className="block text-[10px] text-purple-400 font-mono">{student.branch || 'Computer Science'}</span>
                  </td>

                  {/* Course Program */}
                  <td className="py-3.5 px-4 font-medium max-w-xs">{student.courseTitle || student.course_title}</td>

                  {/* Enrollment Date */}
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[10px]">
                    {new Date(student.date || student.created_at || Date.now()).toLocaleDateString()}
                  </td>

                  {/* Payment Status */}
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[9px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ₹{student.amount || student.price || 499} (Paid)
                    </span>
                  </td>

                  {/* Progress % */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-500 w-full" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400">100%</span>
                    </div>
                  </td>

                  {/* Certificate Status */}
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[9px] font-bold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {student.certificate_status || 'Issued'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/admin/students/${student.id || idx}`}
                        className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
                        title="View Student Profile"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to="/admin/manual-certificate"
                        className="p-2 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600 hover:text-white transition"
                        title="Upload Manual Certificate PDF"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleApproveCertificate(student)}
                        className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition cursor-pointer"
                        title="Generate Certificate"
                      >
                        <Award className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <p className="text-xs text-slate-500 py-8 text-center">No student records found matching search or status filter.</p>
        )}

        {/* Pagination Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Showing page {currentPage} of {totalPages} ({filteredStudents.length} Students)</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-50 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-50 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
