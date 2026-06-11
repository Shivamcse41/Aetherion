import { createPayuPayment } from '../lib/payment/payuServer.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const origin = req.headers.origin || req.headers.referer?.replace(/\/[^/]*$/, '');
    const result = await createPayuPayment(req.body, origin);
    return res.status(result.status).json(result.body);
  } catch (err) {
    console.error('create-payment error:', err?.message || err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
