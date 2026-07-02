// src/components/Admin/StatCard.jsx
import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, color, prefix = '', change }) {
  const colors = {
    blue:   { bg: 'from-blue-500/20 to-blue-600/5',   icon: 'bg-blue-500/20 text-blue-400',   bar: 'bg-blue-500' },
    gold:   { bg: 'from-amber-500/20 to-amber-600/5',  icon: 'bg-amber-500/20 text-amber-400',  bar: 'bg-amber-500' },
    green:  { bg: 'from-emerald-500/20 to-emerald-600/5', icon: 'bg-emerald-500/20 text-emerald-400', bar: 'bg-emerald-500' },
    purple: { bg: 'from-purple-500/20 to-purple-600/5', icon: 'bg-purple-500/20 text-purple-400', bar: 'bg-purple-500' },
  };

  const c = colors[color] || colors.blue;

  return (
    <div className={`relative bg-gradient-to-br ${c.bg} border border-white/5 rounded-2xl p-5 overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/3" />
      
      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-widest font-medium mb-2">{title}</p>
          <p className="text-white text-2xl font-bold tracking-tight">
            {prefix}{typeof value === 'number' && value >= 1000 ? value.toLocaleString('en-IN') : value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-1.5">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-medium">{change}</span>
              <span className="text-slate-500 text-xs">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${c.icon}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Bottom bar accent */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${c.bar} opacity-40`} />
    </div>
  );
}
