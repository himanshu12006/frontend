// src/components/Admin/ToastContainer.jsx
// Renders floating toast notifications at top-right corner
import React from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const icons = {
  success: <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
  error: <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />,
  warning: <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />,
};

const colors = {
  success: 'border-l-emerald-400',
  error: 'border-l-red-400',
  warning: 'border-l-amber-400',
};

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 w-80">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 bg-[#1e2433] text-white px-4 py-3 rounded-lg shadow-2xl border-l-4 ${colors[toast.type]} animate-in slide-in-from-right-5 duration-300`}
        >
          {icons[toast.type]}
          <p className="text-sm flex-1">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="text-white/40 hover:text-white transition-colors ml-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
