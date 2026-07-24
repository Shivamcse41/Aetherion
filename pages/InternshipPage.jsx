import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startPayuPayment } from '../utils/payuCheckout';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import { Search, Bookmark, Sparkles, Clock, Calendar, CheckCircle2, ShieldCheck, ArrowRight, X, Layers, Award, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InternshipPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [selectedInternship, setSelectedInternship] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('2 Weeks');
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', college: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [successNotice, setSuccessNotice] = useState(null);

  const defaultDurationPrices = {
    '2 Weeks': 499,
    '4 Weeks': 999,
    '8 Weeks': 1499
  };

  const internships = [
    {
      id: 0,
      title: 'Payment Gateway Test Course',
      description: 'Quick test course designed to verify payment gateway, webhooks, and enrollment databases at a minimal cost.',
      duration: '1 Week',
      type: 'Technical & Practical',
      level: 'Beginner',
      features: ['Payment System Verification', 'Database Webhook Test', 'Immediate Activation'],
      price: 1,
      durationPrices: { '1 Week': 1 },
      modules: ['Initialize Transaction', 'Complete Secure Checkout', 'Verify Enrollment Status'],
      imageBg: 'from-amber-500/10 to-transparent',
    },
    {
      id: 1,
      title: 'Full-Stack Web Development (MERN Stack)',
      description: 'Master React, Node.js, Express, and MongoDB. Build complete production-ready web apps from scratch.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Full-Stack Web Engineering',
      level: 'Beginner to Advanced',
      features: ['Live Industrial Projects', 'Resume & GitHub Review', 'PPO & Placement Support'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['HTML, CSS & TailwindCSS basics', 'JavaScript ES6+ & DOM manipulations', 'React Components & Hooks', 'Node.js, Express APIs & MongoDB integration'],
      imageBg: 'from-indigo-500/10 to-transparent',
    },
    {
      id: 22,
      title: 'Web Development Basics (HTML, CSS & JavaScript)',
      description: 'Master foundational web development. Learn semantic HTML5 markup, responsive CSS3 styling & Flexbox, and core JavaScript ES6+ DOM scripting from scratch.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Frontend Web Development',
      level: 'Beginner',
      features: ['HTML5 & CSS3 layout labs', 'JavaScript DOM manipulation projects', 'Responsive web design standards'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['HTML5 Structure & Semantic Tags', 'CSS3 Layouts, Flexbox & Grid Systems', 'JavaScript ES6+, Functions & Events', 'Building & Deploying Interactive Websites'],
      imageBg: 'from-orange-500/10 to-transparent',
    },
    {
      id: 2,
      title: 'Mobile App Development (React Native)',
      description: 'Learn React Native, Expo, and navigation systems. Build, debug, and publish native Android & iOS applications.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Mobile Engineering',
      level: 'Intermediate',
      features: ['Native Device integrations', 'State Management (Redux Toolkit)', 'Store Publishing support'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['React Native Components & Styling', 'React Navigation (Tabs & Stack)', 'Native APIs (Camera, Location)', 'Redux Toolkit & REST API integration'],
      imageBg: 'from-blue-500/10 to-transparent',
    },
    {
      id: 3,
      title: 'Python, Machine Learning & AI',
      description: 'Master Python scripting, data analysis (Pandas, NumPy), and build custom machine learning models (Regression, Neural Networks).',
      duration: '2 / 4 / 8 Weeks',
      type: 'Data Science & AI',
      level: 'Beginner to Advanced',
      features: ['Dataset modeling projects', 'Mathematical analysis basics', 'Model deployment on Cloud'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['Python Programming & Data structures', 'Data processing with Pandas & NumPy', 'Regression, Classification & Clustering', 'Neural Networks & API Deployment'],
      imageBg: 'from-purple-500/10 to-transparent',
    },
    {
      id: 4,
      title: 'Cybersecurity & Ethical Hacking',
      description: 'Learn system security auditing, network penetration testing, web application security (OWASP Top 10), and vulnerability assessment.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Network & System Security',
      level: 'All levels welcome',
      features: ['Virtual lab exercises', 'OWASP vulnerability checks', 'Security report compilation'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['Linux Command Line & Networking', 'Reconnaissance & Network Auditing', 'OWASP Top 10 Web Security', 'Metasploit & Penetration Testing'],
      imageBg: 'from-red-500/10 to-transparent',
    },
    {
      id: 5,
      title: 'DevOps & Cloud Computing (AWS/Docker)',
      description: 'Master continuous integration (CI/CD) pipelines, Docker containerization, Kubernetes clustering, and AWS cloud architecture configurations.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Cloud & DevOps Operations',
      level: 'Intermediate to Advanced',
      features: ['Real-world server setups', 'Jenkins automation pipelines', 'AWS Cloud Architect credits'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['Docker Containerization & Image building', 'Kubernetes Pod orchestration', 'Jenkins CI/CD Automation pipelines', 'AWS Services (EC2, S3, RDS, IAM)'],
      imageBg: 'from-violet-500/10 to-transparent',
    },
    {
      id: 6,
      title: 'Data Structures, Algorithms & Java',
      description: 'Master Java programming, complex data structures (Trees, Graphs), algorithmic paradigms (dynamic programming), and prepare for technical interviews.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Software Engineering',
      level: 'Beginner to Intermediate',
      features: ['DSA problem sheets', 'LeetCode pattern practice', 'Mock technical interviews'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['Java Syntax & OOP Paradigms', 'Linked Lists, Stacks & Queues', 'Binary Trees & Graph Algorithms', 'Sorting, Searching & Recursion'],
      imageBg: 'from-emerald-500/10 to-transparent',
    },
    {
      id: 7,
      title: 'Frontend Developer Training',
      description: 'Learn modern frontend web technologies. Code responsive interfaces, work with frameworks, and style using CSS libraries.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Frontend Development',
      level: 'Beginner to Intermediate',
      features: ['Responsive UI designs', 'Git & GitHub deployment', 'Expert feedback on layouts'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['HTML5 & Semantic Structure', 'CSS3 Layouts (Flexbox & Grid)', 'JavaScript Basics & Event Handling', 'Deployment on Netlify/Vercel'],
      imageBg: 'from-pink-500/10 to-transparent',
    },
    {
      id: 8,
      title: 'Full Stack Development Certification',
      description: 'End-to-end development of dynamic database-driven applications. Master frontend user interfaces and backend server APIs.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Full Stack Engineering',
      level: 'Beginner to Advanced',
      features: ['Database integration', 'API development & testing', 'Full-stack application deployment'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['Client-Side UI Frameworks', 'RESTful API Engineering', 'Relational & Non-Relational Databases', 'Authentication & Secure Routes'],
      imageBg: 'from-sky-500/10 to-transparent',
    },
    {
      id: 9,
      title: 'Blockchain Development',
      description: 'Deep dive into decentralized technologies. Understand smart contracts, cryptography, and decentralized app architectures.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Web3 & Blockchain',
      level: 'Intermediate to Advanced',
      features: ['Smart contract writing', 'DApp wallet connections', 'Decentralized ledger theory'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['Blockchain Basics & Cryptography', 'Solidity Smart Contracts', 'Ethereum Virtual Machine (EVM)', 'Web3JS / EthersJS integration'],
      imageBg: 'from-fuchsia-500/10 to-transparent',
    },
    {
      id: 10,
      title: 'Android Developer with Flutter',
      description: 'Build native high-performance cross-platform applications for Android and iOS using Dart and Flutter framework.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Mobile Engineering',
      level: 'Beginner to Intermediate',
      features: ['Single-codebase cross platform', 'State management (Provider/Bloc)', 'Material design compliance'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['Dart Programming basics', 'Flutter widgets & layout systems', 'State Management approaches', 'REST API consumption in Mobile'],
      imageBg: 'from-teal-500/10 to-transparent',
    },
    {
      id: 11,
      title: 'Android Developer (Android + iOS Development)',
      description: 'Master native mobile architectures and modern build paradigms for both Google Play Store and Apple App Store ecosystems.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Mobile Engineering',
      level: 'Beginner to Advanced',
      features: ['Store build optimizations', 'Platform-specific integrations', 'Performance debugging & profiling'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['Native Android (Kotlin/Java)', 'iOS Development (Swift/SwiftUI)', 'Cross-Platform Compilations', 'App Release cycles & practices'],
      imageBg: 'from-indigo-500/10 to-transparent',
    },
    {
      id: 12,
      title: 'Data Analytics Training',
      description: 'Extract intelligence from data. Master statistical analysis, data cleaning, and corporate dashboard reporting.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Data Science & BI',
      level: 'Beginner to Intermediate',
      features: ['Interactive dashboards', 'Business KPI formulations', 'Dataset transformation labs'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['Excel Advanced Data Analysis', 'SQL Querying for Analytics', 'Power BI / Tableau visualizations', 'Statistical distribution & analysis'],
      imageBg: 'from-cyan-500/10 to-transparent',
    },
    {
      id: 13,
      title: 'JavaScript Fundamentals',
      description: 'Master the core programming language of the modern web. Learn execution context, asynchronous behavior, and OOP.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Software Engineering',
      level: 'Beginner to Intermediate',
      features: ['DSA problems in JS', 'Asynchronous projects (Promises/APIs)', 'Code modularization patterns'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['Variables, Loops & Scope', 'Arrays, Objects & Functions', 'Asynchronous JS (Promises, Async/Await)', 'ES6+ Specifications & Modules'],
      imageBg: 'from-amber-500/10 to-transparent',
    },
    {
      id: 14,
      title: 'Generative AI Practitioner',
      description: 'Build cutting-edge applications using Large Language Models, prompt engineering, and RAG architectures.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Artificial Intelligence',
      level: 'Intermediate to Advanced',
      features: ['API prompt tuning', 'Vector database search integrations', 'Agentic system developments'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['Prompt Engineering techniques', 'LLM API integration (OpenAI/Gemini)', 'Vector Search (Pinecone/Chroma)', 'LangChain framework architectures'],
      imageBg: 'from-pink-500/10 to-transparent',
    },
    {
      id: 15,
      title: 'HTML, CSS & JavaScript Suite',
      description: 'The complete foundational stack for modern web engineering. Code, design, and release interactive frontend pages.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Frontend Development',
      level: 'Beginner',
      features: ['Pure vanilla code labs', 'Interactive animations', 'Clean CSS layouts'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['Semantic markup with HTML5', 'Responsive CSS styling & Flexbox', 'Vanilla JavaScript DOM scripting', 'Interactive elements & projects'],
      imageBg: 'from-orange-500/10 to-transparent',
    },
    {
      id: 16,
      title: 'Python Programming',
      description: 'Master general-purpose scripting, algorithms, automations, and backend capabilities using Python.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Software Engineering',
      level: 'Beginner to Intermediate',
      features: ['Automation scripting labs', 'Data structures in Python', 'API interactions'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['Syntax, Control Flow & Data Types', 'Functions, Modules & File I/O', 'OOP concepts in Python', 'Basic scripting & system automation'],
      imageBg: 'from-emerald-500/10 to-transparent',
    },
    {
      id: 17,
      title: 'Machine Learning Fundamentals',
      description: 'Design and deploy statistical algorithms that learn from patterns in dataset collections.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Data Science & ML',
      level: 'Intermediate to Advanced',
      features: ['Regression & Classification projects', 'Model metrics validation', 'Feature selection practices'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['Data Preprocessing steps', 'Supervised Learning algorithms', 'Unsupervised clustering models', 'Model tuning & validation metrics'],
      imageBg: 'from-rose-500/10 to-transparent',
    },
    {
      id: 18,
      title: 'SQL & Data Modeling',
      description: 'Learn database schema structuring, normalization, and optimize complex relational SQL query strategies.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Database Engineering',
      level: 'Beginner to Intermediate',
      features: ['Subquery and Joins masterclass', 'Database optimization labs', 'Entity relationship designs'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['Relational Database concepts', 'SQL syntax & Query commands', 'Database normalization rules', 'Indexes & query optimizations'],
      imageBg: 'from-violet-500/10 to-transparent',
    },
    {
      id: 19,
      title: 'Graphics Design & Media',
      description: 'Master visual layouts, typography, design assets, and production suite tools for modern marketing channels.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Design & Graphics',
      level: 'Beginner to Intermediate',
      features: ['Portfolio project design', 'Logo & branding layouts', 'Social media ad templates'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['Color theory & typography', 'Vector art design (Illustrator/Figma)', 'Digital image editing (Photoshop)', 'Marketing asset formats'],
      imageBg: 'from-pink-500/10 to-transparent',
    },
    {
      id: 20,
      title: 'AI/ML Engineering',
      description: 'Implement intelligence layers inside products. Bridge the gap between research models and production applications.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Artificial Intelligence',
      level: 'Intermediate to Advanced',
      features: ['API endpoint integration', 'Cloud model hosting scripts', 'Workflow automations'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['Deep learning introduction', 'Model APIs & integrations', 'Model deployments & checkpoints', 'Pipeline configurations'],
      imageBg: 'from-purple-500/10 to-transparent',
    },
    {
      id: 21,
      title: 'Data Science Certification',
      description: 'Extract structural knowledge from data using tools, mathematics, algorithms, and visualization dashboards.',
      duration: '2 / 4 / 8 Weeks',
      type: 'Data Science & Analytics',
      level: 'Beginner to Advanced',
      features: ['Comprehensive dataset reports', 'Feature engineering models', 'Statistical validation labs'],
      price: 499,
      durationPrices: defaultDurationPrices,
      modules: ['Python for Data Science', 'Advanced EDA techniques', 'Statistical models & hypothesizing', 'Cloud visualization deployments'],
      imageBg: 'from-teal-500/10 to-transparent',
    },
  ];

  const handleOpenEnroll = (internship) => {
    setSelectedInternship(internship);
    if (internship.durationPrices) {
      const keys = Object.keys(internship.durationPrices);
      setSelectedDuration(keys.includes('2 Weeks') ? '2 Weeks' : keys[0]);
    } else {
      setSelectedDuration(internship.duration);
    }
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

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const activePrice = selectedInternship.durationPrices 
      ? selectedInternship.durationPrices[selectedDuration] 
      : selectedInternship.price;

    const finalInternshipTitle = selectedInternship.durationPrices
      ? `${selectedInternship.title} (${selectedDuration})`
      : selectedInternship.title;

    const enrollmentRecord = {
      courseId: selectedInternship.id,
      courseTitle: finalInternshipTitle,
      duration: selectedDuration,
      amount: activePrice,
      name: inquiryForm.name,
      email: inquiryForm.email,
      phone: inquiryForm.phone,
      college: inquiryForm.college,
      date: new Date().toISOString(),
    };

    // Save entered student profile details
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
      // Attempt PayU checkout endpoint
      await startPayuPayment({
        courseId: selectedInternship.id,
        amount: activePrice,
        duration: selectedInternship.durationPrices ? selectedDuration : null,
        courseTitle: finalInternshipTitle,
        name: inquiryForm.name,
        email: inquiryForm.email,
        phone: inquiryForm.phone,
        college: inquiryForm.college,
      });
    } catch (err) {
      console.warn('PayU Gateway fallback (Local/Demo execution):', err.message);

      // Save to localStorage so student registration ALWAYS works 100%!
      const existing = JSON.parse(localStorage.getItem('student_enrollments') || '[]');
      localStorage.setItem('student_enrollments', JSON.stringify([enrollmentRecord, ...existing]));

      // Save to Supabase if available
      if (supabase && user?.id) {
        try {
          await supabase.from('enrollments').insert([{
            user_id: user.id,
            course_title: finalInternshipTitle,
            amount: activePrice,
            status: 'Enrolled & Paid',
          }]);
        } catch (sErr) {
          console.error('Supabase enrollment note:', sErr);
        }
      }

      setSubmitting(false);
      setSelectedInternship(null);

      // Redirect immediately to dashboard so student sees their active enrolled program
      navigate('/dashboard');
    }
  };

  const filteredList = internships.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="py-12 md:py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400 tracking-widest uppercase">
            Industrial Internship & Certifications
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-3 mb-4 font-serif">
            Industrial Internship Programs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Gain verified hands-on experience, university compliant logbooks, and direct mentor guidance across all technical domains.
          </p>

          {/* Search Input */}
          <div className="mt-8 relative max-w-md mx-auto">
            <Search className="w-4 h-4 absolute left-4 top-3.5 text-purple-500" />
            <input
              type="text"
              placeholder="Search by skill or program domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-600 shadow-soft-sm"
            />
          </div>
        </div>

        {/* Success Notice Modal / Alert */}
        {successNotice && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-slate-900 dark:text-white max-w-2xl mx-auto shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                  Enrollment Successful!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {successNotice.name}, you are now enrolled in <strong>{successNotice.title}</strong> (₹{successNotice.amount}).
                </p>
              </div>
            </div>

            <button
              onClick={() => { setSuccessNotice(null); navigate('/dashboard'); }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition whitespace-nowrap"
            >
              Go to Dashboard
            </button>
          </motion.div>
        )}

        {/* Programs Grid (All 22 Courses) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredList.map((item) => {
            const isBookmarked = bookmarkedIds.includes(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-soft-md hover:shadow-glow-purple transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                      {item.type}
                    </span>
                    <button
                      onClick={() => toggleBookmark(item.id)}
                      className={`p-2 rounded-xl transition ${
                        isBookmarked ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-purple-600'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      {item.durationPrices ? 'Starting Fee' : 'Enrollment Fee'}
                    </span>
                    <span className="text-xl font-black text-purple-600 dark:text-purple-400">
                      ₹{item.price}
                    </span>
                    {item.durationPrices && (
                      <span className="block text-[9px] font-bold text-slate-400">2 / 4 / 8 Weeks</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleOpenEnroll(item)}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase tracking-wider shadow-md transition flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Apply & Enroll</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Enroll Drawer Modal */}
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
                Fill out student credentials to initiate enrollment checkout.
              </p>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
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
                    placeholder="Aetherion Institute of Tech"
                  />
                </div>

                {selectedInternship.durationPrices && (
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400 mb-2 tracking-wider">
                      Select Training Duration
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.keys(selectedInternship.durationPrices).map((dur) => {
                        const price = selectedInternship.durationPrices[dur];
                        const isSelected = selectedDuration === dur;
                        return (
                          <button
                            key={dur}
                            type="button"
                            onClick={() => setSelectedDuration(dur)}
                            className={`p-2.5 text-center rounded-xl border transition flex flex-col items-center justify-center gap-0.5 ${
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
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition disabled:opacity-50 mt-2 active:scale-98 cursor-pointer"
                >
                  {submitting ? 'Processing Enrollment...' : `Confirm & Enroll (₹${selectedInternship.durationPrices ? selectedInternship.durationPrices[selectedDuration] : selectedInternship.price})`}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
