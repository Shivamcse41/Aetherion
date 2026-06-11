import React, { useState } from 'react';

export default function ServicesPage() {
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

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }));
  };

  // Dynamic cost calculation based on options
  const calculateCost = () => {
    let basePrice = 0;
    if (projectType === 'web') basePrice = 15000;
    else if (projectType === 'mobile') basePrice = 25000;
    else if (projectType === 'uiux') basePrice = 8000;
    else basePrice = 35000; // both

    let featuresPrice = 0;
    if (selectedFeatures.auth) featuresPrice += 5000;
    if (selectedFeatures.payments) featuresPrice += 8000;
    if (selectedFeatures.admin) featuresPrice += 10000;
    if (selectedFeatures.chat) featuresPrice += 7000;
    if (selectedFeatures.notifications) featuresPrice += 4000;

    let multiplier = 1.0;
    if (timeline === '2-4 weeks') multiplier = 1.25; // Rush fee
    if (timeline === '3+ months') multiplier = 0.9;  // Discount for long-term

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

    // Scroll smoothly to form
    const formSection = document.getElementById('inquiry-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    // Reset description/inputs
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
    <main className="py-20 md:py-28 bg-zinc-950 text-zinc-100 min-h-screen relative overflow-hidden">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md bg-zinc-900 border border-amber-500/30 text-white rounded-xl shadow-2xl p-4 flex gap-3 items-center animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="h-8 w-8 shrink-0 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
            ✓
          </div>
          <div>
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">Consultation Request Received</p>
            <p className="text-xs text-zinc-300 mt-0.5">Thank you! Our engineering team will review your project details and contact you within 24 hours.</p>
          </div>
        </div>
      )}

      {/* Radial Gradient Ambient Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">
            Development Services
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3 mb-6 leading-tight">
            We Build Custom Apps & Websites
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed uppercase tracking-wider font-semibold">
            High-Performance Web and Mobile Solutions Designed by Industry Professionals. Certified Quality, Production-Ready Delivery.
          </p>
        </div>

        {/* Services Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {/* Card 1: Web Development */}
          <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950 p-8 flex flex-col justify-between hover:border-zinc-800 transition-all group hover:shadow-xl hover:shadow-amber-500/[0.01]">
            <div>
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">Custom Web Apps</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Full-featured custom web applications built with the MERN stack, Next.js, and modern CSS frameworks. Fast loading, responsive, and SEO-optimized out of the box.
              </p>
              <ul className="space-y-2 text-xs text-zinc-500 mb-6">
                <li className="flex items-center gap-2">✓ React / Node / Express APIs</li>
                <li className="flex items-center gap-2">✓ Admin Dashboards & Databases</li>
                <li className="flex items-center gap-2">✓ SaaS & E-Commerce platforms</li>
              </ul>
            </div>
          </div>

          {/* Card 2: Mobile App */}
          <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950 p-8 flex flex-col justify-between hover:border-zinc-800 transition-all group hover:shadow-xl hover:shadow-amber-500/[0.01]">
            <div>
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">Mobile App</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Native-performing iOS and Android applications built with React Native. Push notifications, offline support, device hardware access, and App Store publishing support.
              </p>
              <ul className="space-y-2 text-xs text-zinc-500 mb-6">
                <li className="flex items-center gap-2">✓ iOS & Android native outputs</li>
                <li className="flex items-center gap-2">✓ Camera, Maps & Location sync</li>
                <li className="flex items-center gap-2">✓ Play Store & App Store deployments</li>
              </ul>
            </div>
          </div>

          {/* Card 3: UI & UX Design */}
          <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950 p-8 flex flex-col justify-between hover:border-zinc-800 transition-all group hover:shadow-xl hover:shadow-amber-500/[0.01]">
            <div>
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">UI & UX Design</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Visually stunning, user-first interface design — from wireframes to polished Figma prototypes. We craft experiences that convert visitors into customers.
              </p>
              <ul className="space-y-2 text-xs text-zinc-500 mb-6">
                <li className="flex items-center gap-2">✓ Figma Wireframes & Prototypes</li>
                <li className="flex items-center gap-2">✓ Brand Identity & Typography</li>
                <li className="flex items-center gap-2">✓ Responsive & Accessible Design</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Pricing Estimator Section */}
        <div className="rounded-2xl border border-zinc-900 bg-zinc-950/60 p-6 sm:p-10 mb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.02] to-transparent pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Calculator Toggles */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Interactive Calculator</span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5 mb-2">Estimate Your Project Cost</h2>
                <p className="text-xs text-zinc-400">Configure your required features and timeline to view an instant development estimate.</p>
              </div>

              {/* Project Type */}
              <div className="space-y-3">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400">Platform Choice</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'web', label: 'Website / Web App' },
                    { id: 'mobile', label: 'Mobile App' },
                    { id: 'both', label: 'Web + Mobile' },
                    { id: 'uiux', label: 'UI & UX Design' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setProjectType(t.id)}
                      className={`py-3 px-2 text-[10px] font-black uppercase tracking-wider rounded-lg border transition-all text-center ${
                        projectType === t.id
                          ? 'border-amber-400 bg-amber-400/5 text-amber-400'
                          : 'border-zinc-900 bg-zinc-900/30 text-zinc-400 hover:border-zinc-800'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feature checkboxes */}
              <div className="space-y-3">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400">Required Features</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'auth', label: 'User Auth / Login' },
                    { id: 'payments', label: 'Payments Gateways' },
                    { id: 'admin', label: 'Admin Dashboard' },
                    { id: 'chat', label: 'Realtime Chat' },
                    { id: 'notifications', label: 'Push Notifications' },
                  ].map((feat) => (
                    <button
                      key={feat.id}
                      onClick={() => handleFeatureToggle(feat.id)}
                      className={`p-3 text-[10px] font-bold uppercase tracking-wider rounded-lg border text-left flex items-center justify-between transition-all ${
                        selectedFeatures[feat.id]
                          ? 'border-amber-400/50 bg-amber-400/5 text-amber-400'
                          : 'border-zinc-900 bg-zinc-900/10 text-zinc-500 hover:border-zinc-800'
                      }`}
                    >
                      <span>{feat.label}</span>
                      <span>{selectedFeatures[feat.id] ? '✓' : '+'}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline selector */}
              <div className="space-y-3">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400">Target Timeline</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: '2-4 weeks', desc: 'Fast Track (Priority)' },
                    { val: '1-2 months', desc: 'Standard Delivery' },
                    { val: '3+ months', desc: 'Flexible Delivery' },
                  ].map((t) => (
                    <button
                      key={t.val}
                      onClick={() => setTimeline(t.val)}
                      className={`py-3 px-2 rounded-lg border transition-all text-center flex flex-col justify-center items-center ${
                        timeline === t.val
                          ? 'border-amber-400 bg-amber-400/5 text-amber-400'
                          : 'border-zinc-900 bg-zinc-900/20 text-zinc-400 hover:border-zinc-800'
                      }`}
                    >
                      <span className="text-[10px] font-black uppercase tracking-wider">{t.val}</span>
                      <span className="text-[8px] text-zinc-500 mt-0.5">{t.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Display Estimates */}
            <div className="lg:col-span-5 h-full">
              <div className="rounded-2xl border border-zinc-900 bg-zinc-900/30 p-6 flex flex-col justify-between items-center text-center h-full relative">
                <div className="space-y-4 py-6">
                  <div className="space-y-1">
                    <p className="text-4xl font-black text-white">₹{calculateCost().toLocaleString()}</p>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Base project + features configured</p>
                  </div>

                  <div className="flex justify-center items-center gap-6 pt-4 border-t border-zinc-900/60 max-w-xs mx-auto text-xs text-zinc-400">
                    <div>
                      <p className="text-white font-bold">{timeline}</p>
                      <p className="text-[9px] text-zinc-500 uppercase tracking-wider">Timeline</p>
                    </div>
                    <div className="h-6 w-px bg-zinc-800"></div>
                    <div>
                      <p className="text-white font-bold">1 Year</p>
                      <p className="text-[9px] text-zinc-500 uppercase tracking-wider">Free Support</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePrefillInquiry}
                  className="w-full mt-4 inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg py-3.5 transition-colors"
                >
                  Prefill & Contact Team
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Client Inquiry Form Section */}
        <div id="inquiry-form-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start scroll-mt-24">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Start Project</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">Ready to build your digital product?</h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Submit your inquiry and we will get back to you with a formal scope of work, wireframe samples, and a customized final quotation.
            </p>
            <div className="space-y-4 pt-4 border-t border-zinc-900 text-xs text-zinc-400">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded bg-zinc-900 border border-zinc-800 text-amber-400 flex items-center justify-center text-[10px] font-bold">✓</div>
                <span>100% MSME government certified agency delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded bg-zinc-900 border border-zinc-800 text-amber-400 flex items-center justify-center text-[10px] font-bold">✓</div>
                <span>Full milestone-based delivery structure</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded bg-zinc-900 border border-zinc-800 text-amber-400 flex items-center justify-center text-[10px] font-bold">✓</div>
                <span>Free deployments & domain setup support included</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl border border-zinc-900 bg-zinc-950 p-6 sm:p-8">
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    placeholder="e.g. Priyanshu Sharma"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    placeholder="e.g. client@domain.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    placeholder="e.g. +91 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Service Needed</label>
                  <select
                    value={inquiryForm.serviceType}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, serviceType: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option>Web Development</option>
                    <option>Mobile App</option>
                    <option>Web + Mobile App</option>
                    <option>UI/UX Design</option>
                    <option>Other Services</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Budget Range</label>
                <select
                  value={inquiryForm.budget}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, budget: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option>₹15,000 - ₹30,000</option>
                  <option>₹30,000 - ₹50,000</option>
                  <option>₹50,000 - ₹1,00,000</option>
                  <option>₹1,00,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Project Scope & Requirements</label>
                <textarea
                  required
                  rows="4"
                  value={inquiryForm.description}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, description: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 resize-none font-sans"
                  placeholder="Describe your app/website ideas, business model, features required, etc..."
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg py-3.5 transition-colors shadow-md"
                >
                  Submit Inquiry / Book Call
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </main>
  );
}
