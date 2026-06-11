import React from 'react';
import { Link } from 'react-router-dom';
import certificateImg from '../Certificate.jpg';

export default function CertificatesPage() {
  return (
    <main className="py-20 md:py-28 bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Official Verification</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3 mb-6 leading-tight">
            MSME Standard Certifications
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed uppercase tracking-wider font-semibold">
            All Aetherion training programs offer official, verifiable certifications complying with Indian university norms.
          </p>
        </div>

        <div className="max-w-4xl mx-auto border border-zinc-900 bg-zinc-950 rounded-2xl overflow-hidden p-8 sm:p-12 relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-transparent pointer-events-none"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-[10px] font-bold uppercase tracking-widest text-amber-400">
                ★ ISO 9001:2015 & MSME Registered
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Valid & Verifiable Nationwide</h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Every student receives a digital certificate with a unique tracking identifier. Recruiters or academic counselors can verify validity instantaneously through our tracking server.
              </p>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex items-center gap-2">✓ Dynamic QR Code Integration</li>
                <li className="flex items-center gap-2">✓ Verified Academic Credits Listing</li>
                <li className="flex items-center gap-2">✓ Direct Integration with LinkedIn Licenses</li>
              </ul>
            </div>
            
            <div className="flex justify-center">
              <div className="relative w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl group hover:border-amber-500/30 transition-all duration-300">
                <img 
                  src={certificateImg} 
                  alt="Aetherion Certification Sample" 
                  className="w-full h-auto select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
