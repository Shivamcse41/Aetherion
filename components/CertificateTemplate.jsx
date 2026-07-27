import React from 'react';
import certificateImg from '../Certificate.jpg';
import { Award, CheckCircle2, ShieldCheck, Download, Printer } from 'lucide-react';

export default function CertificateTemplate({ certificate, onDownload, onPrint }) {
  if (!certificate) return null;

  const certificateId = certificate.certificate_id || 'AG-2026-000001';
  const studentName = certificate.student_name || 'Student Name';
  const courseName = certificate.course_name || 'Industrial Internship Program';
  const issueDate = certificate.issue_date
    ? new Date(certificate.issue_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'July 2026';
  const verificationUrl = `${window.location.origin}/verify-certificate?id=${encodeURIComponent(certificateId)}`;

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-white print:hidden">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Credential Verified: {certificateId}</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={certificateImg}
            download={`Aetherion_Certificate_${certificateId}.jpg`}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-2 shadow cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Official JPG</span>
          </a>
          <button
            onClick={onPrint || (() => window.print())}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center gap-2 shadow cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Certificate Document */}
      <div className="bg-white text-slate-900 border-8 border-purple-900 p-8 sm:p-14 rounded-3xl shadow-2xl relative overflow-hidden text-center print:border-4 print:shadow-none print:p-8">
        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none font-serif text-[200px] font-black text-purple-900 select-none">
          ANTIGRAVITY
        </div>

        {/* Certificate Header */}
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full bg-purple-900 text-white flex items-center justify-center mx-auto mb-4 font-serif text-3xl font-black shadow-lg">
            AG
          </div>
          <span className="text-[10px] font-black tracking-widest text-purple-700 uppercase block mb-1">
            ANTIGRAVITY & AETHERION LEARNING PLATFORM
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-widest text-purple-950">
            CERTIFICATE OF COMPLETION
          </h1>
          <p className="text-xs text-purple-800 font-bold uppercase tracking-wider mt-2">
            MSME & ISO 9001:2015 RECOGNIZED INDUSTRIAL CREDENTIAL
          </p>
        </div>

        {/* Certificate Body */}
        <div className="relative space-y-4 my-10 max-w-2xl mx-auto">
          <p className="text-xs text-slate-500 font-serif italic">This is to officially certify that</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif underline decoration-purple-600 decoration-2 underline-offset-8">
            {studentName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pt-2">
            has successfully completed the intensive industrial program in <strong className="text-purple-950 font-extrabold">{courseName}</strong> with high distinction, demonstrating proficiency in practical engineering, code development, and core domain competencies.
          </p>
        </div>

        {/* Certificate Meta & Signatures */}
        <div className="relative pt-10 border-t-2 border-purple-100 grid grid-cols-1 sm:grid-cols-3 items-end justify-between text-xs text-slate-600 gap-6">
          <div className="text-left">
            <span className="block font-bold text-slate-400 text-[10px] uppercase">Issue Date</span>
            <span className="font-bold text-slate-900">{issueDate}</span>
            <span className="block font-bold text-slate-400 text-[10px] uppercase mt-2">Certificate ID</span>
            <span className="font-mono font-bold text-purple-900">{certificateId}</span>
          </div>

          <div className="text-center space-y-1">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center justify-center font-bold text-[10px] uppercase tracking-tighter">
              SEAL
            </div>
            <span className="block font-bold text-[10px] text-amber-700 uppercase tracking-widest">
              OFFICIAL SEAL
            </span>
          </div>

          <div className="text-right">
            <div className="font-serif italic font-bold text-lg text-purple-900 mb-1 border-b border-slate-300 pb-1 inline-block">
              Prince Raj
            </div>
            <span className="block font-bold text-slate-900 text-xs">Prince Raj</span>
            <span className="block text-[10px] text-slate-400 font-medium uppercase">Founder & Lead Engineer</span>
          </div>
        </div>

        {/* QR Verification Link Footer */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>Verify at: {verificationUrl}</span>
          <span>Security Token: {certificate.verification_token || 'AG-TOK-VERIFIED'}</span>
        </div>
      </div>
    </div>
  );
}
