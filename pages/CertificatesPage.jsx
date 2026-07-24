import React, { useState } from 'react';
import certificateImg from '../Certificate.jpg';
import { Search, ShieldCheck, Download, Award, CheckCircle2, AlertCircle, Printer } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CertificatesPage() {
  const [certId, setCertId] = useState('');
  const [searchedId, setSearchedId] = useState('');
  const [certificateData, setCertificateData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

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
    <main className="py-12 md:py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300 print:bg-white print:py-0 print:text-black">
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
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs font-mono text-slate-900 dark:text-white uppercase focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2"
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
                className="underline hover:text-purple-600 font-bold"
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

        {/* Certificate Display Result */}
        {certificateData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            {/* Top Verification Badge Bar */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center justify-between text-emerald-600 dark:text-emerald-400 print:hidden">
              <div className="flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="w-5 h-5" />
                <span>OFFICIALLY VERIFIED RECORD ({searchedId})</span>
              </div>
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition flex items-center gap-2 shadow"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
            </div>

            {/* Certificate Preview Document Container */}
            <div className="bg-white text-slate-900 border-8 border-purple-900 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden text-center print:border-4 print:shadow-none">
              
              {/* Background Watermark Symbol */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none font-serif text-[180px] font-black text-purple-900">
                \( \tau i \)
              </div>

              {/* Certificate Header */}
              <div className="relative mb-8">
                <div className="w-16 h-16 rounded-full bg-purple-900 text-white flex items-center justify-center mx-auto mb-4 font-serif text-2xl font-bold">
                  \( \tau i \)
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-black uppercase tracking-widest text-purple-900">
                  CERTIFICATE OF COMPLETION
                </h2>
                <p className="text-xs text-purple-700 font-bold uppercase tracking-wider mt-1">
                  Aetherion Industrial Training & Internship Portal
                </p>
              </div>

              {/* Body */}
              <div className="relative space-y-4 my-8">
                <p className="text-xs text-slate-500 font-serif italic">This is to certify that</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif underline decoration-purple-500 decoration-2 underline-offset-8">
                  {certificateData.name}
                </h3>
                <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
                  has successfully completed the industrial program in <strong>{certificateData.program}</strong> for a duration of <strong>{certificateData.duration}</strong> with grade <strong>{certificateData.grade}</strong>.
                </p>
              </div>

              {/* Footer Meta */}
              <div className="relative pt-8 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
                <div>
                  <span className="block font-bold text-slate-400 text-[10px] uppercase">Issue Date</span>
                  <span className="font-semibold">{certificateData.issueDate}</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-400 text-[10px] uppercase">Credential ID</span>
                  <span className="font-mono font-bold text-purple-900">{searchedId}</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-400 text-[10px] uppercase">Authorized Signatory</span>
                  <span className="font-serif font-bold text-purple-900">Prince Raj (Founder)</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </main>
  );
}
