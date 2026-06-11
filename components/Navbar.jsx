import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../Aetherion.jpg';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Internship', path: '/internship' },
    { name: 'Courses', path: '/course' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Student Dashboard', path: '/dashboard' },
  ];



  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <img src={logo} alt="Aetherion Logo" className="h-9 w-auto rounded-md select-none pointer-events-none" style={{ filter: 'invert(1) hue-rotate(180deg)' }} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-6 overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-[10px] xl:text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:text-amber-400 whitespace-nowrap ${
                  isActive ? 'text-amber-400 border-b border-amber-400/40 pb-1' : 'text-zinc-300'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {user ? (
            <>
              <span className="text-xs font-semibold text-zinc-400">
                Hi, <span className="text-white font-bold">{profile?.full_name || user.email}</span>
                {profile?.role && (
                  <span className="ml-2 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-amber-400">
                    {profile.role}
                  </span>
                )}
              </span>
              <button
                onClick={signOut}
                className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[10px] xl:text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                Login/Register
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center text-[10px] xl:text-xs font-bold uppercase tracking-widest text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-md px-4 py-2 shadow-md shadow-amber-500/5 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-900 bg-zinc-950 px-4 pt-2 pb-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-xs font-semibold uppercase tracking-widest py-2 px-3 rounded-lg transition-colors ${
                    isActive ? 'bg-zinc-900 text-amber-400' : 'text-zinc-300 hover:bg-zinc-900/50'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="pt-4 border-t border-zinc-900 flex flex-col gap-3">
            {user ? (
              <>
                <div className="text-center py-2 text-xs font-semibold text-zinc-400">
                  Hi, <span className="text-white font-bold">{profile?.full_name || user.email}</span>
                  {profile?.role && (
                    <span className="ml-2 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-amber-400">
                      {profile.role}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-3 text-xs font-bold uppercase tracking-widest text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-200"
                >
                  Login/Register
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 text-xs font-bold uppercase tracking-widest text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
