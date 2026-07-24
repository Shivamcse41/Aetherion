import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Bookmark, Briefcase, Award, GraduationCap, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');

  const [selectedInternship, setSelectedInternship] = useState(null);
  const [applyForm, setApplyForm] = useState({ name: '', email: '', college: '', year: '3rd Year' });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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
      description: 'We are seeking a motivated Frontend/Full-Stack React developer intern to join our agile product team.',
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
      description: 'Join our mobile product team to develop and scale native Android and iOS features using React Native.',
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
      description: 'Design, write, and maintain server-side REST APIs, manage MongoDB database schemas, and optimize frontend client views.',
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
      description: 'Work closely with mobile product designers to build highly polished, interactive native views.',
      requirements: 'Proficiency in TypeScript, core React hooks, and familiarity with Expo CLI.',
      perks: 'Direct mentorship by Senior Mobile Architect, Free learning credits.',
    },
  ];

  const categories = ['All', 'Full Stack Development', 'React Native'];
  const locations = ['All', 'Remote', 'Bangalore', 'Mumbai', 'Pune'];
  const durations = ['All', '3 Months', '6 Months'];

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
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-20">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 max-w-md bg-white dark:bg-slate-900 border border-purple-500/30 text-slate-900 dark:text-white rounded-2xl shadow-2xl p-4 flex gap-3 items-center"
          >
            <div className="h-10 w-10 shrink-0 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <p className="text-xs font-bold text-purple-600 uppercase">Application Submitted</p>
              <p className="text-xs text-slate-500 mt-0.5">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Empowering Polytechnic & Tech Careers</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6"
          >
            Find Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500">Technical Internship</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium mb-10"
          >
            Bridge the gap between academics and real-world software engineering with verified industrial projects, mentorship, and certifications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
          >
            <Link
              to="/internship"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs uppercase tracking-widest transition"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-soft-md">
          <div className="text-center p-4">
            <span className="text-3xl font-black text-purple-600 dark:text-purple-400">10,000+</span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Students Enrolled</span>
          </div>
          <div className="text-center p-4">
            <span className="text-3xl font-black text-purple-600 dark:text-purple-400">150+</span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Hiring Partners</span>
          </div>
          <div className="text-center p-4">
            <span className="text-3xl font-black text-purple-600 dark:text-purple-400">100%</span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Verified Credits</span>
          </div>
          <div className="text-center p-4">
            <span className="text-3xl font-black text-purple-600 dark:text-purple-400">4.9/5</span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Learner Rating</span>
          </div>
        </div>
      </section>

      {/* Internship Openings Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Featured Opportunities
            </h2>
            <p className="text-xs text-slate-500 font-medium">Apply now to reserve your industrial slot</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-purple-500" />
            <input
              type="text"
              placeholder="Search internships..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInternships.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-soft-md hover:shadow-glow-purple transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-500/10 px-2.5 py-1 rounded-md">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-slate-400">{item.location}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-purple-600 font-bold mb-3">{item.company}</p>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">{item.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {item.skills.map((skill, idx) => (
                    <span key={idx} className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Stipend</span>
                  <span className="text-base font-black text-purple-600">₹{item.stipend.toLocaleString()}/mo</span>
                </div>
                <button
                  onClick={() => handleOpenApply(item)}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase tracking-wider shadow-md transition"
                >
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}
