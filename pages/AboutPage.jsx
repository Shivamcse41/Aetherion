import React from 'react';
import { Linkedin, Sparkles, Target, HeartHandshake, Award } from 'lucide-react';
import { motion } from 'framer-motion';

import ayushPhoto from '../photo/Ayush.jpeg';
import deepikaPhoto from '../photo/Deepika.jpeg';
import dipuPhoto from '../photo/Dipu.jpeg';
import princePhoto from '../photo/Prince.jpeg';
import shivamPhoto from '../photo/shivam.jpg';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Dipu Sharma',
      role: 'UI/UX & Graphic Designer',
      image: dipuPhoto,
      quote: 'We believe great design creates great experiences. Our focus is to build intuitive, user-friendly, and visually engaging interfaces that make learning simple, enjoyable, and impactful for every student.',
      linkedin: 'https://www.linkedin.com/in/dipu-sharma-a9b137414?utm_source=share_via&utm_content=profile&utm_medium=member_android'
    },
    {
      name: 'Kishan Raj',
      role: 'UI/UX Developer',
      image: '/team/kishan.png',
      quote: 'Great user experiences are born at the intersection of beautiful interface design and seamless user interaction. My goal is to craft pixel-perfect, highly responsive interfaces that delight users at first glance.',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Shivam Kumar',
      role: 'Backend Developer',
      image: shivamPhoto,
      quote: "Our goal is to build a secure, scalable, and reliable platform that powers Aetherion's learning ecosystem, ensuring seamless performance and a smooth experience for every user.",
      linkedin: 'https://www.linkedin.com/in/shivamcse41/'
    },
    {
      name: 'Ayush Kumar Verma',
      role: 'Backend Developer Intern',
      image: ayushPhoto,
      quote: "As a Backend Developer Intern, I'm constantly learning and contributing to real-world projects while gaining hands-on experience in building modern web applications and improving platform functionality.",
      linkedin: 'https://www.linkedin.com/in/ayush-kumar-verma-695230424?utm_source=share_via&utm_content=profile&utm_medium=member_android'
    },
    {
      name: 'Deepika Kumari',
      role: 'Backend Support Team Member',
      image: deepikaPhoto,
      quote: 'Behind every great platform is a strong support team. We work to ensure system stability, smooth operations, and continuous improvements so our users enjoy a reliable learning experience.',
      linkedin: 'https://www.linkedin.com/in/deepika-kumari-475346380'
    }
  ];

  return (
    <main className="py-12 md:py-24 bg-gradient-to-b from-purple-50/60 via-slate-50 to-purple-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* TOP HEADER */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-wider mb-4 font-serif"
          >
            MEET THE MINDS BEHIND AETHERION
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium"
          >
            A team of educators, developers, and strategists building the future of learning.
          </motion.p>
        </div>

        {/* SECTION 1: FOUNDER AND CEO */}
        <div className="space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl font-black text-center text-purple-600 dark:text-purple-400 uppercase tracking-widest font-serif"
          >
            FOUNDER AND CEO
          </motion.h2>

          {/* Founder Card (Matching Prompt Screenshot Style) */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="max-w-4xl mx-auto rounded-[36px] bg-white dark:bg-slate-900 border border-purple-200/70 dark:border-purple-900/40 p-6 sm:p-10 shadow-[0_15px_40px_rgba(168,85,247,0.12)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
          >
            {/* Soft Ambient Light Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-purple-500/5 pointer-events-none" />

            {/* Avatar & Role Pill Badge */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-500 shadow-xl">
                <img
                  src={princePhoto}
                  alt="Prince Raj - Founder & CEO"
                  className="w-full h-full object-cover rounded-full select-none hover:scale-105 transition duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/team/prince.png';
                  }}
                />
              </div>
              <span className="-mt-4 relative z-10 px-5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg shadow-purple-600/30">
                Founder & CEO
              </span>
            </div>

            {/* Founder Content & LinkedIn */}
            <div className="flex-1 w-full flex flex-col justify-between space-y-4 text-center md:text-left">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                  Prince Raj
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  Prince plays a key leadership role in shaping the organization’s academic and strategic direction. He actively contributes to decision-making, innovation planning, and long-term vision. His guidance ensures quality, consistency, and growth across all verticals.
                </p>
              </div>

              <div className="pt-2 flex justify-center md:justify-end">
                <a
                  href="https://www.linkedin.com/company/techaetherion/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl text-[#0A66C2] hover:bg-[#0A66C2]/10 transition hover:scale-110"
                  title="Connect on LinkedIn"
                >
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.46 1.46 0 1 0 0 2.92 1.46 1.46 0 0 0 0-2.92z"/>
                  </svg>
                </a>
              </div>
            </div>

          </motion.div>
        </div>

        {/* SECTION 2: EXECUTIVE TEAM (ZIG-ZAG ALTERNATING CARDS MATCHING PROMPT IMAGES) */}
        <div className="space-y-8 pt-4">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl font-black text-center text-purple-600 dark:text-purple-400 uppercase tracking-widest font-serif mb-8"
          >
            EXECUTIVE TEAM
          </motion.h2>

          <div className="space-y-8">
            {teamMembers.map((member, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className={`max-w-4xl mx-auto rounded-[36px] bg-white dark:bg-slate-900 border border-purple-200/70 dark:border-purple-900/40 p-6 sm:p-10 shadow-[0_15px_40px_rgba(168,85,247,0.12)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-center justify-between gap-8 relative overflow-hidden`}
                >
                  {/* Soft Background Tint */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-indigo-500/5 pointer-events-none" />

                  {/* Avatar & Pill Badge Container */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-500 shadow-xl overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full select-none hover:scale-110 transition duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80';
                        }}
                      />
                    </div>

                    {/* Gradient Pill Badge Under Photo */}
                    <span className="-mt-4 relative z-10 px-5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg shadow-purple-600/30 text-center max-w-[200px]">
                      {member.role}
                    </span>
                  </div>

                  {/* Member Details & LinkedIn */}
                  <div className={`flex-1 w-full flex flex-col justify-between space-y-4 text-center ${
                    isEven ? 'md:text-left' : 'md:text-right'
                  }`}>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                        {member.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        "{member.quote}"
                      </p>
                    </div>

                    <div className={`pt-2 flex justify-center ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl text-[#0A66C2] hover:bg-[#0A66C2]/10 transition hover:scale-110"
                        title={`Connect with ${member.name} on LinkedIn`}
                      >
                        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.46 1.46 0 1 0 0 2.92 1.46 1.46 0 0 0 0-2.92z"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: VISION & MISSION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="bg-white dark:bg-slate-900 border border-purple-200/60 dark:border-slate-800 rounded-3xl p-8 shadow-soft-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Our Mission</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              To empower students with industry-focused internships, hands-on project experience, mentorship, and certifications that guarantee career readiness.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="bg-white dark:bg-slate-900 border border-purple-200/60 dark:border-slate-800 rounded-3xl p-8 shadow-soft-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Our Vision</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              To build a global ecosystem where education transcends classroom walls and every passionate learner gains real industry opportunities.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -6 }}
            className="bg-white dark:bg-slate-900 border border-purple-200/60 dark:border-slate-800 rounded-3xl p-8 shadow-soft-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Why Choose Us</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Direct mentorship, verified certificates, verified logbook approvals, and pre-placement offer opportunities with partner organizations.
            </p>
          </motion.div>
        </div>

      </div>
    </main>
  );
}
