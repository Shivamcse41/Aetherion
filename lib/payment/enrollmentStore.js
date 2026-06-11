export async function savePaidEnrollment(enrollment) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return { saved: false, reason: 'server_db_not_configured' };
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/enrollments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        course_id: enrollment.course_id,
        course_title: enrollment.course_title,
        name: enrollment.name,
        email: enrollment.email,
        phone: enrollment.phone,
        college: enrollment.college,
        price: enrollment.price,
        payment_status: enrollment.payment_status,
        payu_txnid: enrollment.payu_txnid,
        payu_mihpayid: enrollment.payu_mihpayid,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Supabase enrollment save failed:', errorText);
      return { saved: false, reason: 'db_error' };
    }

    return { saved: true };
  } catch (err) {
    console.error('Enrollment store error:', err?.message || err);
    return { saved: false, reason: 'network_error' };
  }
}
