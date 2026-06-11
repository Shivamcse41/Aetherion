import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createPaymentApiMiddleware } from './lib/payment/vitePaymentApi.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env.PAYU_MERCHANT_KEY = env.PAYU_MERCHANT_KEY;
  process.env.PAYU_MERCHANT_SALT = env.PAYU_MERCHANT_SALT;
  process.env.PAYU_MODE = env.PAYU_MODE;
  process.env.SITE_URL = env.SITE_URL;
  process.env.SUPABASE_URL = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
  process.env.SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

  return {
    plugins: [
      react(),
      {
        name: 'secure-payment-api',
        configureServer(server) {
          server.middlewares.use(createPaymentApiMiddleware());
        },
      },
    ],
    server: {
      host: '0.0.0.0',
      port: 3000,
    },
  };
});
