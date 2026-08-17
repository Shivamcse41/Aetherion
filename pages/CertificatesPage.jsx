import React, { useState } from 'react';
import certificateImg from '../Certificate.jpg';
import { Search, ShieldCheck, Download, Award, CheckCircle2, AlertCircle, Printer, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CertificatesPage() {
  const [certId, setCertId] = useState('');
  const [searchedId, setSearchedId] = useState('');
  const [certificateData, setCertificateData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const mockCertificates = {
    'ATH-2026-8849': {
      name: 'Ayush Kumar Verma',
      program: 'Advanced Full Stack Web Architecture',
      duration: '8 Weeks',
      grade: 'A+',
      issueDate: 'July 10, 2026',
      status: 'Issued & Verified',
      type: 'Industrial Internship'
    },
    'ATH-2026-7501': {
      name: 'Prince Raj',
      program: 'Python Programming & Generative AI',
      duration: '10 Weeks',
      grade: 'A',
      issueDate: 'July 05, 2026',
      status: 'Issued & Verified',
      type: 'Industrial Training'
    },
    'ATH-2026-1024': {
      name: 'Dipu Sharma',
      program: 'UI/UX & Graphics Design',
      duration: '8 Weeks',
      grade: 'A+',
      issueDate: 'June 28, 2026',
      status: 'Issued & Verified',
      type: 'Industrial Internship'
    },
    'ATH-2026-5509': {
      name: 'Shivam Kumar',
      program: 'Backend Engineering & Cloud Operations',
      duration: '12 Weeks',
      grade: 'A',
      issueDate: 'July 15, 2026',
      status: 'Issued & Verified',
      type: 'Industrial Training'
    },
    'ATH-2026-3021': {
      name: 'Deepika Kumari',
      program: 'Data Analytics & Support Engineering',
      duration: '8 Weeks',
      grade: 'A',
      issueDate: 'July 16, 2026',
      status: 'Issued & Verified',
      type: 'Industrial Internship'
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setCertificateData(null);
    const idUpper = certId.trim().toUpperCase();
    setSearchedId(idUpper);

    if (!idUpper) {
      setErrorMsg('Please enter a valid certificate number.');
      return;
    }

    if (mockCertificates[idUpper]) {
      setCertificateData(mockCertificates[idUpper]);
    } else {
      setErrorMsg(`No certificate record found for ID "${idUpper}". Hint: Try searching "ATH-2026-8849" or "ATH-2026-7501".`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="py-12 md:py-20 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300 print:bg-white print:py-0 print:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:p-0">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 print:hidden">
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400 tracking-widest uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Official Credential Verification
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-4 mb-4">
            Verify MSME Certifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            All Aetherion training programs offer official, verifiable certifications complying with university norms.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-xl mx-auto mb-12 print:hidden">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-soft-md">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Enter Certificate Serial ID
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-4 top-3.5 text-purple-500" />
                  <input
                    type="text"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    placeholder="e.g. ATH-2026-8849"
                    className="w-full border border-slate-200 dark:border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs font-mono text-slate-900 dark:text-white uppercase focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Verify Credentials</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400">
              <span>Sample ID:</span>
              <button
                type="button"
                onClick={() => setCertId('ATH-2026-8849')}
                className="underline hover:text-purple-600 font-bold cursor-pointer"
              >
                ATH-2026-8849
              </button>
            </div>
          </div>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="max-w-xl mx-auto mb-12 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium flex items-center gap-3 print:hidden">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Official Certificate Template Card (Shown by Default & when searched) */}
        {!certificateData && !errorMsg && (
          <div className="max-w-4xl mx-auto space-y-6 print:hidden">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm text-center">
              <div className="flex items-center justify-center gap-2 mb-4 text-purple-600 dark:text-purple-400">
                <Award className="w-6 h-6" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Official Student Certificate Format</h3>
              </div>
              <p className="text-xs text-slate-500 max-w-lg mx-auto mb-6">
                Every student who completes an internship or training program at Aetherion receives this official MSME & ISO compliant certificate.
              </p>
              <div className="relative group max-w-2xl mx-auto overflow-hidden rounded-2xl border-4 border-purple-900/30 shadow-xl">
                <img
                  src={certificateImg}
                  alt="Official Aetherion Student Certificate"
                  className="w-full h-auto object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                  <a
                    href={certificateImg}
                    download="Aetherion_Official_Certificate.jpg"
                    className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold shadow-lg hover:bg-purple-700 transition flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Certificate</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Certificate Display Result */}
        {certificateData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            {/* Top Verification Badge Bar */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-emerald-600 dark:text-emerald-400 print:hidden">
              <div className="flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>OFFICIALLY VERIFIED RECORD ({searchedId})</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={certificateImg}
                  download={`Certificate_${searchedId}.jpg`}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition flex items-center gap-2 shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Certificate Image</span>
                </a>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition flex items-center gap-2 shadow"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>
              </div>
            </div>

            {/* Official Certificate Image View */}
            <div className="bg-white dark:bg-slate-900 border-4 border-purple-900 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-6">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-md">
                <img
                  src={certificateImg}
                  alt={`Official Certificate for ${certificateData.name}`}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Verified Details Sheet */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
                <div>
                  <span className="block text-[10px] font-bold uppercase text-slate-400">Student Name</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{certificateData.name}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase text-slate-400">Program</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">{certificateData.program}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase text-slate-400">Duration & Grade</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{certificateData.duration} ({certificateData.grade})</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase text-slate-400">Issue Date</span>
                  <span className="font-semibold text-slate-600 dark:text-slate-400">{certificateData.issueDate}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </main>
  );
}
