import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../Aetherion.jpg';
import { ArrowRight, X, Sparkles, CheckCircle2, ShieldCheck, Mail, Lock, User, Phone, GraduationCap, BookOpen, Calendar, Link2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [acknowledged, setAcknowledged] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'Student',
    phone: '',
    college: '',
    course: '',
    gradYear: '',
    resumeLink: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const { user, signUp, signIn, signInWithGoogle, isSupabaseConfigured } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    if (!acknowledged) {
      setMessage({ text: 'Please acknowledge the Terms and Privacy policy to proceed.', type: 'error' });
      return;
    }
    setLoading(true);
    setMessage({ text: '', type: '' });
    try {
      const { error } = await signInWithGoogle(formData.role);
      if (error) throw error;
    } catch (err) {
      setMessage({ text: err.message || 'Something went wrong with Google Sign-In. Please try again.', type: 'error' });
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acknowledged) {
      setMessage({ text: 'Please acknowledge the Terms and Privacy policy to proceed.', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      if (isLogin) {
        // Sign In
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
        setMessage({ text: 'Logged in successfully! Redirecting...', type: 'success' });
        setTimeout(() => navigate('/'), 1500);
      } else {
        // Sign Up
        const metadata = formData.role === 'Student' ? {
          phone: formData.phone,
          college: formData.college,
          course: formData.course,
          grad_year: formData.gradYear,
          resume_link: formData.resumeLink,
        } : {};

        const { data, error } = await signUp(
          formData.email,
          formData.password,
          formData.name,
          formData.role,
          metadata
        );
        if (error) throw error;
        
        if (data?.session === null || !data?.session) {
          setMessage({
            text: 'Registration successful! Please check your email for the verification link.',
            type: 'success'
          });
        } else {
          setMessage({ text: 'Registration successful! Redirecting...', type: 'success' });
          setTimeout(() => navigate('/'), 1500);
        }
      }
    } catch (err) {
      setMessage({ text: err.message || 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#090514] text-white relative overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-10 select-none">
      
      {/* Deep Space Background Particle Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-indigo-600/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-pink-600/15 rounded-full blur-[130px] pointer-events-none" />
      
      {/* Starry Grid Mesh Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Side: Brand Symbol & Quote (Matching Image #1) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left py-6 lg:py-0"
        >
          {/* Logo Container */}
          <div className="relative mb-8 group">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-tilt"></div>
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#0d0720] border-2 border-purple-400/50 flex items-center justify-center p-2 shadow-2xl overflow-hidden">
              <img src={logo} alt="Aetherion Logo" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-300 mb-4 font-serif">
            TENDING TO INFINITY
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent rounded-full mb-6"></div>
          <p className="text-purple-200/80 text-sm sm:text-base italic font-serif max-w-md">
            "The library is unlimited and periodic."
          </p>

          <div className="mt-8 flex items-center gap-3 bg-purple-950/40 border border-purple-500/20 px-4 py-2.5 rounded-full backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
            <span className="text-xs text-purple-200 font-medium">Empowering Next-Gen Internships & Careers</span>
          </div>
        </motion.div>

        {/* Right Side: Frosted Glass Form Card (Matching Image #1) */}
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 w-full max-w-lg mx-auto"
        >
          <div className="relative rounded-3xl border border-white/20 bg-white/10 dark:bg-slate-900/50 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(124,58,237,0.25)] relative overflow-hidden">
            
            {/* Top Close Icon */}
            <Link 
              to="/" 
              aria-label="Back to home" 
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </Link>

            {/* Small Brand Icon inside Card */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 p-0.5 mb-5 shadow-lg shadow-purple-500/30 overflow-hidden">
              <img src={logo} alt="Aetherion Logo" className="w-full h-full object-cover rounded-full" />
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white mb-1 tracking-tight">
              {isLogin ? 'Welcome back' : 'Create Account'}
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/70 mb-5">
              {isLogin ? 'Sign in to continue to your dashboard.' : 'Enter your details to join Aetherion.'}
            </p>

            <div className="w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-transparent rounded-full mb-6"></div>

            {!isSupabaseConfigured && (
              <div className="p-3.5 rounded-xl text-xs bg-amber-500/20 border border-amber-500/30 text-amber-200 mb-5">
                Supabase credentials not detected in environment variables.
              </div>
            )}

            {message.text && (
              <div className={`p-3.5 rounded-xl text-xs font-medium mb-5 border flex items-center gap-2 ${
                message.type === 'success'
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-500/20 border-rose-500/40 text-rose-200'
              }`}>
                {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <ShieldCheck className="w-4 h-4 flex-shrink-0" />}
                <span>{message.text}</span>
              </div>
            )}

            {/* Role Selection Switch */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-black/30 border border-white/10 rounded-xl mb-6">
              {['Student', 'Company'].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setFormData({ ...formData, role })}
                  disabled={loading}
                  className={`py-2 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                    formData.role === role
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                      : 'text-purple-200/60 hover:text-white'
                  }`}
                >
                  For {role}s
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div>
                      <label htmlFor="fullname" className="block text-[10px] font-bold uppercase tracking-widest text-purple-200/70 mb-1.5">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-3 text-purple-300/50" />
                        <input
                          id="fullname"
                          type="text"
                          required
                          disabled={loading}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-purple-200/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                          placeholder="e.g. Suman Sen"
                        />
                      </div>
                    </div>

                    {formData.role === 'Student' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-widest text-purple-200/70 mb-1.5">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 absolute left-3.5 top-3 text-purple-300/50" />
                            <input
                              id="phone"
                              type="tel"
                              required
                              disabled={loading}
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-purple-200/40 focus:outline-none focus:border-purple-400"
                              placeholder="9876543210"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="college" className="block text-[10px] font-bold uppercase tracking-widest text-purple-200/70 mb-1.5">
                            College Name
                          </label>
                          <div className="relative">
                            <GraduationCap className="w-4 h-4 absolute left-3.5 top-3 text-purple-300/50" />
                            <input
                              id="college"
                              type="text"
                              required
                              disabled={loading}
                              value={formData.college}
                              onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                              className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-purple-200/40 focus:outline-none focus:border-purple-400"
                              placeholder="e.g. Aetherion Institute"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="course" className="block text-[10px] font-bold uppercase tracking-widest text-purple-200/70 mb-1.5">
                            Course / Branch
                          </label>
                          <div className="relative">
                            <BookOpen className="w-4 h-4 absolute left-3.5 top-3 text-purple-300/50" />
                            <input
                              id="course"
                              type="text"
                              required
                              disabled={loading}
                              value={formData.course}
                              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                              className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-purple-200/40 focus:outline-none focus:border-purple-400"
                              placeholder="B.Tech Computer Science"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="gradYear" className="block text-[10px] font-bold uppercase tracking-widest text-purple-200/70 mb-1.5">
                            Graduation Year
                          </label>
                          <div className="relative">
                            <Calendar className="w-4 h-4 absolute left-3.5 top-3 text-purple-300/50" />
                            <input
                              id="gradYear"
                              type="text"
                              required
                              disabled={loading}
                              value={formData.gradYear}
                              onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                              className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-purple-200/40 focus:outline-none focus:border-purple-400"
                              placeholder="2027"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-purple-200/70 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-purple-300/50" />
                  <input
                    id="email"
                    type="email"
                    required
                    disabled={loading}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-purple-200/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="pass" className="block text-[10px] font-bold uppercase tracking-widest text-purple-200/70 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-purple-300/50" />
                  <input
                    id="pass"
                    type="password"
                    required
                    disabled={loading}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-purple-200/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Main Submit Button (CONTINUE ->) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-white bg-purple-200/20 hover:bg-purple-200/30 active:bg-purple-300/40 border border-purple-300/30 rounded-xl py-3.5 shadow-lg shadow-purple-900/30 transition-all group disabled:opacity-50"
              >
                <span>{loading ? 'Processing...' : (isLogin ? 'Continue' : 'Create Account')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Terms Checkbox */}
              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox"
                  id="terms"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  className="w-4 h-4 rounded bg-white/10 border-white/30 text-purple-600 focus:ring-purple-500 accent-purple-600"
                />
                <label htmlFor="terms" className="text-[10px] text-purple-200/70 uppercase font-semibold">
                  I acknowledge the <Link to="/terms" className="text-white hover:underline">Terms</Link> and <Link to="/privacy" className="text-white hover:underline">Privacy</Link>.
                </label>
              </div>

              {/* OR Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-white/15"></div>
                <span className="flex-shrink mx-4 text-[10px] font-bold text-purple-200/50 uppercase tracking-widest">or</span>
                <div className="flex-grow border-t border-white/15"></div>
              </div>

              {/* Google OAuth Button */}
              <button
                type="button"
                disabled={loading}
                onClick={handleGoogleSignIn}
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl py-3.5 transition-all"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </form>

            {/* Account Switch Footer */}
            <div className="mt-6 text-center text-[11px] font-bold uppercase tracking-widest text-purple-200/70">
              {isLogin ? (
                <p>
                  Don't have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => {
                      setIsLogin(false);
                      setMessage({ text: '', type: '' });
                    }} 
                    disabled={loading}
                    className="text-white hover:text-purple-300 font-extrabold underline underline-offset-4 ml-1"
                  >
                    Sign Up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => {
                      setIsLogin(true);
                      setMessage({ text: '', type: '' });
                    }} 
                    disabled={loading}
                    className="text-white hover:text-purple-300 font-extrabold underline underline-offset-4 ml-1"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>

          </div>
        </motion.div>

      </div>
    </main>
  );
}
