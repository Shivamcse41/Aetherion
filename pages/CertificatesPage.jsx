import React, { useState } from 'react';
import certificateImg from '../Certificate.jpg';

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
    <main className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300 print:bg-white print:py-0 print:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:p-0">
        
        {/* Header (Hidden on Print) */}
        <div className="text-center max-w-3xl mx-auto mb-12 print:hidden animate-in fade-in duration-300">
          <span className="text-xs font-bold text-indigo-655 dark:text-indigo-400 tracking-widest uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Official Verification</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-4 mb-6 leading-tight">
            Verify MSME Standard <span className="glowing-text">Certifications</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed uppercase tracking-wider font-semibold">
            All Aetherion training programs offer official, verifiable certifications complying with Indian university norms.
          </p>
        </div>

        {/* Certificate Search Module (Hidden on Print) */}
        <div className="max-w-xl mx-auto mb-16 print:hidden">
          <div className="premium-card p-6 rounded-2xl">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-2.5">
                  Enter Certificate ID / Tracking No.
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    required
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    placeholder="e.g. ATH-2026-8849"
                    className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 font-mono transition-all"
                  />
                  <button
                    type="submit"
                    className="premium-btn px-6 py-3 rounded-lg text-xs"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </form>

            {/* Error Message */}
            {errorMsg && (
              <div className="mt-4 p-3 rounded-lg border border-red-500/20 bg-red-500/5 text-xs text-red-600 dark:text-red-400 leading-relaxed font-semibold">
                ⚠ {errorMsg}
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Verified Results Container */}
        {certificateData ? (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Details Panel (Hidden on Print) */}
            <div className="max-w-4xl mx-auto premium-card rounded-2xl p-6 sm:p-8 print:hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-850">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    ✓ Authenticity Verified
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-3">Certificate Record Found</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">ID: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{searchedId}</span></p>
                </div>
                <div>
                  <button
                    onClick={handlePrint}
                    className="premium-btn px-6 py-3 rounded-lg text-xs"
                  >
                    🖨 Print / Download PDF
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Candidate Name</span>
                  <span className="text-sm font-black text-slate-850 dark:text-white">{certificateData.name}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Program & Track</span>
                  <span className="text-sm font-black text-slate-850 dark:text-white">{certificateData.program}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Duration</span>
                  <span className="text-sm font-black text-slate-850 dark:text-white">{certificateData.duration}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Secured Grade</span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{certificateData.grade}</span>
                </div>
              </div>
            </div>

            {/* Print Viewable Certificate Frame */}
            <div className="max-w-4xl mx-auto flex justify-center">
              <div className="w-full relative rounded-2xl border-8 border-double border-indigo-900 bg-white p-8 sm:p-14 text-slate-900 shadow-2xl overflow-hidden aspect-[1.414/1] flex flex-col justify-between items-center text-center">
                {/* Background Watermark/Logo */}
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-25"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-indigo-500/[0.04] bg-indigo-500/[0.02] flex items-center justify-center pointer-events-none select-none">
                  <span className="text-[90px] font-black text-indigo-900/5 select-none uppercase tracking-wider font-mono">AETHERION</span>
                </div>

                {/* Certificate Content */}
                <div className="space-y-4 relative z-10 w-full">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest border-b border-indigo-200 pb-1 px-4">
                      MSME Government Registered Enterprise • India
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-wider text-indigo-950 mt-4 uppercase">
                      Certificate of Completion
                    </h2>
                    <p className="text-[10px] text-slate-500 italic mt-1.5 uppercase tracking-widest">
                      This is officially presented to
                    </p>
                  </div>

                  <div className="py-2.5">
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-indigo-900 border-b-2 border-indigo-900/10 inline-block px-10 italic">
                      {certificateData.name}
                    </h3>
                  </div>

                  <div className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed space-y-1">
                    <p>
                      for successfully completing the **{certificateData.type}** in
                    </p>
                    <p className="font-bold text-slate-800 text-sm sm:text-base">
                      {certificateData.program}
                    </p>
                    <p>
                      conducted for a duration of <span className="font-bold text-slate-850">{certificateData.duration}</span>.
                      The participant has successfully completed all tasks, practical challenges, and evaluations, achieving an overall Grade **{certificateData.grade}**.
                    </p>
                  </div>
                </div>

                {/* Footer Signatures */}
                <div className="w-full grid grid-cols-3 gap-6 items-end relative z-10 pt-8 border-t border-slate-100">
                  <div className="text-left">
                    <p className="text-[9px] text-slate-500 font-mono">ID: {searchedId}</p>
                    <p className="text-[9px] text-slate-500 mt-1">Issue Date: {certificateData.issueDate}</p>
                  </div>

                  <div className="flex justify-center">
                    {/* Simulated MSME / QR Verification Badge */}
                    <div className="h-14 w-14 border border-indigo-900/20 bg-indigo-50/50 flex flex-col items-center justify-center p-1 rounded">
                      <div className="h-full w-full bg-slate-900 flex items-center justify-center text-white text-[8px] font-bold p-0.5 rounded">
                        QR CODE
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end">
                    <span className="font-serif italic text-indigo-900 text-sm tracking-wide">Prince Raj</span>
                    <span className="h-0.5 w-24 bg-indigo-900/20 my-1"></span>
                    <p className="text-[9px] font-bold text-slate-655 uppercase tracking-widest">Founder & CEO</p>
                    <p className="text-[8px] text-slate-400">Aetherion Inc.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Default Landing Panel (Hidden on Print) */
          <div className="max-w-4xl mx-auto border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 rounded-2xl overflow-hidden p-8 sm:p-12 relative mb-16 shadow-xl shadow-slate-100/40 dark:shadow-none transition-colors duration-300 print:hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent pointer-events-none"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                  ★ ISO 9001:2015 & MSME Registered
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Valid & Verifiable Nationwide</h2>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Every student receives a digital certificate with a unique tracking identifier. Recruiters or academic counselors can verify validity instantaneously through our tracking server.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">✓</span> Dynamic QR Code Integration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">✓</span> Verified Academic Credits Listing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">✓</span> Direct Integration with LinkedIn Licenses
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-center">
                <div className="relative w-full max-w-md rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-2xl group hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-350 hover:scale-[1.02]">
                  <img 
                    src={certificateImg} 
                    alt="Aetherion Certification Sample" 
                    className="w-full h-auto select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
