// src/components/Admin/AdminRoute.jsx
// Protects all /admin routes — redirects to / if not admin, /auth if not logged in
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin';

export default function AdminRoute() {
  const { user, isAdmin, loading } = useAdmin();

  // While auth state is being determined, show a dark loader
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0f1a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#C5A880]/30 border-t-[#C5A880] animate-spin" />
          <p className="text-slate-400 text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/auth" replace />;

  // Logged in but NOT admin → redirect to home
  if (!isAdmin) return <Navigate to="/" replace />;

  // Is admin → render children
  return <Outlet />;
}
