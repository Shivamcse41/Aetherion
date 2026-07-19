import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function PaymentResultPage({ status }) {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState(
    status === 'success' ? 'Verifying your payment...' : 'Payment was not completed.'
  );
  const [verified, setVerified] = useState(status === 'failure' ? false : null);

  useEffect(() => {
    if (status !== 'success') return;

    const token = searchParams.get('token');
    const txnid = searchParams.get('txnid');

    if (!token) {
      setVerified(true);
      setMessage(
        txnid
          ? `Payment successful. Transaction ID: ${txnid}`
          : 'Payment successful. Your enrollment is confirmed.'
      );
      return;
    }

    fetch('/api/finalize-enrollment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || !data.saved) {
          throw new Error(data.error || 'Enrollment could not be finalized.');
        }
        setVerified(true);
        setMessage(
          data.txnid
            ? `Payment successful. Transaction ID: ${data.txnid}`
            : 'Payment successful. Your enrollment is confirmed.'
        );
      })
      .catch((err) => {
        setVerified(false);
        setMessage(err.message || 'Payment received but enrollment could not be saved.');
      });
  }, [status, searchParams]);

  const isSuccess = status === 'success' && verified !== false;

  return (
    <main className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div
          className={`mx-auto mb-6 h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold ${
            isSuccess
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
          }`}
        >
          {isSuccess ? '✓' : '✕'}
        </div>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          {isSuccess ? 'Payment Successful' : 'Payment Failed'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">{message}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/internship"
            className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg px-6 py-3 transition-colors shadow-md shadow-indigo-600/10 dark:shadow-none"
          >
            Back to Internships
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-slate-750 dark:text-slate-350 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 bg-white dark:bg-slate-950 rounded-lg px-6 py-3 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}
