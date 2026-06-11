import { supabase } from '../supabaseClient';

export async function ensureUserProfile(user, role = 'Student') {
  if (!supabase || !user?.id) return { error: new Error('Auth is not available') };

  const fullName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'User';

  const profileRole = user.user_metadata?.role || role || 'Student';

  const { data, error } = await supabase
    .from('profiles')
    .upsert(
      {
        id: user.id,
        full_name: fullName,
        email: user.email,
        role: profileRole,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    )
    .select()
    .single();

  if (error) {
    return { error };
  }

  if (profileRole !== user.user_metadata?.role) {
    await supabase.auth.updateUser({
      data: { full_name: fullName, role: profileRole },
    });
  }

  return { data, error: null };
}
