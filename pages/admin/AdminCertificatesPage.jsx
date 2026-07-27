import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCertificates, createCertificateRecord } from '../../utils/certificateGenerator';
import CertificateTemplate from '../../components/CertificateTemplate';
import certificateImg from '../../Certificate.jpg';
import { Award, Search, Download, Eye, CheckCircle2, UploadCloud, Trash2, Plus, RefreshCw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [activeTab, setActiveTab] = useState('Approved');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    setLoading(true);
    const data = await getAllCertificates();

    if (!data || data.length === 0) {
      const mockData = [
        {
          id: 1,
          certificate_id: 'AG-2026-884901',
          student_name: 'Ayush Kumar Verma',
          student_email: 'ayush@example.com',
          course_name: 'Full-Stack Web Development (MERN Stack)',
          issue_date: '2026-07-20T10:00:00Z',
          verification_token: 'AG-TOK-884901',
          status: 'approved',
        },
        {
          id: 2,
          certificate_id: 'AG-2026-750102',
          student_name: 'Prince Raj',
          student_email: 'prince@example.com',
          course_name: 'Python Programming & Generative AI',
          issue_date: '2026-07-22T10:00:00Z',
          verification_token: 'AG-TOK-750102',
          status: 'approved',
        },
        {
          id: 3,
          certificate_id: 'AG-2026-102403',
          student_name: 'Dipu Sharma',
          student_email: 'dipu@example.com',
          course_name: 'Web Development Basics (HTML, CSS & JavaScript)',
          issue_date: '2026-07-25T10:00:00Z',
          verification_token: 'AG-TOK-102403',
          status: 'pending',
        }
      ];
      setCertificates(mockData);
    } else {
      setCertificates(data);
    }

    setLoading(false);
  };

  const handleStatusChange = (certId, newStatus) => {
    const updated = certificates.map(c => c.certificate_id === certId ? { ...c, status: newStatus } : c);
    setCertificates(updated);
    localStorage.setItem('generated_certificates', JSON.stringify(updated));
    setNotice(`Certificate ${certId} status changed to ${newStatus}.`);
    setTimeout(() => setNotice(''), 3000);
  };

  const handleDeleteCert = (certId) => {
    const updated = certificates.filter(c => c.certificate_id !== certId);
    setCertificates(updated);
    localStorage.setItem('generated_certificates', JSON.stringify(updated));
    setNotice(`Certificate ${certId} removed.`);
    setTimeout(() => setNotice(''), 3000);
  };

  const filteredCerts = certificates.filter((item) => {
    const name = (item.student_name || '').toLowerCase();
    const certId = (item.certificate_id || '').toLowerCase();
    const course = (item.course_name || '').toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch = name.includes(query) || certId.includes(query) || course.includes(query);
    const matchesTab =
      (activeTab === 'Approved' && (item.status === 'approved' || item.status === 'generated')) ||
      (activeTab === 'Pending' && item.status === 'pending') ||
      (activeTab === 'Uploaded' && item.certificate_url && item.certificate_url !== '/Certificate.jpg') ||
      (activeTab === 'Rejected' && item.status === 'rejected');

    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-xl font-black font-serif uppercase tracking-wider text-white">Certificate Management Console</h1>
          <p className="text-xs text-slate-400">Generate automatic certificates, upload manual PDFs, replace or revoke credentials</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/manual-certificate"
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-purple-600/20"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Manual PDF</span>
          </Link>
          <button
            onClick={loadCertificates}
            className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            title="Refresh List"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {notice && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{notice}</span>
        </div>
      )}

      {/* Status Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          {['Approved', 'Pending', 'Uploaded', 'Rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition cursor-pointer ${
                activeTab === tab
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search Certificate ID or Student..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Certificates SaaS Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Certificate ID</th>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Course Program</th>
                <th className="py-3.5 px-4">Issue Date</th>
                <th className="py-3.5 px-4">Verification Token</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCerts.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-mono font-bold text-purple-400">
                    {item.certificate_id}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    {item.student_name}
                    <span className="block text-[10px] text-slate-500 font-normal">{item.student_email}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium">{item.course_name}</td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {new Date(item.issue_date || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[10px] text-slate-500">{item.verification_token}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedCert(item)}
                        className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                        title="Preview Certificate"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={item.certificate_url || certificateImg}
                        download={`Certificate_${item.certificate_id}.jpg`}
                        className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition cursor-pointer"
                        title="Download Certificate PDF/JPG"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                      <Link
                        to="/admin/manual-certificate"
                        className="p-2 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600 hover:text-white transition cursor-pointer"
                        title="Replace PDF File"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteCert(item.certificate_id)}
                        className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition cursor-pointer"
                        title="Delete Certificate"
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

        {filteredCerts.length === 0 && (
          <p className="text-xs text-slate-500 py-8 text-center">No certificate records found matching query.</p>
        )}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <div className="max-w-4xl w-full my-8">
              <button
                onClick={() => setSelectedCert(null)}
                className="mb-4 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition"
              >
                Close Preview
              </button>
              <CertificateTemplate certificate={selectedCert} />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
