/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        accent: {
          500: '#6366F1',
        },
        slate: {
          950: '#0F172A',
        }
      },
      borderRadius: {
        '24': '24px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(15, 23, 42, 0.05)',
        'soft-md': '0 8px 24px -6px rgba(15, 23, 42, 0.08)',
        'soft-lg': '0 16px 32px -8px rgba(124, 58, 237, 0.12)',
        'glow-purple': '0 0 25px -5px rgba(124, 58, 237, 0.4)',
      }
    },
  },
  plugins: [],
};
