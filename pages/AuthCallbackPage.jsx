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
    <main className="py-24 bg-zinc-950 text-zinc-100 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-4">
        {error ? (
          <>
            <p className="text-rose-400 text-sm font-semibold">{error}</p>
            <Link
              to="/login"
              className="inline-flex text-xs font-bold uppercase tracking-widest text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg px-6 py-3"
            >
              Back to Login
            </Link>
          </>
        ) : (
          <>
            <div className="mx-auto h-10 w-10 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
            <p className="text-sm text-zinc-400">Completing sign in...</p>
          </>
        )}
      </div>
    </main>
  );
}
