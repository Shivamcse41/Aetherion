import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { createCertificateRecord, generateCertificateId } from '../../utils/certificateGenerator';
import { allCourses } from '../../data/coursesData';
import { UploadCloud, CheckCircle2, FileText, ArrowLeft, Download, ShieldCheck, Clock } from 'lucide-react';

export default function AdminManualCertificatePage() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [selectedStudentEmail, setSelectedStudentEmail] = useState('');
  const [selectedCourseTitle, setSelectedCourseTitle] = useState(allCourses[0].title);
  const [trainingDuration, setTrainingDuration] = useState('4 Weeks (₹999)');
  const [file, setFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    // Load student enrollments
    const localEnrollments = JSON.parse(localStorage.getItem('student_enrollments') || '[]');
    let combined = [...localEnrollments];

    if (supabase) {
      supabase.from('enrollments').select('*').then(({ data, error }) => {
        if (!error && data) {
          combined = [...data, ...localEnrollments].filter(
            (v, i, a) => a.findIndex(t => t.email === v.email) === i
          );
        }
        setStudents(combined.length > 0 ? combined : [
          { name: 'Ayush Kumar Verma', email: 'ayush@example.com' },
          { name: 'Prince Raj', email: 'prince@example.com' },
          { name: 'Dipu Sharma', email: 'dipu@example.com' }
        ]);
        if (combined.length > 0) {
          setSelectedStudentEmail(combined[0].email);
        } else {
          setSelectedStudentEmail('ayush@example.com');
        }
      });
    } else {
      setStudents(combined.length > 0 ? combined : [
        { name: 'Ayush Kumar Verma', email: 'ayush@example.com' },
        { name: 'Prince Raj', email: 'prince@example.com' },
        { name: 'Dipu Sharma', email: 'dipu@example.com' }
      ]);
      setSelectedStudentEmail(combined[0]?.email || 'ayush@example.com');
    }
  }, []);

  const handleCourseChange = (title) => {
    setSelectedCourseTitle(title);
    const foundCourse = allCourses.find(c => c.title === title);
    if (foundCourse?.duration) {
      setTrainingDuration(foundCourse.duration);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setFilePreviewUrl(url);
    }
  };

  const handleManualUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudentEmail || !selectedCourseTitle) {
      setNotice('Please select a student and course program.');
      return;
    }

    setSubmitting(true);
    setNotice('');

    try {
      const selectedStudentObj = students.find(s => s.email === selectedStudentEmail);
      const studentName = selectedStudentObj?.name || selectedStudentObj?.student_name || selectedStudentEmail.split('@')[0];
      const certId = generateCertificateId();
      let pdfStorageUrl = filePreviewUrl || '/Certificate.jpg';

      // Upload to Supabase Storage if file is attached
      if (supabase && file) {
        try {
          const filePath = `certificates/${certId}_${file.name}`;
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('certificates')
            .upload(filePath, file, { upsert: true });

          if (!uploadError && uploadData) {
            const { data: publicUrlData } = supabase.storage.from('certificates').getPublicUrl(filePath);
            if (publicUrlData?.publicUrl) {
              pdfStorageUrl = publicUrlData.publicUrl;
            }
          }
        } catch (sErr) {
          console.warn('Supabase storage upload fallback:', sErr.message);
        }
      }

      // Create Certificate Record
      const result = await createCertificateRecord({
        certificate_id: certId,
        student_name: studentName,
        student_email: selectedStudentEmail,
        course_name: selectedCourseTitle,
        training_duration: trainingDuration,
        certificate_url: pdfStorageUrl,
        status: 'approved',
      });

      if (result.success) {
        setNotice(`Manual Certificate (${certId}) for ${trainingDuration} uploaded & published to ${studentName}'s dashboard!`);
        setFile(null);
        setFilePreviewUrl(null);
        setTimeout(() => {
          navigate('/admin/certificates');
        }, 2000);
      }
    } catch (err) {
      setNotice(err?.message || 'Error processing manual PDF upload.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <Link to="/admin/certificates" className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-black font-serif uppercase tracking-wider text-white">Manual Certificate Upload</h1>
          <p className="text-xs text-slate-400">Upload custom PDF certificates directly to student dashboard accounts</p>
        </div>
      </div>

      {notice && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{notice}</span>
        </div>
      )}

      {/* Upload Form Card */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
        <form onSubmit={handleManualUploadSubmit} className="space-y-6">
          
          {/* Step 1: Select Student */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
              Step 1: Select Enrolled Student
            </label>
            <select
              value={selectedStudentEmail}
              onChange={(e) => setSelectedStudentEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              {students.map((s, idx) => (
                <option key={idx} value={s.email}>
                  {s.name || s.student_name || 'Student'} ({s.email})
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Select Course */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
              Step 2: Select Course / Internship Program
            </label>
            <select
              value={selectedCourseTitle}
              onChange={(e) => handleCourseChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              {allCourses.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Step 3: Select Training Duration */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Step 3: Select Training Duration Time</span>
            </label>
            <select
              value={trainingDuration}
              onChange={(e) => setTrainingDuration(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-500 font-bold"
            >
              <option value="2 Weeks (₹499)">2 Weeks (₹499)</option>
              <option value="4 Weeks (₹999)">4 Weeks (₹999)</option>
              <option value="8 Weeks (₹1499)">8 Weeks (₹1499)</option>
            </select>
          </div>

          {/* Step 4: Upload Certificate PDF */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
              Step 4: Upload PDF / Image File
            </label>
            <div className="border-2 border-dashed border-slate-800 hover:border-purple-500/50 rounded-2xl p-8 text-center bg-slate-950/50 transition cursor-pointer relative">
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-10 h-10 text-purple-500 mx-auto mb-2" />
              <span className="block text-xs font-bold text-slate-300">
                {file ? file.name : 'Drag & drop certificate PDF file here, or click to browse'}
              </span>
              <span className="block text-[10px] text-slate-500 mt-1">Supports PDF, PNG, JPG formats</span>
            </div>
          </div>

          {/* File Preview */}
          {filePreviewUrl && (
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
              <span className="block text-[10px] font-bold uppercase text-slate-400">File Preview Loaded</span>
              <div className="text-xs font-mono text-purple-300 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>{file?.name}</span>
              </div>
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{submitting ? 'Publishing Certificate...' : 'Save & Publish Certificate to Student Dashboard'}</span>
          </button>

        </form>
      </div>
    </div>
  );
}
