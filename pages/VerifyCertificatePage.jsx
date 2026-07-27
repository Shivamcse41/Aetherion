import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCertificateByIdOrToken } from '../utils/certificateGenerator';
import CertificateTemplate from '../components/CertificateTemplate';
import { Search, ShieldCheck, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VerifyCertificatePage() {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || searchParams.get('token') || '';

  const [inputQuery, setInputQuery] = useState(initialId);
  const [certificateRecord, setCertificateRecord] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialId) {
      performVerification(initialId);
    }
  }, [initialId]);

  const performVerification = async (queryStr) => {
    setLoading(true);
    setSearched(true);
    setCertificateRecord(null);

    const match = await getCertificateByIdOrToken(queryStr);
    setCertificateRecord(match);
    setLoading(false);
  };

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      performVerification(inputQuery.trim());
    }
  };

  return (
    <main className="py-12 md:py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3.5 py-1 rounded-full border border-purple-500/20">
            Antigravity & Aetherion Credential Verification
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 dark:text-white">
            Verify Certificate Credentials
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto">
            Official MSME & ISO 9001:2015 public validation engine. Enter your unique Certificate Serial ID or scan the QR code to verify credential authenticity.
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-soft-md max-w-xl mx-auto">
          <form onSubmit={handleVerifySubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Enter Certificate Serial ID / Verification Token
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-4 top-3.5 text-purple-500" />
                <input
                  type="text"
                  required
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="e.g. AG-2026-884901 or ATH-2026-8849"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs font-mono uppercase text-slate-900 dark:text-white focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Verifying Credentials...' : 'Verify Credential Authenticity'}</span>
              <ShieldCheck className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-4 text-center text-[10px] font-mono text-slate-400">
            Sample test ID: <span className="text-purple-500 font-bold cursor-pointer" onClick={() => { setInputQuery('AG-2026-884901'); performVerification('AG-2026-884901'); }}>AG-2026-884901</span>
          </div>
        </div>

        {/* Verification Result Display */}
        {searched && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {certificateRecord ? (
              <div className="space-y-6">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>VALID & AUTHENTICATED CERTIFICATE ({certificateRecord.certificate_id})</span>
                  </div>
                </div>

                <CertificateTemplate certificate={certificateRecord} />
              </div>
            ) : (
              <div className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-3xl text-center text-rose-600 dark:text-rose-400 space-y-2 max-w-xl mx-auto">
                <XCircle className="w-8 h-8 mx-auto" />
                <h3 className="text-base font-bold">Invalid or Unverified Certificate ID</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No official record found matching ID "{inputQuery}". Please check the serial code on your certificate or contact administrator support.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
