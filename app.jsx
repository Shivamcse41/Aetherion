import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const HelpPage = lazy(() => import('./pages/HelpPage'));
const InternshipPage = lazy(() => import('./pages/InternshipPage'));
const CertificatesPage = lazy(() => import('./pages/CertificatesPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const PaymentResultPage = lazy(() => import('./pages/PaymentResultPage'));
const AuthCallbackPage = lazy(() => import('./pages/AuthCallbackPage'));

// Admin & Verification Pages
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminStudentsPage = lazy(() => import('./pages/admin/AdminStudentsPage'));
const AdminStudentDetailPage = lazy(() => import('./pages/admin/AdminStudentDetailPage'));
const AdminCertificatesPage = lazy(() => import('./pages/admin/AdminCertificatesPage'));
const AdminManualCertificatePage = lazy(() => import('./pages/admin/AdminManualCertificatePage'));
const AdminEnrollmentsPage = lazy(() => import('./pages/admin/AdminEnrollmentsPage'));
const VerifyCertificatePage = lazy(() => import('./pages/VerifyCertificatePage'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 scroll-smooth flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Layout><HomePage /></Layout>} />
              <Route path="/internship" element={<Layout><InternshipPage /></Layout>} />
              <Route path="/certificates" element={<Layout><CertificatesPage /></Layout>} />
              <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
              <Route path="/about" element={<Layout><AboutPage /></Layout>} />
              <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
              <Route path="/auth/callback" element={<AuthCallbackPage />} />
              <Route path="/login" element={<Layout><LoginPage /></Layout>} />
              <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
              <Route path="/privacy" element={<Layout><PrivacyPolicyPage /></Layout>} />
              <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
              <Route path="/help" element={<Layout><HelpPage /></Layout>} />
              <Route path="/payment/success" element={<Layout><PaymentResultPage status="success" /></Layout>} />
              <Route path="/payment/failure" element={<Layout><PaymentResultPage status="failure" /></Layout>} />

              {/* Public Verification Route */}
              <Route path="/verify-certificate" element={<Layout><VerifyCertificatePage /></Layout>} />

              {/* Admin Login Route */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Admin SaaS Protected Routes wrapped in AdminLayout */}
              <Route path="/admin" element={<AdminProtectedRoute><AdminLayout><AdminDashboardPage /></AdminLayout></AdminProtectedRoute>} />
              <Route path="/admin/students" element={<AdminProtectedRoute><AdminLayout><AdminStudentsPage /></AdminLayout></AdminProtectedRoute>} />
              <Route path="/admin/students/:id" element={<AdminProtectedRoute><AdminLayout><AdminStudentDetailPage /></AdminLayout></AdminProtectedRoute>} />
              <Route path="/admin/enrollments" element={<AdminProtectedRoute><AdminLayout><AdminEnrollmentsPage /></AdminLayout></AdminProtectedRoute>} />
              <Route path="/admin/courses" element={<AdminProtectedRoute><AdminLayout><AdminEnrollmentsPage /></AdminLayout></AdminProtectedRoute>} />
              <Route path="/admin/internships" element={<AdminProtectedRoute><AdminLayout><AdminEnrollmentsPage /></AdminLayout></AdminProtectedRoute>} />
              <Route path="/admin/certificates" element={<AdminProtectedRoute><AdminLayout><AdminCertificatesPage /></AdminLayout></AdminProtectedRoute>} />
              <Route path="/admin/manual-certificate" element={<AdminProtectedRoute><AdminLayout><AdminManualCertificatePage /></AdminLayout></AdminProtectedRoute>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
