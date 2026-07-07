import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, CheckCircle, Mail, Lock, User, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export default function Auth() {
  const { user, login, register, loginWithGoogle, forgotPassword, logout, error, setError } = useAuth();
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

  const handleGoogleLogin = async () => {
    setLoading(true);
    setSuccessMsg('');
    setError(null);
    try {
      // 1. Open Firebase Google sign in popup
      const result = await signInWithPopup(auth, googleProvider);
      
      // 2. Fetch Firebase ID token
      const idToken = await result.user.getIdToken();
      
      // 3. Send token to backend via AuthContext
      await loginWithGoogle(idToken);
      
      setSuccessMsg('Authenticated with Google successfully! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error('Google Auth Error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Google Sign-In window closed. Please try again.');
      } else {
        setError(err.message || 'Failed to authenticate via Google.');
      }
    } finally {
      setLoading(false);
    }
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

            {/* Google Sign In Section */}
            {authMode !== 'forgot' && (
              <div className="space-y-4 pt-4 border-t border-brand-beige">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-x-0 border-t border-brand-beige"></div>
                  <span className="relative bg-brand-cream px-3 text-[10px] text-brand-charcoal-light/50 uppercase tracking-widest font-semibold">
                    Or Continue With
                  </span>
                </div>
                
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full py-3 px-4 border border-brand-beige hover:border-brand-gold bg-brand-cream-dark flex items-center justify-center gap-3 hover:shadow-xs transition-all text-xs font-semibold uppercase tracking-wider text-brand-charcoal rounded-sm cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3.01A11.91 11.91 0 0 0 12 .909c-4.664 0-8.664 2.664-10.664 6.555z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.473 12.273c0-.818-.073-1.609-.209-2.373H12v4.5h6.436a5.5 5.5 0 0 1-2.39 3.609l3.864 3c2.259-2.082 3.564-5.145 3.564-8.736z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M1.336 7.464l3.93 3.055A7.025 7.025 0 0 1 12 19.091c-2.345 0-4.391-1.427-5.136-3.482L1.336 7.464z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 19.091a7.07 7.07 0 0 1-5.136-2.373l-3.864 3A11.947 11.947 0 0 0 12 23.091c3.245 0 5.973-1.073 7.964-2.909l-3.864-3c-1.127.755-2.564 1.2-4.1 1.2z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
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
