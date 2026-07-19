import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function AboutPage() {
  const { theme } = useTheme();

  return (
    <main className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Founder Section */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-8 sm:p-12 mb-24 shadow-xl shadow-slate-100/40 dark:shadow-none transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent pointer-events-none"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="relative w-full max-w-sm rounded-2xl border-2 border-indigo-500/20 bg-slate-50 dark:bg-slate-950 overflow-hidden shadow-2xl group hover:border-indigo-500/40 transition-all duration-300">
                <img 
                  src="/team/prince.png" 
                  alt="Prince Raj - Founder & CEO" 
                  className="w-full h-auto object-cover aspect-[4/5] select-none pointer-events-none group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900 via-slate-900/75 to-transparent p-6 text-white">
                  <h3 className="text-lg font-black tracking-wide">Prince Raj</h3>
                  <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mt-1">Founder & CEO</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">Founder's Message</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                Our Vision for Practical Learning
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                <p>
                  Hello, I'm <strong className="text-slate-900 dark:text-white font-bold">Prince Raj</strong>, the Founder & CEO of Aetherion.
                </p>
                <p>
                  When I started Aetherion, I had one simple vision: to bridge the gap between education and real-world careers. I noticed that many students graduate with knowledge but lack the practical skills, industry exposure, and confidence needed to succeed in today's competitive job market.
                </p>
                <p>
                  That's why we created <strong className="text-indigo-650 dark:text-indigo-400 font-bold">Aetherion</strong>—a platform where learning goes beyond classrooms. Our mission is to empower students through industry-focused internships, professional courses, live projects, mentorship, certifications, and career development services that prepare them for real opportunities.
                </p>
                <p>
                  At Aetherion, we believe that every student deserves access to practical learning, regardless of their background. Our goal is to help learners build valuable skills, gain real experience, create strong portfolios, and become industry-ready professionals.
                </p>
                <p>
                  We are committed to creating an ecosystem where students don't just earn certificates—they gain the confidence, experience, and knowledge to build successful careers.
                </p>
                <p>
                  This is only the beginning of our journey. Together, we aim to shape the future of education by making learning practical, accessible, and career-focused.
                </p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  Thank you for being a part of Aetherion.
                </p>
                <p className="font-bold text-indigo-600 dark:text-indigo-400 text-sm tracking-wider uppercase mt-4">
                  Let's Learn. Build. Grow.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">The Creators</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 mb-4">Meet Our Team</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
              The talented minds driving technical excellence, user experience, and platform support at Aetherion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Dipu Sharma',
                role: 'UI/UX & Graphic Designer',
                image: '/team/dipu.png',
                quote: 'We believe great design creates great experiences. Our focus is to build intuitive, user-friendly, and visually engaging interfaces that make learning simple, enjoyable, and impactful for every student.',
                color: 'from-pink-500/10 to-transparent'
              },
              {
                name: 'Shivam Kumar',
                role: 'Backend Developer',
                image: '/team/shivam.png',
                quote: "Our goal is to build a secure, scalable, and reliable platform that powers Aetherion's learning ecosystem, ensuring seamless performance and a smooth experience for every user.",
                color: 'from-blue-500/10 to-transparent'
              },
              {
                name: 'Ayush Kumar Verma',
                role: 'Backend Developer Intern',
                image: '/team/ayush.png',
                quote: "As a Backend Developer Intern, I'm constantly learning and contributing to real-world projects while gaining hands-on experience in building modern web applications and improving platform functionality.",
                color: 'from-teal-500/10 to-transparent'
              },
              {
                name: 'Deepika Kumari',
                role: 'Backend Support Team Member',
                image: '/team/deepika.png',
                quote: 'Behind every great platform is a strong support team. We work to ensure system stability, smooth operations, and continuous improvements so our users enjoy a reliable learning experience.',
                color: 'from-indigo-500/10 to-transparent'
              }
            ].map((member, idx) => (
              <div 
                key={idx}
                className="group relative rounded-xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-5 flex flex-col justify-between hover:border-indigo-500/30 dark:hover:border-indigo-500/30 hover:shadow-lg dark:hover:bg-slate-900/60 transition-all duration-300 shadow-md shadow-slate-100/40 dark:shadow-none hover:scale-[1.01]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-20 pointer-events-none rounded-xl`}></div>
                <div className="relative space-y-4">
                  <div className="flex justify-center">
                    <div className="relative h-28 w-28 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 overflow-hidden shadow-md">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="h-full w-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1">{member.role}</p>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs italic text-center leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-850">
                    "{member.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Aetherion Section */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-8 sm:p-12 mb-24 shadow-xl shadow-slate-100/40 dark:shadow-none transition-colors duration-300">
          <div className="absolute top-0 left-0 h-40 w-40 bg-indigo-500/5 rounded-full blur-3xl"></div>
          <div className="relative max-w-3xl mx-auto text-center space-y-6">
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">About Aetherion</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-3 mb-6 leading-tight">
                Empowering the Next Generation Through Practical Learning
              </h2>
            </div>
            
            <div className="space-y-4 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200">
                At Aetherion, we believe education should do more than award a certificate—it should prepare students for real careers, real challenges, and real opportunities.
              </p>
              <p>
                We are a career-focused EdTech platform dedicated to helping students bridge the gap between academic knowledge and industry expectations. Through internships, professional courses, live projects, mentorship, and career development services, we enable learners to build practical skills that employers truly value.
              </p>
              <p>
                Our goal is simple: to help every student become confident, skilled, and career-ready.
              </p>
              <p className="font-black text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm tracking-widest uppercase pt-2">
                Learn. Build. Grow.
              </p>
            </div>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {/* Vision Card */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-8 sm:p-10 shadow-xl shadow-slate-100/40 dark:shadow-none transition-colors duration-300 flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/[0.02] to-transparent pointer-events-none"></div>
            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                🌍 Our Vision
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                Empowering the Next Generation of Professionals
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  To become India's most trusted career-focused EdTech platform, empowering students with practical skills, industry experience, and innovative learning opportunities that prepare them for the future of work.
                </p>
                <p>
                  We envision a world where every student has equal access to quality education, real-world internships, expert mentorship, and career guidance—helping them transform their potential into meaningful success.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-8 sm:p-10 shadow-xl shadow-slate-100/40 dark:shadow-none transition-colors duration-300 flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/[0.02] to-transparent pointer-events-none"></div>
            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-[10px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
                🎯 Our Mission
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                Bridging Education & Employment
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-450 text-xs sm:text-sm leading-relaxed">
                <p>
                  At Aetherion, our mission is to bridge the gap between education and employment by providing:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { text: 'Industry-focused Courses', icon: '🎓' },
                    { text: 'Hands-on Internship Programs', icon: '💼' },
                    { text: 'Real-World Projects', icon: '📂' },
                    { text: 'Expert Mentorship', icon: '👨‍🏫' },
                    { text: 'Verified Certifications', icon: '📜' },
                    { text: 'Career Development & Placement', icon: '🚀' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-850/50">
                      <span className="text-sm shrink-0">{item.icon}</span>
                      <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-350 leading-tight">{item.text}</span>
                    </div>
                  ))}
                </div>
                <p className="pt-2 text-slate-600 dark:text-slate-400">
                  We are committed to helping students learn practical skills, build confidence, gain industry experience, and become career-ready professionals through accessible, high-quality, and innovation-driven education.
                </p>
                <p className="font-black text-indigo-600 dark:text-indigo-400 text-xs tracking-widest uppercase pt-2">
                  Learn. Build. Grow.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">Our Mission</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-3 mb-6 leading-tight animate-in fade-in duration-500">
            Bridging College Education & Core Industries
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed uppercase tracking-wider font-semibold">
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
              className="group relative rounded-xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-6 sm:p-8 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300 shadow-md shadow-slate-100/40 dark:shadow-none hover:scale-[1.01]"
            >
              <div className="absolute top-4 right-4 text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                {item.badge}
              </div>
              <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-100 font-bold flex items-center justify-center text-sm mb-6 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-655 dark:text-slate-450 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Government MSME Certification Section */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-8 sm:p-12 mb-24 shadow-xl shadow-slate-100/40 dark:shadow-none transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent pointer-events-none"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                🇮🇳 Government of India Recognized
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                MSME Registered Enterprise
              </h2>
              <p className="text-slate-655 dark:text-slate-450 text-xs sm:text-sm leading-relaxed">
                Aetherion is officially registered under the <strong>Ministry of Micro, Small & Medium Enterprises (MSME), Government of India</strong>. This registration confirms our alignment with national vocational standards, enabling us to deliver compliant internship training, verification logs, and certifications valid across India.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="border border-slate-100 dark:border-slate-855 bg-slate-50/50 dark:bg-slate-955/60 p-4 rounded-xl">
                  <span className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Udyam Registration No.</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200 font-mono tracking-wide">UDYAM-BR-22-0027265</span>
                </div>
                <div className="border border-slate-100 dark:border-slate-855 bg-slate-50/50 dark:bg-slate-955/60 p-4 rounded-xl">
                  <span className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Enterprise Type</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Micro (Services Sector)</span>
                </div>
                <div className="border border-slate-100 dark:border-slate-855 bg-slate-50/50 dark:bg-slate-955/60 p-4 rounded-xl">
                  <span className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Major Activity</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Other Educational Services (NIC 85499)</span>
                </div>
                <div className="border border-slate-100 dark:border-slate-855 bg-slate-50/50 dark:bg-slate-955/60 p-4 rounded-xl">
                  <span className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Official Registration Address</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Purabsarai, Munger, Bihar, India</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center w-full">
              {/* Premium Certificate Representation */}
              <div className="relative w-full max-w-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-6 flex flex-col justify-between shadow-2xl overflow-hidden group hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 h-24 w-24 bg-indigo-500/5 rounded-full blur-2xl"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-700 dark:text-zinc-400 uppercase tracking-widest">Udyam Registration</h4>
                    <p className="text-[9px] text-slate-400 dark:text-zinc-600 mt-0.5">Ministry of MSME, Govt. of India</p>
                  </div>
                  <span className="text-xl">🇮🇳</span>
                </div>
                <div className="my-8">
                  <p className="text-[10px] text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-wider text-center mb-1.5">Registration Number</p>
                  <p className="text-base sm:text-lg font-black text-slate-800 dark:text-white tracking-widest font-mono text-center bg-slate-100/80 dark:bg-zinc-950/80 py-2.5 rounded-lg border border-slate-200 dark:border-slate-900">
                    UDYAM-BR-22-0027265
                  </p>
                  <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest text-center mt-3">AETHERION REGISTERED</p>
                </div>
                <div className="flex justify-between items-center text-[9px] text-slate-400 dark:text-zinc-500 border-t border-slate-200 dark:border-zinc-900/80 pt-4">
                  <span>Classification: Micro</span>
                  <span>Date: 02/06/2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Partners / Stats */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/40 p-8 sm:p-12 text-center shadow-xl shadow-slate-100/40 dark:shadow-none transition-colors duration-300">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent pointer-events-none"></div>
          <div className="relative max-w-2xl mx-auto space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider">College Placement Collaborations</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              We partner directly with academic coordinators and Training & Placement Officers (TPOs) to automate the internship validation process. We facilitate bulk allocation pipelines and generate standard reports to save administration time.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg px-6 py-3 transition-colors shadow-md shadow-indigo-500/10 dark:shadow-none"
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
