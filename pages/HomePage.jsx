import React, { useState } from 'react';

export default function HomePage() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');

  // Modal and Toast State
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [applyForm, setApplyForm] = useState({ name: '', email: '', college: '', year: '3rd Year' });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Sample Internship Data
  const internships = [
    {
      id: 1,
      title: 'Full-Stack Developer',
      company: 'WebSphere Technologies',
      category: 'Full Stack Development',
      location: 'Remote',
      duration: '3 Months',
      stipend: 12000,
      skills: ['React', 'Node.js', 'Express', 'TailwindCSS'],
      featured: true,
      description: 'We are seeking a motivated Frontend/Full-Stack React developer intern to join our agile product team. You will build user-facing features, optimize frontend performance, and collaborate on API integrations.',
      requirements: 'Basic understanding of React.js, modern JavaScript (ES6+), and CSS frameworks like Tailwind.',
      perks: 'Certificate of completion, Flexible hours, Direct placement offer (PPO) based on performance.',
    },
    {
      id: 2,
      title: 'React Native Developer Intern',
      company: 'AppVenture Studio',
      category: 'React Native',
      location: 'Remote',
      duration: '3 Months',
      stipend: 10000,
      skills: ['React Native', 'Expo', 'JavaScript', 'Redux'],
      featured: true,
      description: 'Join our mobile product team to develop and scale native Android and iOS features using React Native. Work on device hardware configurations and offline sync components.',
      requirements: 'Experience with React.js or JavaScript core, and basic mobile development structures.',
      perks: 'Dual certification, Flexible timings, Team bonuses.',
    },
    {
      id: 3,
      title: 'MERN Stack Development Intern',
      company: 'StackCore Labs',
      category: 'Full Stack Development',
      location: 'Bangalore',
      duration: '6 Months',
      stipend: 18000,
      skills: ['MongoDB', 'Express', 'React', 'Node.js'],
      featured: false,
      description: 'Design, write, and maintain server-side REST APIs, manage MongoDB database schemas, and optimize frontend client views using React.',
      requirements: 'Knowledge of database architectures, Node runtime, Express request cycles, and React states.',
      perks: 'Daily logbook signature support, Paid team lunches, Certificate.',
    },
    {
      id: 4,
      title: 'iOS & Android Developer (React Native)',
      company: 'SwiftMobile Inc',
      category: 'React Native',
      location: 'Pune',
      duration: '6 Months',
      stipend: 15000,
      skills: ['React Native', 'TypeScript', 'iOS', 'Android'],
      featured: false,
      description: 'Work closely with mobile product designers to build highly polished, interactive native views. Test and deploy applications to TestFlight and Play Store.',
      requirements: 'Proficiency in TypeScript, core React hooks, and familiarity with Expo CLI.',
      perks: 'Direct mentorship by Senior Mobile Architect, Free learning credits.',
    },
  ];

  // Helper lists for filters
  const categories = ['All', 'Full Stack Development', 'React Native'];
  const locations = ['All', 'Remote', 'Bangalore', 'Mumbai', 'Pune'];
  const durations = ['All', '3 Months', '6 Months'];

  // Apply filters
  const filteredInternships = internships.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All' || item.location === selectedLocation;
    const matchesDuration = selectedDuration === 'All' || item.duration === selectedDuration;

    return matchesSearch && matchesCategory && matchesLocation && matchesDuration;
  });

  const handleOpenApply = (internship) => {
    setSelectedInternship(internship);
    setApplyForm({ name: '', email: '', college: '', year: '3rd Year' });
  };

  const handleCloseApply = () => {
    setSelectedInternship(null);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setToastMessage(`Success! Your application for "${selectedInternship.title}" at ${selectedInternship.company} has been submitted.`);
    setShowToast(true);
    setSelectedInternship(null);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-20 relative transition-colors duration-300">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md bg-white dark:bg-slate-900 border border-indigo-500/30 text-slate-900 dark:text-white rounded-xl shadow-2xl p-4 flex gap-3 items-center animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="h-8 w-8 shrink-0 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
            ✓
          </div>
          <div>
            <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Application Submitted</p>
            <p className="text-xs text-slate-600 dark:text-slate-350 mt-0.5">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Hero Header Content (Now at the top) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 text-center">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 py-16 px-6 sm:px-12 text-center shadow-xl shadow-slate-100/40 dark:shadow-none transition-colors duration-300">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>

          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-[10px] font-bold uppercase tracking-widest text-indigo-655 dark:text-indigo-400 mb-2 backdrop-blur-sm">
              ✨ Premium Industrial Projects & Allocations
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-tight max-w-4xl mx-auto">
              Find Your Dream <span className="glowing-text">Technical Internship</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-semibold uppercase tracking-wider">
              Connecting Engineering, Polytechnic, and Diploma Students with Real Industry Projects.
            </p>
          </div>
        </div>
      </section>

      {/* Industrial Training Callout (Now below the hero content, above listings) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-8 sm:p-12 shadow-xl shadow-slate-100/40 dark:shadow-none transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-transparent pointer-events-none"></div>
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">
                Curriculum Logbook Support
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4 leading-tight">
                Mandatory Industrial Training Support
              </h2>
              <p className="text-slate-550 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                Completing industrial training is a compulsory academic requirement for final year polytechnic and engineering students. We offer university-approved project structures, live mentoring sessions, and signed reports matching your college board requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/internship"
                  className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg px-6 py-3.5 transition-colors shadow-md shadow-indigo-600/10 dark:shadow-none"
                >
                  Join Internship Programs
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-slate-750 dark:text-slate-350 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg px-6 py-3.5 transition-colors"
                >
                  College Tie-Ups
                </a>
              </div>
            </div>
            <div className="hidden lg:block relative p-6 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/10 backdrop-blur-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">AICTE & DTE Compliant Logbooks</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Industry Expert Mentor Allocations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Verified Signature & Certificate of Work</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Listing Section */}
      <section id="listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Filters Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-5 space-y-6 sticky top-24 shadow-xl shadow-slate-100/30 dark:shadow-none transition-colors duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-900 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">Refine Search</h3>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedLocation('All');
                  setSelectedDuration('All');
                  setSearchQuery('');
                }}
                className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 uppercase tracking-widest"
              >
                Clear All
              </button>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                {locations.map((l) => (
                  <option key={l} value={l}>{l === 'All' ? 'All Locations' : l}</option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Duration</label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                {durations.map((d) => (
                  <option key={d} value={d}>{d === 'All' ? 'All Durations' : d}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-900 pb-3">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Showing <span className="text-indigo-600 dark:text-indigo-400 font-bold">{filteredInternships.length}</span> internships matching your criteria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredInternships.length > 0 ? (
              filteredInternships.map((intern) => (
                <div
                  key={intern.id}
                  className="premium-card rounded-xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
                        {intern.company}
                      </span>
                      {intern.featured && (
                        <span className="inline-flex items-center gap-1 rounded bg-indigo-500/10 border border-indigo-500/25 px-2 py-0.5 text-[9px] font-black uppercase text-indigo-600 dark:text-indigo-400">
                          ⭐ Hot Role
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {intern.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-slate-500 dark:text-slate-400 mb-4">
                      <span className="flex items-center gap-1">📍 {intern.location}</span>
                      <span className="flex items-center gap-1">⏱️ {intern.duration}</span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed mb-5">
                      {intern.description}
                    </p>
                  </div>

                  <div>
                    {/* Skills Tag */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {intern.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-[9px] font-bold text-slate-600 dark:text-slate-350 border border-slate-200/60 dark:border-slate-700/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Action button */}
                    <button
                      onClick={() => handleOpenApply(intern)}
                      className="w-full premium-btn-secondary py-2.5 rounded-lg text-xs"
                    >
                      View details & Apply
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center border border-slate-200 dark:border-slate-900/60 rounded-xl bg-white dark:bg-slate-950/60 shadow-md">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 uppercase tracking-wider">No internship listings found</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Try adjusting your filters or search keywords.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hero Search & Badges (At the bottom) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 py-16 px-6 sm:px-12 text-center shadow-xl shadow-slate-100/40 dark:shadow-none transition-colors duration-300">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent pointer-events-none"></div>
          {/* Decorative Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>

          <div className="relative">
            {/* Quick Search */}
            <div className="max-w-2xl mx-auto p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 backdrop-blur-md flex flex-col sm:flex-row gap-2 shadow-2xl">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search by keywords (e.g. React, Python, CAD)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent pl-9 pr-4 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
                />
                <svg className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <a
                href="#listings"
                className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg px-6 py-3 transition-colors shrink-0"
              >
                Search
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                AICTE Compliant
              </span>
              <span className="h-4 w-px bg-slate-200 dark:bg-slate-850 hidden sm:block"></span>
              <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                Govt. of India MSME Certified
              </span>
              <span className="h-4 w-px bg-slate-200 dark:bg-slate-850 hidden sm:block"></span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                UDYAM-BR-22-0027265
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Web & App Development Services Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-8 sm:p-12 shadow-xl shadow-slate-100/40 dark:shadow-none transition-colors duration-300">
          {/* Decorative gradient accents */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-700/5 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">
                  🚀 We Build Too
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 leading-tight">
                  Need a Custom App or Website Built?
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mt-2 max-w-xl">
                  Beyond training — Aetherion also delivers production-ready web applications and mobile apps for businesses, startups, and individuals. MSME certified. Milestone-based delivery.
                </p>
              </div>
              <a
                href="/services"
                className="shrink-0 inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg px-7 py-3.5 shadow-lg shadow-indigo-600/10 dark:shadow-none transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                View Services
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>

            {/* Feature Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: 'Web Apps',
                  desc: 'React, Next.js, MERN stack — dashboards, portals, SaaS',
                },
                {
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: 'Mobile Apps',
                  desc: 'iOS & Android with React Native — from idea to Play Store',
                },
                {
                  icon: (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  label: 'Instant Estimate',
                  desc: 'Interactive cost calculator — know your budget before you commit',
                },
              ].map((tile) => (
                <div
                  key={tile.label}
                  className="flex items-start gap-4 rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/20 p-5 hover:border-slate-300 dark:hover:border-slate-800 hover:bg-slate-100/50 dark:hover:bg-slate-900/40 transition-all shadow-sm"
                >
                  <div className="h-9 w-9 shrink-0 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    {tile.icon}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wide">{tile.label}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{tile.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Details & Application Modal */}
      {selectedInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 dark:bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6 transition-colors duration-300">
            {/* Close */}
            <button
              onClick={handleCloseApply}
              className="absolute top-4 right-4 text-slate-400 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header info */}
            <div>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{selectedInternship.company}</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">{selectedInternship.title}</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-zinc-400 mt-2">
                <span>📍 {selectedInternship.location}</span>
                <span>⏱️ {selectedInternship.duration}</span>
              </div>
            </div>

            {/* Content info */}
            <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-widest mb-1.5">Role Description</h4>
                <p>{selectedInternship.description}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-widest mb-1.5">Basic Requirements</h4>
                <p>{selectedInternship.requirements}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-widest mb-1.5">Perks & Allowances</h4>
                <p>{selectedInternship.perks}</p>
              </div>
            </div>

            {/* Apply Form */}
            <form onSubmit={handleApplySubmit} className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-zinc-200">Application Form</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={applyForm.name}
                    onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. Priyanshu Sharma"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={applyForm.email}
                    onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. student@domain.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-1.5">College Name</label>
                  <input
                    type="text"
                    required
                    value={applyForm.college}
                    onChange={(e) => setApplyForm({ ...applyForm, college: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. Government Polytechnic"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-1.5">Year of Study</label>
                  <select
                    value={applyForm.year}
                    onChange={(e) => setApplyForm({ ...applyForm, year: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year (Final Year Diploma)</option>
                    <option>4th Year (B.Tech Final Year)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseApply}
                  className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg px-5 py-2.5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg px-6 py-2.5 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
