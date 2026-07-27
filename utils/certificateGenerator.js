import { supabase } from '../supabaseClient';

export function generateCertificateId() {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `AG-${year}-${randomNum}`;
}

export function generateVerificationToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = 'AG-TOK-';
  for (let i = 0; i < 12; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export async function createCertificateRecord(certificatePayload) {
  const certificateId = certificatePayload.certificate_id || generateCertificateId();
  const verificationToken = certificatePayload.verification_token || generateVerificationToken();

  const record = {
    certificate_id: certificateId,
    student_id: certificatePayload.student_id || null,
    enrollment_id: certificatePayload.enrollment_id || null,
    course_id: certificatePayload.course_id || 1,
    student_name: certificatePayload.student_name,
    student_email: certificatePayload.student_email,
    course_name: certificatePayload.course_name,
    training_duration: certificatePayload.training_duration || certificatePayload.duration || '8 Weeks',
    issue_date: certificatePayload.issue_date || new Date().toISOString(),
    completion_date: certificatePayload.completion_date || new Date().toISOString(),
    certificate_url: certificatePayload.certificate_url || '/Certificate.jpg',
    verification_token: verificationToken,
    status: certificatePayload.status || 'approved',
    created_at: new Date().toISOString(),
  };

  // 1. Persist to LocalStorage Store
  const existingLocal = JSON.parse(localStorage.getItem('generated_certificates') || '[]');
  const updatedLocal = [record, ...existingLocal.filter(c => c.certificate_id !== certificateId)];
  localStorage.setItem('generated_certificates', JSON.stringify(updatedLocal));

  // 2. Persist to Supabase if available
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .insert([record])
        .select()
        .single();

      if (!error && data) {
        return { success: true, certificate: data };
      }
    } catch (err) {
      console.warn('Supabase certificate insert warning:', err.message);
    }
  }

  return { success: true, certificate: record };
}

export async function getCertificateByIdOrToken(queryId) {
  if (!queryId) return null;
  const cleanQuery = String(queryId).trim().toUpperCase();

  // Check local store first
  const existingLocal = JSON.parse(localStorage.getItem('generated_certificates') || '[]');
  const localMatch = existingLocal.find(
    c => c.certificate_id.toUpperCase() === cleanQuery || c.verification_token.toUpperCase() === cleanQuery
  );

  if (localMatch) return localMatch;

  // Query Supabase
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .or(`certificate_id.eq.${cleanQuery},verification_token.eq.${cleanQuery}`)
        .maybeSingle();

      if (!error && data) return data;
    } catch (err) {
      console.error('Error querying certificate from Supabase:', err);
    }
  }

  return null;
}

export async function getAllCertificates() {
  const localCerts = JSON.parse(localStorage.getItem('generated_certificates') || '[]');

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const merged = [...data, ...localCerts].filter(
          (v, i, a) => a.findIndex(t => t.certificate_id === v.certificate_id) === i
        );
        return merged;
      }
    } catch (err) {
      console.warn('Supabase fetch certificates fallback:', err.message);
    }
  }

  return localCerts;
}
