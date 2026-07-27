import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { ensureUserProfile } from '../lib/profileService';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const fetchProfile = useCallback(async (userId, currentUser) => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    try {
      setAuthError(null);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile(data);
      } else if (currentUser) {
        const { data: created, error: createError } = await ensureUserProfile(currentUser);
        if (createError) {
          console.warn('Profile auto-creation warning:', createError.message);
        }
        setProfile(
          created || {
            id: userId,
            full_name: currentUser.user_metadata?.full_name || currentUser.email,
            role: currentUser.user_metadata?.role || 'Student',
          }
        );
      }
    } catch (err) {
      console.error('Error fetching profile:', err.message);
      setAuthError(err.message || 'Failed to load user profile. Working in fallback mode.');
      if (currentUser) {
        setProfile({
          id: userId,
          full_name: currentUser.user_metadata?.full_name || currentUser.email,
          role: currentUser.user_metadata?.role || 'Student',
        });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const retryFetchProfile = useCallback(() => {
    if (user) {
      setLoading(true);
      fetchProfile(user.id, user);
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchProfile(currentUser.id, currentUser);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchProfile(currentUser.id, currentUser);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signUp = async (email, password, fullName, role, metadata = {}) => {
    if (!supabase) return { data: null, error: new Error('Supabase is not configured') };

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName,
          role,
          ...metadata,
        },
      },
    });

    if (!error && data.user) {
      await ensureUserProfile(data.user, role);
    }

    return { data, error };
  };

  const signIn = async (email, password) => {
    if (!supabase) return { data: null, error: new Error('Supabase is not configured') };
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signInWithGoogle = async (role = 'Student') => {
    if (!supabase) return { data: null, error: new Error('Supabase is not configured') };

    localStorage.setItem('pending_role', role);

    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
  };

  const signOut = async () => {
    if (!supabase) return { error: new Error('Supabase is not configured') };
    localStorage.removeItem('pending_role');
    return supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        authError,
        retryFetchProfile,
        isSupabaseConfigured,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
