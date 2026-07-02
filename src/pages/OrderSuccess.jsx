// src/pages/OrderSuccess.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-8 bg-brand-offwhite">
      {/* Visual Indicator */}
      <div className="w-20 h-20 bg-emerald-100/50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-300 animate-bounce">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <h2 className="font-serif text-3xl font-bold text-brand-charcoal">Payment Successful!</h2>
        <p className="text-sm font-light text-brand-charcoal-light/80 leading-relaxed max-w-md mx-auto">
          Thank you for your purchase at **OM CLOTH HOUSE**. Your payment signature has been successfully verified, and your order has been placed.
        </p>
      </div>

      {order && (
        <div className="bg-brand-cream border border-brand-beige p-5 rounded-sm text-left space-y-3 shadow-xs">
          <p className="text-xs uppercase tracking-wider font-semibold text-brand-gold">Order Details</p>
          <div className="text-sm space-y-1.5 font-light text-brand-charcoal-light">
            <p className="flex justify-between">
              <span>Order Number:</span>
              <strong className="font-semibold text-brand-charcoal">#{order._id.toUpperCase()}</strong>
            </p>
            <p className="flex justify-between">
              <span>Transaction ID:</span>
              <strong className="font-mono text-xs text-brand-charcoal">{order.paymentResult?.id || 'N/A'}</strong>
            </p>
            <p className="flex justify-between">
              <span>Amount Paid:</span>
              <strong className="font-semibold text-[#C5A880]">₹{order.totalPrice?.toLocaleString('en-IN')}</strong>
            </p>
            <p className="flex justify-between">
              <span>Status:</span>
              <strong className="font-bold text-emerald-600 uppercase text-xs tracking-wider">Paid</strong>
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-4">
        <Link
          to="/shop"
          className="w-full sm:w-auto bg-brand-forest hover:bg-brand-forest-light text-brand-cream text-xs uppercase tracking-widest font-semibold px-8 py-4 rounded-sm transition-colors text-center shadow-md"
        >
          Continue Shopping
        </Link>
        <Link
          to="/shop?filter=new"
          className="w-full sm:w-auto bg-white border border-brand-beige hover:border-brand-gold text-brand-charcoal text-xs uppercase tracking-widest font-semibold px-8 py-4 rounded-sm transition-colors text-center"
        >
          View New Arrivals
        </Link>
      </div>

      <div className="pt-4 border-t border-brand-beige flex items-center justify-center gap-1.5 text-xs text-slate-400">
        <ShieldCheck className="w-4 h-4 text-brand-gold" />
        <span>Payment details are secured with 256-bit encryption.</span>
      </div>
    </div>
  );
}
