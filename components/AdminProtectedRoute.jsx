import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminProtectedRoute({ children }) {
  const { user, profile, loading } = useAuth();

  const isAdminSession = localStorage.getItem('admin_session') === 'true';

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isAdmin = (user && profile?.role === 'Admin') || isAdminSession;

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
