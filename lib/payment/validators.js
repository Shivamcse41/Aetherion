const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s-]{10,15}$/;

export function sanitizeText(value, maxLength = 200) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

export function validateEnrollmentPayload(body) {
  const courseId = Number(body?.courseId);
  const duration = body?.duration ? sanitizeText(body.duration, 50) : null;
  const name = sanitizeText(body?.name, 120);
  const email = sanitizeText(body?.email, 200).toLowerCase();
  const phone = body?.phone ? body.phone.replace(/\D/g, '').slice(-10) : '';
  const college = sanitizeText(body?.college, 200);
  const courseTitle = sanitizeText(body?.courseTitle, 300);

  if (!Number.isInteger(courseId) || courseId < 0) {
    return { ok: false, error: 'Invalid course selected.' };
  }
  if (!name || name.length < 2) {
    return { ok: false, error: 'Please enter a valid full name.' };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }
  if (!/^\d{10}$/.test(phone)) {
    return { ok: false, error: 'Please enter a valid 10-digit phone number.' };
  }
  if (!college || college.length < 2) {
    return { ok: false, error: 'Please enter your college name.' };
  }
  if (!courseTitle) {
    return { ok: false, error: 'Invalid course details.' };
  }

  return {
    ok: true,
    data: { courseId, duration, name, email, phone, college, courseTitle },
  };
}
