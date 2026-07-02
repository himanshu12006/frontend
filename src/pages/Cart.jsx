import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, ArrowRight, Check, CreditCard, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = getCartTotal();
  const shippingThreshold = 150;
  const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 15.00;
  const estimatedTax = subtotal * 0.08; // 8% sales tax
  const orderTotal = subtotal + shippingCost + estimatedTax;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      clearCart();
    }, 1500);
  };

  if (checkoutSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6 bg-brand-offwhite">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
          <Check className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-bold text-brand-charcoal">Order Placed Successfully!</h2>
          <p className="text-sm font-light text-brand-charcoal-light/80 leading-relaxed max-w-sm mx-auto">
            Thank you for shopping at **OM CLOTH HOUSE**. A mock invoice and delivery updates have been scheduled to your registered email.
          </p>
        </div>
        <div className="pt-4">
          <Link
            to="/shop"
            onClick={() => setCheckoutSuccess(false)}
            className="inline-block bg-brand-charcoal hover:bg-brand-charcoal-light text-brand-cream text-xs uppercase tracking-widest font-semibold px-8 py-3.5 rounded-sm transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-brand-offwhite min-h-[70vh]">
      {/* Page Header */}
      <div className="border-b border-brand-beige pb-6">
        <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Your Bag</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-1 text-brand-charcoal">Shopping Bag</h1>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-brand-cream border border-brand-beige p-4 sm:p-5 rounded-sm flex flex-col sm:flex-row items-center gap-5 shadow-xs"
              >
                {/* Product Image */}
                <div className="w-20 h-24 flex-shrink-0 bg-brand-cream-dark border border-brand-beige rounded-sm overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Product details */}
                <div className="flex-grow text-center sm:text-left space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-brand-gold font-semibold">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-base font-bold text-brand-charcoal">
                    {item.name}
                  </h3>
                  
                  {/* Size and Color specifications */}
                  <div className="flex justify-center sm:justify-start gap-4 text-xs font-light text-brand-charcoal-light/75">
                    <span>Size: <strong className="font-semibold text-brand-charcoal">{item.size}</strong></span>
                    <span>Color: <strong className="font-semibold text-brand-charcoal">{item.color}</strong></span>
                  </div>
                </div>

                {/* Quantity modifier controls */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-brand-beige rounded-sm bg-brand-cream-dark text-xs">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="px-2.5 py-1.5 hover:text-brand-gold transition-colors text-brand-charcoal-light"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 font-bold text-brand-charcoal min-w-[30px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="px-2.5 py-1.5 hover:text-brand-gold transition-colors text-brand-charcoal-light"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Prices & Delete Icon */}
                <div className="flex items-center gap-6 justify-between sm:justify-end w-full sm:w-auto">
                  <div className="text-right">
                    <span className="text-xs text-brand-charcoal-light/55 block">Line total</span>
                    <span className="text-sm font-semibold text-brand-charcoal">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="p-2 text-brand-charcoal-light/50 hover:text-red-500 hover:bg-red-50/50 rounded transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>

              </div>
            ))}

            {/* Back to Shopping Navigation */}
            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center text-xs uppercase tracking-widest text-brand-gold hover:text-brand-charcoal font-semibold gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
              </Link>
            </div>
          </div>

          {/* Pricing Order Summary Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-brand-cream border border-brand-beige p-6 rounded-sm space-y-6 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-brand-charcoal border-b border-brand-beige pb-3">
                Order Summary
              </h3>

              {/* Price Calculations breakdown */}
              <div className="space-y-3.5 text-sm font-light text-brand-charcoal-light">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-brand-charcoal">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping Cost</span>
                  <span className="font-semibold text-brand-charcoal">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600 font-semibold text-xs tracking-wider uppercase">Free</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-brand-charcoal">${estimatedTax.toFixed(2)}</span>
                </div>

                {/* Free shipping progress indicator */}
                {subtotal < shippingThreshold && (
                  <div className="bg-brand-cream-dark p-3 rounded-xs text-[11px] text-brand-gold leading-relaxed border border-brand-beige/50">
                    Add <strong className="font-semibold">${(shippingThreshold - subtotal).toFixed(2)}</strong> more to unlock <strong className="font-semibold">Free Express Shipping</strong>.
                  </div>
                )}
              </div>

              {/* Total Calculation */}
              <div className="border-t border-brand-beige pt-4 flex justify-between text-base font-bold text-brand-charcoal">
                <span>Grand Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>

              {/* Checkout CTA */}
              <Link
                to="/checkout"
                className="w-full bg-brand-forest hover:bg-brand-forest-light text-brand-cream py-4 px-6 font-medium text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 shadow-md"
              >
                <CreditCard className="w-4 h-4 text-brand-gold" />
                <span>Proceed to Checkout</span>
              </Link>

              {/* Trust Badges */}
              <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-brand-charcoal-light/60 font-light border-t border-brand-beige">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>Secured SSL Checkout & Safe Transactions</span>
              </div>

            </div>
          </div>

        </div>
      ) : (
        /* Empty State */
        <div className="bg-brand-cream border border-brand-beige py-24 text-center rounded-sm space-y-6 shadow-xs max-w-3xl mx-auto">
          <ShoppingBag className="w-16 h-16 text-brand-beige mx-auto" />
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-brand-charcoal">Your Bag is Empty</h2>
            <p className="text-xs sm:text-sm text-brand-charcoal-light/60 font-light max-w-sm mx-auto px-4 leading-relaxed">
              Explore our premium Men, Women, Kids and traditional Ethnic collections to find your perfect fit.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-block bg-brand-forest hover:bg-brand-forest-light text-brand-cream text-xs uppercase tracking-widest font-semibold px-8 py-3.5 rounded-sm transition-colors shadow-sm"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
