// src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, ShieldCheck, Truck, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createRazorpayOrder, verifyPayment, reportPaymentFailure, loadRazorpayScript } from '../services/paymentService';

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const subtotal = getCartTotal();
  const shippingThreshold = 1000; // Match backend shipping rule (Free above ₹1000)
  const shippingCost = subtotal > shippingThreshold || subtotal === 0 ? 0 : 80;
  const taxCost = Math.round(subtotal * 0.18); // Match backend GST rule (18%)
  const grandTotal = subtotal + shippingCost + taxCost;

  useEffect(() => {
    // If cart is empty, redirect back to cart page
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.address || !shippingAddress.city || !shippingAddress.state || !shippingAddress.pincode) {
      setError('Please fill in all shipping details.');
      return;
    }

    setLoading(true);

    try {
      // 1. Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setError('Failed to load Razorpay SDK. Please check your internet connection.');
        setLoading(false);
        return;
      }

      // 2. Create order on our backend
      const razorpayOrder = await createRazorpayOrder(grandTotal);

      // 3. Setup Razorpay Checkout options
      const options = {
        key: razorpayOrder.key_id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'OM CLOTH HOUSE',
        description: 'E-Commerce Clothing Purchase',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&q=80',
        order_id: razorpayOrder.id,
        handler: async function (response) {
          // Inside the Razorpay handler, trigger signature verification on backend
          try {
            setLoading(true);
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              shippingAddress,
            };

            const verifiedOrder = await verifyPayment(verifyPayload);
            clearCart();
            // Redirect to success view with order information
            navigate('/order-success', { state: { order: verifiedOrder } });
          } catch (err) {
            setError(err.response?.data?.message || 'Payment verification failed. Please contact support.');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: shippingAddress.fullName,
          email: user?.email || '',
          contact: shippingAddress.phone,
        },
        theme: {
          color: '#253B32', // Brand forest green
        },
        modal: {
          ondismiss: function () {
            setError('Payment checkout cancelled.');
            setLoading(false);
          },
        },
      };

      // 4. Open Razorpay Popup
      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', async function (response) {
        // Handle failure callbacks from Razorpay
        await reportPaymentFailure({
          razorpay_order_id: razorpayOrder.id,
          error: response.error,
        });
        setError(`Payment Failed: ${response.error.description}`);
        setLoading(false);
      });

      rzp.open();

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to initialize payment order. Try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-brand-offwhite min-h-[75vh]">
      {/* Header */}
      <div className="border-b border-brand-beige pb-6">
        <Link to="/cart" className="inline-flex items-center text-xs uppercase tracking-widest text-brand-gold hover:text-brand-charcoal font-semibold gap-1.5 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Bag
        </Link>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal">Secure Checkout</h1>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-sm text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Shipping Address Form */}
        <form onSubmit={handlePayment} className="lg:col-span-7 space-y-6">
          <div className="bg-brand-cream border border-brand-beige p-6 rounded-sm space-y-5">
            <h2 className="font-serif text-xl font-bold text-brand-charcoal flex items-center gap-2 border-b border-brand-beige pb-3">
              <Truck className="w-5 h-5 text-brand-gold" />
              1. Delivery Shipping Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-charcoal/70 mb-1.5">Full Name *</label>
                <input
                  required
                  type="text"
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-brand-beige rounded-sm px-4 py-2.5 text-sm text-brand-charcoal focus:border-brand-gold outline-none transition-colors"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-charcoal/70 mb-1.5">Contact Number *</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-brand-beige rounded-sm px-4 py-2.5 text-sm text-brand-charcoal focus:border-brand-gold outline-none transition-colors"
                  placeholder="10-digit mobile number"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-charcoal/70 mb-1.5">Street Address *</label>
              <input
                required
                type="text"
                name="address"
                value={shippingAddress.address}
                onChange={handleInputChange}
                className="w-full bg-white border border-brand-beige rounded-sm px-4 py-2.5 text-sm text-brand-charcoal focus:border-brand-gold outline-none transition-colors"
                placeholder="House No, Building, Street, Area"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-charcoal/70 mb-1.5">City *</label>
                <input
                  required
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-brand-beige rounded-sm px-4 py-2.5 text-sm text-brand-charcoal focus:border-brand-gold outline-none transition-colors"
                  placeholder="City name"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-charcoal/70 mb-1.5">State *</label>
                <input
                  required
                  type="text"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-brand-beige rounded-sm px-4 py-2.5 text-sm text-brand-charcoal focus:border-brand-gold outline-none transition-colors"
                  placeholder="State name"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-brand-charcoal/70 mb-1.5">Pincode *</label>
                <input
                  required
                  type="text"
                  name="pincode"
                  value={shippingAddress.pincode}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-brand-beige rounded-sm px-4 py-2.5 text-sm text-brand-charcoal focus:border-brand-gold outline-none transition-colors"
                  placeholder="6-digit pincode"
                />
              </div>
            </div>
          </div>

          <div className="bg-brand-cream border border-brand-beige p-6 rounded-sm space-y-4">
            <h2 className="font-serif text-xl font-bold text-brand-charcoal flex items-center gap-2 border-b border-brand-beige pb-3">
              <CreditCard className="w-5 h-5 text-brand-gold" />
              2. Payment Method
            </h2>
            <div className="flex items-center gap-3 p-4 bg-brand-cream-dark border border-brand-beige rounded-sm">
              <input type="radio" defaultChecked className="text-brand-forest focus:ring-brand-gold" />
              <div>
                <p className="text-sm font-semibold text-brand-charcoal">Razorpay Secure Payments</p>
                <p className="text-xs text-brand-charcoal-light/60">Pay securely via Cards, UPI, Netbanking, or Wallets.</p>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-forest hover:bg-brand-forest-light text-brand-cream py-4 px-6 font-semibold text-sm uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 shadow-md disabled:opacity-50"
            >
              {loading ? (
                <span>Processing Secure Checkout...</span>
              ) : (
                <span>Pay Now — ₹{grandTotal.toLocaleString('en-IN')}</span>
              )}
            </button>
          </div>
        </form>

        {/* Right: Order Summary Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-brand-cream border border-brand-beige p-6 rounded-sm space-y-5 shadow-xs">
            <h3 className="font-serif text-lg font-bold text-brand-charcoal border-b border-brand-beige pb-3 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-brand-gold" />
              Order Items ({cart.length})
            </h3>

            {/* List */}
            <div className="max-h-60 overflow-y-auto divide-y divide-brand-beige/50 pr-2">
              {cart.map((item) => (
                <div key={item.cartItemId} className="py-3 flex gap-3 text-sm">
                  <img src={item.image} alt="" className="w-10 h-12 object-cover rounded-sm border border-brand-beige flex-shrink-0" />
                  <div className="flex-grow min-w-0">
                    <p className="font-serif text-brand-charcoal font-semibold truncate">{item.name}</p>
                    <p className="text-slate-400 text-xs mt-0.5">Size: {item.size} • Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-brand-charcoal">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="border-t border-brand-beige pt-4 space-y-2.5 text-sm font-light text-brand-charcoal-light">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-brand-charcoal">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-semibold text-brand-charcoal">
                  {shippingCost === 0 ? <span className="text-emerald-600 uppercase text-xs font-bold">Free</span> : `₹${shippingCost}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GST Tax (18%)</span>
                <span className="font-semibold text-brand-charcoal">₹{taxCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-brand-beige pt-3 flex justify-between text-base font-bold text-brand-charcoal">
                <span>Grand Total</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-brand-charcoal-light/60 font-light border-t border-brand-beige">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>Razorpay Verified Merchant Secure Transaction</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
