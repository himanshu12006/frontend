import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { SlidersHorizontal, ArrowDownAZ, Heart, Grid, List, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import API from '../api/axiosInstance';

export default function Category() {
  const location = useLocation();
  const navigate = useNavigate();
  const { wishlist } = useWishlist();

  const [productsList, setProductsList] = useState(products); // Fallback to mock products
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);

  // Extract query parameters from URL
  const queryParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  // ── SINGLE SOURCE OF TRUTH: Read filters directly from query parameters ────
  const selectedCategory = useMemo(() => {
    return queryParams.get('category') || 'All';
  }, [queryParams]);

  const selectedTag = useMemo(() => {
    const f = queryParams.get('filter');
    if (f === 'new') return 'New';
    if (f === 'bestseller') return 'Bestseller';
    if (f === 'trending') return 'Trending';
    if (f === 'wishlist') return 'Wishlist';
    return 'All';
  }, [queryParams]);

  const searchTerm = useMemo(() => {
    return queryParams.get('search') || '';
  }, [queryParams]);

  // Keep a local search input state for smooth typing
  const [localSearch, setLocalSearch] = useState(searchTerm);

  // Sync local search input if search param changes (e.g., cleared filters)
  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  // Load real products from the database on mount
  useEffect(() => {
    const fetchRealProducts = async () => {
      try {
        const { data } = await API.get('/products');
        if (data && data.success && data.data && data.data.length > 0) {
          setProductsList(data.data);
        }
      } catch (err) {
        // Backend not running or no products yet — silently fall back to mock data
        console.warn('Could not load products from API. Using mock fallback.', err?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRealProducts();
  }, []);

  // ── URL Sync Handlers ──────────────────────────────────────────────────────
  const handleCategoryClick = (cat) => {
    const params = new URLSearchParams(location.search);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    navigate(`/shop?${params.toString()}`);
  };

  const handleTagClick = (tagVal) => {
    const params = new URLSearchParams(location.search);
    if (tagVal === 'All') {
      params.delete('filter');
    } else {
      params.set('filter', tagVal.toLowerCase());
    }
    navigate(`/shop?${params.toString()}`);
  };

  const handleSearchChange = (val) => {
    setLocalSearch(val);
    const params = new URLSearchParams(location.search);
    if (val.trim() === '') {
      params.delete('search');
    } else {
      params.set('search', val.trim());
    }
    navigate(`/shop?${params.toString()}`, { replace: true });
  };

  const handleClearAll = () => {
    setLocalSearch('');
    setSortBy('default');
    navigate('/shop');
  };

  // Filter products based on active params
  const filteredProducts = useMemo(() => {
    let result = [...productsList];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          (p.name || '').toLowerCase().includes(term) ||
          (p.description || '').toLowerCase().includes(term) ||
          (p.category || '').toLowerCase().includes(term)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Tag / Special filter
    if (selectedTag === 'New') {
      result = result.filter((p) => p.isNew || p.createdAt);
    } else if (selectedTag === 'Bestseller') {
      result = result.filter((p) => p.isBestSeller);
    } else if (selectedTag === 'Trending') {
      result = result.filter((p) => p.isTrending);
    } else if (selectedTag === 'Wishlist') {
      // Support both _id (DB) and id (mock)
      result = result.filter((p) => wishlist.some((w) => w._id === p._id || w.id === p.id));
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [selectedCategory, selectedTag, searchTerm, sortBy, wishlist, productsList]);

  const categories = ['All', 'Men', 'Women', 'Kids', 'Ethnic Wear'];
  const tags = [
    { label: 'All Items', value: 'All' },
    { label: 'New Arrivals', value: 'New' },
    { label: 'Best Sellers', value: 'Bestseller' },
    { label: 'Trending Collection', value: 'Trending' },
    { label: 'My Favorites', value: 'Wishlist' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-brand-offwhite min-h-[70vh]">
      {/* Page Header */}
      <div className="border-b border-brand-beige pb-6">
        <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Om Cloth House Catalog</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-1 text-brand-charcoal">
          {selectedTag === 'Wishlist' 
            ? 'My Personal Wishlist' 
            : selectedCategory === 'All' 
              ? 'Our Whole Collections' 
              : `${selectedCategory} Collection`}
        </h1>
        <p className="text-xs sm:text-sm font-light text-brand-charcoal-light/70 mt-1.5">
          Showing {filteredProducts.length} high-quality apparel designs
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4 space-y-6">
          
          {/* Custom Search Bar */}
          <div className="bg-brand-cream border border-brand-beige p-5 rounded-sm space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-brand-charcoal">Search Catalog</h3>
            <div className="relative flex items-center bg-brand-cream-dark border border-brand-beige rounded-sm px-3 py-2">
              <input
                type="text"
                placeholder="Type details (e.g. linen)..."
                value={localSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full text-xs bg-transparent outline-none pr-6 text-brand-charcoal"
              />
              <Search className="w-4 h-4 text-brand-charcoal-light/50 absolute right-3" />
            </div>
          </div>

          {/* Categories Filter */}
          <div className="bg-brand-cream border border-brand-beige p-5 rounded-sm space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-brand-charcoal">Select Category</h3>
            <div className="flex flex-col space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`text-left text-xs uppercase tracking-wider py-1.5 px-2 rounded-xs transition-colors flex justify-between items-center ${
                    selectedCategory === cat
                      ? 'bg-brand-beige text-brand-charcoal font-semibold border-l-2 border-brand-gold'
                      : 'text-brand-charcoal-light hover:bg-brand-cream-dark hover:text-brand-gold'
                  }`}
                >
                  <span>{cat === 'All' ? 'All Collections' : cat}</span>
                  <span className="text-[10px] text-brand-charcoal-light/50">
                    ({cat === 'All'
                      ? productsList.length
                      : productsList.filter((p) => p.category === cat).length})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Special Collections Tags */}
          <div className="bg-brand-cream border border-brand-beige p-5 rounded-sm space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-brand-charcoal">Collections</h3>
            <div className="flex flex-col space-y-2">
              {tags.map((tg) => (
                <button
                  key={tg.value}
                  onClick={() => handleTagClick(tg.value)}
                  className={`text-left text-xs uppercase tracking-wider py-1.5 px-2 rounded-xs transition-colors flex justify-between items-center ${
                    selectedTag === tg.value
                      ? 'bg-brand-beige text-brand-charcoal font-semibold border-l-2 border-brand-gold'
                      : 'text-brand-charcoal-light hover:bg-brand-cream-dark hover:text-brand-gold'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {tg.value === 'Wishlist' && <Heart className="w-3 h-3 text-red-500 fill-red-500" />}
                    {tg.label}
                  </span>
                  <span className="text-[10px] text-brand-charcoal-light/50">
                    ({tg.value === 'All'
                      ? productsList.length
                      : tg.value === 'New'
                        ? productsList.filter((p) => p.isNew).length
                        : tg.value === 'Bestseller'
                          ? productsList.filter((p) => p.isBestSeller).length
                          : tg.value === 'Trending'
                            ? productsList.filter((p) => p.isTrending).length
                            : wishlist.length})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Reset Filters */}
          <button
            onClick={handleClearAll}
            className="w-full py-2.5 border border-brand-beige hover:border-brand-gold bg-brand-cream text-brand-charcoal font-semibold text-xs uppercase tracking-widest transition-colors rounded-sm"
          >
            Reset Filters
          </button>
        </div>

        {/* Catalog Main Panel */}
        <div className="w-full lg:w-3/4 space-y-6">
          {/* Sorting / Controls Toolbar */}
          <div className="bg-brand-cream border border-brand-beige px-4 py-3 rounded-sm flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
              <span className="text-brand-charcoal font-semibold uppercase tracking-wider">Sort & Layout</span>
            </div>
            
            {/* Sorting Select */}
            <div className="flex items-center space-x-2">
              <span className="text-brand-charcoal-light/70 uppercase">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-brand-cream-dark border border-brand-beige text-brand-charcoal py-1.5 px-3 rounded-sm outline-none cursor-pointer focus:border-brand-gold uppercase tracking-wider text-[11px]"
              >
                <option value="default">Default Order</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Ratings</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            // Loading skeleton — prevents flashing "No Products Found" before API responds
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-brand-cream border border-brand-beige rounded-sm animate-pulse">
                  <div className="h-64 bg-brand-beige/40" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-brand-beige/60 rounded w-3/4" />
                    <div className="h-3 bg-brand-beige/40 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                  onQuickView={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-brand-cream border border-brand-beige py-24 text-center rounded-sm space-y-4">
              <SlidersHorizontal className="w-12 h-12 text-brand-beige mx-auto" />
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-brand-charcoal">No Products Found</h3>
                <p className="text-xs text-brand-charcoal-light/60 font-light max-w-sm mx-auto px-4">
                  We couldn't find matches for your search. Try resetting filters or browsing other clothing categories.
                </p>
              </div>
              <button
                onClick={handleClearAll}
                className="px-6 py-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal text-xs uppercase tracking-widest font-semibold transition-colors mt-2"
              >
                Show All Products
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Quick View Modal Overlay */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
