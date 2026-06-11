import { handlePayuSuccess } from '../lib/payment/payuServer.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'POST') {
    return res.status(405).end('Method not allowed');
  }

  try {
    const origin = req.headers.origin || req.headers.referer?.replace(/\/api\/.*$/, '');
    const result = await handlePayuSuccess(req.body, origin);
    return res.redirect(302, result.redirect);
  } catch (err) {
    console.error('payu-success error:', err?.message || err);
    const baseUrl = process.env.SITE_URL || 'http://localhost:3000';
    return res.redirect(302, `${baseUrl}/payment/failure?reason=server_error`);
  }
}
