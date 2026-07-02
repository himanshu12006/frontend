// src/components/Admin/AdminHeader.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Bell, Search, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const pageTitles = {
  '/admin': 'Dashboard Overview',
  '/admin/products': 'Manage Products',
  '/admin/add-product': 'Add New Product',
  '/admin/orders': 'Manage Orders',
  '/admin/users': 'Manage Users',
};

export default function AdminHeader() {
  const { user } = useAuth();
  const location = useLocation();

  const title =
    pageTitles[location.pathname] ||
    (location.pathname.startsWith('/admin/edit-product') ? 'Edit Product' : 'Admin Panel');

  return (
    <header className="h-16 bg-[#0f1623] border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
      {/* Page title */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-white font-semibold text-lg">{title}</h1>
          <p className="text-slate-500 text-xs">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        {/* Back to Website Button */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 rounded-xl text-xs font-semibold transition-all duration-200 group"
        >
          <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          View Website
        </a>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search hint */}
        <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-slate-400 text-sm cursor-pointer hover:border-[#C5A880]/40 transition-colors">
          <Search className="w-4 h-4" />
          <span className="text-xs">Quick search...</span>
        </div>

        {/* Notification bell */}
        <button className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#C5A880]/40 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#C5A880] rounded-full" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#C5A880] to-[#A98E65] flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {user?.name?.substring(0, 2)?.toUpperCase() || 'AD'}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-white text-xs font-medium leading-none">{user?.name || 'Admin'}</p>
            <p className="text-[#C5A880] text-[10px] tracking-wider uppercase">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
