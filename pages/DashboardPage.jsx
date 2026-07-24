import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../supabaseClient';
import { 
  ChevronLeft, 
  Moon, 
  Sun, 
  User, 
  SquarePen, 
  Camera, 
  CheckCircle2, 
  Award, 
  Briefcase, 
  FileText, 
  LayoutDashboard, 
  LogOut, 
  Download, 
  Save, 
  ShieldCheck,
  Check,
  PlusCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  const { user, profile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [myEnrollments, setMyEnrollments] = useState([]);

  // Clean initial state with no hardcoded dummy defaults
  const [studentData, setStudentData] = useState({
    name: '',
    mobile: '',
    email: '',
    college: '',
    course: '',
    enrollmentNo: ''
  });

  const [avatarUrl, setAvatarUrl] = useState(null);

  // Sync real student profile data & enrollments when auth loads
  useEffect(() => {
    const userIdKey = user?.id || 'guest';

    // 1. Check saved avatar in localStorage
    const savedAvatar = localStorage.getItem(`avatar_${userIdKey}`);
    if (savedAvatar) setAvatarUrl(savedAvatar);

    // 2. Check saved profile data in localStorage or Auth context
    const savedProfile = localStorage.getItem(`profile_data_${userIdKey}`);
    let loadedProfile = {};
    if (savedProfile) {
      try {
        loadedProfile = JSON.parse(savedProfile);
      } catch (e) {
        console.error(e);
      }
    }

    const currentEmail = user?.email || profile?.email || loadedProfile.email || '';
    const currentName = profile?.full_name || user?.user_metadata?.full_name || loadedProfile.name || (currentEmail ? currentEmail.split('@')[0] : '');
    const currentMobile = profile?.mobile || user?.user_metadata?.phone || loadedProfile.mobile || '';
    const currentCollege = profile?.college || user?.user_metadata?.college || loadedProfile.college || '';
    const currentCourse = profile?.course || user?.user_metadata?.course || loadedProfile.course || '';
    const currentEnrollNo = profile?.enrollment_no || (user?.id ? `ATH-${user.id.substring(0, 6).toUpperCase()}` : loadedProfile.enrollmentNo || '');

    setStudentData({
      name: currentName,
      email: currentEmail,
      mobile: currentMobile,
      college: currentCollege,
      course: currentCourse,
      enrollmentNo: currentEnrollNo
    });

    // 3. Load active course enrollments from localStorage & Supabase
    const savedEnrollments = JSON.parse(localStorage.getItem('student_enrollments') || '[]');
    setMyEnrollments(savedEnrollments);

    if (supabase && user?.id) {
      supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id)
        .then(({ data, error }) => {
          if (!error && data && data.length > 0) {
            const combined = [...data, ...savedEnrollments].filter(
              (v, i, a) => a.findIndex(t => t.course_title === v.course_title || t.courseTitle === v.course_title) === i
            );
            setMyEnrollments(combined);
          }
        });
    }
  }, [user, profile]);

  // Handle avatar photo upload
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setAvatarUrl(result);
        localStorage.setItem(`avatar_${user?.id || 'guest'}`, result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save student profile updates
  const handleSaveProfile = async () => {
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);

    const userIdKey = user?.id || 'guest';
    localStorage.setItem(`profile_data_${userIdKey}`, JSON.stringify(studentData));

    // Persist to Supabase if logged in
    if (supabase && user?.id) {
      try {
        await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            full_name: studentData.name,
            email: studentData.email,
            college: studentData.college,
            mobile: studentData.mobile,
            course: studentData.course,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'id' });
      } catch (err) {
        console.error('Supabase profile update warning:', err.message);
      }
    }
  };

  const displayName = studentData.name || user?.email?.split('@')[0] || 'Student';
  const firstName = displayName.split(' ')[0] || 'Student';

  return (
    <main className="py-6 sm:py-10 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl px-5 py-3.5 shadow-sm flex items-center justify-between gap-4">
          
          {/* Left Back Button */}
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-1 text-slate-900 dark:text-white font-extrabold text-sm hover:text-purple-600 dark:hover:text-purple-400 transition cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            <span>Back to Home</span>
          </button>

          {/* Center Page Title */}
          <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-serif tracking-tight">
            My Student Profile
          </h1>

          {/* Right User Info & Actions */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              Hi, {firstName}
            </span>

            {/* Dark/Light Mode Switcher Badge Icon */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800/60 text-purple-600 dark:text-purple-300 flex items-center justify-center hover:scale-105 transition shadow-sm cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-purple-600" />
              )}
            </button>

            {/* Profile Avatar Badge Icon */}
            <button 
              onClick={() => setActiveTab('profile')}
              aria-label="Open profile tab"
              className="w-9 h-9 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 overflow-hidden hover:border-purple-500 transition cursor-pointer"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'profile', label: 'My Profile', icon: User },
            { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'internships', label: 'Enrolled Courses & Internships', icon: Briefcase },
            { id: 'certificates', label: 'Certificates', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Save Success Alert Notification */}
        {saveSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Profile details updated successfully!</span>
            </div>
            <button onClick={() => setSaveSuccess(false)} className="hover:underline">Dismiss</button>
          </motion.div>
        )}

        {/* TAB 1: MY PROFILE */}
        {activeTab === 'profile' && (
          <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-soft-lg">
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                
                {/* Left Profile Picture Circle with Camera Badge */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="relative group">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-md overflow-hidden flex items-center justify-center">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Profile Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-16 h-16 text-slate-400 dark:text-slate-500" />
                      )}
                    </div>

                    {/* Camera Upload Badge Button */}
                    <label 
                      htmlFor="camera-badge-upload" 
                      className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-md flex items-center justify-center cursor-pointer hover:bg-purple-50 dark:hover:bg-slate-700 transition"
                      title="Upload profile photo"
                    >
                      <Camera className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                      <input 
                        id="camera-badge-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleAvatarChange} 
                      />
                    </label>
                  </div>
                </div>

                {/* Right Profile Details Form Card */}
                <div className="flex-1 w-full space-y-6">
                  
                  {/* Top Card Header: Profile Detail + Edit Button */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Profile Detail
                    </h2>

                    <button
                      onClick={() => {
                        if (isEditing) handleSaveProfile();
                        else setIsEditing(true);
                      }}
                      className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-purple-600 dark:hover:text-purple-400 transition bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                    >
                      <span>{isEditing ? 'Save' : 'Edit'}</span>
                      {isEditing ? (
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <SquarePen className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                      )}
                    </button>
                  </div>

                  {/* Section 1: Personal Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 whitespace-nowrap">
                        Personal Details
                      </span>
                      <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700" />
                    </div>

                    {/* Name Input Field */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-3 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                        Name
                      </label>
                      <div className="sm:col-span-9">
                        <input
                          type="text"
                          disabled={!isEditing}
                          value={studentData.name}
                          onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                          placeholder="Enter your full name"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-xs sm:text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-90 disabled:bg-slate-100/60 dark:disabled:bg-slate-800/40 focus:outline-none focus:border-purple-600 focus:bg-white dark:focus:bg-slate-900 transition"
                        />
                      </div>
                    </div>

                    {/* Mobile No Input Field */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-3 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                        Mobile No.
                      </label>
                      <div className="sm:col-span-9">
                        <input
                          type="text"
                          disabled={!isEditing}
                          value={studentData.mobile}
                          onChange={(e) => setStudentData({ ...studentData, mobile: e.target.value })}
                          placeholder="Enter mobile number"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-xs sm:text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-90 disabled:bg-slate-100/60 dark:disabled:bg-slate-800/40 focus:outline-none focus:border-purple-600 focus:bg-white dark:focus:bg-slate-900 transition"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-3 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                        Email
                      </label>
                      <div className="sm:col-span-9">
                        <input
                          type="email"
                          disabled={!isEditing}
                          value={studentData.email}
                          onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                          placeholder="Enter email address"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 placeholder-slate-400 disabled:opacity-90 disabled:bg-slate-100/60 dark:disabled:bg-slate-800/40 focus:outline-none focus:border-purple-600 focus:bg-white dark:focus:bg-slate-900 transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Academic Details (Clean empty fields for student to fill) */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 whitespace-nowrap">
                        Academic Details
                      </span>
                      <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700" />
                    </div>

                    {/* College Name Input Field */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-3 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                        College Name
                      </label>
                      <div className="sm:col-span-9">
                        <input
                          type="text"
                          disabled={!isEditing}
                          value={studentData.college}
                          onChange={(e) => setStudentData({ ...studentData, college: e.target.value })}
                          placeholder="Enter your college name"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-xs sm:text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-90 disabled:bg-slate-100/60 dark:disabled:bg-slate-800/40 focus:outline-none focus:border-purple-600 focus:bg-white dark:focus:bg-slate-900 transition"
                        />
                      </div>
                    </div>

                    {/* Course / Branch Input Field */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-3 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                        Course / Branch
                      </label>
                      <div className="sm:col-span-9">
                        <input
                          type="text"
                          disabled={!isEditing}
                          value={studentData.course}
                          onChange={(e) => setStudentData({ ...studentData, course: e.target.value })}
                          placeholder="Enter your course e.g. B.Tech Computer Science & AI"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-xs sm:text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-90 disabled:bg-slate-100/60 dark:disabled:bg-slate-800/40 focus:outline-none focus:border-purple-600 focus:bg-white dark:focus:bg-slate-900 transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Action Button when editing */}
                  {isEditing ? (
                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition flex items-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Profile Changes</span>
                      </button>
                    </div>
                  ) : (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-bold"
                      >
                        Click "Edit" to fill or update your profile details
                      </button>
                    </div>
                  )}

                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Student Enrollment ID
                </span>
                <span className="text-xs font-bold font-mono text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md">
                  {studentData.enrollmentNo || 'Pending Enrollment'}
                </span>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Enrolled Programs
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {myEnrollments.length} Active {myEnrollments.length === 1 ? 'Program' : 'Programs'}
                </span>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Status
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Active Account
                </span>
              </div>
            </div>

            {/* Active Enrolled Course Banner or Empty State */}
            {myEnrollments.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Active Program</h2>
                {myEnrollments.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                        {item.college || studentData.college || 'Aetherion Learning'}
                      </span>
                      <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md">
                        Enrolled & Paid
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
                      {item.courseTitle || item.course_title}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Duration</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.duration || 'Flexible'}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Fee Paid</span>
                        <span className="text-xs font-bold font-mono text-purple-600 dark:text-purple-400">₹{item.amount || '499'}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Credits Status</span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> University Compliant
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 text-center shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  No Active Program Enrolled Yet
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  Browse our available industrial internship tracks and enroll with instant payment to get started!
                </p>
                <Link
                  to="/internship"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Browse Internships & Enroll Now</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ENROLLED COURSES & INTERNSHIPS */}
        {activeTab === 'internships' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">My Enrolled Courses & Internships</h2>
              <Link to="/internship" className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1">
                <span>+ Enroll in New Course</span>
              </Link>
            </div>

            {myEnrollments.length > 0 ? (
              <div className="space-y-4">
                {myEnrollments.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {item.courseTitle || item.course_title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {item.college || studentData.college || 'Aetherion Institute'} • Duration: {item.duration || 'Selected Duration'}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                        ₹{item.amount || 499}
                      </span>
                      <span className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        Enrolled & Paid
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-sm space-y-4">
                <p className="text-xs text-slate-500">You haven't enrolled in any internship program yet.</p>
                <Link
                  to="/internship"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-md"
                >
                  Browse Available Programs
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Earned Certifications</h2>
            {myEnrollments.length > 0 ? (
              <div className="space-y-4">
                {myEnrollments.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          Certificate of Industrial Internship - {item.courseTitle || item.course_title}
                        </h3>
                        <p className="text-xs text-slate-500">Issued by Aetherion • Verified Credential ID: {studentData.enrollmentNo}</p>
                      </div>
                    </div>
                    <Link
                      to="/certificates"
                      className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-purple-700 transition flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>View Certificate</span>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-sm">
                <p className="text-xs text-slate-500">Certificates will be issued upon completing your enrolled programs.</p>
              </div>
            )}
          </div>
        )}

        {/* Sign Out Action at Bottom */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={() => { signOut(); navigate('/'); }}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-rose-500 hover:text-white transition flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </div>
    </main>
  );
}
