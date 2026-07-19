import React, { useState } from 'react';
import { startPayuPayment } from '../utils/payuCheckout';

export default function InternshipPage() {
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('8 Weeks'); // Default duration
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', college: '', phone: '' });
  const [showToast, setShowToast] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const internships = [
    {
      id: 1,
      title: 'Full-Stack Web Development (MERN Stack)',
      description: 'Master React, Node.js, Express, and MongoDB. Build complete production-ready web apps from scratch.',
      duration: '8 Weeks',
      type: 'Technical & Practical',
      level: 'Beginner to Advanced',
      features: ['Live Industrial Projects', 'Resume & GitHub Review', 'PPO & Placement Support'],
      price: 1999,
      modules: ['HTML, CSS & TailwindCSS basics', 'JavaScript ES6+ & DOM manipulations', 'React Components & Hooks', 'Node.js, Express APIs & MongoDB integration'],
      imageBg: 'from-indigo-500/10 to-transparent',
    },
    {
      id: 2,
      title: 'Mobile App Development (React Native)',
      description: 'Learn React Native, Expo, and navigation systems. Build, debug, and publish native Android & iOS applications.',
      duration: '8 Weeks',
      type: 'Mobile Engineering',
      level: 'Intermediate',
      features: ['Native Device integrations', 'State Management (Redux Toolkit)', 'Store Publishing support'],
      price: 1999,
      modules: ['React Native Components & Styling', 'React Navigation (Tabs & Stack)', 'Native APIs (Camera, Location)', 'Redux Toolkit & REST API integration'],
      imageBg: 'from-blue-500/10 to-transparent',
    },
    {
      id: 3,
      title: 'Python, Machine Learning & AI',
      description: 'Master Python scripting, data analysis (Pandas, NumPy), and build custom machine learning models (Regression, Neural Networks).',
      duration: '10 Weeks',
      type: 'Data Science & AI',
      level: 'Beginner to Advanced',
      features: ['Dataset modeling projects', 'Mathematical analysis basics', 'Model deployment on Cloud'],
      price: 5999,
      modules: ['Python Programming & Data structures', 'Data processing with Pandas & NumPy', 'Regression, Classification & Clustering', 'Neural Networks & API Deployment'],
      imageBg: 'from-purple-500/10 to-transparent',
    },
    {
      id: 4,
      title: 'Cybersecurity & Ethical Hacking',
      description: 'Learn system security auditing, network penetration testing, web application security (OWASP Top 10), and vulnerability assessment.',
      duration: '10 Weeks',
      type: 'Network & System Security',
      level: 'All levels welcome',
      features: ['Virtual lab exercises', 'OWASP vulnerability checks', 'Security report compilation'],
      price: 6499,
      modules: ['Linux Command Line & Networking', 'Reconnaissance & Network Auditing', 'OWASP Top 10 Web Security', 'Metasploit & Penetration Testing'],
      imageBg: 'from-red-500/10 to-transparent',
    },
    {
      id: 5,
      title: 'DevOps & Cloud Computing (AWS/Docker)',
      description: 'Master continuous integration (CI/CD) pipelines, Docker containerization, Kubernetes clustering, and AWS cloud architecture configurations.',
      duration: '12 Weeks',
      type: 'Cloud Operations',
      level: 'Intermediate to Advanced',
      features: ['Real-world server setups', 'Jenkins automation pipelines', 'AWS Cloud Architect credits'],
      price: 6999,
      modules: ['Docker Containerization & Image building', 'Kubernetes Pod orchestration', 'Jenkins CI/CD Automation pipelines', 'AWS Services (EC2, S3, RDS, IAM)'],
      imageBg: 'from-violet-500/10 to-transparent',
    },
    {
      id: 6,
      title: 'Data Structures, Algorithms & Java',
      description: 'Master Java programming, complex data structures (Trees, Graphs), algorithmic paradigms (dynamic programming), and prepare for technical interviews.',
      duration: '8 Weeks',
      type: 'Software Engineering',
      level: 'Beginner to Intermediate',
      features: ['DSA problem sheets', 'LeetCode pattern practice', 'Mock technical interviews'],
      price: 1999,
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
      durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 },
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
      durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1999 },
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
      durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 },
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
      durationPrices: { '2 Weeks': 499, '4 Weeks': 1199, '8 Weeks': 1999 },
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
      durationPrices: { '2 Weeks': 499, '4 Weeks': 1199, '8 Weeks': 1999 },
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
      durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 },
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
      durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 },
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
      durationPrices: { '2 Weeks': 499, '4 Weeks': 1199, '8 Weeks': 1999 },
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
      durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 },
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
      durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 },
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
      durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 },
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
      durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 },
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
      durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 },
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
      durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 },
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
      durationPrices: { '2 Weeks': 499, '4 Weeks': 999, '8 Weeks': 1499 },
      modules: ['Python for Data Science', 'Advanced EDA techniques', 'Statistical models & hypothesizing', 'Cloud visualization deployments'],
      imageBg: 'from-teal-500/10 to-transparent',
    },
  ];

  const handleOpenEnroll = (internship) => {
    setSelectedInternship(internship);
    if (internship.durationPrices) {
      setSelectedDuration(Object.keys(internship.durationPrices).includes('8 Weeks') ? '8 Weeks' : Object.keys(internship.durationPrices)[0]);
    } else {
      setSelectedDuration(internship.duration);
    }
    setInquiryForm({ name: '', email: '', college: '', phone: '' });
  };

  const handleCloseEnroll = () => {
    setSelectedInternship(null);
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const finalInternshipTitle = selectedInternship.durationPrices
      ? `${selectedInternship.title} (${selectedDuration})`
      : selectedInternship.title;

    try {
      await startPayuPayment({
        courseId: selectedInternship.id,
        duration: selectedInternship.durationPrices ? selectedDuration : null,
        courseTitle: finalInternshipTitle,
        name: inquiryForm.name,
        email: inquiryForm.email,
        phone: inquiryForm.phone,
        college: inquiryForm.college,
      });
    } catch (err) {
      console.error('Enrollment error:', err);
      alert(err.message || 'Payment failed. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <main className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen relative transition-colors duration-300">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md bg-white dark:bg-slate-900 border border-indigo-500/30 text-slate-900 dark:text-white rounded-xl shadow-2xl p-4 flex gap-3 items-center animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="h-8 w-8 shrink-0 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
            ✓
          </div>
          <div>
            <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Payment Successful</p>
            <p className="text-xs text-slate-500 dark:text-slate-450 mt-0.5">Enrollment confirmed. Our training mentor will contact you within 24 hours.</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">
            Academic Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-3 mb-6 leading-tight">
            University Verified Internships & <span className="glowing-text">Industrial Trainings</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed uppercase tracking-wider font-semibold">
            Gain job-ready skills designed in collaboration with board guidelines to meet mandatory academic training & internship requirements.
          </p>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {internships.map((internship) => (
            <div
              key={internship.id}
              className="premium-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div className="relative">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 font-mono">
                    ⏱️ {internship.duration}
                  </span>
                  <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                    {internship.type}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {internship.title}
                </h2>
                
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-6">
                  {internship.description}
                </p>

                {/* Syllabus Modules */}
                <div className="mb-6 space-y-2.5">
                  <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 tracking-widest uppercase">Training Curriculum:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {internship.modules.map((mod, index) => (
                      <div key={index} className="flex gap-2 items-start p-2 rounded-lg bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200/60 dark:border-slate-850/50">
                        <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 h-5 w-5 rounded flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-[11px] text-slate-600 dark:text-slate-450 leading-tight">{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features list */}
                <div className="mb-6">
                  <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 tracking-widest uppercase mb-3">Key Inclusions:</p>
                  <ul className="space-y-2">
                    {internship.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-450">
                        <svg className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative border-t border-slate-105 dark:border-slate-855 pt-5 flex items-center justify-between gap-4 mt-4">
                <div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">Registration Fee</span>
                  <p className="text-xl font-black text-slate-900 dark:text-white">₹{internship.price.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => handleOpenEnroll(internship)}
                  className="premium-btn px-5 py-3 rounded-lg text-xs"
                >
                  Enroll & Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Modal */}
      {selectedInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 dark:bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-5 transition-colors duration-300">
            {/* Close */}
            <button
              onClick={handleCloseEnroll}
              className="absolute top-4 right-4 text-slate-400 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Secure Enrollment</span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{selectedInternship.title}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Program fee: ₹{(selectedInternship.durationPrices ? selectedInternship.durationPrices[selectedDuration] : selectedInternship.price).toLocaleString()}
              </p>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-4 pt-2">
              {selectedInternship.durationPrices && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-1.5">Select Duration</label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    {Object.keys(selectedInternship.durationPrices).map((dur) => (
                      <option key={dur} value={dur}>
                        {dur} - ₹{selectedInternship.durationPrices[dur].toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="e.g. Yash Patel"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="e.g. yash@domain.com"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="e.g. +91 9876543210"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 mb-1.5">College Name</label>
                <input
                  type="text"
                  required
                  value={inquiryForm.college}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, college: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="e.g. K.J. Somaiya Polytechnic"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseEnroll}
                  className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-450 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg px-5 py-2.5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 rounded-lg px-6 py-2.5 transition-colors"
                >
                  {submitting ? 'Processing...' : `Pay ₹${(selectedInternship.durationPrices ? selectedInternship.durationPrices[selectedDuration] : selectedInternship.price).toLocaleString()}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
