import crypto from 'crypto';

function getSigningSecret() {
  return process.env.PAYU_MERCHANT_SALT || process.env.PAYMENT_SIGNING_SECRET;
}

export function signCompletionToken(payload) {
  const secret = getSigningSecret();
  if (!secret) throw new Error('Signing secret is not configured.');

  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  return `${data}.${signature}`;
}

export function verifyCompletionToken(token) {
  const secret = getSigningSecret();
  if (!secret || !token) return null;

  const [data, signature] = token.split('.');
  if (!data || !signature) return null;

  const expected = crypto.createHmac('sha256', secret).update(data).digest('base64url');

  if (
    expected.length !== signature.length ||
    !crypto.timingSafeEqual(Buffer.from(expected, 'utf8'), Buffer.from(signature, 'utf8'))
  ) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
}
