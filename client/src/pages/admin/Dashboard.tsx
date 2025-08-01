import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Shield, Package, Users, ShoppingCart, Settings, LogOut } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-secondary mr-2" />
              <span className="text-xl font-bold text-gray-900">Admin Panel</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/admin/products" className="text-gray-700 hover:text-secondary">Products</Link>
              <Link to="/admin/customers" className="text-gray-700 hover:text-secondary">Customers</Link>
              <Link to="/admin/orders" className="text-gray-700 hover:text-secondary">Orders</Link>
              <Link to="/admin/settings" className="text-gray-700 hover:text-secondary">Settings</Link>
              <button onClick={logout} className="text-gray-700 hover:text-secondary">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome, {user?.firstName}!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/admin/products" className="card p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-secondary mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Products</h3>
                  <p className="text-sm text-gray-500">Manage inventory</p>
                </div>
              </div>
            </Link>

            <Link to="/admin/customers" className="card p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-secondary mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Customers</h3>
                  <p className="text-sm text-gray-500">Manage users</p>
                </div>
              </div>
            </Link>

            <Link to="/admin/orders" className="card p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-secondary mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Orders</h3>
                  <p className="text-sm text-gray-500">Process orders</p>
                </div>
              </div>
            </Link>

            <Link to="/admin/settings" className="card p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <Settings className="h-8 w-8 text-secondary mr-4" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Settings</h3>
                  <p className="text-sm text-gray-500">Portal branding</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;