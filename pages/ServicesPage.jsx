import React, { useState } from 'react';
import { Search, Sparkles, Star, Calendar, Tag, ShieldCheck, ArrowRight, CheckCircle2, Share2, Layers, Smartphone, Layout, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ServicesPage() {
  const [selectedYearFilter, setSelectedYearFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'Web Development',
    budget: '₹20,000 - ₹50,000',
    description: '',
  });

  const [showToast, setShowToast] = useState(false);

  // Estimator Calculator State
  const [projectType, setProjectType] = useState('web'); // web, mobile, both
  const [selectedFeatures, setSelectedFeatures] = useState({
    auth: false,
    payments: false,
    admin: false,
    chat: false,
    notifications: false,
  });
  const [timeline, setTimeline] = useState('1-2 months'); // 2-4 weeks, 1-2 months, 3+ months

  const coursesList = [
    {
      id: 'c1',
      title: '3rd Year Combo (CSE/IT)',
      subtitle: 'Software Engineering + OS + Compiler Design + AI + OOPs',
      year: '3rd Year',
      type: 'ONLINE',
      offerBadge: 'BUMPER OFFER!! ALL 6 IN 1 COURSE',
      originalPrice: 3499,
      discountPrice: 1199,
      discountText: '65% OFF • 6 courses',
      language: 'Hinglish',
      rating: 4.9,
      startsOn: '23rd July 2026',
      endsOn: '31st December 2026',
      fullBatch: true,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'c2',
      title: '2nd Year Combo (CS/IT & Allied Branches)',
      subtitle: 'DSA + Computer Organization + Economics + Analog & Digital',
      year: '2nd Year',
      type: 'ONLINE',
      offerBadge: 'BUMPER OFFER!! ALL 4 IN 1 COURSE',
      originalPrice: 4999,
      discountPrice: 1499,
      discountText: '67% OFF • 4 courses',
      language: 'Hinglish',
      rating: 4.7,
      startsOn: '20th July 2026',
      endsOn: '31st December 2026',
      fullBatch: true,
      trending: true,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'c3',
      title: '1st Year Combo (CS/IT & Allied Branches)',
      subtitle: 'Physics + Basic Electrical Engineering (BEE) + Mathematics',
      year: '1st Year',
      type: 'ONLINE',
      offerBadge: 'BUMPER OFFER!! ALL 3 IN 1 COURSE',
      originalPrice: 3999,
      discountPrice: 999,
      discountText: '75% OFF • 3 courses',
      language: 'Hinglish',
      rating: 4.8,
      startsOn: '20th July 2026',
      endsOn: '31st December 2026',
      fullBatch: true,
      trending: true,
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
    }
  ];

  const filteredCourses = coursesList.filter((c) => {
    const matchesYear = selectedYearFilter === 'All' || c.year === selectedYearFilter;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesSearch;
  });

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }));
  };

  const calculateCost = () => {
    let basePrice = 0;
    if (projectType === 'web') basePrice = 15000;
    else if (projectType === 'mobile') basePrice = 25000;
    else if (projectType === 'uiux') basePrice = 8000;
    else basePrice = 35000;

    let featuresPrice = 0;
    if (selectedFeatures.auth) featuresPrice += 5000;
    if (selectedFeatures.payments) featuresPrice += 8000;
    if (selectedFeatures.admin) featuresPrice += 10000;
    if (selectedFeatures.chat) featuresPrice += 7000;
    if (selectedFeatures.notifications) featuresPrice += 4000;

    let multiplier = 1.0;
    if (timeline === '2-4 weeks') multiplier = 1.25;
    if (timeline === '3+ months') multiplier = 0.9;

    const total = (basePrice + featuresPrice) * multiplier;
    return Math.round(total);
  };

  const handlePrefillInquiry = () => {
    const cost = calculateCost();
    const typeLabel = projectType === 'web' ? 'Web App' : projectType === 'mobile' ? 'Mobile App' : projectType === 'uiux' ? 'UI & UX Design' : 'Web + Mobile App';
    const featuresList = Object.keys(selectedFeatures)
      .filter((k) => selectedFeatures[k])
      .map((k) => k.toUpperCase())
      .join(', ');

    let budgetRange = '₹15,000 - ₹30,000';
    if (cost > 50000) budgetRange = '₹50,000+';
    else if (cost > 30000) budgetRange = '₹30,000 - ₹50,000';

    setInquiryForm((prev) => ({
      ...prev,
      serviceType: typeLabel,
      budget: budgetRange,
      description: `Estimated Project Details:\n- Platform: ${typeLabel}\n- Features: ${featuresList || 'Core standard setup'}\n- Timeline: ${timeline}\n- Estimated Price: ₹${cost.toLocaleString()}\n\n[Please enter any custom requirements here]`,
    }));

    const formSection = document.getElementById('inquiry-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setInquiryForm({
      name: '',
      email: '',
      phone: '',
      serviceType: 'Web Development',
      budget: '₹20,000 - ₹50,000',
      description: '',
    });
    setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  return (
    <main className="py-12 md:py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 max-w-md bg-white dark:bg-slate-900 border border-purple-500/30 text-slate-900 dark:text-white rounded-2xl shadow-2xl p-4 flex gap-3 items-center backdrop-blur-xl"
          >
            <div className="h-10 w-10 shrink-0 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Request Received</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Our engineering team will review your requirements and reach out within 24 hours.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SECTION 1: COURSE CATALOG HEADER & FILTERS (Matching Image #2) */}
        <div className="mb-12">
          {/* Top Control Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {['1st Year', '2nd Year', '3rd Year', 'All'].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYearFilter(yr)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedYearFilter === yr
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-purple-400'
                  }`}
                >
                  {yr === 'All' ? 'All Courses' : yr}
                </button>
              ))}
            </div>

            {/* Search Input (Matching Image #2) */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-purple-500" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border-2 border-purple-400/40 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-600 shadow-sm"
              />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-center text-slate-900 dark:text-white uppercase tracking-wider mb-8">
            COMBO COURSES
          </h2>

          {/* Course Cards Grid (Matching Image #2) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-soft-md hover:shadow-glow-purple transition-all duration-300 flex flex-col"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video bg-gradient-to-tr from-purple-950 to-slate-900 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  
                  {/* Top Type Pill */}
                  <span className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md shadow">
                    {course.type}
                  </span>

                  {/* Share Icon */}
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-800 dark:text-white flex items-center justify-center hover:bg-purple-600 hover:text-white transition">
                    <Share2 className="w-4 h-4" />
                  </button>

                  {/* Bumper Offer Overlay Banner */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white text-center py-2 px-3 border-t border-purple-400/30">
                    <span className="text-[11px] font-black tracking-wide text-yellow-300 flex items-center justify-center gap-1">
                      🔥 {course.offerBadge}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                      {course.subtitle}
                    </p>

                    {/* Tag Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {course.trending && (
                        <span className="bg-purple-500/10 text-purple-600 dark:text-purple-300 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md border border-purple-500/20">
                          TRENDING
                        </span>
                      )}
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                        {course.language}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                        <Star className="w-3 h-3 fill-amber-500" /> {course.rating} Rating
                      </span>
                    </div>

                    {/* Dates */}
                    <div className="space-y-1 text-[11px] text-slate-500 dark:text-slate-400 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-purple-500" />
                        <span>Starts on <strong>{course.startsOn}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-purple-500" />
                        <span>Ends on <strong>{course.endsOn}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Footer */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-black text-purple-600 dark:text-purple-400">
                        ₹{course.discountPrice}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{course.originalPrice}
                      </span>
                      <span className="ml-auto bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-emerald-500/20">
                        🏷️ {course.discountText}
                      </span>
                    </div>
                    {course.fullBatch && (
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                        (FOR FULL BATCH)
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <button className="py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        Explore
                      </button>
                      <button className="py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-bold text-white shadow-md transition">
                        Buy Now
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 2: CUSTOM APP ESTIMATOR & CONSULTATION FORM */}
        <div className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 tracking-widest uppercase">
              Custom Engineering Services
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-2 mb-4">
              Project Cost Estimator & Quote Request
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Calculate your budget estimate dynamically and submit a request to our engineering team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Interactive Estimator */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft-md">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Select Platform & Scope
              </h3>

              <div className="space-y-6">
                {/* Platform Types */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                    Project Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'web', label: 'Web App', icon: Layout },
                      { id: 'mobile', label: 'Mobile App', icon: Smartphone },
                      { id: 'uiux', label: 'UI/UX Design', icon: Layers },
                      { id: 'both', label: 'Web + Mobile', icon: Sparkles }
                    ].map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setProjectType(type.id)}
                          className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-2 ${
                            projectType === type.id
                              ? 'bg-purple-600/10 border-purple-600 text-purple-600 dark:text-purple-400 font-bold'
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-purple-300'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Features Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                    Features Needed
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { key: 'auth', label: 'User Auth & Roles' },
                      { key: 'payments', label: 'Payment Gateway' },
                      { key: 'admin', label: 'Admin Dashboard' },
                      { key: 'chat', label: 'Realtime Messaging' },
                      { key: 'notifications', label: 'Push Notifications' },
                    ].map((feat) => (
                      <button
                        key={feat.key}
                        type="button"
                        onClick={() => handleFeatureToggle(feat.key)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition ${
                          selectedFeatures[feat.key]
                            ? 'bg-purple-600 text-white border-purple-600 shadow'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-purple-300'
                        }`}
                      >
                        {feat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Estimated Output Price Box */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Estimated Price</span>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">
                      ₹{calculateCost().toLocaleString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handlePrefillInquiry}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <span>Use Estimate In Form</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

            {/* Right: Inquiry Form */}
            <div id="inquiry-form-section" className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft-md">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 text-purple-600" />
                Submit Consultation Request
              </h3>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    placeholder="rahul@example.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">
                    Phone Number
                  </label>
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
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">
                    Requirements / Notes
                  </label>
                  <textarea
                    rows={4}
                    value={inquiryForm.description}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, description: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    placeholder="Describe your custom features or platform goals..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition"
                >
                  Send Consultation Request
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
