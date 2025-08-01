import React from 'react';
import { useAuth } from '../context/AuthContext';
import { X } from 'lucide-react';

const ImpersonationBanner: React.FC = () => {
  const { stopImpersonation } = useAuth();

  return (
    <div className="impersonation-banner">
      <div className="flex items-center justify-center gap-4">
        <span>🎭 You are viewing as a customer (Admin Impersonation Mode)</span>
        <button
          onClick={stopImpersonation}
          className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
        >
          <X size={14} />
          Exit Impersonation
        </button>
      </div>
    </div>
  );
};

export default ImpersonationBanner;