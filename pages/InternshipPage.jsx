import React from 'react';
import { Link } from 'react-router-dom';

export default function InternshipPage() {
  const internships = [
    {
      title: 'Full Stack Web Development',
      duration: '8 - 12 Weeks',
      type: 'Remote / Hybrid',
      description: 'Build modern responsive web applications using React, Node.js, and Supabase. Map projects directly to university guidelines.',
      perks: ['MSME Certificate', 'Weekly Mentor Sync', 'Academic Credit Approval'],
    },
    {
      title: 'Data Science & Analytics',
      duration: '8 Weeks',
      type: 'Remote',
      description: 'Master statistical analysis, Python data engineering, and dashboard visualizations. Deliver verified project reports.',
      perks: ['MSME Certificate', 'Data Labs Access', 'Verified Logbook'],
    },
    {
      title: 'Embedded Systems & IoT',
      duration: '12 Weeks',
      type: 'Hybrid',
      description: 'Program microcontrollers, simulate circuit designs, and interface with sensors. Complete AICTE-compliant projects.',
      perks: ['Hardware Lab Kit', 'Expert Guidance', 'University Sign-off'],
    }
  ];

  return (
    <main className="py-20 md:py-28 bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Academic Compliance</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3 mb-6 leading-tight">
            University Verified Internships
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed uppercase tracking-wider font-semibold">
            Acquire certified, curriculum-aligned training and secure correct academic credits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {internships.map((intern, idx) => (
            <div key={idx} className="group relative rounded-xl border border-zinc-900 bg-zinc-950 p-6 sm:p-8 hover:border-zinc-800 transition-all duration-300">
              <div className="absolute top-4 right-4 text-[9px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {intern.duration}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                {intern.title}
              </h3>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-4">{intern.type}</p>
              <p className="text-zinc-400 text-xs leading-relaxed mb-6">{intern.description}</p>
              <ul className="space-y-2 mb-8 text-xs text-zinc-300">
                {intern.perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span> {perk}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="block text-center py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-all">
                Apply For Internship
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
