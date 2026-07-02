import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Support both static mock data and backend database product schema
  const productId = product?._id || product?.id;
  const productImage = product?.image || (product?.images && product?.images[0]?.url) || '';
  const productRating = product?.rating || 0;
  const productReviews = product?.reviews !== undefined ? product?.reviews : (product?.numReviews || 0);
  const productSizes = product?.sizes && product?.sizes.length > 0 ? product?.sizes : ['M'];
  const productColors = product?.colors && product?.colors.length > 0 ? product?.colors : ['Default'];

  const [selectedSize, setSelectedSize] = useState(productSizes[0]);
  const [selectedColor, setSelectedColor] = useState(productColors[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const isFav = isWishlisted(productId);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const handleIncrease = () => {
    setQuantity((q) => q + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1500);
  };

  // Color mapping helper to show visual color selectors
  const getColorHex = (colorName) => {
    const map = {
      'Sand': '#D2B48C',
      'Charcoal': '#36454F',
      'Ivory': '#FFFFF0',
      'Olive': '#808000',
      'Sky Blue': '#87CEEB',
      'Oatmeal': '#EAE6DF',
      'Sage': '#9C9F84',
      'Stone Gray': '#8E908A',
      'Cream': '#FFFDD0',
      'Emerald': '#50C878',
      'Champagne': '#F7E7CE',
      'Black': '#1A1A1A',
      'Off-White': '#F8F9FA',
      'Khaki': '#C3B091',
      'Gold': '#FFD700',
      'Dusty Rose': '#DCAE96',
      'Mustard': '#FFDB58',
      'Soft Gray': '#D3D3D3',
      'Ivory Floral': '#FFF5EE',
      'Sage Floral': '#EDF1EE',
      'Gold & Ivory': '#EADEC9',
      'Crimson Red': '#DC143C',
      'Cream & Gold': '#FFFDD0',
      'Blush Pink': '#FFD1DC',
      'Mint Green': '#98FF98',
      'Cream Gold': '#F1E6C5',
      'Deep Charcoal': '#2A2A2A',
    };
    return map[colorName] || '#CCCCCC';
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-charcoal/60 backdrop-blur-xs transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-brand-cream border border-brand-beige w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl relative transition-transform duration-300 transform scale-100 flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 bg-brand-cream-dark/50 hover:bg-brand-gold hover:text-brand-charcoal text-brand-charcoal rounded-full transition-all duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Section: Image Slider/Display */}
        <div className="w-full md:w-1/2 bg-brand-cream-dark flex items-center justify-center">
          <img 
            src={productImage} 
            alt={product.name} 
            className="w-full h-full object-cover aspect-[3/4] max-h-[50vh] md:max-h-[80vh]"
          />
        </div>

        {/* Right Section: Purchase Options */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] tracking-widest text-brand-gold uppercase font-bold">
                {product.category}
              </span>
              <h2 className="font-serif text-2xl font-bold text-brand-charcoal mt-1">
                {product.name}
              </h2>
              
              {/* Rating */}
              <div className="flex items-center space-x-1.5 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(productRating) ? 'fill-current' : 'text-brand-beige'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-brand-charcoal-light/60 font-light">
                  {productRating} ({productReviews} reviews)
                </span>
              </div>
            </div>

            <div className="text-xl font-semibold text-brand-charcoal tracking-wide border-b border-brand-beige pb-3">
              ₹{product.price?.toLocaleString('en-IN')}
            </div>

            <p className="text-sm font-light text-brand-charcoal-light/85 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            {productColors[0] !== 'Default' && (
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-brand-charcoal">
                  Color: <span className="font-light text-brand-charcoal-light">{selectedColor}</span>
                </span>
                <div className="flex space-x-3">
                  {productColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                        selectedColor === color 
                          ? 'border-brand-gold scale-110 shadow-sm ring-1 ring-brand-gold' 
                          : 'border-brand-beige hover:border-brand-gold'
                      }`}
                      style={{ backgroundColor: getColorHex(color) }}
                      title={color}
                    >
                      {selectedColor === color && (
                        <Check className={`w-3.5 h-3.5 ${color === 'Ivory' || color === 'Off-White' || color === 'Oatmeal' ? 'text-brand-charcoal' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-brand-charcoal">
                Size: <span className="font-light text-brand-charcoal-light">{selectedSize}</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {productSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border text-xs tracking-wider transition-colors ${
                      selectedSize === size
                        ? 'bg-brand-charcoal border-brand-charcoal text-brand-cream font-medium'
                        : 'border-brand-beige hover:border-brand-gold text-brand-charcoal-light bg-brand-cream'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-brand-beige">
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-brand-charcoal">Quantity</span>
              <div className="flex items-center border border-brand-beige rounded-sm bg-brand-cream-dark">
                <button
                  onClick={handleDecrease}
                  className="px-3 py-1.5 hover:text-brand-gold transition-colors text-brand-charcoal-light"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-semibold text-brand-charcoal min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="px-3 py-1.5 hover:text-brand-gold transition-colors text-brand-charcoal-light"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-grow py-3.5 px-6 font-medium text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 ${
                  added 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-brand-forest hover:bg-brand-forest-light text-brand-cream hover:shadow-md'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 border border-brand-beige hover:border-brand-gold transition-colors rounded-sm flex items-center justify-center ${
                  isFav ? 'text-red-500 bg-red-50/20' : 'text-brand-charcoal-light hover:text-brand-gold'
                }`}
                title="Add to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
