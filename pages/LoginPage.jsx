import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '', role: 'Student' });
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
        const { data, error } = await signUp(
          formData.email,
          formData.password,
          formData.name,
          formData.role
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
    <main className="py-20 md:py-28 bg-zinc-950 text-zinc-100 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 p-6 sm:p-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-transparent pointer-events-none"></div>

          {/* Heading */}
          <div className="relative text-center mb-8">
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-2">
              {isLogin ? 'Aetherion Login' : 'Register Profile'}
            </h1>
            <p className="text-xs text-zinc-400">
              {isLogin ? "Sign in to track your applications and training courses" : "Register to start applying for internships"}
            </p>
          </div>

          {!isSupabaseConfigured && (
            <div className="p-4 rounded-xl text-xs font-semibold mb-6 border bg-amber-500/10 border-amber-500/20 text-amber-300">
              Supabase is not connected. Add <code className="text-amber-200">VITE_SUPABASE_URL</code> and{' '}
              <code className="text-amber-200">VITE_SUPABASE_ANON_KEY</code> in <code className="text-amber-200">.env.local</code>, then restart the dev server.
            </div>
          )}

          {/* Alerts / Messages */}
          {message.text && (
            <div className={`p-4 rounded-xl text-xs font-semibold mb-6 border ${
              message.type === 'success' 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
            }`}>
              {message.text}
            </div>
          )}

          {/* Role Toggle */}
          <div className="relative grid grid-cols-2 gap-2 p-1.5 bg-zinc-900 border border-zinc-800 rounded-xl mb-6">
            {['Student', 'Company'].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setFormData({ ...formData, role })}
                disabled={loading}
                className={`py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors ${
                  formData.role === role
                    ? 'bg-amber-400 text-zinc-950'
                    : 'text-zinc-400 hover:text-zinc-200'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                For {role}s
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative space-y-5">
            {!isLogin && (
              <div>
                <label htmlFor="fullname" className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
                  Full Name
                </label>
                <input
                  id="fullname"
                  type="text"
                  required
                  disabled={loading}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
                  placeholder="e.g. Suman Sen"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                disabled={loading}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
                placeholder="student@domain.com"
              />
            </div>

            <div>
              <label htmlFor="pass" className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
                Password
              </label>
              <input
                id="pass"
                type="password"
                required
                disabled={loading}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg py-3 shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-zinc-900"></div>
              <span className="flex-shrink mx-3 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">or</span>
              <div className="flex-grow border-t border-zinc-900"></div>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={handleGoogleSignIn}
              className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-200 bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800/80 rounded-lg py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="h-4 w-4 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign In with Google
            </button>
          </form>

          {/* Toggle Screen */}
          <div className="relative mt-6 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <button 
                  onClick={() => {
                    setIsLogin(false);
                    setMessage({ text: '', type: '' });
                  }} 
                  disabled={loading}
                  className="text-amber-500 hover:underline disabled:opacity-50"
                >
                  Register now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button 
                  onClick={() => {
                    setIsLogin(true);
                    setMessage({ text: '', type: '' });
                  }} 
                  disabled={loading}
                  className="text-amber-500 hover:underline disabled:opacity-50"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
