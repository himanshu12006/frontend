import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, CheckCircle, Mail, Lock, User, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const { user, login, register, forgotPassword, logout, error, setError } = useAuth();
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    try {
      if (authMode === 'login') {
        await login(formData.email, formData.password);
        setSuccessMsg('Logged in successfully! Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else if (authMode === 'register') {
        await register(formData.name, formData.email, formData.password);
        setSuccessMsg('Account created successfully! Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else if (authMode === 'forgot') {
        await forgotPassword(formData.email);
        setSuccessMsg('Password reset instructions sent to your email.');
        setTimeout(() => {
          setAuthMode('login');
          setSuccessMsg('');
        }, 3000);
      }
    } catch (err) {
      // Error handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (platform) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(`Simulated ${platform} Auth successful! Redirecting...`);
      login('guest.user@example.com', 'social-secret-pass');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-brand-offwhite flex justify-center items-center min-h-[70vh]">
      
      <div className="bg-brand-cream border border-brand-beige w-full max-w-md p-8 rounded-sm shadow-xl space-y-6">
        
        {/* Header toggle links */}
        {user ? (
          /* Logged In State */
          <div className="text-center space-y-6 py-6">
            <div className="w-16 h-16 bg-brand-cream-dark text-brand-gold rounded-full flex items-center justify-center mx-auto border border-brand-beige">
              <User className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-brand-charcoal">Welcome, {user.name}!</h2>
              <p className="text-xs text-brand-charcoal-light/70 font-light">
                Logged in as <strong className="font-semibold">{user.email}</strong>
              </p>
            </div>
            
            <div className="space-y-3 pt-4">
              <button
                onClick={() => navigate('/shop')}
                className="w-full py-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal text-xs uppercase tracking-widest font-semibold transition-colors rounded-sm"
              >
                Go to Collections
              </button>
              <button
                onClick={logout}
                className="w-full py-3 border border-brand-beige hover:border-brand-gold text-brand-charcoal text-xs uppercase tracking-widest font-semibold transition-colors rounded-sm bg-brand-cream-dark"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          /* Authentication Forms */
          <>
            <div className="text-center space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal">
                {authMode === 'login' && 'Sign In'}
                {authMode === 'register' && 'Create Account'}
                {authMode === 'forgot' && 'Reset Password'}
              </h2>
              <p className="text-xs text-brand-charcoal-light/60 font-light">
                {authMode === 'login' && 'Access your private wardrobe and order history.'}
                {authMode === 'register' && 'Join OM CLOTH HOUSE for exclusive shopping perks.'}
                {authMode === 'forgot' && 'Provide your email to receive recovery instructions.'}
              </p>
            </div>

            {/* Error & Success Alerts */}
            {error && (
              <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xs border border-red-200 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {successMsg && (
              <div className="bg-emerald-50 text-emerald-700 text-xs p-3 rounded-xs border border-emerald-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              {/* Name (Registration only) */}
              {authMode === 'register' && (
                <div className="space-y-1">
                  <label htmlFor="name" className="uppercase tracking-wider font-semibold text-brand-charcoal">Name</label>
                  <div className="relative flex items-center bg-brand-cream-dark border border-brand-beige rounded-sm px-3 py-2.5">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-transparent outline-none pl-6 text-brand-charcoal"
                    />
                    <User className="w-4 h-4 text-brand-charcoal-light/40 absolute left-3" />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="space-y-1">
                <label htmlFor="email" className="uppercase tracking-wider font-semibold text-brand-charcoal">Email Address</label>
                <div className="relative flex items-center bg-brand-cream-dark border border-brand-beige rounded-sm px-3 py-2.5">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent outline-none pl-6 text-brand-charcoal"
                  />
                  <Mail className="w-4 h-4 text-brand-charcoal-light/40 absolute left-3" />
                </div>
              </div>

              {/* Password (Login and Register only) */}
              {authMode !== 'forgot' && (
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="uppercase tracking-wider font-semibold text-brand-charcoal">Password</label>
                    {authMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('forgot');
                          setError(null);
                        }}
                        className="text-[10px] text-brand-gold hover:text-brand-charcoal transition-colors font-medium uppercase tracking-wider"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative flex items-center bg-brand-cream-dark border border-brand-beige rounded-sm px-3 py-2.5">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full bg-transparent outline-none pl-6 text-brand-charcoal"
                    />
                    <Lock className="w-4 h-4 text-brand-charcoal-light/40 absolute left-3" />
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-brand-charcoal hover:bg-brand-charcoal-light text-brand-cream uppercase tracking-widest font-semibold transition-colors mt-2"
              >
                {loading ? 'Processing...' : authMode === 'login' ? 'Sign In' : authMode === 'register' ? 'Create Account' : 'Send Reset Link'}
              </button>
            </form>

            {/* Social Logins Section */}
            {authMode !== 'forgot' && (
              <div className="space-y-4 pt-4 border-t border-brand-beige">
                <div className="text-center text-[10px] text-brand-charcoal-light/50 uppercase tracking-widest font-semibold">
                  Or Connect With
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSocialLogin('Google')}
                    className="py-2.5 px-4 border border-brand-beige hover:border-brand-gold bg-brand-cream-dark flex items-center justify-center gap-2 hover:shadow-xs transition-all text-xs font-semibold uppercase tracking-wider text-brand-charcoal"
                  >
                    <svg className="w-4 h-4 fill-current text-brand-gold" viewBox="0 0 24 24">
                      <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.579-7.859-8s3.529-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.745-.08-1.3-.176-1.859H12.24z" />
                    </svg>
                    <span>Google</span>
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Facebook')}
                    className="py-2.5 px-4 border border-brand-beige hover:border-brand-gold bg-brand-cream-dark flex items-center justify-center gap-2 hover:shadow-xs transition-all text-xs font-semibold uppercase tracking-wider text-brand-charcoal"
                  >
                    <svg className="w-4 h-4 fill-current text-blue-600" viewBox="0 0 24 24">
                      <path d="M9 8H7v3h2v9h3v-9h3.6l.4-3H12V6c0-.9.2-1.2 1-1.2h2V2h-3c-3 0-5 1.4-5 4v2z" />
                    </svg>
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mode Toggle Footer */}
            <div className="text-center pt-2 text-[11px] font-light text-brand-charcoal-light">
              {authMode === 'login' && (
                <p>
                  Don't have an account?{' '}
                  <button
                    onClick={() => {
                      setAuthMode('register');
                      setError(null);
                    }}
                    className="text-brand-gold hover:text-brand-charcoal font-semibold uppercase tracking-wider ml-1"
                  >
                    Register Here
                  </button>
                </p>
              )}
              {authMode === 'register' && (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setError(null);
                    }}
                    className="text-brand-gold hover:text-brand-charcoal font-semibold uppercase tracking-wider ml-1"
                  >
                    Sign In Here
                  </button>
                </p>
              )}
              {authMode === 'forgot' && (
                <p>
                  Remembered your password?{' '}
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setError(null);
                    }}
                    className="text-brand-gold hover:text-brand-charcoal font-semibold uppercase tracking-wider ml-1"
                  >
                    Back to Login
                  </button>
                </p>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
