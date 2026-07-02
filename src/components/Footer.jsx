import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-brand-charcoal text-brand-cream-dark border-t border-brand-beige">
      {/* Trust Badges Bar */}
      <div className="bg-brand-charcoal-light py-8 border-b border-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center p-4">
            <Truck className="w-6 h-6 text-brand-gold mb-2" />
            <h4 className="font-serif text-brand-cream text-sm font-semibold tracking-wider uppercase mb-1">Worldwide Express Shipping</h4>
            <p className="text-xs text-brand-cream-dark/60">Free shipping on all order values above $150</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <RefreshCw className="w-6 h-6 text-brand-gold mb-2" />
            <h4 className="font-serif text-brand-cream text-sm font-semibold tracking-wider uppercase mb-1">Easy Return Policy</h4>
            <p className="text-xs text-brand-cream-dark/60">Hassle-free 14-day return and exchange policy</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <ShieldCheck className="w-6 h-6 text-brand-gold mb-2" />
            <h4 className="font-serif text-brand-cream text-sm font-semibold tracking-wider uppercase mb-1">100% Secured Payments</h4>
            <p className="text-xs text-brand-cream-dark/60">Encrypted transaction methods for customer safety</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <Link to="/" className="flex items-center space-x-2">
                <div className="border border-brand-gold px-2.5 py-1.5 rounded-sm flex items-center justify-center bg-brand-charcoal-light">
                  <span className="font-serif text-lg font-bold text-brand-gold tracking-widest">O</span>
                  <span className="font-serif text-lg font-bold text-brand-cream tracking-widest -ml-0.5">M</span>
                </div>
                <span className="font-serif text-xl font-bold text-brand-cream tracking-widest uppercase">
                  OM CLOTH HOUSE
                </span>
              </Link>
              <p className="text-sm text-brand-cream-dark/70 font-light max-w-sm">
                Curating fine outfits since 1996. We strive to provide premium clothing that integrates modern luxury with traditional ethnic heritage for every generation.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-3">
              <h4 className="font-serif text-brand-cream text-sm font-bold tracking-wider uppercase">Subscribe to our newsletter</h4>
              <p className="text-xs text-brand-cream-dark/50">Stay informed about new arrivals, private sales, and fashion forecasts.</p>
              
              <form onSubmit={handleSubscribe} className="flex max-w-sm relative">
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-charcoal-light border border-brand-charcoal-light focus:border-brand-gold text-brand-cream placeholder-brand-cream-dark/30 text-sm px-4 py-3 rounded-sm outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal px-4 flex items-center justify-center transition-colors rounded-r-sm"
                  aria-label="Subscribe"
                >
                  {subscribed ? <span className="text-xs font-semibold">Subscribed!</span> : <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2 lg:col-start-7 space-y-4">
            <h4 className="font-serif text-brand-cream text-xs font-bold tracking-widest uppercase text-brand-gold">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/shop?category=Men" className="hover:text-brand-gold transition-colors font-light">Men's Wardrobe</Link></li>
              <li><Link to="/shop?category=Women" className="hover:text-brand-gold transition-colors font-light">Women's Collection</Link></li>
              <li><Link to="/shop?category=Kids" className="hover:text-brand-gold transition-colors font-light">Kids Wear</Link></li>
              <li><Link to="/shop?category=Ethnic Wear" className="hover:text-brand-gold transition-colors font-light">Ethnic Elegance</Link></li>
              <li><Link to="/shop?filter=new" className="hover:text-brand-gold transition-colors font-light">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-brand-cream text-xs font-bold tracking-widest uppercase text-brand-gold">Customer Care</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/contact" className="hover:text-brand-gold transition-colors font-light">Contact Support</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold transition-colors font-light">Shipping & Deliveries</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold transition-colors font-light">Returns & Exchanges</Link></li>
              <li><Link to="/about" className="hover:text-brand-gold transition-colors font-light">Sizing Guide</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold transition-colors font-light">FAQs</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-brand-cream text-xs font-bold tracking-widest uppercase text-brand-gold">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-brand-gold transition-colors font-light">Our Story</Link></li>
              <li><Link to="/about" className="hover:text-brand-gold transition-colors font-light">Shop Location</Link></li>
              <li><Link to="/shop" className="hover:text-brand-gold transition-colors font-light">Browse Catalog</Link></li>
              <li><Link to="/auth" className="hover:text-brand-gold transition-colors font-light">My Account</Link></li>
              <li><Link to="/shop?filter=wishlist" className="hover:text-brand-gold transition-colors font-light">My Wishlist</Link></li>
            </ul>
          </div>

        </div>

        {/* Separator */}
        <hr className="my-12 border-brand-charcoal-light" />

        {/* Bottom copyright & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          
          {/* Social Icons */}
          <div className="flex space-x-5">
            <a href="#" className="p-2.5 bg-brand-charcoal-light hover:bg-brand-gold hover:text-brand-charcoal text-brand-cream-dark rounded-full transition-all duration-300" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h3.6l.4-3H12V6c0-.9.2-1.2 1-1.2h2V2h-3c-3 0-5 1.4-5 4v2z" />
              </svg>
            </a>
            <a href="#" className="p-2.5 bg-brand-charcoal-light hover:bg-brand-gold hover:text-brand-charcoal text-brand-cream-dark rounded-full transition-all duration-300" aria-label="Instagram">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="p-2.5 bg-brand-charcoal-light hover:bg-brand-gold hover:text-brand-charcoal text-brand-cream-dark rounded-full transition-all duration-300" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="p-2.5 bg-brand-charcoal-light hover:bg-brand-gold hover:text-brand-charcoal text-brand-cream-dark rounded-full transition-all duration-300" aria-label="Email">
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-brand-cream-dark/40 text-center font-light">
            © 2026 OM CLOTH HOUSE. All Rights Reserved. Crafted with dedication to elegance and quality.
          </div>

          {/* Payment Badges Mock */}
          <div className="flex space-x-2 text-[10px] tracking-widest text-brand-cream-dark/50">
            <span className="px-2 py-1 border border-brand-charcoal-light rounded bg-brand-charcoal-light">VISA</span>
            <span className="px-2 py-1 border border-brand-charcoal-light rounded bg-brand-charcoal-light">MC</span>
            <span className="px-2 py-1 border border-brand-charcoal-light rounded bg-brand-charcoal-light">AMEX</span>
            <span className="px-2 py-1 border border-brand-charcoal-light rounded bg-brand-charcoal-light">PAYPAL</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
