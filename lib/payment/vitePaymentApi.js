import {
  createPayuPayment,
  handlePayuSuccess,
  handlePayuFailure,
  finalizeEnrollment,
} from './payuServer.js';

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1e6) {
        reject(new Error('Request body too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      const contentType = req.headers['content-type'] || '';

      if (!data) {
        resolve({});
        return;
      }

      if (contentType.includes('application/json')) {
        try {
          resolve(JSON.parse(data));
        } catch {
          reject(new Error('Invalid JSON body'));
        }
        return;
      }

      if (contentType.includes('application/x-www-form-urlencoded')) {
        resolve(Object.fromEntries(new URLSearchParams(data)));
        return;
      }

      try {
        resolve(JSON.parse(data));
      } catch {
        resolve(Object.fromEntries(new URLSearchParams(data)));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(body));
}

function sendRedirect(res, location) {
  res.statusCode = 302;
  res.setHeader('Location', location);
  res.setHeader('Cache-Control', 'no-store');
  res.end();
}

export function createPaymentApiMiddleware() {
  return async (req, res, next) => {
    const url = req.url?.split('?')[0];
    if (!url?.startsWith('/api/')) return next();

    const origin = req.headers.origin || `http://${req.headers.host}`;

    try {
      const body = await readBody(req);

      if (url === '/api/create-payment' && req.method === 'POST') {
        const result = await createPayuPayment(body, origin);
        return sendJson(res, result.status, result.body);
      }

      if (url === '/api/payu-success' && req.method === 'POST') {
        const result = await handlePayuSuccess(body, origin);
        return sendRedirect(res, result.redirect);
      }

      if (url === '/api/payu-failure' && req.method === 'POST') {
        const result = handlePayuFailure(body, origin);
        return sendRedirect(res, result.redirect);
      }

      if (url === '/api/finalize-enrollment' && req.method === 'POST') {
        const result = await finalizeEnrollment(body?.token);
        return sendJson(res, result.status, result.body);
      }

      return next();
    } catch (err) {
      console.error('Payment API middleware error:', err?.message || err);
      return sendJson(res, 500, { error: 'Internal server error' });
    }
  };
}
