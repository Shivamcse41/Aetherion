import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectsPage() {
  const projects = [
    {
      title: 'E-Commerce SaaS Infrastructure',
      category: 'Web Architecture',
      difficulty: 'Intermediate',
      stack: 'React, Node.js, PostgreSQL, Stripe',
      description: 'A robust online shopping platform featuring real-time inventory management, checkout flow, and merchant control panel.'
    },
    {
      title: 'Real-time Predictive Analytics',
      category: 'Data Science',
      difficulty: 'Advanced',
      stack: 'Python, Pandas, Scikit-Learn, FastAPI',
      description: 'Machine learning model pipeline extracting user activity metrics to predict conversion trends, served through microservices.'
    },
    {
      title: 'Automated Smart Grid Controller',
      category: 'IoT / Embedded',
      difficulty: 'Expert',
      stack: 'ESP32, MQTT, C++, Node-RED',
      description: 'Distributed sensor grid controller managing power flow allocation and reporting diagnostics via secure channels.'
    }
  ];

  return (
    <main className="py-20 md:py-28 bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Capstone Portfolios</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3 mb-6 leading-tight">
            Industry Grade Projects
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed uppercase tracking-wider font-semibold">
            Explore advanced practical assignments approved by university committees and industry sponsors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {projects.map((proj, idx) => (
            <div key={idx} className="group relative rounded-xl border border-zinc-900 bg-zinc-950 p-6 sm:p-8 hover:border-zinc-800 transition-all duration-300">
              <div className="absolute top-4 right-4 text-[9px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {proj.difficulty}
              </div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{proj.category}</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-3 group-hover:text-amber-400 transition-colors">
                {proj.title}
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-6">{proj.description}</p>
              <div className="border-t border-zinc-900 pt-4 mt-auto">
                <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Technologies Used</span>
                <span className="text-xs text-zinc-300 font-mono">{proj.stack}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
