import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { ensureUserProfile } from '../lib/profileService';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local');
      return;
    }

    let active = true;
    let unsubscribe = () => {};

    const completeSignIn = async (session) => {
      const pendingRole = localStorage.getItem('pending_role') || 'Student';
      localStorage.removeItem('pending_role');

      const { error: profileError } = await ensureUserProfile(session.user, pendingRole);
      if (profileError) {
        console.warn('Profile sync warning:', profileError.message);
      }

      if (active) {
        navigate('/', { replace: true });
      }
    };

    const handleCallback = async () => {
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      const queryParams = new URLSearchParams(window.location.search);
      const authError = hashParams.get('error_description') || queryParams.get('error_description');

      if (authError) {
        setError(decodeURIComponent(authError));
        return;
      }

      const { data, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        setError(sessionError.message);
        return;
      }

      if (data.session) {
        await completeSignIn(data.session);
        return;
      }

      const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          listener.subscription.unsubscribe();
          await completeSignIn(session);
        }
      });

      unsubscribe = () => listener.subscription.unsubscribe();
    };

    handleCallback();

    return () => {
      active = false;
      unsubscribe();
    };
  }, [navigate]);

  return (
    <main className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen flex items-center justify-center px-4 transition-colors duration-300">
      <div className="max-w-md w-full text-center space-y-4">
        {error ? (
          <>
            <p className="text-rose-600 dark:text-rose-450 text-sm font-semibold">{error}</p>
            <Link
              to="/login"
              className="inline-flex text-xs font-bold uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg px-6 py-3 shadow-md"
            >
              Back to Login
            </Link>
          </>
        ) : (
          <>
            <div className="mx-auto h-10 w-10 rounded-full border-2 border-indigo-600 dark:border-indigo-400 border-t-transparent animate-spin" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Completing sign in...</p>
          </>
        )}
      </div>
    </main>
  );
}
