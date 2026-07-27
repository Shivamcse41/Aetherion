import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  BookOpen, 
  Award, 
  UploadCloud, 
  Sparkles, 
  CreditCard, 
  BarChart3, 
  Bell, 
  Settings, 
  UserCheck, 
  LogOut, 
  Search, 
  Sun, 
  Moon, 
  ChevronLeft, 
  Menu,
  ShieldCheck
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [globalQuery, setGlobalQuery] = useState('');
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    navigate('/admin/login');
  };

  const handleGlobalSearchSubmit = (e) => {
    e.preventDefault();
    if (globalQuery.trim()) {
      navigate(`/admin/students?search=${encodeURIComponent(globalQuery.trim())}`);
    }
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Students', path: '/admin/students', icon: Users },
    { label: 'Enrollments', path: '/admin/enrollments', icon: Briefcase },
    { label: 'Courses', path: '/admin/courses', icon: BookOpen },
    { label: 'Internships', path: '/admin/internships', icon: Sparkles },
    { label: 'Certificates', path: '/admin/certificates', icon: Award },
    { label: 'Manual Certificate Upload', path: '/admin/manual-certificate', icon: UploadCloud },
    { label: 'Certificate Generator', path: '/admin/certificates', icon: ShieldCheck },
    { label: 'Payments', path: '/admin/enrollments', icon: CreditCard },
    { label: 'Analytics', path: '/admin', icon: BarChart3 },
    { label: 'Notifications', path: '/admin', icon: Bell },
    { label: 'Settings', path: '/admin', icon: Settings },
    { label: 'Admin Profile', path: '/admin', icon: UserCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased">
      
      {/* Sidebar Overlay for Mobile */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Fixed Left Sidebar */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between ${
        collapsed ? 'w-20' : 'w-64'
      } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Sidebar Header */}
        <div>
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80">
            <Link to="/admin" className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold font-serif text-lg flex-shrink-0 shadow-lg shadow-purple-600/30">
                AG
              </div>
              {!collapsed && (
                <div className="whitespace-nowrap">
                  <h1 className="text-sm font-black tracking-wider uppercase font-serif text-white">Antigravity</h1>
                  <span className="text-[10px] font-mono text-purple-400">SaaS Admin Dashboard</span>
                </div>
              )}
            </Link>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-none">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  title={item.label}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                      : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-purple-400'}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="p-3 border-t border-slate-800/80">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>Logout Session</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        collapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        
        {/* Top Header Bar */}
        <header className="h-16 bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
          
          {/* Left Controls: Mobile Menu & Global Search */}
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Search Bar */}
            <form onSubmit={handleGlobalSearchSubmit} className="relative w-full max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Global search by Name, Email, Course, Certificate ID, Phone..."
                value={globalQuery}
                onChange={(e) => setGlobalQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition shadow-inner"
              />
            </form>
          </div>

          {/* Right Controls: Notifications, Dark Mode, Admin Profile */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => navigate('/admin/certificates')}
                className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              </button>
            </div>

            {/* Dark Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
            </button>

            {/* Admin Profile Badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                AD
              </div>
              <div className="hidden sm:block text-left">
                <span className="block text-xs font-bold text-white leading-tight">Admin Console</span>
                <span className="block text-[9px] font-mono text-purple-400 leading-tight">Superuser</span>
              </div>
            </div>

            {/* Top Bar Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition text-xs font-bold cursor-pointer ml-1"
              title="Logout Session"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Children Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
