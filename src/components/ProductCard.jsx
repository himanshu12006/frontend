import React from 'react';
import { Heart, Star, Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Support both static mock data and backend database product schema
  const productId = product._id || product.id;
  const productImage = product.image || (product.images && product.images[0]?.url) || '';
  const productRating = product.rating || 0;
  const productReviews = product.reviews !== undefined ? product.reviews : (product.numReviews || 0);
  const productSizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['M'];
  const productColors = product.colors && product.colors.length > 0 ? product.colors : ['Default'];

  const isFav = isWishlisted(productId);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const defaultSize = productSizes[0];
    const defaultColor = productColors[0];
    addToCart(product, defaultSize, defaultColor, 1);
  };

  return (
    <div className="group bg-brand-cream border border-brand-beige rounded-sm overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-all duration-300 relative">
      
      {/* Product Image Section */}
      <div className="relative overflow-hidden aspect-[3/4] bg-brand-cream-dark">
        {/* New Arrival Badge */}
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-brand-gold text-brand-charcoal text-[9px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-xs z-20">
            New
          </span>
        )}

        {/* Wishlist Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 p-2 bg-brand-cream/80 backdrop-blur-xs rounded-full shadow-sm hover:bg-brand-cream text-brand-charcoal hover:text-red-500 z-20 transition-all duration-200"
          aria-label="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-brand-charcoal-light'}`} />
        </button>

        {/* Image Zoom Hover */}
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-full object-cover object-center scale-hover animate-in fade-in duration-300"
          loading="lazy"
        />

        {/* Quick View Overlay (appears on hover) */}
        <div className="absolute inset-0 bg-brand-charcoal/20 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300 z-10">
          <button
            onClick={() => onQuickView(product)}
            className="p-3 bg-brand-cream text-brand-charcoal hover:bg-brand-forest hover:text-brand-cream transition-all duration-300 rounded-full shadow-md"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-3 bg-brand-cream text-brand-charcoal hover:bg-brand-forest hover:text-brand-cream transition-all duration-300 rounded-full shadow-md"
            title="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold mb-1 block">
            {product.category}
          </span>
          {/* Name */}
          <h3 className="font-serif text-sm font-semibold text-brand-charcoal group-hover:text-brand-gold transition-colors duration-200 line-clamp-1">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 my-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(productRating) ? 'fill-current' : 'text-brand-beige'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-brand-charcoal-light/60 font-light">
              ({productReviews})
            </span>
          </div>
        </div>

        {/* Price & Add to Cart button for Mobile */}
        <div className="mt-3 flex justify-between items-center">
          <span className="text-sm font-semibold text-brand-charcoal tracking-wide">
            ₹{product.price?.toLocaleString('en-IN')}
          </span>
          <button
            onClick={handleAddToCart}
            className="text-[10px] uppercase tracking-widest text-brand-charcoal font-semibold hover:text-brand-gold transition-colors flex items-center gap-1.5 lg:hidden"
          >
            <ShoppingCart className="w-3.5 h-3.5" /> Add
          </button>
          <button
            onClick={() => onQuickView(product)}
            className="text-[10px] uppercase tracking-widest text-brand-gold hover:text-brand-charcoal font-semibold transition-colors hidden lg:block"
          >
            Quick View
          </button>
        </div>
      </div>

    </div>
  );
}

