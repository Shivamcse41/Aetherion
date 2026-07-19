import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import certificateImg from '../Certificate.jpg';

export default function DashboardPage() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!user) {
    return (
      <main className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen flex items-center justify-center transition-colors duration-300">
        <div className="max-w-md w-full px-6 py-10 text-center border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 rounded-2xl relative overflow-hidden shadow-xl shadow-slate-100/40 dark:shadow-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent pointer-events-none"></div>
          <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider mb-3">Access Portal</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-8">
            Please authenticate to access your personal Student Dashboard & Account Center.
          </p>
          <Link to="/login" className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg px-6 py-3 shadow-md hover:-translate-y-0.5 transition-all shadow-indigo-600/10 dark:shadow-none">
            Login / Register
          </Link>
        </div>
      </main>
    );
  }

  const studentDetails = {
    enrollmentNo: 'ATH-2026-8849',
    college: 'Aetherion Institute of Technology',
    courseName: 'Advanced Full Stack Web Architecture',
    startDate: 'May 10, 2026',
    mentorName: 'Dr. Kabir Sharma',
    mentorEmail: 'k.sharma@aetherion.edu',
  };

  const applications = [
    {
      role: 'Full Stack Developer Intern',
      company: 'Aetherion Labs',
      appliedDate: '2026-05-01',
      status: 'Enrolled',
      progress: 100,
    },
    {
      role: 'AI & Data Integration Specialist',
      company: 'Aetherion Enterprise',
      appliedDate: '2026-05-25',
      status: 'Under Review',
      progress: 60,
    }
  ];

  const logbookEntries = [
    { week: 'Week 4', topic: 'Supabase SSR & JWT Authorization', date: '2026-06-08', status: 'Approved', hours: 30 },
    { week: 'Week 3', topic: 'Responsive Styling & Grid Layouts', date: '2026-06-01', status: 'Approved', hours: 32 },
    { week: 'Week 2', topic: 'RESTful API & Database Architecture', date: '2026-05-25', status: 'Approved', hours: 35 },
    { week: 'Week 1', topic: 'Vite Setup & React Component Patterns', date: '2026-05-18', status: 'Approved', hours: 28 },
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z' },
    { id: 'internships', name: 'My Internships', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'logbooks', name: 'Weekly Logbooks', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'certificates', name: 'Certificates', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222' }
  ];

  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <main className="py-12 md:py-20 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-6 sm:p-8 mb-8 shadow-md shadow-slate-100/30 dark:shadow-none transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-transparent pointer-events-none"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-650 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/20 uppercase">
                {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'S'}
              </div>
              <div>
                <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {profile?.role || 'Student'}
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1.5">{profile?.full_name || 'Student Portal'}</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{user.email}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => { signOut(); navigate('/'); }}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-550 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 rounded-lg transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Tab Selector */}
        <div className="lg:hidden relative mb-6">
          <div className="flex items-center justify-between border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-4 rounded-xl shadow-md">
            <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
              <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={currentTab.icon} />
              </svg>
              <span className="text-xs font-bold uppercase tracking-wider">{currentTab.name}</span>
            </div>
            
            <button 
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="p-2 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-lg transition-colors"
              aria-label="Toggle Dashboard Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>

          {mobileSidebarOpen && (
            <div className="absolute z-30 left-0 right-0 mt-2 border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 rounded-xl p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors text-left ${
                    activeTab === tab.id
                      ? 'bg-indigo-650 dark:bg-indigo-500 text-white shadow-md'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                  }`}
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                  {tab.name}
                </button>
              ))}
              <div className="border-t border-slate-100 dark:border-slate-900 p-4 mt-2 bg-slate-50/50 dark:bg-zinc-900/10 rounded-lg">
                <h4 className="text-[10px] font-bold text-slate-450 dark:text-zinc-500 uppercase tracking-widest mb-1.5">Assigned Mentor</h4>
                <p className="text-xs text-slate-700 dark:text-zinc-300 font-semibold">{studentDetails.mentorName}</p>
                <a href={`mailto:${studentDetails.mentorEmail}`} className="block text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline mt-1 font-mono">{studentDetails.mentorEmail}</a>
              </div>
            </div>
          )}
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Navigation Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 rounded-xl p-2 space-y-1 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Support Quick Card */}
            <div className="border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 rounded-xl p-5 mt-6 relative overflow-hidden shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent pointer-events-none"></div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2">Assigned Mentor</h3>
              <p className="text-[11px] text-slate-700 dark:text-zinc-300 font-semibold">{studentDetails.mentorName}</p>
              <a href={`mailto:${studentDetails.mentorEmail}`} className="block text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline mt-1 font-mono">{studentDetails.mentorEmail}</a>
            </div>
          </div>

          {/* Main Dashboard Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Counter Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-5 rounded-xl shadow-sm">
                    <span className="block text-[9px] font-bold text-slate-450 dark:text-zinc-500 uppercase tracking-widest mb-1.5">Enrollment Number</span>
                    <span className="text-sm font-bold text-slate-700 dark:text-zinc-200 font-mono">{studentDetails.enrollmentNo}</span>
                  </div>
                  <div className="border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-5 rounded-xl shadow-sm">
                    <span className="block text-[9px] font-bold text-slate-450 dark:text-zinc-500 uppercase tracking-widest mb-1.5">Hours Tracked</span>
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">125 Hours Logged</span>
                  </div>
                  <div className="border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-5 rounded-xl shadow-sm">
                    <span className="block text-[9px] font-bold text-slate-450 dark:text-zinc-500 uppercase tracking-widest mb-1.5">Approval Status</span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">100% Verified</span>
                  </div>
                </div>

                {/* Primary Enrolled Program */}
                <div className="border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-6 sm:p-8 rounded-xl relative overflow-hidden shadow-sm">
                  <div className="absolute top-4 right-4 text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20">
                    Active Program
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest block mb-2">{studentDetails.college}</span>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4">{studentDetails.courseName}</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-850">
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Start Date</span>
                      <span className="text-xs text-slate-600 dark:text-zinc-300 font-medium">{studentDetails.startDate}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Mandatory Duration</span>
                      <span className="text-xs text-slate-600 dark:text-zinc-300 font-medium">8 Weeks (University Compliant)</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Verification Status</span>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Synced with University Credits</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Internships Tab */}
            {activeTab === 'internships' && (
              <div className="space-y-6">
                <h2 className="text-base font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2">My Applications & Enrollments</h2>
                <div className="space-y-4">
                  {applications.map((app, idx) => (
                    <div key={idx} className="border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-5 sm:p-6 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">{app.role}</h3>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">{app.company} • Applied on {app.appliedDate}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <span className="block text-[9px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-1">Process Progress</span>
                          <div className="w-24 h-1.5 bg-slate-100 dark:bg-zinc-900 rounded-full overflow-hidden border border-slate-200/50 dark:border-transparent">
                            <div className="h-full bg-indigo-600 dark:bg-indigo-500" style={{ width: `${app.progress}%` }}></div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          app.status === 'Enrolled'
                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                            : 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Logbooks Tab */}
            {activeTab === 'logbooks' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-base font-bold text-slate-800 dark:text-white uppercase tracking-wider">Weekly Training Logbooks</h2>
                  <button className="self-start sm:self-auto inline-flex items-center justify-center text-[10px] font-bold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg px-4 py-2 transition-all shadow-md shadow-indigo-600/10 dark:shadow-none">
                    + Submit New Logbook Entry
                  </button>
                </div>
                
                <div className="overflow-x-auto border border-slate-200 dark:border-slate-900 rounded-xl bg-white dark:bg-slate-900/40 shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/20 text-[9px] font-bold text-slate-555 dark:text-zinc-400 uppercase tracking-widest">
                        <th className="p-4">Week</th>
                        <th className="p-4">Core Training Submissions</th>
                        <th className="p-4">Submission Date</th>
                        <th className="p-4">Hours Logged</th>
                        <th className="p-4 text-right">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-900/60 text-xs">
                      {logbookEntries.map((entry, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/10 transition-colors">
                          <td className="p-4 font-bold text-slate-700 dark:text-zinc-300">{entry.week}</td>
                          <td className="p-4 text-slate-600 dark:text-zinc-400 font-semibold">{entry.topic}</td>
                          <td className="p-4 text-slate-450 dark:text-zinc-500 font-mono">{entry.date}</td>
                          <td className="p-4 text-slate-700 dark:text-zinc-300 font-bold">{entry.hours} Hrs</td>
                          <td className="p-4 text-right">
                            <span className="inline-block px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                              {entry.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <div className="space-y-6">
                <h2 className="text-base font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2">Academic Certification Registry</h2>
                <div className="border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-6 rounded-xl relative overflow-hidden shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent pointer-events-none"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[9px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        ✓ Registered under Ministry of MSME
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Verification Status: Active</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        Your university internship logbook verification is complete. The official certificate has been generated and validated with registration credentials.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-3">
                        <a 
                          href={certificateImg} 
                          download="Aetherion_Internship_Certificate.jpg"
                          className="inline-flex items-center justify-center text-[10px] font-bold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg px-5 py-2.5 shadow-md transition-all shadow-indigo-600/10 dark:shadow-none"
                        >
                          Download Certificate JPG
                        </a>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="relative w-full max-w-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-2xl group hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300">
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
            )}
            
          </div>
        </div>
      </div>
    </main>
  );
}
