import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '../components/ui/Navbar';
import { FixedFooter } from '../components/ui/FixedFooter';
import { HomePage } from '../views/public/HomePage';
import { BookingPage } from '../views/public/BookingPage';
import { ContactPage } from '../views/public/ContactPage';
import { TermsPage } from '../views/public/TermsPage';
import { TermsOfUsePage } from '../views/public/TermsOfUsePage';
import { PrivacyPolicyPage } from '../views/public/PrivacyPolicyPage';
import { CancellationPolicyPage } from '../views/public/CancellationPolicyPage';
import { TestimonialsPage } from '../views/public/TestimonialsPage';
import { ClientPortalPage } from '../views/public/ClientPortalPage';
import { ConfirmPage } from '../views/public/ConfirmPage';
import { AdminLoginPage } from '../views/admin/AdminLoginPage';
import { AdminDashboardPage } from '../views/admin/AdminDashboardPage';
import { useAuthStore } from '../store';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuth = useAuthStore(s => s.isAuthenticated);
  return isAuth ? <>{children}</> : <Navigate to="/admin" replace />;
};

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    {children}
    <FixedFooter />
  </>
);

export const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/"            element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/agendar"     element={<PublicLayout><BookingPage /></PublicLayout>} />
      <Route path="/contato"     element={<PublicLayout><ContactPage /></PublicLayout>} />
      <Route path="/termos"              element={<PublicLayout><TermsPage /></PublicLayout>} />
      <Route path="/termos/uso"           element={<PublicLayout><TermsOfUsePage /></PublicLayout>} />
      <Route path="/termos/privacidade"   element={<PublicLayout><PrivacyPolicyPage /></PublicLayout>} />
      <Route path="/termos/cancelamento"  element={<PublicLayout><CancellationPolicyPage /></PublicLayout>} />
      <Route path="/depoimentos"    element={<PublicLayout><TestimonialsPage /></PublicLayout>} />
      <Route path="/minha-conta"    element={<PublicLayout><ClientPortalPage /></PublicLayout>} />
      <Route path="/confirmar"      element={<ConfirmPage />} />
      <Route path="/admin"       element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={
        <ProtectedRoute><AdminDashboardPage /></ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
