import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import ServicesPage from './pages/ServicesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import HelpPage from './pages/HelpPage';
import InternshipPage from './pages/InternshipPage';
import ProjectsPage from './pages/ProjectsPage';
import CertificatesPage from './pages/CertificatesPage';
import DashboardPage from './pages/DashboardPage';
import PaymentResultPage from './pages/PaymentResultPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import { AuthProvider } from './context/AuthContext';

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

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 scroll-smooth">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/course" element={<Layout><CoursePage /></Layout>} />
          <Route path="/internship" element={<Layout><InternshipPage /></Layout>} />
          <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
          <Route path="/certificates" element={<Layout><CertificatesPage /></Layout>} />
          <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
          <Route path="/privacy" element={<Layout><PrivacyPolicyPage /></Layout>} />
          <Route path="/help" element={<Layout><HelpPage /></Layout>} />
          <Route path="/payment/success" element={<Layout><PaymentResultPage status="success" /></Layout>} />
          <Route path="/payment/failure" element={<Layout><PaymentResultPage status="failure" /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

