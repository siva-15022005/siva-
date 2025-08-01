import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import api from './utils/api';
import { BrandingSettings } from './types';

// Import components (we'll create these)
import LoadingSpinner from './components/LoadingSpinner';
import ImpersonationBanner from './components/ImpersonationBanner';

// Customer Portal
import CustomerLogin from './pages/customer/Login';
import CustomerRegister from './pages/customer/Register';
import CustomerDashboard from './pages/customer/Dashboard';
import CustomerProducts from './pages/customer/Products';
import CustomerProductDetail from './pages/customer/ProductDetail';
import CustomerProfile from './pages/customer/Profile';
import CustomerOrders from './pages/customer/Orders';
import CustomerOrderDetail from './pages/customer/OrderDetail';
import CustomerCart from './pages/customer/Cart';
import CustomerCheckout from './pages/customer/Checkout';

// Admin Portal
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminCustomers from './pages/admin/Customers';
import AdminOrders from './pages/admin/Orders';
import AdminSettings from './pages/admin/Settings';

// Route Guards
const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin" : "/"} replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { isImpersonating } = useAuth();
  const [branding, setBranding] = useState<BrandingSettings | null>(null);

  // Load branding settings
  useEffect(() => {
    const loadBranding = async () => {
      try {
        const response = await api.get('/settings/branding');
        setBranding(response.data.data);
      } catch (error) {
        // Use defaults if loading fails
        setBranding({
          primaryColor: '#007bff',
          secondaryColor: '#6c757d',
          fontFamily: 'Roboto',
          customHtml: '',
        });
      }
    };

    loadBranding();
  }, []);

  // Apply branding to CSS variables
  useEffect(() => {
    if (branding) {
      document.documentElement.style.setProperty('--primary-color', branding.primaryColor);
      document.documentElement.style.setProperty('--secondary-color', branding.secondaryColor);
      document.documentElement.style.setProperty('--font-family', branding.fontFamily);
    }
  }, [branding]);

  return (
    <div className="min-h-screen bg-gray-50">
      {isImpersonating && <ImpersonationBanner />}
      
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          <PublicRoute>
            <CustomerLogin />
          </PublicRoute>
        } />
        
        <Route path="/register" element={
          <PublicRoute>
            <CustomerRegister />
          </PublicRoute>
        } />

        <Route path="/admin/login" element={
          <PublicRoute>
            <AdminLogin />
          </PublicRoute>
        } />

        {/* Customer Portal Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <CustomerDashboard branding={branding} />
          </ProtectedRoute>
        } />

        <Route path="/products" element={
          <ProtectedRoute>
            <CustomerProducts />
          </ProtectedRoute>
        } />

        <Route path="/products/:id" element={
          <ProtectedRoute>
            <CustomerProductDetail />
          </ProtectedRoute>
        } />

        <Route path="/cart" element={
          <ProtectedRoute>
            <CustomerCart />
          </ProtectedRoute>
        } />

        <Route path="/checkout" element={
          <ProtectedRoute>
            <CustomerCheckout />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <CustomerProfile />
          </ProtectedRoute>
        } />

        <Route path="/orders" element={
          <ProtectedRoute>
            <CustomerOrders />
          </ProtectedRoute>
        } />

        <Route path="/orders/:id" element={
          <ProtectedRoute>
            <CustomerOrderDetail />
          </ProtectedRoute>
        } />

        {/* Admin Portal Routes */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/products" element={
          <ProtectedRoute adminOnly>
            <AdminProducts />
          </ProtectedRoute>
        } />

        <Route path="/admin/customers" element={
          <ProtectedRoute adminOnly>
            <AdminCustomers />
          </ProtectedRoute>
        } />

        <Route path="/admin/orders" element={
          <ProtectedRoute adminOnly>
            <AdminOrders />
          </ProtectedRoute>
        } />

        <Route path="/admin/settings" element={
          <ProtectedRoute adminOnly>
            <AdminSettings />
          </ProtectedRoute>
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
