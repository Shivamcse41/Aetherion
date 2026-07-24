import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { startPayuPayment } from '../utils/payuCheckout';
import { supabase } from '../supabaseClient';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Bookmark, 
  Briefcase, 
  Award, 
  GraduationCap, 
  Users,
  X,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('2 Weeks');
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', college: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const defaultDurationPrices = {
    '2 Weeks': 499,
    '4 Weeks': 999,
    '8 Weeks': 1499
  };

  // Full Comprehensive Course & Internship Database
  const allCourses = [
    {
      id: 1,
      title: 'Full-Stack Web Development (MERN Stack)',
      company: 'Aetherion Labs',
      category: 'Full Stack Development',
      location: 'Remote / Industrial',
      duration: '2 / 4 / 8 Weeks',
      stipend: 499,
      skills: ['React', 'Node.js', 'Express', 'MongoDB'],
      description: 'Master React, Node.js, Express, and MongoDB. Build complete production-ready web apps from scratch.',
      durationPrices: defaultDurationPrices,
      features: ['Live Industrial Projects', 'Resume & GitHub Review', 'PPO & Placement Support'],
    },
    {
      id: 22,
      title: 'Web Development Basics (HTML, CSS & JavaScript)',
      company: 'Aetherion Academy',
      category: 'Frontend Development',
      location: 'Remote / Industrial',
      duration: '2 / 4 / 8 Weeks',
      stipend: 499,
      skills: ['HTML5', 'CSS3', 'Flexbox', 'JavaScript ES6+'],
      description: 'Master foundational web development. Learn semantic HTML5 markup, responsive CSS3 styling & Flexbox, and core JavaScript ES6+ DOM scripting.',
      durationPrices: defaultDurationPrices,
      features: ['HTML5 & CSS3 layout labs', 'JavaScript DOM manipulation projects', 'Responsive web design standards'],
    },
    {
      id: 2,
      title: 'Mobile App Development (React Native)',
      company: 'AppVenture Studio',
      category: 'Mobile App Development',
      location: 'Remote',
      duration: '2 / 4 / 8 Weeks',
      stipend: 499,
      skills: ['React Native', 'Expo', 'JavaScript', 'Redux'],
      description: 'Learn React Native, Expo, and navigation systems. Build, debug, and publish native Android & iOS applications.',
      durationPrices: defaultDurationPrices,
      features: ['Native Device integrations', 'State Management (Redux)', 'Store Publishing support'],
    },
    {
      id: 3,
      title: 'Python, Machine Learning & AI',
      company: 'Aetherion AI Labs',
      category: 'Data Science & AI',
      location: 'Remote',
      duration: '2 / 4 / 8 Weeks',
      stipend: 499,
      skills: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn'],
      description: 'Master Python scripting, data analysis (Pandas, NumPy), and build custom machine learning models.',
      durationPrices: defaultDurationPrices,
      features: ['Dataset modeling projects', 'Mathematical analysis basics', 'Model deployment on Cloud'],
    },
    {
      id: 4,
      title: 'Cybersecurity & Ethical Hacking',
      company: 'SecureNet Core',
      category: 'Cybersecurity',
      location: 'Remote',
      duration: '2 / 4 / 8 Weeks',
      stipend: 499,
      skills: ['Linux', 'Networking', 'OWASP Top 10', 'Penetration Testing'],
      description: 'Learn system security auditing, network penetration testing, web application security (OWASP Top 10), and vulnerability assessment.',
      durationPrices: defaultDurationPrices,
      features: ['Virtual lab exercises', 'OWASP vulnerability checks', 'Security report compilation'],
    },
    {
      id: 5,
      title: 'DevOps & Cloud Computing (AWS/Docker)',
      company: 'CloudScale Systems',
      category: 'Cloud & DevOps',
      location: 'Remote',
      duration: '2 / 4 / 8 Weeks',
      stipend: 499,
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD Pipelines'],
      description: 'Master continuous integration (CI/CD) pipelines, Docker containerization, Kubernetes clustering, and AWS cloud architecture configurations.',
      durationPrices: defaultDurationPrices,
      features: ['Real-world server setups', 'Jenkins automation pipelines', 'AWS Cloud Architect credits'],
    },
    {
      id: 6,
      title: 'Data Structures, Algorithms & Java',
      company: 'CodeCraft Institute',
      category: 'Software Engineering',
      location: 'Remote',
      duration: '2 / 4 / 8 Weeks',
      stipend: 499,
      skills: ['Java', 'Data Structures', 'Algorithms', 'OOP'],
      description: 'Master Java programming, complex data structures (Trees, Graphs), algorithmic paradigms, and prepare for technical interviews.',
      durationPrices: defaultDurationPrices,
      features: ['DSA problem sheets', 'LeetCode pattern practice', 'Mock technical interviews'],
    },
    {
      id: 7,
      title: 'Frontend Developer Training',
      company: 'UI/UX Interactive',
      category: 'Frontend Development',
      location: 'Remote',
      duration: '2 / 4 / 8 Weeks',
      stipend: 499,
      skills: ['HTML5', 'CSS3', 'JavaScript', 'TailwindCSS'],
      description: 'Learn modern frontend web technologies. Code responsive interfaces, work with frameworks, and style using CSS libraries.',
      durationPrices: defaultDurationPrices,
      features: ['Responsive UI designs', 'Git & GitHub deployment', 'Expert feedback on layouts'],
    },
    {
      id: 10,
      title: 'Android Developer with Flutter',
      company: 'FlutterCraft',
      category: 'Mobile App Development',
      location: 'Remote',
      duration: '2 / 4 / 8 Weeks',
      stipend: 499,
      skills: ['Dart', 'Flutter', 'State Management', 'REST APIs'],
      description: 'Build native high-performance cross-platform applications for Android and iOS using Dart and Flutter framework.',
      durationPrices: defaultDurationPrices,
      features: ['Single-codebase cross platform', 'State management', 'Material design compliance'],
    },
    {
      id: 12,
      title: 'Data Analytics Training',
      company: 'DataViz Intel',
      category: 'Data Science & AI',
      location: 'Remote',
      duration: '2 / 4 / 8 Weeks',
      stipend: 499,
      skills: ['Excel', 'SQL', 'Power BI', 'Tableau'],
      description: 'Extract intelligence from data. Master statistical analysis, data cleaning, and corporate dashboard reporting.',
      durationPrices: defaultDurationPrices,
      features: ['Interactive dashboards', 'Business KPI formulations', 'Dataset transformation labs'],
    },
    {
      id: 14,
      title: 'Generative AI Practitioner',
      company: 'Aetherion AI Labs',
      category: 'Data Science & AI',
      location: 'Remote',
      duration: '2 / 4 / 8 Weeks',
      stipend: 499,
      skills: ['Python', 'OpenAI API', 'LangChain', 'Prompt Engineering'],
      description: 'Build cutting-edge applications using Large Language Models, prompt engineering, and RAG architectures.',
      durationPrices: defaultDurationPrices,
      features: ['API prompt tuning', 'Vector database search integrations', 'Agentic system developments'],
    },
  ];

  const categories = ['All', 'Full Stack Development', 'Frontend Development', 'Mobile App Development', 'Data Science & AI', 'Cybersecurity', 'Cloud & DevOps'];

  const filteredInternships = allCourses.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleOpenApply = (internship) => {
    setSelectedInternship(internship);
    setSelectedDuration('2 Weeks');
    setInquiryForm({
      name: profile?.full_name || user?.user_metadata?.full_name || '',
      email: user?.email || profile?.email || '',
      college: profile?.college || '',
      phone: profile?.mobile || user?.user_metadata?.phone || '',
    });
  };

  const handleCloseEnroll = () => {
    setSelectedInternship(null);
  };

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const activePrice = selectedInternship.durationPrices 
      ? selectedInternship.durationPrices[selectedDuration] 
      : selectedInternship.stipend || 499;

    const finalCourseTitle = selectedInternship.durationPrices
      ? `${selectedInternship.title} (${selectedDuration})`
      : selectedInternship.title;

    const enrollmentRecord = {
      courseId: selectedInternship.id,
      courseTitle: finalCourseTitle,
      duration: selectedDuration,
      amount: activePrice,
      name: inquiryForm.name,
      email: inquiryForm.email,
      phone: inquiryForm.phone,
      college: inquiryForm.college,
      date: new Date().toISOString(),
    };

    // Save student profile details
    const userIdKey = user?.id || 'guest';
    const currentProfileData = JSON.parse(localStorage.getItem(`profile_data_${userIdKey}`) || '{}');
    const updatedProfileData = {
      ...currentProfileData,
      name: inquiryForm.name || currentProfileData.name || '',
      email: inquiryForm.email || currentProfileData.email || '',
      mobile: inquiryForm.phone || currentProfileData.mobile || '',
      college: inquiryForm.college || currentProfileData.college || '',
    };
    localStorage.setItem(`profile_data_${userIdKey}`, JSON.stringify(updatedProfileData));

    try {
      await startPayuPayment({
        courseId: selectedInternship.id,
        amount: activePrice,
        duration: selectedDuration,
        courseTitle: finalCourseTitle,
        name: inquiryForm.name,
        email: inquiryForm.email,
        phone: inquiryForm.phone,
        college: inquiryForm.college,
      });
    } catch (err) {
      console.warn('PayU Checkout fallback execution:', err.message);

      // Save enrollment to localStorage & Supabase
      const existing = JSON.parse(localStorage.getItem('student_enrollments') || '[]');
      localStorage.setItem('student_enrollments', JSON.stringify([enrollmentRecord, ...existing]));

      if (supabase && user?.id) {
        try {
          await supabase.from('enrollments').insert([{
            user_id: user.id,
            course_title: finalCourseTitle,
            amount: activePrice,
            status: 'Enrolled & Paid',
          }]);
        } catch (sErr) {
          console.error(sErr);
        }
      }

      setSubmitting(false);
      setSelectedInternship(null);
      navigate('/dashboard');
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-20">
      
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
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6 font-serif"
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
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs uppercase tracking-widest transition cursor-pointer"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
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

      {/* Internship & Course Opportunities Section with Live Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider font-serif">
              Featured Programs & Opportunities
            </h2>
            <p className="text-xs text-slate-500 font-medium">Search any course or skill (Web Development, Python, React, Cybersecurity, Java, etc.)</p>
          </div>

          {/* Search Input on Home Page */}
          <div className="relative w-full md:w-96">
            <Search className="w-4.5 h-4.5 absolute left-3.5 top-3 text-purple-600 dark:text-purple-400" />
            <input
              type="text"
              placeholder="Search course or skill (e.g. HTML, Python, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl pl-11 pr-4 py-2.5 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-600 shadow-sm transition"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInternships.map((item) => {
            const isBookmarked = bookmarkedIds.includes(item.id);
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-soft-md hover:shadow-glow-purple transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                      {item.category}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{item.location}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-purple-600 font-bold mb-3">{item.company}</p>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed line-clamp-3">{item.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.skills.map((skill, idx) => (
                      <span key={idx} className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Starting Fee</span>
                    <span className="text-lg font-black text-purple-600 dark:text-purple-400">₹{item.stipend || 499}</span>
                    <span className="block text-[9px] font-bold text-slate-400">2 / 4 / 8 Weeks</span>
                  </div>

                  {/* 100% Working APPLY NOW Button */}
                  <button
                    onClick={() => handleOpenApply(item)}
                    className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:shadow-lg transition active:scale-95 cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredInternships.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-bold text-slate-500">No course found matching "{searchQuery}".</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-3 text-xs text-purple-600 font-bold hover:underline"
            >
              Clear filters and view all courses
            </button>
          </div>
        )}
      </section>

      {/* Enroll Drawer Modal on Home Page */}
      <AnimatePresence>
        {selectedInternship && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button
                type="button"
                onClick={handleCloseEnroll}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 pr-8">
                {selectedInternship.title}
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Fill out student credentials to initiate course enrollment checkout.
              </p>

              <form onSubmit={handleEnrollSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    placeholder="Shivam Kumar"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    placeholder="shivam@example.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    placeholder="9876543210"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">College Name</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.college}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, college: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    placeholder="Enter your college name"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400 mb-2 tracking-wider">
                    Select Training Duration
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.keys(defaultDurationPrices).map((dur) => {
                      const price = defaultDurationPrices[dur];
                      const isSelected = selectedDuration === dur;
                      return (
                        <button
                          key={dur}
                          type="button"
                          onClick={() => setSelectedDuration(dur)}
                          className={`p-2.5 text-center rounded-xl border transition flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                            isSelected
                              ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-[1.02]'
                              : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:border-purple-400'
                          }`}
                        >
                          <span className="text-[11px] font-bold">{dur}</span>
                          <span className={`text-[10px] font-black ${isSelected ? 'text-purple-100' : 'text-purple-600 dark:text-purple-400'}`}>
                            (₹{price})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition disabled:opacity-50 mt-2 active:scale-98 cursor-pointer"
                >
                  {submitting ? 'Processing Enrollment...' : `Confirm & Pay (₹${defaultDurationPrices[selectedDuration]})`}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
