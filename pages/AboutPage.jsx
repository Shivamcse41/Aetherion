import React from 'react';

export default function AboutPage() {
  return (
    <main className="py-20 md:py-28 bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Our Mission</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3 mb-6 leading-tight animate-in fade-in duration-500">
            Bridging College Education & Core Industries
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed uppercase tracking-wider font-semibold">
            Aetherion helps final-year engineering and diploma students acquire certified, university-compliant training and internship allocations.
          </p>
        </div>

        {/* Pillars / Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            {
              title: 'Curriculum-Aligned',
              desc: 'Our projects map directly onto AICTE, DTE, and university board mandates, ensuring you secure correct academic credits.',
              badge: 'Compliance',
            },
            {
              title: 'Industry-Led Projects',
              desc: 'Work on actual engineering challenges. Build software modules, program physical PLCs, design CAD structures, or routing circuits.',
              badge: 'Practicality',
            },
            {
              title: 'Mentor Supervision',
              desc: 'Get assigned to experienced engineers who review your daily progress logs, sign off your worksheets, and guide final report builds.',
              badge: 'Support',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-xl border border-zinc-900 bg-zinc-950 p-6 sm:p-8 hover:border-zinc-800 transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-[9px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {item.badge}
              </div>
              <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800/80 text-zinc-100 font-bold flex items-center justify-center text-sm mb-6 group-hover:bg-amber-400 group-hover:text-zinc-950 transition-colors duration-300">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Government MSME Certification Section */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 sm:p-12 mb-24">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-transparent pointer-events-none"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                🇮🇳 Government of India Recognized
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                MSME Registered Enterprise
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Aetherion is officially registered under the <strong>Ministry of Micro, Small & Medium Enterprises (MSME), Government of India</strong>. This registration confirms our alignment with national vocational standards, enabling us to deliver compliant internship training, verification logs, and certifications valid across India.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="border border-zinc-900/80 bg-zinc-950/60 p-4 rounded-xl">
                  <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Udyam Registration No.</span>
                  <span className="text-xs font-bold text-zinc-200 font-mono tracking-wide">UDYAM-BR-22-0027265</span>
                </div>
                <div className="border border-zinc-900/80 bg-zinc-950/60 p-4 rounded-xl">
                  <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Enterprise Type</span>
                  <span className="text-xs font-bold text-zinc-200">Micro (Services Sector)</span>
                </div>
                <div className="border border-zinc-900/80 bg-zinc-950/60 p-4 rounded-xl">
                  <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Major Activity</span>
                  <span className="text-xs font-bold text-zinc-200">Other Educational Services (NIC 85499)</span>
                </div>
                <div className="border border-zinc-900/80 bg-zinc-950/60 p-4 rounded-xl">
                  <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Official Registration Address</span>
                  <span className="text-xs font-bold text-zinc-200">Purabsarai, Munger, Bihar, India</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center w-full">
              {/* Premium Certificate Representation */}
              <div className="relative w-full max-w-sm rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 flex flex-col justify-between shadow-2xl overflow-hidden group hover:border-amber-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 h-24 w-24 bg-amber-500/5 rounded-full blur-2xl"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Udyam Registration</h4>
                    <p className="text-[9px] text-zinc-600 mt-0.5">Ministry of MSME, Govt. of India</p>
                  </div>
                  <span className="text-xl">🇮🇳</span>
                </div>
                <div className="my-8">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider text-center mb-1.5">Registration Number</p>
                  <p className="text-base sm:text-lg font-black text-white tracking-widest font-mono text-center bg-zinc-950/80 py-2.5 rounded-lg border border-zinc-900">
                    UDYAM-BR-22-0027265
                  </p>
                  <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest text-center mt-3">AETHERION REGISTERED</p>
                </div>
                <div className="flex justify-between items-center text-[9px] text-zinc-500 border-t border-zinc-900/80 pt-4">
                  <span>Classification: Micro</span>
                  <span>Date: 02/06/2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Partners / Stats */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 p-8 sm:p-12 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none"></div>
          <div className="relative max-w-2xl mx-auto space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">College Placement Collaborations</h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              We partner directly with academic coordinators and Training & Placement Officers (TPOs) to automate the internship validation process. We facilitate bulk allocation pipelines and generate standard reports to save administration time.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg px-6 py-3 transition-colors"
              >
                Request College Tie-Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
