import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Aetherion.jpg';
import { Linkedin, Twitter, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="Aetherion Logo" 
                className="w-9 h-9 object-cover rounded-xl shadow-md border border-purple-500/30"
              />
              <span className="font-serif font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                AETHERION
              </span>
            </Link>
            <p className="text-xs sm:text-sm max-w-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Empowering students to kickstart tech careers with industry-aligned training, internships, and skill certification programs.
            </p>
            <div className="flex gap-3 text-slate-400 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center hover:bg-purple-600 hover:text-white transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/company/techaetherion/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Aetherion LinkedIn Page"
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white tracking-widest uppercase mb-4">Platform</h3>
            <ul className="space-y-3 text-xs">
              <li><Link to="/internship" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Internships</Link></li>
              <li><Link to="/certificates" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Certificate Verification</Link></li>
              <li><Link to="/about" className="hover:text-purple-600 dark:hover:text-purple-400 transition">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white tracking-widest uppercase mb-4">Support & Legal</h3>
            <ul className="space-y-3 text-xs">
              <li><Link to="/contact" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Contact Support</Link></li>
              <li><Link to="/help" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Help Center</Link></li>
              <li><Link to="/privacy" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>&copy; {new Date().getFullYear()} Aetherion. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for passionate learners.
          </p>
        </div>
      </div>
    </footer>
  );
}
