import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { getCartCount } = useCart();
  const { user } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll listener to toggle navbar states
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Men', path: '/shop?category=Men' },
    { name: 'Women', path: '/shop?category=Women' },
    { name: 'Kids', path: '/shop?category=Kids' },
    { name: 'Ethnic Wear', path: '/shop?category=Ethnic Wear' },
    { name: 'New Arrivals', path: '/shop?filter=new' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !isScrolled;

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname + location.search === path || (location.pathname === '/shop' && path.includes('/shop'));
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      isTransparent 
        ? 'bg-transparent border-transparent' 
        : 'bg-brand-cream/90 backdrop-blur-md border-b border-brand-beige shadow-xs'
    }`}>
      

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-20 gap-6">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="border border-brand-gold px-3 py-2 rounded-sm flex items-center justify-center bg-brand-forest flex-shrink-0 transition-colors">
              <span className="font-serif text-xl font-bold text-brand-gold tracking-widest">O</span>
              <span className="font-serif text-xl font-bold text-brand-cream tracking-widest -ml-0.5">M</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className={`font-serif text-base sm:text-lg font-bold tracking-wider uppercase leading-none transition-colors duration-500 ${
                isTransparent ? 'text-white drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.4)]' : 'text-brand-charcoal'
              }`}>
                OM CLOTH HOUSE
              </span>
              <span className="text-[9px] tracking-[0.2em] text-brand-gold uppercase leading-none font-medium">
                Heritage & Elegance
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link text-xs uppercase tracking-widest transition-colors py-2 font-medium ${
                  isTransparent
                    ? isActive(link.path)
                      ? 'text-brand-gold border-b border-brand-gold font-semibold'
                      : 'text-white hover:text-brand-gold drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]'
                    : isActive(link.path)
                      ? 'text-brand-gold font-semibold'
                      : 'text-brand-charcoal-light hover:text-brand-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons on Right */}
          <div className="flex items-center gap-1 justify-end">
            
            {/* Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`p-2 transition-colors duration-300 ${
                isTransparent ? 'text-white hover:text-brand-gold drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.4)]' : 'text-brand-charcoal-light hover:text-brand-gold'
              } ${showSearch ? 'text-brand-gold font-semibold' : ''}`}
              aria-label="Search"
            >
              {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            {/* Wishlist Link */}
            <Link
              to="/shop?filter=wishlist"
              className={`p-2 transition-colors duration-300 relative ${
                isTransparent ? 'text-white hover:text-brand-gold drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.4)]' : 'text-brand-charcoal-light hover:text-brand-gold'
              }`}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-brand-gold text-brand-cream text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className={`p-2 transition-colors duration-300 relative ${
                isTransparent ? 'text-white hover:text-brand-gold drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.4)]' : 'text-brand-charcoal-light hover:text-brand-gold'
              }`}
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {getCartCount() > 0 && (
                <span className={`absolute top-1 right-1 text-brand-cream text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold ${
                  isTransparent ? 'bg-brand-gold' : 'bg-brand-forest'
                }`}>
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Auth Button */}
            <Link
              to="/auth"
              className="p-2 flex items-center space-x-1.5"
              aria-label="Account Log In"
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                isTransparent 
                  ? 'border-white/40 bg-black/25 hover:border-brand-gold' 
                  : 'border-brand-beige bg-brand-offwhite hover:border-brand-gold'
              }`}>
                {user ? (
                  <span className={`text-xs font-semibold tracking-tight ${isTransparent ? 'text-brand-gold' : 'text-brand-forest'}`}>
                    {user.name.substring(0, 2)}
                  </span>
                ) : (
                  <User className={`w-4 h-4 ${isTransparent ? 'text-white' : 'text-brand-charcoal-light'}`} />
                )}
              </div>
            </Link>

            {/* Admin Panel Link */}
            {user && user.role === 'admin' && (
              <Link
                to="/admin"
                className={`ml-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border transition-all duration-300 shadow-sm ${
                  isTransparent
                    ? 'bg-brand-gold text-brand-forest border-brand-gold hover:bg-white hover:text-brand-forest'
                    : 'bg-brand-forest text-brand-cream border-brand-forest hover:bg-brand-gold hover:border-brand-gold hover:text-white'
                }`}
              >
                Admin Panel 👑
              </Link>
            )}




            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 transition-colors ${
                isTransparent ? 'text-white hover:text-brand-gold drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.4)]' : 'text-brand-charcoal-light hover:text-brand-gold'
              }`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Search Dropdown Panel (slides down below navbar) ── */}
      {showSearch && (
        <div className="absolute left-0 right-0 top-full z-50 bg-brand-cream/95 backdrop-blur-md border-b border-brand-gold/30 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-2xl mx-auto px-6 py-5">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
              <div className="flex-1 flex items-center bg-white border border-brand-gold/50 rounded-full px-4 py-2.5 shadow-sm focus-within:border-brand-gold focus-within:shadow-md transition-all duration-200">
                <Search className="w-4 h-4 text-brand-gold mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search for clothing, styles, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm bg-transparent outline-none text-brand-charcoal placeholder-brand-charcoal/40"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="ml-2 text-brand-charcoal/40 hover:text-brand-charcoal transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="bg-brand-forest text-brand-cream text-xs uppercase tracking-widest font-semibold px-5 py-2.5 rounded-full hover:bg-brand-gold transition-colors duration-200 flex-shrink-0"
              >
                Search
              </button>
            </form>
            {/* Quick search hints */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-[10px] text-brand-charcoal/40 uppercase tracking-wider">Popular:</span>
              {['Kurta', 'Saree', 'Jeans', 'T-Shirts', 'Kids'].map((hint) => (
                <button
                  key={hint}
                  type="button"
                  onClick={() => {
                    navigate(`/shop?search=${encodeURIComponent(hint)}`);
                    setShowSearch(false);
                    setSearchQuery('');
                  }}
                  className="text-[11px] text-brand-charcoal/60 hover:text-brand-gold bg-brand-beige/60 hover:bg-brand-gold/10 px-3 py-1 rounded-full transition-colors duration-150"
                >
                  {hint}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden bg-brand-cream border-t border-brand-beige transition-all duration-300">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 text-sm uppercase tracking-widest font-light transition-colors ${
                  isActive(link.path)
                    ? 'text-brand-gold bg-brand-cream-dark/50 font-medium'
                    : 'text-brand-charcoal-light hover:text-brand-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user && user.role === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-sm uppercase tracking-widest font-semibold text-brand-gold bg-brand-cream-dark/30 hover:bg-brand-cream-dark transition-colors border-t border-brand-beige"
              >
                Admin Panel 👑
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
