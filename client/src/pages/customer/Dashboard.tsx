import React from 'react';
import { BrandingSettings } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, Package, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  branding: BrandingSettings | null;
}

const CustomerDashboard: React.FC<Props> = ({ branding }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold text-gray-900">Store</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/products" className="text-gray-700 hover:text-primary">Products</Link>
              <Link to="/orders" className="text-gray-700 hover:text-primary">Orders</Link>
              <Link to="/profile" className="text-gray-700 hover:text-primary">Profile</Link>
              <button onClick={logout} className="text-gray-700 hover:text-primary">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome back, {user?.firstName}!
          </h1>

          {branding?.customHtml && (
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
              <div dangerouslySetInnerHTML={{ __html: branding.customHtml }} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/products" className="card p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-primary mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Browse Products</h3>
                  <p className="text-sm text-gray-500">Discover our latest collection</p>
                </div>
              </div>
            </Link>

            <Link to="/orders" className="card p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-primary mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">My Orders</h3>
                  <p className="text-sm text-gray-500">Track your recent purchases</p>
                </div>
              </div>
            </Link>

            <Link to="/profile" className="card p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <User className="h-8 w-8 text-primary mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">My Profile</h3>
                  <p className="text-sm text-gray-500">Manage your account settings</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;